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

const Expense = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('')

  const getExpenses = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(API.GET_EXPENSES)
      console.log(data)
      if (data) {
        setExpenses(data.data)
      }
      setLoading(false)
    } catch (err) {
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    getExpenses()
  }, [])

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
            )}
            data={expenses}
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
