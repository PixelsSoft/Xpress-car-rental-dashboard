export default function CustomInput({children, ...otherProps}) {
    return (
        <input {...otherProps} className='rounded-md border-2 border-[#FEBD20] px-6 py-4 w-1/2' style={{ boxShadow: '10px 20px 15px rgba(0,0,0,0.16)' }} />
    )
}