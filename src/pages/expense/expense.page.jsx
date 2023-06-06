import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomButton from '../../components/custom-button.component'
import CustomTable from '../../components/custom-table/custom-table.component'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { expensesColumns } from '../../config/columns'
import API from '../../api/api'
import { errorNotify } from '../../utils/success-notify.util'
import ListDropdown from '../../components/list-dropdown'
import CustomInput from '../../components/custom-input.component'

const Expense = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('')

  const [selectedValue, setSelectedValue] = useState('')
  const [dropdownList, setDropdownList] = useState([])

  const [from, setFrom] = useState()
  const [to, setTo] = useState()

  const getExpenses = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(API.GET_EXPENSES)
      if (data) {
        setExpenses(data.data)
      }
      setLoading(false)
    } catch (err) {
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }

  const getVendors = async () => {
    try {
      const response = await axios.get(API.GET_ALL_VENDORS)
      const list = response.data.data

      setDropdownList(list.map((vendor) => vendor.name))
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData()
      if (description) formData.append('description', description)
      if (type) formData.append('type', type)
      if (amount) formData.append('amount', amount)

      const response = await axios.patch(API.UPDATE_EXPENSE + id, {
        description,
        amount,
        type,
      })
      if (response.data.success) {
        getExpenses()
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(API.DELETE_EXPENSE + id)
      if (response.data.success) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id),
        )
      }
      setLoading(false)
    } catch (err) {
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }

  const applyDateFilters = async () => {
    const query = `?${from && `from=${from}&`}&${to && `to=${to}&`}`

    try {
      const response = await axios.get(API.GET_EXPENSES + query)
      setExpenses(response.data.data)
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  useEffect(() => {
    getExpenses()
    getVendors()
  }, [])

  return (
    <Layout>
      <div className="flex items-center justify-between mt-10 p-2">
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-sm md:text-lg lg:text-xl">Expenses</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/add-expense">
            <CustomButton>Add Expense</CustomButton>
          </Link>
        </div>
      </div>
      <CustomContainer>
        <div className="flex items-center">
          <ListDropdown
            list={dropdownList}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          <div className="flex justify-end items-center w-full">
            <CustomInput
              type="text"
              placeholder="From"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              onChange={(e) => setFrom(e.target.value)}
              value={from}
            />
            <CustomInput
              type="text"
              placeholder="To"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              onChange={(e) => setTo(e.target.value)}
              value={to}
            />
            <button
              onClick={applyDateFilters}
              className="bg-gray-200 text-black rounded-lg text-sm px-2 py-1 hover:bg-gray-300"
            >
              Go
            </button>
          </div>
        </div>

        <div className="mt-6">
          <CustomTable
            columns={expensesColumns(
              handleDelete,
              handleUpdate,
              description,
              setDescription,
              amount,
              setAmount,
              type,
              setType,
              getExpenses,
            )}
            data={
              selectedValue.length
                ? expenses.filter((expense) =>
                    expense.vendor.name
                      .toLowerCase()
                      .includes(selectedValue.toLowerCase()),
                  )
                : expenses
            }
            pagination={true}
            perPage={5}
            loading={loading}
          />
        </div>
      </CustomContainer>
    </Layout>
  )
}

export default Expense
