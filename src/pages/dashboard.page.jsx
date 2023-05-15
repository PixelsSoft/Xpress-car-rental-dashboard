import Layout from '../components/layout.component'
import StatCard from '../components/stat-card.component'
import CustomContainer from '../components/custom-container.component'
import BarChart from '../components/line-chart.component'
import CustomTable from '../components/custom-table/custom-table.component'
import { rentedVehicleInfoTableColumns } from '../config/columns'
import { rentedVehicleInfoData } from '../config/table-data'
// import RentRequestCard from '../components/renting-request-card.component'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../api/api'
import { errorNotify } from '../utils/success-notify.util'

export default function Dashboard() {
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalCars, setTotalCars] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getTotalAmount = async() => {
            try {
                setLoading(true)
                const response = await axios.get(API.GET_INVOICE_TOTAL)
                setTotalAmount(response.data.data)
                setLoading(false)
            } catch (err) {
                errorNotify(err.response.data.message)
                setLoading(false)
            }
        }

        const getTotalCars = async () => {
            
            try {
                setLoading(true)
                const response = await axios.get(API.GET_TOTAL_VEHICLES_COUNT)
                setTotalCars(response.data.data)
                setLoading(false)
            } catch (err) {
                errorNotify(err.response.data.message)
                setLoading(false)
            }
        }

        const getTotalExpenseAmount = async() => {
            try {
                setLoading(true)
                const response = await axios.get(API.GET_EXPENSES_TOTAL)
                setTotalExpense(response.data.data)
                setLoading(false)
            } catch (err) {
                errorNotify(err.response.data.message)
                setLoading(false)
            }
        } 
        getTotalAmount()
        getTotalCars()
        getTotalExpenseAmount()
    }, [])
    return (
        <Layout>
            <CustomContainer otherStyles='lg:grid lg:grid-cols-4 mt-6 lg:divide-x'>
                <StatCard  title='Cars On Rent' img={require('../assets/images/car-rent.png')} stat={20}/>
                <StatCard  title='Total Amount' img={require('../assets/icons/edit.png')} stat={'$' + totalAmount} loading={loading}/>
                <StatCard  title='Registered Cars' img={require('../assets/icons/car-rental.png')} stat={totalCars} loading={loading}/>
                <StatCard  title='Total Expenses' img={require('../assets/icons/payment.png')} stat={'$' + totalExpense} loading={loading}/>
                
            </CustomContainer>

            <CustomContainer otherStyles='mt-10 w-full p-4' >
                <h2 className='font-bold text-3xl'>Dashboard</h2>
                <div className='w-full flex flex-row justify-evenly items-center'>
                    <BarChart />
                </div>
            </CustomContainer>

            <CustomContainer otherStyles='mt-10 p-4 w-full flex flex-col xl:flex-row space-x-2'>
                <div className='w-full'>
                    <div className='flex items-center w-full justify-between'>
                        <div className='flex items-center space-x-3'>
                            <img src={require('../assets/icons/car-side-icon.png')} alt='' />
                            <h3 className='font-bold text-lg'>Rented Vehicle Info</h3>
                        </div>
                        <span className='bg-[#FEBD20] opacity-60 p-2 rounded-lg'>20</span>
                    </div>

                    <div className='mt-4 flex space-x-3'>
                        <CustomTable columns={rentedVehicleInfoTableColumns} data={rentedVehicleInfoData} perPage={5} />
                    </div>
                </div>

                {/* <div className='w-full xl:w-4/12 bg-white p-3 mt-10 xl:mt-0'>
                    <div className='flex items-center mb-4 justify-between'>
                        <div className='flex items-center'>
                            <img src={require('../assets/icons/car-front.png')} alt='' />
                            <h3 className='ml-3 font-bold'>Renting Request</h3>
                        </div>
                        <span className='bg-[#FEBD20] opacity-80 p-2 rounded-lg'>20</span>
                    </div>
                    <RentRequestCard />
                    <RentRequestCard />
                    <RentRequestCard />
                </div> */}
            </CustomContainer>
        </Layout>
    )
}