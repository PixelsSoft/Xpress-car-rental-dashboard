export default function RecentlyAddedVehicleCard() {
    return (
        <div className='flex items-start border-2 border-gray-200 p-3 text-sm rounded-lg mt-4'>
            <div className='flex flex-col space-y-3'>
                <span>Honda Corolla</span>
                <span>Reg No# CL-5522</span>
                <span>Location: Santa Barbara, CA, US</span>
                <div>
                    <span>Timings: </span>
                    <span>Wednesday - 20-12-22/12:30 PM To 5:30PM</span>
                </div>
                <div>
                    <span>Price:</span>
                    <span>$200/week</span>
                </div>
            </div>
            <img src={require('../assets/images/toyota.png')} alt='' />
        </div>
    )
}