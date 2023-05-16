import CustomContainer from "../../components/custom-container.component";
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import axios from "axios";
import { useEffect, useState } from "react";
import { errorNotify, successNotify } from "../../utils/success-notify.util";
import API from "../../api/api";

export default function PasswordChange() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState('')


    useEffect(() => {

        const storedUserDetails = localStorage.getItem('@user_details');
        if (storedUserDetails) {
            const jwt = JSON.parse(storedUserDetails).token;
            setToken(jwt);
        }

    }, [token])

    console.log('hello')

    const changeUserPassword = async (e) => {
        e.preventDefault()
        try {
            if (password.length < 1 || confirmPassword.length < 1) return errorNotify('Password and confirm password are required')
            if (password !== confirmPassword) return errorNotify('Passwords do not match')

            const response = await axios.put(API.CHANGE_PASSWORD, { password }, {
                headers: {
                    Authorization: token
                }
            })
            successNotify(response.data.message)
        } catch (err) {
            console.log(err)
            errorNotify(err.response.data.message)
        }
    }
    return (
        <>
            <CustomContainer otherStyles='p-4 h-full'>
                <h1 className="font-bold text-sm lg:text-2xl text-black">Password Change</h1>
                <div className="flex h-full">
                    <form className="flex flex-col mt-10 w-full">
                        <CustomInput placeholder='New Password' onChange={e => setPassword(e.target.value)} />
                        <CustomInput placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} />
                        <CustomButton onClick={changeUserPassword}>Change Password</CustomButton>
                    </form>
                </div >
            </CustomContainer >
        </>
    )
}