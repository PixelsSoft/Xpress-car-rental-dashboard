export const rowStyles = [
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