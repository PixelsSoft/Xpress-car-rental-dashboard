import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'

export default function AddCard() {
    return (
        <Layout>
            <CustomContainer otherStyles='p-4 flex flex-col xl:flex-row justify-between'>
                <div className='xl:w-7/12 w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <img src={require('../../assets/icons/add-card-icon.png')} alt='' />
                            <h3>Add Card</h3>
                        </div>
                        <img src={require('../../assets/icons/candle.png')} alt='' />
                    </div>

                    <form className='mt-10'>
                        <CustomInput />
                        <CustomInput />
                        <CustomInput />
                        <CustomInput />
                        <CustomInput />

                        <div className='flex space-x-4 justify-end mt-20'>
                            <CustomButton>Cancel</CustomButton>
                            <CustomButton>Save</CustomButton>
                        </div>
                    </form>
                </div>

                <div className='xl:w-4/12 w-full mt-10 xl:mt-0'>
                    <div className='flex items-center justify-between '>
                        <h1 className='font-bold text-sm lg:text-lg'>Added Cards:</h1>
                        <CustomButton>Add New Card</CustomButton>
                    </div>

                    <div className='flex flex-col'>
                        <img src={require('../../assets/images/card-saved.png')} alt='' />
                        <img src={require('../../assets/images/card-saved.png')} alt='' />
                    </div>
                </div>
            </CustomContainer>
        </Layout>
    )
}