import React, { useState, useEffect, useRef } from 'react'

const CustomSelect = ({
  full,
  label,
  options = [],
  addInputText,
  value,
  setFunction,
  addInputValue,
  addInputSubmitHandler,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openAddInput, setOpenAddInput] = useState(false)
  const selectRef = useRef()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
        setOpenAddInput(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const addInput = () => setOpenAddInput(true)

  const toggleSelect = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setFunction(option)
    setIsOpen(false)
  }

  return (
    <div
      ref={selectRef}
      className={`relative flex flex-col w-full ${
        full ? 'w-full' : 'xl:w-[290px]'
      } my-4 mx-2`}
    >
      <button
        onClick={toggleSelect}
        className="bg-slate-50 border-b-2 text-gray-900 border-[#FEBD20] text-md px-2.5 py-3 w-full flex items-center justify-between"
      >
        {value ? value.name : label}
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute top-10 z-20 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-sm">
          {options?.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option.name}
            </li>
          ))}
          {openAddInput ? (
            <div className="flex border-2 bg-white justify-between border-slate-300 items-center">
              <input
                value={addInputValue}
                onChange={onChange}
                className=" bg-white rounded-lg p-2 outline-none"
              />
              <button
                onClick={addInputSubmitHandler}
                className="bg-black p-2 text-white text-xl cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <li
              onClick={addInput}
              className="font-bold bg-white p-2 border-1 border-black cursor-pointer hover:bg-black hover:text-white"
            >
              + {addInputText}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
