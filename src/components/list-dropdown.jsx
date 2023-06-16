import { useEffect, useRef, useState } from 'react'

export default function ListDropdown({
  placeholder,
  list,
  selectedValue,
  setSelectedValue,
  showSearch = true,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  //   const [selectedValue, setSelectedValue] = useState('')

  const selectRef = useRef()

  const handleSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  const renderList = () => {
    if (search.length > 0) {
      return list
        .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
        .map((item) => <ListItem item={item} />)
    }

    return list.map((item) => <ListItem item={item} />)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const ListItem = ({ item }) => (
    <div
      className="p-2 cursor-pointer hover:bg-slate-200"
      onClick={() => handleSelect(item)}
    >
      <span className="text-sm">{item}</span>
    </div>
  )

  return (
    <div
      ref={selectRef}
      className="border-2 border-[#FEBD20] flex items-center justify-between p-3 relative w-[300px] rounded-lg"
    >
      <button
        type="button"
        className="w-full text-start text-sm text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
      </button>
      <svg
        className={`w-5 h-5 ml-2 absolute right-2 transition-transform ${
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
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-md top-12 w-full left-0 p-2">
          {showSearch && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendor by name"
              className="w-full outline-none border-blue-200 text-sm border-2 p-2 rounded-lg"
            />
          )}
          <div className="h-auto max-h-40 overflow-y-scroll">
            {renderList()}
          </div>
        </div>
      )}
    </div>
  )
}
