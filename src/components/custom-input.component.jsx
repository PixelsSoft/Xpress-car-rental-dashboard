export default function CustomInput({children, ...otherProps}) {
    return (
        <input {...otherProps} className='rounded-md outline-none border-2 border-[#FEBD20] my-4 mx-2 px-3 py-3 w-full xl:w-[300px] text-sm' style={{ boxShadow: '10px 10px 20px rgba(0,0,0,0.10)' }} />
    )
}