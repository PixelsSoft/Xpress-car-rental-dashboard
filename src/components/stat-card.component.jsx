import Spinner from './spinner.component'

export default function StatCard({ title, stat, img, border = true, loading }) {
    return (
        <div className='flex flex-row lg:flex-col items-center border-b-2 border-slate-300 lg:border-b-0 justify-between lg:h-[150px] p-4'>
            {loading ? <Spinner /> : (
                <>
                    <h3 className='font-bold text-md lg:text-lg w-full'>{title}</h3>
                    <div className='flex items-center justify-between lg:w-full'>
                        <span className='bg-[#FEBD20] p-2 rounded-md'>{stat}</span>
                        <img className='hidden lg:flex' src={img} alt='' width={50} height={50} />
                    </div>
                </>
            )}
        </div>
    )
}