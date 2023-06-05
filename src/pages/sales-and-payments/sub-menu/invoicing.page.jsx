import CustomButton from '../../../components/custom-button.component'
import CustomContainer from '../../../components/custom-container.component'
import Layout from '../../../components/layout.component'
import InvoicingStatCard from '../../../components/invoicing-stat-card.component'
import CustomInput from '../../../components/custom-input.component'
import CustomTable from '../../../components/custom-table/custom-table.component'
import { invoicesColumns } from '../../../config/columns'
// import CustomBreadcumb from '../../../components/custom-breadcumb.component'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API from '../../../api/api'
import { useEffect, useState, useCallback } from 'react'
import { errorNotify, successNotify } from '../../../utils/success-notify.util'
import CustomSelect from '../../../components/dropdown-select.component'

export default function Invoicing() {
  const [invoices, setInvoices] = useState([])
  const [overdue, setOverdue] = useState(0)
  const [customers, setCustomers] = useState([])
  const [upcomingPayouts, setUpcomingPayouts] = useState(0)
  const [loading, setLoading] = useState(false)

  const [customer, setCustomer] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('')

  const deleteInvoice = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(API.DELETE_INVOICE + id)

      if (response.data.success) {
        setInvoices((prevState) =>
          prevState.filter((invoice) => invoice._id !== id),
        )

        successNotify(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorNotify(err.response.data.message)
      console.log(err)
    }
  }

  const calculateStats = useCallback(() => {
    setOverdue(
      invoices.reduce((acc, invoice) => {
        if (invoice.status === 'overdue') {
          return acc + invoice.total
        }
        return 0
      }, 0),
    )

    setUpcomingPayouts(
      invoices.reduce(
        (acc, invoice) => invoice.status === 'due' && acc + invoice.total,
        0,
      ),
    )
  }, [invoices, setOverdue, setUpcomingPayouts])

  const getInvoices = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(API.GET_INVOICES)
      setInvoices(response.data.data)
      setLoading(false)
    } catch (err) {
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }, [setInvoices, setLoading])

  const getCustomers = async () => {
    try {
      const response = await axios.get(API.GET_CUSTOMERS)
      setCustomers(response.data.data)
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const applyFilters = async () => {
    const filters = {}

    if (customer)
      filters.customer = customer.firstName + ' ' + customer.lastName
    if (selectedStatus) filters.status = selectedStatus.name
    if (to) filters.to = to
    if (from) filters.from = from
    if (invoiceNo) filters.invoiceNo = invoiceNo

    const query = `?${filters.customer ? `customer=${filters.customer}&` : ''}${
      filters.status ? `status=${filters.status}&` : ''
    }${filters.invoiceNo ? `invoiceNumber=${filters.invoiceNo}&` : ''}${
      filters.from ? `from=${filters.from}&` : ''
    }${filters.to ? `to=${filters.to}&` : ''}`

    const response = await axios.get(API.GET_INVOICES + query)

    setInvoices(response.data.data)
  }

  const clearFilters = () => {
    setCustomer(null)
    setSelectedStatus()
    setInvoiceNo('')
    setFrom('')
    setTo('')

    getInvoices()
  }

  useEffect(() => {
    getInvoices()
  }, [getInvoices])

  useEffect(() => {
    calculateStats()
  }, [calculateStats])

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <Layout>
      <CustomContainer otherStyles="p-4 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Invoices</h1>
          <Link to="/create-invoice">
            <CustomButton>Create an invoice</CustomButton>
          </Link>
        </div>

        <div className="border-slate-200 border-2 p-8 mt-8 rounded-lg flex flex-col lg:flex-row justify-evenly">
          <InvoicingStatCard
            title="Overdue"
            amount={'$' + overdue}
            postfix="USD"
          />
          <InvoicingStatCard
            title="Due within next 30 days"
            amount={'$' + 1100}
            postfix="USD"
          />
          <InvoicingStatCard
            title="Average time to get paid"
            amount={2}
            postfix="Days"
          />
          <InvoicingStatCard
            title="Upcoming Payout"
            amount={'$' + upcomingPayouts}
            postfix="USD"
          />
        </div>

        <div className="my-6 w-full flex items-center flex-col">
          <div className="space-x-2 flex w-full justify-start">
            <span className="font-bold">0</span>
            <span>active filters</span>
          </div>

          <div className="w-full flex flex-wrap">
            <CustomSelect
              label="All Customers"
              options={customers}
              showInput={false}
              setFunction={setCustomer}
              value={customer}
            />
            <CustomSelect
              label="All Status"
              showInput={false}
              value={selectedStatus}
              setFunction={setSelectedStatus}
              options={[
                { id: 1, name: 'Due' },
                { id: 2, name: 'Paid' },
              ]}
            />
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
            <CustomInput
              placeholder="Invoice #"
              type="text"
              onChange={(e) => setInvoiceNo(e.target.value)}
              value={invoiceNo}
            />
          </div>
          <div className="space-x-2">
            <CustomButton onClick={applyFilters}>Apply Filters</CustomButton>
            <CustomButton onClick={clearFilters}>Clear</CustomButton>
          </div>
        </div>
        {/* <div className="mb-10">
          <CustomBreadcumb filters={['Unpaid', 'Draft', 'All Invoices']} />
        </div> */}
        <CustomTable
          loading={loading}
          columns={invoicesColumns(deleteInvoice, getInvoices)}
          data={invoices}
        />
      </CustomContainer>
    </Layout>
  )
}
