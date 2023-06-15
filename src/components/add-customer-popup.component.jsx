import {useEffect, useRef, useState} from 'react'
import Popup from 'reactjs-popup'
import CustomInput from './custom-input.component'
import CustomButton from './custom-button.component'
import axios from 'axios'
import API from '../api/api'
import {errorNotify, successNotify} from '../utils/success-notify.util'

export default function AddCustomerPopup({
                                             setCustomerEmail,
                                             setCustomerName,
                                             setCustomerId
                                         }) {
    const [toggleSearch, setToggleSearch] = useState(false)
    const [showList, setShowList] = useState(false)

    const [customers, setCustomers] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const [customer, setCustomer] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')

    const searchInputRef = useRef()
    const handleSelectUser = (user) => {
        setCustomerId(user._id)
        setCustomerEmail(user.email)
        setCustomerName(user.firstName + ' ' + user.lastName)
        setShowList(false)
    }

    const saveCustomer = async (e, close) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(API.CREATE_CUSTOMER, {
                customer,
                email,
                firstName,
                lastName,
                phone,
            })

            if (response.data.success) {
                successNotify('Customer added')

                setCustomer('')
                setEmail('')
                setFirstName('')
                setLastName('')
                setPhone('')
            }
            setLoading(false)
            close()
            getCustomers()
        } catch (err) {
            console.log(err)
            setLoading(false)
            errorNotify(err.response.data.message)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [])

    const getCustomers = async () => {
        try {
            const response = await axios.get(API.GET_CUSTOMERS)
            setCustomers(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCustomers()
    }, [])

    const handleDocumentClick = (event) => {
        if (!searchInputRef.current?.contains(event.target)) {
            setShowList(false)
        }
    }

    const renderCustomers = (user) => (
        <li
            onClick={() => handleSelectUser(user)}
            className="font-bold p-3 text-sm hover:bg-slate-200"
        >
            {user.firstName + ' ' + user.lastName}
        </li>
    )

    return !toggleSearch ? (
        <div
            onClick={() => setToggleSearch(true)}
            className="flex flex-col items-center justify-center border-dotted cursor-pointer hover:border-solid w-[300px] border-gray-400 border-2 py-10 px-4 rounded-lg"
        >
            <div className="flex items-center pb-4">
                <img
                    src={require('../assets/icons/upload-pic.png')}
                    alt=""
                    width={50}
                    height={50}
                />
                <span className="font-bold pl-2 w-fit text-sm">Add a customer</span>
            </div>
        </div>
    ) : (
        <div className="w-3/12 relative">
            <input
                ref={searchInputRef}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search customer name..."
                className="outline-none border-[#FEBD20] border-2 rounded-lg p-2 text-sm w-full"
                onFocus={() => setShowList(true)}
            />
            {showList && (
                <div className="absolute z-10 w-full bg-white shadow-md">
                    <ul className="rounded-md overflow-y-scroll h-64">
                        {search.length > 0
                            ? customers
                                .filter(
                                    (customer) =>
                                        customer.firstName
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        customer.lastName
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        (customer.firstName + ' ' + customer.lastName)
                                            .toLowerCase()
                                            .includes(search.toLowerCase()),
                                )
                                .map((user) => renderCustomers(user))
                            : customers.length > 0 &&
                            customers.map((user) => renderCustomers(user))}
                    </ul>
                </div>
            )}

            <Popup
                trigger={
                    <button
                        type="button"
                        className="w-full rounded-lg mt-3 py-2 text-sm text-center border-t-2 border-slate-100 flex items-center justify-center bg-[#FEBD20] font-bold cursor-pointer hover:bg-black ease-in duration-150 hover:text-white"
                    >
                        + Create a new customer
                    </button>
                }
                modal
                // contentStyle={{ width: 'fit-content' }}
                // className="w-fit-content"
            >
                {(close) => (
                    <div className="p-2">
                        <div className="flex justify-between border-b-2 border-slate-200 p-2">
                            <span className="font-bold text-lg">New Customer</span>
                            <span
                                onClick={close}
                                className="cursor-pointer font-bold text-lg"
                            >
                X
              </span>
                        </div>

                        <form
                            className="w-full items-center"
                            onSubmit={(e) => saveCustomer(e, close)}
                        >
                            <div className="w-full flex flex-col items-center">
                                <CustomInput
                                    full
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                    placeholder="Customer (Business or person)"
                                />
                                <CustomInput
                                    full
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <CustomInput
                                    full
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone #"
                                />
                                <CustomInput
                                    full
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                />
                                <CustomInput
                                    full
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="space-x-2 mt-6 flex justify-end w-full">
                                <CustomButton onClick={close}>Cancel</CustomButton>
                                <CustomButton loading={loading} type="submit">
                                    Save
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                )}
            </Popup>
        </div>
    )
}
