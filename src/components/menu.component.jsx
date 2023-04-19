import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const toggleUserMenu = () => setOpenUserMenu(!openUserMenu)
    return (
        <div className='w-[320px] h-screen fixed left-2 top-0 p-4'>
            <div className='bg-[#5A5A5E] rounded-2xl h-full flex p-3 flex-col justify-between items-center'>
                <img src={require('../assets/images/small-logo.png')} alt='' />

                <div className='flex flex-col justify-evenly h-4/6'>
                    <Link to='/dashboard'>
                        <div className='flex items-center space-x-3'>
                            <img src={require('../assets/icons/dashboard-icon.png')} alt='' />
                            <span className='font-bold text-white'>Dashboard</span>
                        </div>
                    </Link>

                    <Link to='/sales-and-payments'>
                        <div className='flex items-center space-x-3'>
                            <img src={require('../assets/icons/card-tick.png')} alt='' />
                            <span className='font-bold text-white'>Sales & Payments</span>
                        </div>
                    </Link>

                    <Link to='/users'>
                        <div className='flex flex-col'>
                            <div className='flex items-center space-x-3' id='userDropdown' data-dropdown-toggle='dropdown-user'>
                                <img src={require('../assets/icons/user-icon.png')} alt='' />
                                <span className='font-bold text-white' onClick={toggleUserMenu}>Users</span>
                            </div>

                            <ul className={`text-white ${openUserMenu ? 'flex' : 'hidden'} flex-col ml-5 mt-4 space-y-3`}>
                                <li>Users from web</li>
                                <li>Users from app</li>
                            </ul>
                        </div>
                    </Link>


                    <Link to='/rented-cars'>
                        <div className='flex items-center space-x-3'>
                            <img src={require('../assets/icons/car-icon.png')} alt='' />
                            <span className='font-bold text-white'>Rented Cars</span>
                        </div>
                    </Link>

                    <Link to='/settings'>
                        <div className='flex items-center space-x-3'>
                            <img src={require('../assets/icons/setting-icon.png')} alt='' />
                            <span className='font-bold text-white'>Settings</span>
                        </div>
                    </Link>
                </div>
                <img src={require('../assets/icons/logout-icon.png')} alt='' />
            </div>
        </div>
    )
}