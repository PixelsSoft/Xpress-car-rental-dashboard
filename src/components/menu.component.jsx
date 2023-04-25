import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FaBars } from 'react-icons/fa'

export default function Menu() {
    const [openMenu, setOpenMenu] = useState(false)

    const [userSubMenuOpen, setUserSubMenuOpen] = useState(false)
    const [salesAndPaymentsSubMenu, setSalesAndPaymentsSubMenu] = useState(false)

    const menus = [
        { title: 'Dashboard', icon: require('../assets/icons/dashboard-icon.png'), to: '/dashboard' },
        {
            title: 'Sales & Payments',
            icon: require('../assets/icons/card-tick.png'),
            to: '#',
            subMenu: true,
            subMenuItems: [
                { title: 'Invoicing', to: '/invoicing' },
                { title: 'Payments' },
            ]
        },
        {
            title: 'User',
            icon: require('../assets/icons/user-icon.png'),
            to: '/users',
            subMenu: true,
            subMenuItems: [
                { title: 'Users from Website' },
                { title: 'Users from App' }
            ]
        },
        { title: 'Registered Vehicles', icon: require('../assets/icons/car-icon.png'), to: '/registered-vehicles' },
        { title: 'Settings', icon: require('../assets/icons/setting-icon.png'), to: '/settings' },
        { title: 'Transactions', icon: require('../assets/icons/card-tick.png'), to: '/transactions' }
    ]

    const toggleMenu = () => setOpenMenu(!openMenu)

    return (
        <>
            <div className={`shadow-md ${openMenu && 'hidden'} w-fit h-fit fixed p-3 m-4 rounded-full bg-[#FEBD20] md:hidden flex z-50`}>
                <FaBars size={40} color='black' onClick={toggleMenu} />
            </div>
            <div className={`w-[320px] ${!openMenu && 'hidden'} md:flex h-screen fixed md:left-2 md:top-0 md:p-4 z-10`}>

                <div className='absolute right-3 top-2'>
                    <span className='text-3xl text-white md:hidden' onClick={toggleMenu}>X</span>
                </div>
                <div className={`bg-[#5A5A5E] ${!openMenu ? 'hidden' : 'flex'} md:rounded-2xl h-full md:flex p-3 flex-col items-center justify-between`}>
                    <img src={require('../assets/images/small-logo.png')} alt='' />

                    <ul className='w-full h-2/3 flex flex-col justify-evenly'>
                        {menus.map((menu, index) => (
                            <>
                                <li key={index} className='text-sm flex items-center gap-x-4 cursor-pointer p-2'>
                                    <span className='w-[24px] h-[24px] block float-left'>
                                        <img src={menu.icon} alt='' />
                                    </span>
                                    <Link to={menu.to}>
                                        <span className={`text-base font-medium text-white flex-1`}>
                                            {menu.title}
                                        </span>
                                    </Link>

                                    {menu.subMenu && (
                                        <MdKeyboardArrowDown size={30} color='#fff' onClick={() => {
                                            if (menu.title === 'User') return setUserSubMenuOpen(!userSubMenuOpen)
                                            if (menu.title === 'Sales & Payments') return setSalesAndPaymentsSubMenu(!salesAndPaymentsSubMenu)
                                        }} />
                                    )}
                                </li>
                                {menu.subMenu && userSubMenuOpen && (
                                    <ul>
                                        {menu.title === 'User' && menu.subMenuItems.map((subMenuItem, index) => (
                                            <li className='text-sm font-semibold border-l-2 border-gray-300 text-white flex items-center gap-x-4 cursor-pointer p-2 px-5'>
                                                {subMenuItem.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {menu.subMenu && salesAndPaymentsSubMenu && (
                                    <ul>
                                        {menu.title === 'Sales & Payments' && menu.subMenuItems.map((subMenuItem, index) => (
                                            <Link to={subMenuItem.to}>
                                                <li className='text-sm font-semibold border-l-2 border-gray-300 text-white flex items-center gap-x-4 cursor-pointer p-2 px-5'>
                                                    {subMenuItem.title}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ))}
                    </ul>
                    <img src={require('../assets/icons/logout-icon.png')} alt='' />
                </div>
            </div>
        </>
    )
}