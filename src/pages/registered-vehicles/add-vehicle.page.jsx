import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import RecentlyAddedVehicleCard from '../../components/recently-added-vehicle-card.component'

export default function AddVehicle() {
    return (
        <Layout>
            <CustomContainer otherStyles='p-6 flex'>
                <div>
                    <div className='flex items-center space-x-3'>
                        <img src={require('../../assets/icons/car-front.png')} alt='' />
                        <h1 className='font-bold text-2xl'>Add New Vehicle</h1>
                    </div>

                    <form className='w-full mt-6'>
                        <div className='flex w-full flex-wrap'>
                            <CustomInput />
                            <CustomInput />
                            <CustomInput />
                            <CustomInput />
                            <CustomInput />
                        </div>
                        <div className='border-2 border-[#FEBD20] w-fit flex flex-col items-center p-3 ml-4 mt-4 rounded-lg'>
                            <img src={require('../../assets/icons/camera.png')} alt='' />
                            <span className='font-bold'>Add Vehicle Image</span>
                        </div>

                        <div className='flex space-x-3 ml-4 mt-10'>
                            <CustomButton>Cancel</CustomButton>
                            <CustomButton>Add Vehicle</CustomButton>
                        </div>
                    </form>
                </div>
                <div className='border-l-2 h-[550px] border-gray-300 pl-4 overflow-scroll'>
                    <h1 className='font-bold text-2xl'>Recently Added</h1>
                    <RecentlyAddedVehicleCard />
                    <RecentlyAddedVehicleCard />
                    <RecentlyAddedVehicleCard />
                    <RecentlyAddedVehicleCard />
                </div>
            </CustomContainer>
        </Layout>
    )
}