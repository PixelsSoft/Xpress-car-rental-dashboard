import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import TransactionCard from '../../components/transaction-card.component'
import CustomButton from '../../components/custom-button.component'
import { Link } from 'react-router-dom'

export default function Transactions() {
    return (
        <Layout>
            <CustomContainer otherStyles='p-4 mt-4 flex flex-col lg:flex-row lg:justify-evenly'>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between items-center space-x-3'>
                            <img src={require('../../assets/icons/car-front.png')} alt='' />
                            <h1 className='font-bold text-md xl:text-2xl'>Transactions</h1>
                        </div>
                        <img src={require('../../assets/icons/candle.png')} alt='' />
                    </div>

                    <div className='mt-4 space-y-10'>
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                    </div>
                </div>


                <div className='w-full mt-10 xl:mt-0 xl:w-4/12'>
                    <div className='flex items-center justify-between w-full'>
                        <h3 className='font-bold text-md xl:text-2xl'>Added Cards</h3>
                        <Link to='/add-card'>
                            <CustomButton>Add New Card</CustomButton>
                        </Link>
                    </div>

                    <div className='mt-4'>
                        <img src={require('../../assets/images/card-saved.png')} alt="" />
                        <img src={require('../../assets/images/card-saved.png')} alt="" />
                    </div>
                </div>
            </CustomContainer>
        </Layout>
    )
}