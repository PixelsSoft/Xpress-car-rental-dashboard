export default function InvoicingStatCard({title, amount, postfix}) {
    return (
        <div className="flex flex-col m-4">
            <span className="font-bold text-xs lg:text-sm">{title}</span>
            <span className="text-sm lg:text-2xl mt-2">{amount} <span className="text-sm">{postfix}</span></span>
        </div>
    )
}