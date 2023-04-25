export default function CustomButton({children, ...otherProps}) {
    return (
        <button {...otherProps} className="text-white lg:font-bold w-full lg:w-[250px] text-xs md:text-base p-1 lg:p-3 rounded-lg" style={{
            background: 'linear-gradient(116deg, #5a5a5e 0.00%, #02020d 100.00%)',
            boxShadow: '0px 20px 15px rgba(33, 100, 244,0.3)'
        }}>{children}</button>
    )
}