export default function YellowText({children, otherStyles}) {
    return (
        <span className={`text-[#FEBD20] font-bold ${otherStyles}}`}>{children}</span>
    )
}