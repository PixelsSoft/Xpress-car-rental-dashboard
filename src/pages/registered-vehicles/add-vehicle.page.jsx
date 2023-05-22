import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import RecentlyAddedVehicleCard from '../../components/recently-added-vehicle-card.component'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { errorNotify, successNotify } from '../../utils/success-notify.util'
import API from '../../api/api'
import { useNavigate } from 'react-router-dom'

export default function AddVehicle() {
    const [name, setName] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [pricePerDay, setPricePerDay] = useState(0)
    const [pricePerWeek, setPricePerWeek] = useState(0)
    const [pricePerMonth, setPricePerMonth] = useState(0)
    const [description, setDescription] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [capacity, setCapacity] = useState(0)
    const [loading, setLoading] = useState(false)
    const [recentlyAdded, setRecentlyAdded] = useState([])

    const navigate = useNavigate()

    let token = JSON.parse(localStorage.getItem('@user_details')).token

    const onCancel = (e) => {
        e.preventDefault()
        navigate('/registered-vehicles')
    }

    const fetchRecentlyAddedVehicles = async () => {
        try {
            const response = await axios.get(API.GET_RECENT_CARS)
            setRecentlyAdded(response.data.data)
        } catch (err) {
            console.log(err)
            errorNotify(err.response.data.message)
        }
    }

    const addVehicleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            if (!name) {
                setLoading(false)
                return errorNotify('Name is required')
            }

            if(!registrationNumber) {
                setLoading(false)
                return errorNotify('Registration # is required')
            }

            let images = e.target.elements.images.files
            const formData = new FormData()

            formData.append('name', name)
            formData.append('registrationNo', registrationNumber)
            formData.append('pricePerDay', pricePerDay)
            formData.append('pricePerWeek', pricePerWeek)
            formData.append('pricePerMonth', pricePerMonth)
            formData.append('description', description)
            formData.append('type', vehicleType)
            formData.append('capacity', capacity)

            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
            await axios.post(API.ADD_VEHICLE, formData, {
                headers: {
                    Authorization: token
                }
            })
            successNotify('Vehicle added!')

            setName('')
            setRegistrationNumber('')
            setPricePerDay('')
            setPricePerWeek('')
            setPricePerMonth('')
            setDescription('')
            setCapacity(0)
            setVehicleType('')

            fetchRecentlyAddedVehicles()
            setLoading(false)
        } catch (err) {
            errorNotify(err.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRecentlyAddedVehicles()
    }, [])
    return (
        <Layout>
            <CustomContainer otherStyles='p-6 flex flex-col xl:flex-row mt-8'>
                <div>
                    <div className='flex items-center space-x-3'>
                        <img src={require('../../assets/icons/car-front.png')} alt='' />
                        <h1 className='font-bold text-xl'>Add New Vehicle</h1>
                    </div>

                    <form className='w-full mt-6' onSubmit={addVehicleSubmit}>
                        <div className='flex w-full flex-wrap'>
                            <CustomInput placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                            <CustomInput placeholder='Registration #' value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} />
                            <CustomInput placeholder='Price/Day' value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} />
                            <CustomInput placeholder='Price/Week' value={pricePerWeek} onChange={e => setPricePerWeek(e.target.value)} />
                            <CustomInput placeholder='Price/Month' value={pricePerMonth} onChange={e => setPricePerMonth(e.target.value)} />
                            <CustomInput placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                            <CustomInput placeholder='Type' value={vehicleType} onChange={e => setVehicleType(e.target.value)} />
                            <CustomInput placeholder='Capactiy' value={capacity} onChange={e => setCapacity(e.target.value)}
                                onFocus={(e) => (e.target.type = "number")}
                                onBlur={(e) => (e.target.type = "text")} />
                        </div>
                        <div className='border-2 border-[#FEBD20] w-fit flex flex-col items-center p-3 ml-4 mt-4 rounded-lg'>
                            <img src={require('../../assets/icons/camera.png')} alt='' />
                            <input type='file' name='images' multiple placeholder='Add vehicle images' />
                        </div>

                        <div className='flex space-x-3 ml-4 mt-10'>
                            <CustomButton onClick={onCancel}>Cancel</CustomButton>
                            <CustomButton type='submit' loading={loading}>Add Vehicle</CustomButton>
                        </div>
                    </form>
                </div>
                <div className='border-l-2 h-[550px] xl:w-[1000px] mt-10 xl:mt-0 border-gray-300 pl-4 overflow-scroll'>
                    <h1 className='font-bold text-2xl'>Recently Added</h1>
                    {recentlyAdded.map(car => (
                        <RecentlyAddedVehicleCard car={car} />
                    ))}
                </div>
            </CustomContainer>
        </Layout>
    )
}