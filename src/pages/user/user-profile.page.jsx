import Layout from "../../components/layout.component";
import CustomContainer from '../../components/custom-container.component';
import CustomButton from '../../components/custom-button.component';
import UserDetailBox from '../../components/user-detail-box.component'

export default function UserProfile() {
    return (
        <Layout>
            <CustomContainer>
                <div className="flex items-center justify-between mt-10 p-2">
                    <div className="flex items-center space-x-2">
                        <img src={require('../../assets/icons/user-tie.png')} className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]" alt='' />
                        <h1 className="font-bold text-sm md:text-lg lg:text-xl">Registered Users</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CustomButton>Delete Profile</CustomButton>
                        <CustomButton>De-activated Profile</CustomButton>
                    </div>
                </div>

                <div className="flex w-full mt-4 items-center justify-center p-3 flex-col lg:flex-row">
                    <div className="flex flex-wrap w-full lg:w-3/4">
                        <UserDetailBox title='Name' description='Martha Smith' />
                        <UserDetailBox title='User ID' description='123' />
                        <UserDetailBox title='Contact' description='0341 3397700' />
                        <UserDetailBox title='National ID Card No' description='KCT 1234-123213' />
                        <UserDetailBox title='Address' description='Licoln Street H no# 123B LA, USA' />
                        <UserDetailBox title='Payment Method' description='VISA' />
                        <UserDetailBox title='Registration Date' description='31/03/2022' />
                        <UserDetailBox title='Status' description='Active' />
                    </div>

                    <img src={require('../../assets/images/user-profile-picture.png')}  alt=""/>
                </div>
            </CustomContainer>
        </Layout>
    )
}