export default function CustomInput({children, ...otherProps}) {
    return (
        <input {...otherProps} className='rounded-md border-2 border-[#FEBD20] my-4 mx-2 px-6 py-4 w-full xl:w-[400px]' style={{ boxShadow: '10px 20px 15px rgba(0,0,0,0.16)' }} />
    )
}