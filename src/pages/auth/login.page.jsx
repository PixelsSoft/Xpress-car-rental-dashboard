import YellowText from '../../components/YellowText.component'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../../components/custom-input.component'
import { useState } from 'react'
import API from '../../api/api'
import axios from 'axios'

export default function Login(props) {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submit = async () => {
        try {
            const { data } = await axios.post(API.LOGIN, {
                email, password
            })
            localStorage.setItem('@user_details', JSON.stringify({
                ...data.data
            }))

            navigation('/dashboard')

        } catch (err) {
            console.log(err)
            console.log(err.response.data)
        }
    }
    return (
        <div className='h-screen flex justify-center'>
            <div className='relative h-full hidden xl:flex lg:w-1/2 border-r-2 border-[#FEBD20]'>
                <div className='text-4xl pl-10 pt-10'>
                    <h3><YellowText>Welcome</YellowText> to the</h3>
                    <h3><YellowText>Xpress</YellowText> Rental Car <YellowText>Services</YellowText></h3>
                </div>

                <img src={require('../../assets/images/login.png')} alt='' className='absolute left-0 bottom-0' />
                <div className='absolute right-3 bottom-3 flex items-center space-x-4'>
                    <img src={require('../../assets/icons/facebook.png')} alt='' />
                    <img src={require('../../assets/icons/twitter.png')} alt='' />
                    <img src={require('../../assets/icons/linkedin.png')} alt='' />
                </div>
            </div>

            <div className='flex flex-col space-y-8 items-center justify-center lg:w-1/2 w-full p-4 lg:p-0'>
                <img src={require('../../assets/images/logo.png')} alt='' />
                <h3 className='font-bold text-4xl'>Login</h3>
                <CustomInput placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <CustomInput placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password' />

                <div className='flex justify-between w-full xl:w-1/2'>
                    <div className='flex items-center'>
                        <input type='checkbox' className='mr-2' />
                        <label>Remember Me</label>
                    </div>
                    <span>Forgot Password?</span>
                </div>
                <button onClick={submit} className='bg-[#5A5A5E] text-white py-4 px-6 w-[250px] rounded-lg text-2xl'> Login</button>
            </div>
        </div>
    )
}