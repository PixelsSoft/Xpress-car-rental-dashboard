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