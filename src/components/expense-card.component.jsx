const ExpenseCard = ({expense}) => {
    const {amount, title, type, date} = expense
    return (
        <div className="flex justify-between shadow-md my-2 border-2 border-slate-300 rounded-lg p-3 text-xs w-full">
            <div className="flex flex-col">
                <span className="font-bold">{title}</span>
                <span>Type: {type}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">Amount: ${amount}</span>
                <span>Date: {date}</span>
            </div>
        </div>
    )
}

export default ExpenseCard