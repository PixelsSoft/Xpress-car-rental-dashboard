import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import CustomTextArea from '../../components/custom-text-area.component'
import ExpenseCard from '../../components/expense-card.component'
import axios from 'axios'
import { errorNotify, successNotify } from '../../utils/success-notify.util'
import API from '../../api/api'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

const AddExpense = () => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(undefined)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  const [recentExpenses, setRecentExpenses] = useState([])

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!title || !type || !amount || !description || !date)
        return errorNotify('All fields are required')
      setLoading(true)
      await axios.post(API.ADD_EXPENSE, {
        title,
        type,
        amount,
        description,
        date,
      })
      successNotify('expense added')

      setTitle('')
      setType('')
      setDescription('')
      setAmount(0)
      setDate('')

      getRecentExpenses()
      setLoading(false)
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }

  const onCancel = (e) => {
    e.preventDefault()
    navigate('/expenses')
  }
  const getRecentExpenses = async () => {
    try {
      const response = await axios.get(API.GET_RECENT_EXPENSES)

      if (response.data.success) {
        setRecentExpenses(response.data.data)
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }
  useEffect(() => {
    getRecentExpenses()
  }, [])
  return (
    <Layout>
      <div className="flex items-center justify-between mt-10 p-2">
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-sm md:text-lg lg:text-xl">
            Add Expense
          </h1>
        </div>
      </div>
      <CustomContainer otherStyles="p-3 mt-3 w-full flex flex-col xl:flex-row">
        <form className="w-full mt-6 xl:w-2/4" onSubmit={onSubmit}>
          <div className="flex flex-col w-full flex-wrap">
            <div>
              <div className="flex items-center">
                <CustomInput
                  placeholder="Vendor"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className="text-sm text-gray-500 border-[1px] border-gray-500 rounded-lg px-1"
                    >
                      + Add Vendor
                    </button>
                  }
                >
                  {(close) => (
                    <div className="flex items-center justify-between p-2">
                      <h1>Add Vendor</h1>
                      <span onClick={close}>X</span>
                    </div>
                  )}
                </Popup>
              </div>
              <div></div>
            </div>
            <CustomInput
              placeholder="Expense Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <CustomInput
              placeholder="Amount"
              onFocus={(e) => (e.target.type = 'number')}
              onBlur={(e) => (e.target.type = 'text')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <CustomTextArea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <CustomInput
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          </div>

          <div className="flex space-x-3 ml-4 mt-10">
            <CustomButton onClick={onCancel}>Cancel</CustomButton>
            <CustomButton loading={loading} type="submit">
              Add Expense
            </CustomButton>
          </div>
        </form>

        <div className="w-full xl:w-2/4 mt-8 xl:mt-0">
          <h1 className="font-bold mb-4 text-center">Recent Expenses</h1>
          {recentExpenses.map((expense) => (
            <ExpenseCard expense={expense} />
          ))}
        </div>
      </CustomContainer>
    </Layout>
  )
}

export default AddExpense
