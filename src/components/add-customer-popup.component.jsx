import { useRef, useState, useEffect } from "react"
import Popup from "reactjs-popup"
import { usersData } from '../config/table-data'
import CustomInput from "./custom-input.component"
import CustomButton from "./custom-button.component"

export default function AddCustomerPopup({ setCustomerEmail, setCustomerName }) {
    const [toggleSearch, setToggleSearch] = useState(false)
    const [showList, setShowList] = useState(false)

    const searchInputRef = useRef()
    const handleSelectUser = (user) => {
        setCustomerEmail(user.email)
        setCustomerName(user.name)
        setShowList(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [])

    const handleDocumentClick = (event) => {
        if (!searchInputRef.current?.contains(event.target)) {
            setShowList(false);
        }
    };

    return !toggleSearch ? (
        <div onClick={() => setToggleSearch(true)} className="flex flex-col items-center justify-center border-dotted cursor-pointer hover:border-solid w-[300px] border-gray-400 border-2 py-10 px-4 rounded-lg">
            <div className="flex items-center pb-4">
                <img src={require('../assets/icons/upload-pic.png')} alt='' width={50} height={50} />
                <span className="font-bold pl-2 w-fit text-sm">Add a customer</span>
            </div>
        </div>
    ) : (
        <div className="w-3/12 relative">
            <input ref={searchInputRef} placeholder='Search customer name...' className="outline-none border-[#FEBD20] border-2 rounded-lg p-2 text-sm w-full" onFocus={() => setShowList(true)} />
            {showList && (
                <div className="absolute z-10 w-full bg-white shadow-md">
                    <ul className="rounded-md overflow-y-scroll">
                        {usersData.map(user => (
                            <li onClick={() => handleSelectUser(user)} className="font-bold p-3 text-sm hover:bg-slate-200">{user.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            <Popup
                trigger={<button type='button' className="w-full rounded-lg mt-3 py-2 text-sm text-center border-t-2 border-slate-100 flex items-center justify-center bg-[#FEBD20] font-bold cursor-pointer hover:bg-black ease-in duration-150 hover:text-white">+ Create a new customer</button>}
                modal
            >
                {close => (
                    <div className="p-2">
                        <div className="flex justify-between border-b-2 border-slate-200 p-2">
                            <span className="text-gray-400">New Customer</span>
                            <span onClick={close} className="cursor-pointer">X</span>
                        </div>

                        <form className="w-full flex flex-col items-center">
                            <div className="space-y-4">
                                <CustomInput placeholder='Customer (Business or person)' />
                                <CustomInput placeholder='Email' />
                                <CustomInput placeholder='Phone #' />
                                <CustomInput placeholder='First Name' />
                                <CustomInput placeholder='Last Name' />
                            </div>
                            <div className="space-x-2 my-6 flex justify-end w-full">
                                <CustomButton onClick={close}>Cancel</CustomButton>
                                <CustomButton>Save</CustomButton>
                            </div>
                        </form>
                    </div>
                )}
            </Popup>
        </div>
    )
}