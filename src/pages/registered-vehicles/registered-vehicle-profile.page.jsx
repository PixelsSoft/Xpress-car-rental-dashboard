import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomButton from '../../components/custom-button.component'
import UserDetailBox from '../../components/user-detail-box.component'
import CustomTable from '../../components/custom-table/custom-table.component'

import {vehicleProfileColumns} from '../../config/columns'
import {vehicleProfile} from '../../config/table-data'

export default function RegisteredVehicleProfile() {
    return (
        <Layout>
            <CustomContainer>
                <div className="flex items-center justify-between mt-10 p-2">
                    <div className="flex items-center space-x-2">
                        <img src={require('../../assets/icons/user-tie.png')} className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]" alt='' />
                        <h1 className="font-bold text-sm md:text-lg lg:text-xl">Honda Corolla</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CustomButton>Delete Profile</CustomButton>
                        <CustomButton>Edit Profile</CustomButton>
                    </div>
                </div>


                <div className='flex items-center space-x-4'>
                    <img src={require('../../assets/images/toyota.png')}  alt='' width={365} height={190}/>
                    <img src={require('../../assets/images/toyota.png')}  alt='' width={365} height={190}/>
                </div>


                <div className='flex flex-wrap xl:flex-row xl:items-center mb-10'>
                    <UserDetailBox title='Vehicle Name' description='Honda Corolla' />
                    <UserDetailBox title='Vehcile ID' description='123' />
                    <UserDetailBox title='Vehcile Registration #' description='KCL-123' />
                    <UserDetailBox title='Vehicle Type' description='500cc' />
                    <UserDetailBox title='Renting Price/Day' description='$200/day' />
                    <UserDetailBox title='Vehicle Capacity' description='4' />
                </div>

                <CustomTable data={vehicleProfile}  columns={vehicleProfileColumns}/>
            </CustomContainer>
        </Layout>
    )
}