export default function InvoicingStatCard({title, amount, postfix}) {
    return (
        <div className="flex flex-col">
            <span className="font-bold text-base">{title}</span>
            <span className="text-3xl mt-4">{amount} <span className="text-sm">{postfix}</span></span>
        </div>
    )
}