import { Link } from "react-router-dom"
import { CustomIndexCell } from "../pages/registered-vehicles/rengistered-vehicles.page"
import Popup from "reactjs-popup"
import CustomButton from "../components/custom-button.component"
import CustomInput from "../components/custom-input.component"
import CustomTextArea from '../components/custom-text-area.component'
import '../components/custom-modal/custom-modal.component'

export const rentedVehicleInfoTableColumns = [
    {
        name: 'Sno',
        selector: row => row.sno
    },
    {
        name: 'User ID',
        selector: row => row.userId
    },
    {
        name: 'Name',
        selector: row => row.name
    },
    {
        name: 'User Contact',
        selector: row => row.contact
    },
    {
        name: 'Vehicle ID',
        selector: row => row.vehicleId
    },
    {
        name: 'Payment Status',
        selector: row => row.paymentStatus,
        conditionalCellStyles: [
            {
                when: row => row.paymentStatus === 'Paid',
                style: {
                    color: 'green'
                }
            },
            {
                when: row => row.paymentStatus === 'Pending',
                style: {
                    color: 'red'
                }
            }
        ]
    },
]

export const expensesColumns = (handleDelete, handleUpdate, title, setTitle, description, setDescription, amount, setAmount, type, setType) => ([
    {
        name: 'Sno',
        selector: (row, idx) => <CustomIndexCell rowIndex={idx} />,
        width: '80px'
    },
    {
        name: 'Expense ID',
        selector: row => row._id
    },
    {
        name: 'Title',
        selector: row => row.title
    },
    {
        name: 'Type',
        selector: row => row.type
    },
    {
        name: 'Amount',
        selector: row => '$' + row.amount
    },
    {
        name: 'Date',
        selector: row => row.date
    },
    {
        name: 'Actions',
        selector: row => row._id,
        cell: row => (
            <div className="flex">
                <Popup trigger={<img src={require('../assets/icons/open.png')} alt='' className="cursor-pointer" />} modal closeOnDocumentClick>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">Expense # {row._id}</div>
                            <div className="content">
                                <div className="w-full flex flex-col p-3">
                                    <span><strong>ID: </strong>{row._id}</span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-md"><strong>Date: </strong>{row.date}</span>
                                        <strong className="text-lg">{row.title}</strong>
                                        <span className="text-md"><strong>Type: </strong>{row.type}</span>
                                    </div>
                                </div>
                                <div className="w-full mt-5 p-3">
                                    <strong>Description</strong>
                                    <div className="w-full border-b-2 my-2 border-slate-200" />
                                    <div className="flex w-full justify-between items-center">
                                        <p className="w-1/2 text-md break-words">{row.description}</p>
                                        <span>Total: <strong>${row.amount}</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="actions flex justify-evenly">
                                <CustomButton onClick={close}>Close</CustomButton>
                            </div>
                        </div>
                    )}
                </Popup>

                <Popup onOpen={() => {
                    setTitle(row.title)
                    setDescription(row.description)
                    setAmount(row.amount)
                    setType(row.type)
                }} trigger={<img src={require('../assets/icons/edit-2.png')} alt='' className="cursor-pointer mx-3" />} modal closeOnDocumentClick>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header">Expense # {row._id}</div>
                            <div className="content flex flex-col">
                                <CustomInput placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                                <CustomInput placeholder='Type' value={type} onChange={e => setType(e.target.value)} />
                                <CustomTextArea rows={7} placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                                <CustomInput placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />
                            </div>
                            <div className="actions flex justify-evenly">
                                <CustomButton onClick={() => handleUpdate(row._id)}>Save Changes</CustomButton>
                            </div>
                        </div>
                    )}
                </Popup>
                <img src={require('../assets/icons/delete.png')} alt='' className="cursor-pointer" onClick={() => handleDelete(row._id)} />
            </div>
        )
    }
])

export const usersColumn = [
    {
        name: 'Sno',
        selector: (row, idx) => <CustomIndexCell rowIndex={idx} />,
        width: '80px'
    },
    {
        name: 'User ID',
        selector: row => row._id
    },
    {
        name: 'Name',
        // selector: row => row.name,
        cell: row => <Link to={`/user-profile/${row._id}`}>{row.firstName + ' ' + row.lastName}</Link>
    },
    {
        name: 'Contact',
        selector: row => row.phone
    },
    {
        name: 'Email',
        selector: row => row.email
    }
    // {
    //     name: 'Payment Method',
    //     cell: row => <img src={row.paymentMethod} alt='' />
    // },
]

export const registeredVehiclesColumns = (handleDelete) => ([
    {
        name: 'Sno',
        selector: (row, idx) => <CustomIndexCell rowIndex={idx} />
    },
    {
        name: 'Vehicle ID',
        selector: (row) => row._id
    },
    {
        name: 'Vehicle Name',
        cell: row => <Link to={`/vehicle-profile/${row._id}`}>{row.name}</Link>
    },
    {
        name: 'Vehicle Registration',
        selector: (row) => row.registrationNo
    },
    {
        name: 'Vehicle Type',
        selector: (row) => row.type
    },
    {
        name: 'Vehicle Capacity',
        selector: (row) => row.capacity
    },
    {
        name: 'Renting Price / Day',
        selector: (row) => row.price.pricePerDay
    },
    {
        name: 'Actions',
        selector: row => row._id,
        cell: row => (
            <div className="flex">
                <Link to={`/vehicle-profile/${row._id}`}>
                    <img src={require('../assets/icons/open.png')} alt='' className="cursor-pointer mr-2" />
                </Link>
                {/* <img src={require('../assets/icons/edit-2.png')} alt='' className="mx-3 cursor-pointer" /> */}
                <img src={require('../assets/icons/delete.png')} alt='' className="cursor-pointer" onClick={() => handleDelete(row._id)} />
            </div>
        )
    },
])

export const createInvoiceColumn = [
    {
        name: 'Items',
        selector: row => row.items,
        cell: row => <div>{row.name}</div>
    },
    {
        name: 'quantity',
        selector: row => row.quantity,
    }

]

export const invoicesColumns = (handleDelete) => ([
    {
        name: 'Status',
        selector: row => row.status,
        conditionalCellStyles: [
            {
                when: row => row.status === 'overdue',
                style: {
                    fontWeight: 'bold',
                    color: 'red'
                }
            },
            {
                when: row => row.status === 'paid',
                style: {
                    fontWeight: 'bold',
                    color: 'green'
                }
            },
            {
                when: row => row.status === 'due',
                style: {
                    fontWeight: 'bold',
                    color: 'blue'
                }
            },
        ]
    },
    {
        name: 'Due',
        selector: row => row.dueDate
    },
    {
        name: 'Date',
        selector: row => row.invoiceDate
    },
    {
        name: 'Number',
        selector: row => row.invoiceNo
    },
    {
        name: 'Customer',
        selector: row => row.customerName
    },
    {
        name: 'Amount',
        selector: row => '$' + row.total
    },
    {
        name: 'Actions',
        selector: row => row._id,
        cell: row => (
            <div className="flex">
                <img src={require('../assets/icons/open.png')} alt='' className="cursor-pointer" />
                <img src={require('../assets/icons/edit-2.png')} alt='' className="mx-3 cursor-pointer" />
                <img src={require('../assets/icons/delete.png')} alt='' className="cursor-pointer" onClick={() => handleDelete(row._id)} />
            </div>
        )
    },
])


export const vehicleProfileColumns = [
    {
        name: '#',
        selector: (row, idx) => <CustomIndexCell rowIndex={idx} />,
        width: '80px'
    },
    {
        name: 'Invoice #',
        selector: row => row.invoiceNo
    },
    {
        name: 'Customer Name',
        selector: row => row.customerName
    },
    {
        name: 'Customer Email',
        selector: row => row.customerEmail
    },
    {
        name: 'Invoice Date',
        selector: row => row.invoiceDate,
    },
    {
        name: 'Status',
        selector: row => row.status
    },
    {
        name: 'Amount',
        selector: row => '$' + row.total
    }
]