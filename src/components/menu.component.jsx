export default function Menu() {
    return (
        <div className='w-[130px] h-screen fixed left-2 top-0 p-3'>
            <div className='bg-[#5A5A5E] rounded-2xl h-full flex p-3 flex-col justify-between items-center'>
                <img src={require('../assets/images/small-logo.png')} alt='' />

                <div className='flex flex-col items-center justify-evenly h-4/6'>
                    <img src={require('../assets/icons/dashboard-icon.png')} alt='' />
                    <img src={require('../assets/icons/user-icon.png')} alt='' />
                    <img src={require('../assets/icons/car-icon.png')} alt='' />
                    <img src={require('../assets/icons/setting-icon.png')} alt='' />
                    <img src={require('../assets/icons/card-tick.png')} alt='' />
                </div>
                <img src={require('../assets/icons/logout-icon.png')} alt='' />
            </div>
        </div>
    )
}