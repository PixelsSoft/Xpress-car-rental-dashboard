import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Menu() {
    const [userSubMenuOpen, setUserSubMenuOpen] = useState(false)

    const [salesAndPaymentsSubMenu, setSalesAndPaymentsSubMenu] = useState(false)

    const menus = [
        { title: 'Dashboard', icon: require('../assets/icons/dashboard-icon.png'), to: '/dashboard' },
        {
            title: 'Sales & Payments',
            icon: require('../assets/icons/card-tick.png'),
            to: '/sales-and-payments',
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

    return (
        <div className='w-[320px] h-screen fixed left-2 top-0 p-4'>
            <div className='bg-[#5A5A5E] rounded-2xl h-full flex p-3 flex-col items-center justify-between'>
                <img src={require('../assets/images/small-logo.png')} alt='' />

                <ul className='w-full h-2/3 flex flex-col justify-evenly'>
                    {menus.map((menu, index) => (
                        <>
                            <li key={index} className='text-sm flex items-center gap-x-4 cursor-pointer p-2'>
                                <span className='text-2xl block float-left'>
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
    )
}