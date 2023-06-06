import Popup from 'reactjs-popup'
import CustomInput from './custom-input.component'
import CustomButton from './custom-button.component'
import DropdownSelect from './dropdown-select.component'
import CustomTextArea from './custom-text-area.component'
import convertMillisecondsToDate from '../utils/convertMillisecondsToDate'
import { useEffect, useState } from 'react'
import { errorNotify, successNotify } from '../utils/success-notify.util'
import axios from 'axios'
import API from '../api/api'

export default function RecordPayment({ id, callback, type = 'invoice' }) {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [paymentAccount, setPaymentAccount] = useState(null)
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(false)

  const [newPaymentInput, setNewPaymentInput] = useState('')
  const [newAccountInput, setNewAccoutInput] = useState('')

  const [accountOptions, setAccountOptions] = useState([])
  const [methodOptions, setMethodOptions] = useState([])

  useEffect(() => {
    let date = convertMillisecondsToDate(Date.now())
    setDate(date)
  }, [])

  const addPaymentMethod = async () => {
    if (newPaymentInput.length < 1)
      return errorNotify('Enter new payment method')

    try {
      const response = await axios.post(API.ADD_PAYMENT_METHOD, {
        name: newPaymentInput,
      })

      if (response.data.success) {
        setNewPaymentInput('')
        getPaymentMethodOptions()
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const addPaymentAccount = async () => {
    if (newAccountInput.length < 1) return errorNotify('Enter payment account')
    try {
      const response = await axios.post(API.ADD_PAYMENT_ACCOUNT, {
        name: newAccountInput,
      })

      if (response.data.success) {
        setNewAccoutInput('')
        getPaymentAccountOptions()
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const onMethodInputChange = (e) => setNewPaymentInput(e.target.value)
  const onAccountInputChange = (e) => setNewAccoutInput(e.target.value)

  const getPaymentMethodOptions = async () => {
    try {
      const response = await axios.get(API.GET_ALL_PAYMENT_METHODS)
      if (response.data.success) {
        setMethodOptions(response.data.data)
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const getPaymentAccountOptions = async () => {
    try {
      const response = await axios.get(API.GET_PAYMENT_ACCOUNTS)
      if (response.data.success) {
        setAccountOptions(response.data.data)
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const handleInvoiceSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.post(API.CREATE_TRANSACTION, {
        date,
        amount: Number(amount),
        paymentMethod,
        paymentAccount,
        invoice: id,
      })

      if (response.data.success) {
        setAmount(0)
        setPaymentMethod(null)
        setPaymentAccount(null)
        setMemo('')
        setLoading(false)
        successNotify('Success')

        callback()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
      errorNotify(err.response.data.message)
    }
  }

  const handleExpenseSubmit = async () => {
    try {
      const response = await axios.post(API.RECORD_EXPENSE + `/${id}`, {
        date,
        amount: Number(amount),
        paymentMethod,
        paymentAccount,
      })

      if (response.data.success) {
        setAmount(0)
        setPaymentMethod(null)
        setPaymentAccount(null)
        setMemo('')
        setLoading(false)
        successNotify('Success')

        callback()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (close) => {
    if (type === 'invoice') {
      handleInvoiceSubmit()
    }

    if (type === 'expense') {
      handleExpenseSubmit()
    }
    close()
  }

  useEffect(() => {
    getPaymentAccountOptions()
    getPaymentMethodOptions()
  }, [])

  return (
    <Popup
      modal
      trigger={
        <button className="bg-slate-200 px-2 py-1 mr-1 rounded-lg hover:bg-slate-300">
          Record Payment
        </button>
      }
      contentStyle={{ width: 'fit-content' }}
      className="w-fit-content"
    >
      {(close) => (
        <div className="p-2">
          <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
            <h1 className="font-bold text-xl">Record Payment</h1>
            <span onClick={close} className="text-xl font-bold cursor-pointer">
              X
            </span>
          </div>
          <div className="my-4">
            <span className="text-gray-500">
              Record a payment you've already received, such as cash, check, or
              bank payment.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CustomInput
              full
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
            <CustomInput
              full
              placeholder="Amount in USD"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => (e.target.type = 'number')}
              onBlur={(e) => (e.target.type = 'text')}
            />
            <DropdownSelect
              full
              label="Payment Method"
              addInputText="Add new payment method"
              value={paymentMethod}
              setFunction={setPaymentMethod}
              onChange={onMethodInputChange}
              addInputValue={newPaymentInput}
              addInputSubmitHandler={addPaymentMethod}
              options={methodOptions}
            />
            <DropdownSelect
              full
              label="Payment account"
              addInputText="Add new payment account"
              value={paymentAccount}
              setFunction={setPaymentAccount}
              onChange={onAccountInputChange}
              addInputvalue={newAccountInput}
              addInputSubmitHandler={addPaymentAccount}
              options={accountOptions}
            />
            <CustomTextArea
              full
              placeholder="Memo/Notes"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <div className="space-x-3 mt-4 w-full flex justify-end">
              <CustomButton onClick={close}>Cancel</CustomButton>
              <CustomButton
                loading={loading}
                onClick={() => handleSubmit(close)}
              >
                Save
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )
}
