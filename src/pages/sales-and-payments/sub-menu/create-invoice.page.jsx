import React, {useEffect, useRef, useState} from 'react'
import Layout from '../../../components/layout.component'
import CustomContainer from '../../../components/custom-container.component'
import CustomInput from '../../../components/custom-input.component'
import CustomButton from '../../../components/custom-button.component'
import InvoiceTable from '../../../components/invoice-table.component'
import AddCustomerPopup from '../../../components/add-customer-popup.component'
import axios from 'axios'
import API from '../../../api/api'
import {errorNotify, successNotify} from '../../../utils/success-notify.util'
import Popup from 'reactjs-popup'
import {useReactToPrint} from 'react-to-print'
import convertMillisecondsToDate from '../../../utils/convertMillisecondsToDate'
import generateInvoiceNumber from "../../../utils/generateInvoiceNumber";

export default function CreateInvoice() {
    const [vehicles, setVehicles] = useState([])
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [invoiceDate, setInvoiceDate] = useState('')
    const [dueDate, setDueDate] = useState(Date.now())
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const receiptRef = useRef()
    const [notes, setNotes] = useState('')

    const getVehicles = async () => {
        try {
            const response = await axios.get(API.GET_VEHICLES, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('@user_details'))
                        .token,
                },
            })
            setVehicles(response.data.data)
        } catch (err) {
            console.log(err)
            errorNotify(err.response.data.message)
        }
    }


    const sendReceiptEmail = async (e) => {
        try {
            e.preventDefault()

            setLoading(true)

            if (!customerName) {
                setLoading(false)
                return errorNotify('Customer name is required')
            }
            if (!customerEmail) {
                setLoading(false)
                return errorNotify('Customer email is required')
            }
            if (!invoiceDate) {
                setLoading(false)
                return errorNotify('Invoice date is required')
            }
            if (!dueDate) {
                setLoading(false)
                return errorNotify('Payment due date is required')
            }
            if (items.length < 1) {
                setLoading(false)
                return errorNotify('Please add items in receipt')
            }

            await axios.post(
                API.CREATE_INVOICE,
                {
                    invoiceNumber,
                    customerName,
                    customerEmail,
                    invoiceDate,
                    dueDate,
                    items,
                    total,
                    notes,
                },
                {
                    headers: {
                        // Authorization: token
                    },
                },
            )

            successNotify('Email sent.')
            setCustomerEmail('')
            setCustomerName('')
            setInvoiceDate('')
            setDueDate('')
            setItems([])
            setTotal('')
            setNotes('')
            generateInvoiceNumber()

            setLoading(false)
        } catch (err) {
            console.log(err)
            errorNotify(err.response.data.message)
            setLoading(false)
        }
    }

    const handlePrint = useReactToPrint({
        content: () => receiptRef.current,
    })

    useEffect(() => {
        getVehicles()
        setInvoiceNumber(generateInvoiceNumber())
    }, [])

    useEffect(() => {
        let date = convertMillisecondsToDate(Date.now())
        setInvoiceDate(date)
        setDueDate(date)
    }, [])

    return (
        <Layout>
            <CustomContainer otherStyles="p-6 flex flex-col xl:flex-row mt-8">
                <div>
                    <div className="flex items-center space-x-3">
                        <h1 className="font-bold text-xl">Create Invoice</h1>
                    </div>

                    <form className="w-full mt-6 flex justify-between">
                        <AddCustomerPopup
                            setCustomerEmail={setCustomerEmail}
                            setCustomerName={setCustomerName}
                        />
                        <div className="w-8/12">
                            <div className="flex w-full flex-wrap justify-end">
                                <CustomInput
                                    placeholder="Invoice #"
                                    value={invoiceNumber}
                                    disabled
                                />
                                <CustomInput
                                    placeholder="Customer Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <CustomInput
                                    placeholder="Customer Email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                />
                                <CustomInput
                                    type="text"
                                    placeholder="Invoice Date"
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    onFocus={(e) => (e.target.type = 'date')}
                                    onBlur={(e) => (e.target.type = 'text')}
                                    value={invoiceDate}
                                />
                                <CustomInput
                                    placeholder="Payment Due"
                                    onChange={(e) => setDueDate(e.target.value)}
                                    onFocus={(e) => (e.target.type = 'date')}
                                    onBlur={(e) => (e.target.type = 'text')}
                                    type="text"
                                    value={dueDate}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="mt-4">
                        <InvoiceTable
                            vehicles={vehicles}
                            items={items}
                            setItems={setItems}
                            total={total}
                            setTotal={setTotal}
                            notes={notes}
                            setNotes={setNotes}
                        />
                    </div>
                    <div className="flex space-x-3 ml-4 mt-10">
                        <CustomButton
                            loading={loading}
                            type="submit"
                            onClick={sendReceiptEmail}
                        >
                            Email Receipt
                        </CustomButton>
                        <Popup modal trigger={<CustomButton>Preview</CustomButton>}>
                            {(close) => (
                                <div>
                                    <div className="w-full p-3 flex items-center justify-between">
                                        <h1 className="font-bold text-xl">Preview</h1>
                                        <span className="font-bold cursor-pointer" onClick={close}>
                      X
                    </span>
                                    </div>
                                    <div ref={receiptRef} className="p-3">
                                        <div
                                            className="flex pb-3 items-center justify-between border-b-2 border-slate-200">
                                            <img
                                                alt=""
                                                src={require('../../../assets/images/logo-2.png')}
                                                className="w-80"
                                            />
                                            <div className="flex flex-col space-y-2">
                                                <h1 className="text-3xl font-light uppercase text-end">
                                                    Invoice
                                                </h1>
                                                <span className="font-bold text-sm text-end">
                          Xpress Car Rental
                        </span>
                                                <span className="font-light text-xs  text-end">
                          Tropical gardens road Nassau, New Providence The
                          Bahamas
                        </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-700">Bill To:</span>
                                                <span className="font-bold">
                          {customerName ? customerName : 'Not Selected'}
                        </span>
                                            </div>
                                            <div className="text-sm space-y-2">
                                                <div>
                                                    <strong>Invoice Number:</strong>
                                                    <span> {invoiceNumber}</span>
                                                </div>
                                                <div>
                                                    <strong>Invoice Date:</strong>
                                                    <span> {invoiceDate}</span>
                                                </div>
                                                <div>
                                                    <strong>Payment Due:</strong>
                                                    <span> {dueDate}</span>
                                                </div>
                                                <div>
                                                    <strong>Amount Due (USD):</strong>
                                                    <span> ${total}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="w-full">
                                            <thead className="bg-[#FEBD20]">
                                            <th className="w-fit text-start px-2 py-1">Items</th>
                                            <th className="w-fit px-2 py-1">Price</th>
                                            <th className="w-fit px-2 py-1">Amount</th>
                                            </thead>
                                            <tbody>
                                            {items.map((item) => (
                                                <tr className="border-b-2 border-slate-200">
                                                    <td className="px-2 py-2">{item.item.name}</td>
                                                    <td className="text-center">
                                                        ${item.quantity * item.price}
                                                    </td>
                                                    <td className="text-center">
                                                        ${item.quantity * item.price}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <tfoot className="text-sm">
                                            <tr>
                                                <td></td>
                                                <td className="text-end font-bold pt-3">Total:</td>
                                                <td className="text-end pt-3">${total}</td>
                                            </tr>
                                            <tr className="border-b-2 border-slate-200">
                                                <td></td>
                                                <td className="text-end pb-3">
                                                    Payment on {invoiceDate} using cash:
                                                </td>
                                                <td className="text-end pb-3">${total}</td>
                                            </tr>
                                            <tr className="font-bold">
                                                <td></td>
                                                <td className="text-end py-2">Amount Due (USD):</td>
                                                <td className="text-end">${total}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                        <div className="text-gray-500 w-2/4">
                                            <strong className="text-xs">Notes:</strong>
                                            <p className="text-xs" style={{whiteSpace: 'pre-wrap'}}>
                                                {notes}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <CustomButton onClick={handlePrint}>Print</CustomButton>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>
            </CustomContainer>
        </Layout>
    )
}
