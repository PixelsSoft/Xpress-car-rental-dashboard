import { useState } from "react"

export default function CustomBreadcumb({ filters }) {
    const [active, setActive] = useState(0)
    return (
        <div className="rounded-full mx-auto w-fit bg-white" style={{ boxShadow: '10px 10px 100px rgba(0,0,0,0.50)', }}>
            {
                filters.map((filter, idx) => (
                    <button key={idx} className={`${active === idx ? 'bg-[#FEBD20] text-white' : 'bg-white text-black'} font-bold rounded-full w-[100px] text-xs lg:text-base lg:w-[160px] px-2 py-3 lg:py-3 lg:px-5`} onClick={() => setActive(idx)}>{filter}</button>
                ))
            }
        </div>
    )
}