import React, {useEffect, useState} from 'react'
import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import {Link} from 'react-router-dom'
import CustomButton from '../../components/custom-button.component'
import {errorNotify} from "../../utils/success-notify.util";
import axios from "axios";
import API from "../../api/api";
import {recurringInvoices} from "../../config/columns";
import CustomTable from "../../components/custom-table/custom-table.component";

export default function RecurringInvoices() {
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    const getRecurringInvoices = async () => {
        try {
            setLoading(true)
            const response = await axios.get(API.GET_RECURRING_INVOICES)
            setInvoices(response.data.data || [])
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading((false))
            errorNotify(err.response?.data?.message || 'Something went wrong')
        }
    }
    useEffect(() => {
        getRecurringInvoices()
    }, [])
    return (
        <Layout>
            <CustomContainer otherStyles="p-4 mt-10">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Recurring Invoices</h1>
                    <Link to="/create-recurring-invoice">
                        <CustomButton>Create an invoice</CustomButton>
                    </Link>
                </div>

                <CustomTable columns={recurringInvoices()} data={invoices} loading={loading}/>

            </CustomContainer>
        </Layout>
    )
}
