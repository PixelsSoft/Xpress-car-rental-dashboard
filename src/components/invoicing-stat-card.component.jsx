export default function InvoicingStatCard({title, amount, postfix}) {
    return (
        <div className="flex flex-col m-4">
            <span className="font-bold text-xs lg:text-base">{title}</span>
            <span className="text-sm lg:text-3xl mt-2">{amount} <span className="text-sm">{postfix}</span></span>
        </div>
    )
}