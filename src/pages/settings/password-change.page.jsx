import CustomContainer from "../../components/custom-container.component";
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'

export default function PasswordChange() {
    return (
        <>
            <CustomContainer otherStyles='p-4'>
                <h1 className="font-bold text-sm lg:text-2xl text-black">Password Change</h1>

                <form className="flex flex-col mt-10 w-fit items-center">
                    <CustomInput />
                    <CustomInput />
                    <CustomInput />
                    <CustomButton>Update Password</CustomButton>
                </form>
            </CustomContainer>
        </>
    )
}