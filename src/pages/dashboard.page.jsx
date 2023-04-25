import Layout from '../components/layout.component'
import StatCard from '../components/stat-card.component'
import CustomContainer from '../components/custom-container.component'
import BarChart from '../components/line-chart.component'
import CustomTable from '../components/custom-table/custom-table.component'
import { rentedVehicleInfoTableColumns } from '../config/columns'
import { rentedVehicleInfoData } from '../config/table-data'
import RentRequestCard from '../components/renting-request-card.component'

export default function Dashboard() {
    return (
        <Layout>

            <CustomContainer otherStyles='lg:grid lg:grid-cols-4 mt-6 lg:divide-x'>
                <StatCard  title='Cars On Rent' img={require('../assets/images/car-rent.png')} stat={20}/>
                <StatCard  title='Total Amount' img={require('../assets/icons/edit.png')} stat={'$' + 202323}/>
                <StatCard  title='Registered Cars' img={require('../assets/icons/car-rental.png')} stat={53}/>
                <StatCard  title='Pending Amount' img={require('../assets/icons/payment.png')} stat={'$' + 3233}/>
                
            </CustomContainer>

            <CustomContainer otherStyles='mt-10 w-full p-4' >
                <h2 className='font-bold text-3xl'>Dashboard</h2>
                <div className='w-full flex flex-row justify-evenly items-center'>
                    <div className='p-4 w-3/12 flex-col space-y-4 hidden xl:flex'>
                        <h3 className='font-bold text-2xl text-center'>Connect Your Bank Account Or Credit Card</h3>
                        <p className='text-xl text-center'>Automate your bookkeeping by importing transactions automatically</p>
                        <button className='p-3 rounded-xl font-bold bg-[#FEBD20]'>Connect my account</button>
                    </div>
                    <BarChart />
                </div>
            </CustomContainer>

            <CustomContainer otherStyles='mt-10 p-4 w-full flex flex-col xl:flex-row space-x-2'>
                <div className='w-full xl:w-8/12'>
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

                <div className='w-full xl:w-4/12 bg-white p-3 mt-10 xl:mt-0'>
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
                </div>
            </CustomContainer>
        </Layout>
    )
}