import React, {useCallback, useEffect, useState} from 'react'
import './custom-modal/custom-modal.css'

const InvoiceTable = ({
                          vehicles,
                          items = [],
                          setItems,
                          total,
                          setTotal,
                          notes,
                          setNotes,
                      }) => {
    const [addItemToggle, setAddItemToggle] = useState(false)
    const [openList, setOpenList] = useState(false)

    const handleAddRow = (selectedCar) => {
        const id = items.length + 1
        const newItems = [
            ...items,
            {
                id,
                item: selectedCar,
                price: selectedCar.price.pricePerDay,
                quantity: 1,
            },
        ]
        setItems(newItems)
        setAddItemToggle(false)
        setOpenList(false)
    }

    const handleDeleteRow = (id) => {
        const filteredItems = items.filter((item) => item.id !== id)
        setItems(filteredItems)
    }

    // const handleInputChange = (e, id) => {
    //   const { name, value } = e.target;
    //   const updatedItems = items.map((item) => {
    //     if (item.id === id) {
    //       return { ...item, [name]: value, amount: item.quantity * item.price };
    //     }
    //     return item;
    //   });
    //   setItems(updatedItems);
    // };

    const calculateTotal = useCallback(() => {
        const total = items.reduce((acc, item) => {
            if (item.quantity >= 7) {
                return acc + 300 * item.quantity
            }
            return acc + Number(item.price) * item.quantity
        }, 0)
        setTotal(total)
    }, [items, setTotal])

    useEffect(() => {
        calculateTotal()
    }, [calculateTotal])

    const handleChange = (e, carId, key) => {
        let updatedItems = items.map((item) => {
            if (item.id === carId) {
                return {...item, [key]: e.target.value}
            }
            return item
        })

        setItems(updatedItems)
    }
    return (
        <>
            <div
                className="overflow-y-scroll border-2 h-[400px] border-slate-200"
                onClick={() => {
                    openList && setOpenList(false)
                }}
            >
                <table className="w-full relative">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="w-6/12 py-2">Items</th>
                        <th className="w-1/12 py-2">Quantity</th>
                        <th className="w-1/12 py-2">Price</th>
                        <th className="w-1/12 py-2">Amount</th>
                        <th className="w-1/12"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item) => (
                        <tr key={item.id} className="border-b-2 border-slate-200">
                            <td className="p-2 text-sm font-medium lg:text-base text-start">
                                {item.item.name}
                            </td>
                            <td className="py-2 text-center text-sm lg:text-base">
                                <input
                                    value={item.quantity}
                                    className="text-end w-9/12 border-2 pr-2 border-slate-100 rounded-lg "
                                    onChange={(e) => handleChange(e, item.id, 'quantity')}
                                />
                            </td>
                            <td className="py-2 text-center text-sm lg:text-base">
                                <span>$</span>
                                <input
                                    value={item.price}
                                    onChange={(e) => handleChange(e, item.id, 'price')}
                                    className="text-end w-9/12 border-2 pr-2 border-slate-100 rounded-lg ml-1"
                                />
                            </td>
                            <td className="py-2 text-center text-sm lg:text-base">
                                {'$' + item.price}
                            </td>
                            <td className="py-4 flex justify-center items-center">
                                {items.length > 0 && (
                                    <img
                                        alt=""
                                        src={require('../assets/icons/delete.png')}
                                        className="text-red-500"
                                        onClick={() => handleDeleteRow(item.id)}
                                    ></img>
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr className="flex justify-center mt-4">
                        {addItemToggle ? (
                            <div className="w-full relative ml-4">
                                <div
                                    className="w-full p-2 rounded-lg bg-white border-2 border-[#FEBD20] cursor- flex items-center space-x-2"
                                    onClick={() => setOpenList(!openList)}
                                >
                                    <img
                                        alt=""
                                        src={require('../assets/icons/search.png')}
                                        width={20}
                                        height={20}
                                    />
                                    <input
                                        placeholder="Search Car..."
                                        className="w-full color-black outline-none"
                                    />
                                </div>

                                {openList && (
                                    <div
                                        className="shadow-md absolute w-full rounded-lg h-40 flex flex-col overflow-y-scroll scroll-smooth">
                                        {vehicles?.map((vehicle, idx) => (
                                            <div
                                                key={vehicle._id}
                                                onClick={() => handleAddRow(vehicle)}
                                                className={`flex p-2 hover:bg-slate-100 items-center justify-between ${
                                                    vehicles.length - 1 !== idx &&
                                                    'border-b-2 border-slate-200'
                                                }`}
                                            >
                                                <div className="flex flex-col text-xs lg:text-sm my-2">
                                                    <strong>{vehicle.name}</strong>
                                                    <span>{vehicle.type}</span>
                                                </div>
                                                <span className="text-sm xl:text-base font-bold">
                            {'$' + vehicle.price.pricePerDay}
                          </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setAddItemToggle(true)}
                                className={`button bg-slate-300 rounded-lg text-sm px-2 shadow-md py-1 ${
                                    addItemToggle && 'hidden'
                                }`}
                            >
                                Add Item
                            </button>
                        )}
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between">
        <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{resize: 'none', whiteSpace: 'pre-wrap'}}
            placeholder="Add notes or terms & conditions..."
            className="border-slate-200 rounded-md border-x-2 outline-none border-b-2 w-2/3 p-2"
        />
                <p className="text-end font-bold mt-4">Total: ${total}</p>
            </div>
        </>
    )
}

export default InvoiceTable
