import CustomContainer from "../../components/custom-container.component";
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import axios from "axios";
import { useEffect, useState } from "react";
import { errorNotify, successNotify } from "../../utils/success-notify.util";
import API from "../../api/api";
import Spinner from "../../components/spinner.component";

export default function PasswordChange() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const token = JSON.parse(localStorage.getItem('@user_details')).token

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(API.GET_USER_DETAILS, {
                    headers: {
                        Authorization: token
                    }
                })
                setFullName(response.data.data.fullName)
                setEmail(response.data.data.email)
                setLoading(false)
            } catch (err) {
                console.log(err)
                errorNotify(err.response.data.message)
                setLoading(false)
            }
        }

        getUserDetails()
    }, [])

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

    const editProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(API.EDIT_PROFILE, { fullName, email }, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response.data)
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
                    {loading ? (<Spinner />) : (
                        <>
                            <form className="flex flex-col mt-10 w-full">
                                <CustomInput placeholder='Name' value={fullName} onChange={e => setFullName(e.target.value)} />
                                <CustomInput placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                                <CustomButton onClick={editProfile}>Save Changes</CustomButton>
                            </form>
                            <form className="flex flex-col mt-10 w-full">
                                <CustomInput placeholder='New Password' onChange={e => setPassword(e.target.value)} />
                                <CustomInput placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} />
                                <CustomButton onClick={changeUserPassword}>Change Password</CustomButton>
                            </form>
                        </>
                    )}
                </div >
            </CustomContainer >
        </>
    )
}