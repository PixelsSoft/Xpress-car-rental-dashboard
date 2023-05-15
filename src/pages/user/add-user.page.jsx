import CustomContainer from "../../components/custom-container.component";
import Layout from "../../components/layout.component";
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import { useNavigate } from "react-router-dom";

export default function AddUser() {
    const navigate = useNavigate()
    const onCancel = (e) => {
        e.preventDefault()
        navigate('/users')
    }
    return (
        <Layout>
            <div className="flex items-center p-3 mt-10">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center mb-4 space-x-2 mr-10 font-bold text-lg">
                        <img src={require('../../assets/icons/user-tie.png')} alt="" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
                        <span className="text-md">Add User</span>
                    </div>
                </div>
            </div>
            <CustomContainer otherStyles='p-4'>
                <form>
                    <div className="flex flex-wrap">
                        <CustomInput placeholder='Full Name' />
                        <CustomInput placeholder='Email' />
                        <CustomInput placeholder='Contact' />
                        <CustomInput placeholder='Address' />
                        <CustomInput placeholder='Register Date' />
                    </div>
                    <div className="space-x-3 mt-4">
                        <CustomButton onClick={onCancel}>Cancel</CustomButton>
                        <CustomButton>Add</CustomButton>
                    </div>
                </form>
            </CustomContainer>
        </Layout>
    )
}