import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout.component";
import CustomContainer from '../../../components/custom-container.component'
import CustomInput from "../../../components/custom-input.component";
import CustomButton from "../../../components/custom-button.component";
import InvoiceTable from '../../../components/invoice-table.component'
import CustomFileInput from '../../../components/custom-file-input/custom-file-input.component'
import axios from "axios";
import API from '../../../api/api'
import { v4 as uuidv4 } from 'uuid'
import {errorNotify, successNotify} from '../../../utils/success-notify.util'

export default function CreateInvoice() {
    const [vehicles, setVehicles] = useState([])
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [invoiceDate, setInvoiceDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false)

    const getVehicles = async () => {
        try {
            const response = await axios.get(API.GET_VEHICLES, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('@user_details')).token
                }
            })
            setVehicles(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const generateInvoiceNumber = () => {
        const id = uuidv4();
        const invoiceNumber = id.slice(0, 8);
        setInvoiceNumber('INV-' + invoiceNumber);
    }

    const sendReceiptEmail = async (e) => {
        try {
            e.preventDefault()

            setLoading(true)

            if(!customerName) {
                setLoading(false)
                return errorNotify('Customer name is required')
            }
            if(!customerEmail) {
                setLoading(false)
                return errorNotify('Customer email is required')
            }
            if(!invoiceDate) {
                setLoading(false)
                return errorNotify('Invoice date is required')
            }
            if(!dueDate) { 
                setLoading(false)
                return errorNotify('Payment due date is required')
            }
            if(items.length < 1) {
                setLoading(false)
                return errorNotify('Please add items in receipt')
            }

            await axios.post(API.CREATE_INVOICE, {
                invoiceNumber,
                customerName,
                customerEmail,
                invoiceDate,
                dueDate,
                items,
                total
            },
                {
                    headers: {
                        // Authorization: token
                    }
                })

            successNotify('Email sent.')
            setCustomerEmail('')
            setCustomerName('')
            setInvoiceDate('')
            setDueDate('')
            setItems([])
            setTotal('')
            generateInvoiceNumber()

            setLoading(false)
        } catch (err) {
            console.log(err)
            errorNotify(err.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getVehicles()
        generateInvoiceNumber()
    }, [])
    return (
        <Layout>
            <CustomContainer otherStyles='p-6 flex flex-col xl:flex-row mt-8'>
                <div>
                    <div className='flex items-center space-x-3'>
                        <h1 className='font-bold text-xl'>Create Invoice</h1>
                    </div>

                    <form className='w-full mt-6 flex justify-between'>
                        <div className="flex flex-col items-center justify-center border-dotted w-[300px] border-gray-400 border-2 py-10 px-4 rounded-lg">
                            <div className="flex items-center pb-4">
                                <img src={require('../../../assets/icons/upload-pic.png')} alt='' />
                                <span className="font-bold pl-2 w-fit text-sm">Add a customer</span>
                            </div>
                            <CustomFileInput />
                        </div>
                        <div className="w-full">
                            <div className='flex w-full flex-wrap justify-end'>
                                <CustomInput placeholder='Invoice #' value={invoiceNumber} disabled />
                                <CustomInput placeholder='Customer Name' value={customerName} onChange={e => setCustomerName(e.target.value)} />
                                <CustomInput placeholder='Customer Email' value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
                                <CustomInput
                                    type="text"
                                    placeholder='Invoice Date'
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    value={invoiceDate}
                                />
                                <CustomInput
                                    placeholder='Payment Due'
                                    onChange={(e) => setDueDate(e.target.value)}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    type="text"
                                    value={dueDate}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="mt-4">
                        <InvoiceTable vehicles={vehicles} items={items} setItems={setItems} total={total} setTotal={setTotal} />
                    </div>
                    <div className='flex space-x-3 ml-4 mt-10'>
                        <CustomButton>Print</CustomButton>
                        <CustomButton loading={loading} type='submit' onClick={sendReceiptEmail}>Email Receipt</CustomButton>
                    </div>
                </div>
            </CustomContainer>

        </Layout>
    )
}