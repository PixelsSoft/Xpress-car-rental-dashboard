import { useEffect, useState } from 'react'
import CustomContainer from '../../../components/custom-container.component'
import Layout from '../../../components/layout.component'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import API from '../../../api/api'
import { errorNotify } from '../../../utils/success-notify.util'
import Spinner from '../../../components/spinner.component'
import StatusBox from '../../../components/status-box.component'
import { TfiReceipt } from 'react-icons/tfi'
import CustomButton from '../../../components/custom-button.component'
import { FaLocationArrow } from 'react-icons/fa'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineCreditCard } from 'react-icons/ai'

export default function SingleInvoice() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    const getSingleInvoiceDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          API.GET_SINGLE_INVOICE_DETAILS + params.id,
        )
        console.log(response)
        setData(response.data.data)
        setLoading(false)
      } catch (err) {
        errorNotify(
          err.response?.data?.message || 'Could not get invoice details',
        )
        setLoading(false)
      }
    }
    getSingleInvoiceDetails()
  }, [params.id])

  console.log(data)
  return loading ? (
    <Spinner />
  ) : (
    <Layout>
      <CustomContainer otherStyles="p-4">
        <div className="py-4 border-b-2 border-slate-200">
          <h1 className="font-bold text-2xl">Invoice # {data?.invoiceNo}</h1>
        </div>

        <div className="flex justify-between py-4">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col space-y-2">
              <span className="font-bold text-gray-500">Status</span>
              <StatusBox status={data.status}></StatusBox>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-bold text-gray-500">Customer: </span>
              <span className="font-bold">{data.customerName}</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="font-bold text-gray-500">Amount Due</span>
              <span>$ {data.amountDue}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-500">Due On</span>
              <span>{data.dueDate}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-6 mt-10">
            <div className="border-slate-200 border-2 flex items-center p-9 rounded-lg">
              <TfiReceipt size={40} color="black" />
              <div className="flex flex-col flex-1 mx-8">
                <span className="font-medium text-3xl">Create</span>
                <span>
                  Created on {new Date(data.invoiceDate).toDateString()} at{' '}
                  {new Date(data.invoiceDate).toLocaleTimeString()}
                </span>
              </div>
              <CustomButton>Edit Invoice</CustomButton>
            </div>

            <div className="border-slate-200 border-2 flex items-center p-9 rounded-lg">
              <div>
                <FaLocationArrow size={30} color="black" />
              </div>
              <div className="flex-1 mx-8">
                <h2 className="font-medium text-3xl">Sent</h2>
                <p>
                  <strong>Last sent:</strong> Never
                </p>
                <div className="mt-4">
                  <p className="flex items-center">
                    <IoIosNotificationsOutline size={20} color="black" />{' '}
                    Schedule reminders after due date:
                  </p>

                  <div className="flex justify-between mt-5">
                    <div className="flex items-center space-x-2 bg-gray-300 w-fit p-4 rounded-lg">
                      <input type="checkbox" />
                      <p>On Due Date</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-300 w-fit p-4 rounded-lg">
                      <input type="checkbox" />
                      <p>After 3 days</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-300 w-fit p-4 rounded-lg">
                      <input type="checkbox" />
                      <p>After 7 days</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-300 w-fit p-4 rounded-lg">
                      <input type="checkbox" />
                      <p>After 14 days</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-x-3">
                <CustomButton>Send Invoice</CustomButton>
                <CustomButton>Get a share link</CustomButton>
              </div>
            </div>

            <div className="border-slate-200 border-2 flex flex-col p-9 rounded-lg">
              <div className="flex items-center justify-between w-full">
                <AiOutlineCreditCard size={40} color="black" />
                <h1 className="flex-1 font-medium text-3xl mx-8">Get Paid</h1>
                <CustomButton>Charge credit card</CustomButton>
              </div>
              <div className="flex justify-between mt-4">
                <span>
                  <strong>Amount Due: </strong> ${data.amountDue}
                </span>
                <span>
                  <strong>Status: </strong>{' '}
                  {data.status === 'paid'
                    ? 'Your invoice is paid'
                    : 'Your invoice is due'}
                </span>
              </div>
            </div>

            <div className="shadow-lg p-2">
              <div className="p-3">
                <div className="flex pb-3 items-center justify-between border-b-2 border-slate-200">
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
                      Tropical gardens road Nassau, New Providence The Bahamas
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-700">Bill To:</span>
                    <span className="font-bold">
                      {data.customerName ? data.customerName : 'Not Selected'}
                    </span>
                  </div>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Invoice Number:</strong>
                      <span> {data.invoiceNo}</span>
                    </div>
                    <div>
                      <strong>Invoice Date:</strong>
                      <span> {data.invoiceDate}</span>
                    </div>
                    <div>
                      <strong>Payment Due:</strong>
                      <span> {data.dueDate}</span>
                    </div>
                    <div>
                      <strong>Amount Due (USD):</strong>
                      <span> ${data.total}</span>
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
                    {data.items?.length > 0 ? (
                      data?.items?.map((item) => (
                        <tr className="border-b-2 border-slate-200">
                          <td className="px-2 py-2">{item.item.name}</td>
                          <td className="text-center">${item.price}</td>
                          <td className="text-center">${item.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b-2 border-slate-200">
                        <td className="px-2 py-2">No Items were added</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="text-sm">
                    <tr>
                      <td></td>
                      <td className="text-end font-bold pt-3">Total:</td>
                      <td className="text-end pt-3">${data.total}</td>
                    </tr>

                    <tr className="font-bold">
                      <td></td>
                      <td className="text-end py-2">Amount Due (USD):</td>
                      <td className="text-end">${data.amountDue}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="text-gray-500 w-2/4">
                  <strong className="text-xs">Notes:</strong>
                  <p className="text-xs" style={{ whiteSpace: 'pre-wrap' }}>
                    {data.memo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </Layout>
  )
}
