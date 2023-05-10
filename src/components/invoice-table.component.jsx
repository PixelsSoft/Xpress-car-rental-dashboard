import React, { useState } from "react";
import Popup from 'reactjs-popup';
import './custom-modal/custom-modal.css'
import CustomInput from "./custom-input.component";
import CustomButton from "./custom-button.component";

const InvoiceTable = ({vehicles}) => {
  const [selectedCar, setSelectedCar] = useState()
  const [days, setDays] = useState(0)
  const [items, setItems] = useState([]);
  // const [total, setTotal] = useState(0);

  console.log('selected', selectedCar)

  const handleAddRow = () => {
    const id = items.length + 1;
    if(selectedCar.length < 1) return
    const newItems = [...items, { id, item: selectedCar, days: days, price: 0 }];
    setItems(newItems);
  };

  const handleDeleteRow = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

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

  // const calculateTotal = () => {
  //   const total = items.reduce((acc, item) => acc + item.amount, 0);
  //   setTotal(total);
  // };

  const onSelectChange = e => {
    setSelectedCar(e.target.value)
  }

  return (
    <>
      <div className="h-[250px] overflow-y-scroll border-2 border-slate-200">
        <table className="w-full">
          <thead className="bg-gray-300 sticky top-0">
            <tr>
              <th>Items</th>
              <th>Days</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-center p-2">
                <td>
                  {item.item}
                </td>
                <td>
                  {item.days}
                </td>
                <td>
                  4400$
                </td>
                <td>
                  {items.length > 0 && (
                    <button className="text-red-500" onClick={() => handleDeleteRow(item.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
            <tr className="flex justify-center mt-4">
              <Popup
                trigger={<button className="button bg-slate-300 rounded-lg text-sm px-2 shadow-md py-1">Add Item</button>}
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header">Create Invoice</div>
                    <div className="content">
                      <select value={selectedCar} onChange={onSelectChange} className="rounded-md outline-none border-2 bg-white border-[#FEBD20] my-4 mx-2 px-3 py-3 w-full xl:w-[300px] text-sm">
                        <option value="" selected hidden>Select Car</option>
                        {vehicles.map(vehicle => {
                
                          return (
                          <option value={vehicle.name}>{vehicle.name}</option>
                        )})}
                      </select>
                      <CustomInput placeholder='Days' type='number' onChange={(e) => setDays(e.target.value)} />
                      <span className="font-bold text-lg">Total: $4400</span>
                    </div>
                    <div className="actions">
                      <CustomButton onClick={() => handleAddRow()}>Submit</CustomButton>
                    </div>
                  </div>
                )}
              </Popup>

            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-end font-bold mt-4">Total: $4400</p>
    </>
  );
};

export default InvoiceTable;
