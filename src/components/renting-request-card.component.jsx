export default function RentRequestCard() {
    return (
        <div className='bg-[#fff] flex justify-between my-4 text-xs'>
            <img src={require('../assets/images/toyota.png')} alt='' />
            <div className='flex flex-col'>
                <span className='font-bold'>City Toyota</span>
                <span>02 August 04:30 - PM</span>
            </div>
            <div className='flex items-center'>
                <div className='relative w-[80px] flex items-center'>
                    <img src={require('../assets/images/request-female.png')} alt='' className='absolute' />
                    <img src={require('../assets/images/request-male.png')} alt='' className='absolute -right-[-23px]' />
                    <span className='rounded-full text-sm font-bold bg-[#FEBD20] opacity-70 p-3 absolute -top-4 right-[10px]'>+20</span>
                </div>
                <span className='font-bold text-green-600 text-md'>$ 140.00</span>
            </div>
        </div>
    )
}