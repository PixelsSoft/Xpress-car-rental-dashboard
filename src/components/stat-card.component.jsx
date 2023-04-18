export default function StatCard({title, stat, img, border = true}) {
    return (
        <div className={`flex flex-col w-10/12 justify-between px-10 ${border && 'border-r-2 border-r-slate-300'}`}>
            <h5 className='font-bold'>{title}</h5>
            <div className='flex justify-between items-center mt-10'>
                <span className='rounded-lg bg-[#FEBD20] bg-opacity-30 font-bold h-fit p-3'>{stat}</span>
                <img src={img} alt='' />
            </div>
        </div>
    )
}