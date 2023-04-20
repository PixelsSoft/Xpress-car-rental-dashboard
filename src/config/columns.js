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
        selector: row => row.name
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
        selector: (row) => row.sno
    },
    {
        name: 'Vehicle ID',
        selector: (row) => row.vehicleId
    },
    {
        name: 'Vehicle Name',
        selector: (row) => row.vehicleName
    },
    {
        name: 'Vehicle Registration',
        selector: (row) => row.vehicleRegistration
    },
    {
        name: 'Vehicle Type',
        selector: (row) => row.vehicleType
    },
    {
        name: 'Register Date',
        selector: (row) => row.registerDate
    },
    {
        name: 'Vehicle Capacity',
        selector: (row) => row.vehicleCapacity
    },
    {
        name: 'Renting Price / Day',
        selector: (row) => row.rentingPriceDay
    },
    {
        name: 'Status',
        selector: (row) => row.status
    },
]

export const invoicesColumns = [
    {
        name: 'Status',
        selector: row => row.status,
        conditionalCellStyles: [
            {
                when: row => row.status === 'Overdue',
                style: {
                    fontWeight: 'bold',
                    color: 'red'
                }
            }
        ]
    },
    {
        name: 'Due',
        selector: row => row.due
    },
    {
        name: 'Date',
        selector: row => row.date
    },
    {
        name: 'Number',
        selector: row => row.number
    },
    {
        name: 'Customer',
        selector: row => row.customer
    },
    {
        name: 'Amount Due',
        selector: row => row.amountDue
    },
    {
        name: 'Actions',
        selector: row => row.actions
    },
]