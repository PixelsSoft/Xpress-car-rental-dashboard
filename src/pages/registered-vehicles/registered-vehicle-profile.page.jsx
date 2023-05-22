import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomButton from '../../components/custom-button.component'
import UserDetailBox from '../../components/user-detail-box.component'
import CustomTable from '../../components/custom-table/custom-table.component'
import { useParams, useNavigate } from 'react-router-dom'
import { vehicleProfileColumns } from '../../config/columns'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import CustomInput from '../../components/custom-input.component'
import API from '../../api/api'
import { errorNotify } from '../../utils/success-notify.util'

export default function RegisteredVehicleProfile() {
    const { id } = useParams()

    const navigate = useNavigate()
    const [vehicleDetails, setVehicleDetails] = useState({
        name: '',
        capacity: '',
        description: '',
        images: [],
        price: '',
        type: '',
        registrationNo: ''
    })
    const [rentingHistory, setRentingHistory] = useState([])

    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [registrationNo, setRegistrationNo] = useState('')

    const handleDeleteProfile = async () => {
        try {
            const response = await axios.delete(API.DELETE_VEHICLE_PROFILE + id)
            console.log(response)
            if (response.data?.success) {
                navigate('/registered-vehicles')
            }
        } catch (err) {
            errorNotify(err.response.data.message)
        }
    }

    useEffect(() => {
        const getRentingHistory = async () => {
            try {
                const response = await axios.get(API.GET_RENTING_HISTORY + id)
                setRentingHistory(response.data.data)
            } catch(err) {
                console.log(err)
                errorNotify(err.response.data.message)
            }
        }
        const getVehicleData = async () => {
            try {
                let response = await axios.get(API.GET_VEHICLE_DATA + id)

                if (response.data) {
                    const { name, capacity, description, images, price, type, registrationNo } = response.data.data
                    setVehicleDetails({
                        name,
                        capacity,
                        description,
                        images,
                        price,
                        type,
                        registrationNo
                    })

                    setName(name)
                    setCapacity(capacity)
                    setDescription(description)
                    setImages(images)
                    setPrice(price)
                    setType(type)
                    setRegistrationNo(registrationNo)
                }
            } catch (err) {
               errorNotify(err.response.data.message)
            }
        }

        getVehicleData()
        getRentingHistory()
    }, [id])

    console.log(images, description)
    return (
        <Layout>
            <CustomContainer>
                <div className="flex items-center justify-between mt-10 p-2">
                    <div className="flex items-center space-x-2">
                        <img src={require('../../assets/icons/user-tie.png')} className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]" alt='' />
                        <h1 className="font-bold text-sm md:text-lg lg:text-xl">{vehicleDetails.name}</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CustomButton onClick={handleDeleteProfile}>Delete Profile</CustomButton>
                        <Popup trigger={<CustomButton>Edit Profile</CustomButton>} modal>
                            {close => (
                                <div className="modal">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="header">Vehicle # {id}</div>
                                    <div className="content flex flex-col">
                                        <CustomInput value={name} placeholder='Vehicle Name' />
                                        <CustomInput value={registrationNo} placeholder='Registration #' />
                                        <CustomInput value={type} placeholder='Vehicle Type' />
                                        <CustomInput value={price.pricePerDay} placeholder='Renting Price / Day' />
                                        <CustomInput value={capacity} placeholder='Capacity' />
                                    </div>
                                    <div className="actions flex justify-evenly">
                                        <CustomButton>Save Changes</CustomButton>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>


                <div className='flex items-center space-x-4 mt-10'>
                    {vehicleDetails.images.map(image => (
                        <img src={image.url} alt='' width={365} height={190} />
                    ))}
                </div>


                <div className='flex flex-wrap flex-col md:flex-row xl:flex-row xl:items-center my-4'>
                    <UserDetailBox title='Vehicle Name' description={vehicleDetails.name} />
                    <UserDetailBox title='Vehcile ID' description={id} />
                    <UserDetailBox title='Vehcile Registration #' description={vehicleDetails.registrationNo} />
                    <UserDetailBox title='Vehicle Type' description={vehicleDetails.type} />
                    <UserDetailBox title='Renting Price/Day' description={'$' + vehicleDetails.price.pricePerDay} />
                    <UserDetailBox title='Vehicle Capacity' description={vehicleDetails.capacity} />
                </div>

                <div className='px-4'>
                    <h1 className='text-sm font-bold lg:text-xl my-3'>Renting History</h1>
                    <CustomTable data={rentingHistory} columns={vehicleProfileColumns} />
                </div>
            </CustomContainer>
        </Layout>
    )
}