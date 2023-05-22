export default function InvoicingStatCard({title, amount, postfix}) {
    return (
        <div className="flex flex-col m-4">
            <span className="font-bold text-xs md:text-md xl:text-lg">{title}</span>
            <span className="text-sm md:text-xl lg:text-2xl mt-2">{amount} <span className="text-sm lg:text-lg">{postfix}</span></span>
        </div>
    )
}