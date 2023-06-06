import React, { useEffect, useState, useRef } from 'react'
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
import AddVendorForm from '../../components/add-vendor-form.component'

const AddExpense = () => {
  const [vendor, setVendor] = useState(null)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(undefined)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  const [vendors, setVendors] = useState([])
  const [showVendors, setShowVendors] = useState(false)
  const [recentExpenses, setRecentExpenses] = useState([])

  const searchInputRef = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const handleDocumentClick = (event) => {
    if (!searchInputRef.current?.contains(event.target)) {
      setShowVendors(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!vendor || !type || !amount || !description || !date)
        return errorNotify('All fields are required')
      setLoading(true)
      await axios.post(API.ADD_EXPENSE, {
        vendor: vendor._id,
        type,
        amount,
        description,
        date,
      })
      successNotify('expense added')

      setVendor(null)
      setType('')
      setDescription('')
      setAmount(0)
      setDate('')
      setSearch('')

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

  const getAllVendors = async () => {
    try {
      const response = await axios.get(API.GET_ALL_VENDORS)
      setVendors(response.data.data)
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const handleVendorSelect = (vendor) => {
    setSearch(vendor.name)
    setVendor(vendor)
  }

  useEffect(() => {
    getRecentExpenses()
    getAllVendors()
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
              <div className="flex flex-col w-full xl:w-2/4 relative space-y-2">
                <div className="relative items-center justify-center xl:w-[290px]">
                  <input
                    ref={searchInputRef}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Select Vendor..."
                    className="outline-none border-[#FEBD20] border-2 rounded-lg p-2 text-sm w-full"
                    onFocus={() => setShowVendors(true)}
                  />

                  {showVendors && (
                    <ul className="absolute rounded-lg shadow-md z-20 bg-white w-full">
                      {search.length > 0 && vendors.length > 0
                        ? vendors
                            .filter(
                              (vendor) =>
                                vendor.firstName
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                vendor.lastName
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                (vendor.firstName + ' ' + vendor.lastName)
                                  .toLowerCase()
                                  .includes(search.toLowerCase()),
                            )
                            .map((vendor) => (
                              <li
                                onClick={() => handleVendorSelect(vendor)}
                                className="py-2 px-2 hover:bg-gray-200 ease-in duration-100"
                              >
                                {vendor.name}
                              </li>
                            ))
                        : vendors.map((vendor) => (
                            <li
                              onClick={() => handleVendorSelect(vendor)}
                              className="py-2 px-2 hover:bg-gray-200 ease-in duration-100"
                            >
                              {vendor.name}
                            </li>
                          ))}
                    </ul>
                  )}
                  <AddVendorForm
                    getAllVendors={getAllVendors}
                    component={
                      <button
                        type="button"
                        className="text-sm my-2 w-full text-gray-500 border-[1px] border-gray-500 rounded-lg px-1"
                      >
                        + Add Vendor
                      </button>
                    }
                  />
                </div>
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
