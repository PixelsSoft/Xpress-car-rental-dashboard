import CustomButton from "../../../components/custom-button.component";
import CustomContainer from "../../../components/custom-container.component";
import Layout from "../../../components/layout.component";
import InvoicingStatCard from '../../../components/invoicing-stat-card.component';
import CustomInput from "../../../components/custom-input.component";
import CustomTable from "../../../components/custom-table/custom-table.component";
import { invoicesColumns } from '../../../config/columns'
import CustomBreadcumb from '../../../components/custom-breadcumb.component'
import { Link } from "react-router-dom";
import axios from "axios";
import API from '../../../api/api'
import { useEffect, useState } from "react";

export default function Invoicing() {
    const [invoices, setInvoices] = useState([])
    const [overdue, setOverdue] = useState(0)
    // const [dueWithin30Days, setDueWithin30Days] = useState(0)
    // const [averageTimeToGetPaid, setAverageTimeToGetPaid] = useState(0)
    const [upcomingPayouts, setUpcomingPayouts] = useState(0)

    const calculateStats = () => {
        setOverdue(invoices.reduce((acc, invoice) => {
            if(invoice.status === 'overdue') {
                return acc + invoice.total
            }
            return 0
        }, 0))

        setUpcomingPayouts(invoices.reduce((acc, invoice) => acc + invoice.total, 0))
    }
    

    const getInvoices = async () => {
        try {
            const response = await axios.get(API.GET_INVOICES)
            setInvoices(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getInvoices()
        calculateStats()
    }, [])
    return (
        <Layout>
            <CustomContainer otherStyles='p-4 mt-10'>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Invoices</h1>
                    <Link to='/create-invoice'>
                        <CustomButton>Create an invoice</CustomButton>
                    </Link>
                </div>

                <div className="border-slate-200 border-2 p-8 mt-8 rounded-lg flex flex-col lg:flex-row justify-evenly">
                    <InvoicingStatCard title='Overdue' amount={'$' + overdue} postfix='USD' />
                    <InvoicingStatCard title='Due within next 30 days' amount={'$' + 1100} postfix='USD' />
                    <InvoicingStatCard title='Average time to get paid' amount={2} postfix='Days' />
                    <InvoicingStatCard title='Upcoming Payout' amount={'$' + upcomingPayouts} postfix='USD' />
                </div>

                <div className="my-4 w-full">
                    <div className="space-x-2">
                        <span className="font-bold">0</span>
                        <span>active filters</span>
                    </div>

                    <div className="w-full flex flex-wrap">
                        <CustomInput placeholder='All Customers' />
                        <CustomInput placeholder='All Statuses' />
                        <CustomInput placeholder='From' />
                        <CustomInput placeholder='To' />
                        <CustomInput placeholder='Enter Invoice #' />
                    </div>
                </div>
                <div className="mb-10">
                    <CustomBreadcumb filters={['Unpaid', 'Draft', 'All Invoices']} />
                </div>
                <CustomTable columns={invoicesColumns} data={invoices} />
            </CustomContainer>
        </Layout>
    )
}