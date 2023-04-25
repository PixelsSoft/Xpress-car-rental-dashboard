export default function StatCard({title, stat, img, border = true}) {
    return (
        <div className={`flex flex-row lg:flex-col w-full lg:w-[250px] justify-between items-center border-b-2 border-slate-300 lg:border-b-0 p-2`}>
            <h5 className='font-bold text-md lg:text-base w-full'>{title}</h5>
            <div className='flex justify-between items-center lg:mt-10 lg:w-full '>
                <span className='rounded-lg bg-[#FEBD20] bg-opacity-30 font-bold h-fit p-3'>{stat}</span>
                <img src={img} alt='' className="hidden lg:inline w-[40px] h-[40px]"/>
            </div>
        </div>
    )
}