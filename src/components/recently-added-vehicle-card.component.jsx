export default function RecentlyAddedVehicleCard({ car }) {
  console.log(car)
  return (
    <div className="flex items-center justify-between border-2 border-gray-200 p-2 text-sm rounded-lg mt-4">
      <div className="flex flex-col">
        <span>{car.name}</span>
        <span>Reg No# {car.registrationNo}</span>
        {/* <span>Location: N/A</span>
                <div>
                    <span>Timings: </span>
                    <span>N/A</span>
                </div> */}
        <div>
          <strong>Price:</strong>
          <span>${car.price.pricePerDay} / day</span>
        </div>
      </div>
      <img src={car.images[0]?.url} alt="" width={100} height={100} />
    </div>
  )
}
