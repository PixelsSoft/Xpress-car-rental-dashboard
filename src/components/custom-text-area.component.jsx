import { useRef } from "react"

const CustomTextArea = ({ placeholder, ...rest }) => {
    const ref = useRef(null)
    return (
        <div onClick={() => ref.current.focus()} className="relative w-full xl:w-[250px] my-4 mx-2">
            <textarea ref={ref} {...rest} class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-[#FEBD20] appearance-none  focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " />
            <label class="absolute text-sm text-gray-900 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{placeholder}</label>
        </div>
    )
}

export default CustomTextArea