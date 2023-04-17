import YellowText from '../../components/YellowText.component'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='h-screen flex'>
            <div className='relative h-full w-1/2 border-r-2 border-[#FEBD20]'>
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

            <div className='flex flex-col space-y-8 items-center justify-center w-1/2'>
                <img src={require('../../assets/images/logo.png')} alt='' />
                <h3 className='font-bold text-4xl'>Login</h3>
                <input placeholder='Username' className='rounded-md ring-1 ring-[#FEBD20] px-6 py-4 w-1/2' />
                <input placeholder='Password' className='rounded-md ring-1 ring-[#FEBD20] px-6 py-4 w-1/2' />

                <div className='flex justify-between w-1/2'>
                    <div className='flex items-center'>
                        <input type='checkbox' className='mr-2' />
                        <label>Remember Me</label>
                    </div>
                    <span>Forgot Password?</span>
                </div>

                <Link to='#'>
                    <button className='bg-[#5A5A5E] text-white py-4 px-6 w-2/4 rounded-lg text-2xl'> Login</button>
                </Link>
            </div>
        </div>
    )
}