const ExpenseCard = () => {
    return (
        <div className="flex justify-between shadow-md my-2 border-2 border-slate-300 rounded-lg p-3 text-xs w-full">
            <div className="flex flex-col">
                <span className="font-bold">Payment</span>
                <span>Type: Supplier Payment</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">Amount: $300</span>
                <span>Date: 11/12/2023</span>
            </div>
        </div>
    )
}

export default ExpenseCard