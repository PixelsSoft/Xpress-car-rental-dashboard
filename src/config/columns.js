import { Link } from "react-router-dom"
import { CustomIndexCell } from "../pages/registered-vehicles/rengistered-vehicles.page"

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

export const usersColumn = [
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
        // selector: row => row.name,
        cell: row => <Link to='/user-profile'>{row.name}</Link>
    },
    {
        name: 'Contact',
        selector: row => row.contact
    },
    {
        name: 'Address',
        selector: row => row.address
    },
    {
        name: 'Register Date',
        selector: row => row.registerDate
    },
    {
        name: 'Status',
        selector: row => row.status
    },
    {
        name: 'Payment Method',
        cell: row => <img src={row.paymentMethod} alt='' />
    },
]

export const registeredVehiclesColumns = [
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
        cell: row => <Link to='/vehicle-profile'>{row.name}</Link>
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
        name: 'Status',
        selector: (row) => row.status
    },
]

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

export const invoicesColumns = [
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
        selector: row => row.actions
    },
]


export const vehicleProfileColumns = [
    {
        name: 'Sno',
        selector: row => row.sno
    },
    {
        name: 'Vehicle ID',
        selector: row => row.vehicleId
    },
    {
        name: 'Vehicle Name',
        selector: row => row.vehicleName
    },
    {
        name: 'Vehicle Registration #',
        selector: row => row.vehicleRegistration
    },
    {
        name: 'vehicleType',
        selector: row => row.vehicleType
    },
    {
        name: 'Booking Date',
        selector: row => row.bookingDate
    },
    {
        name: 'Returning Date',
        selector: row => row.returningDate
    },
    {
        name: 'Payment',
        selector: row => row.payment
    },
]