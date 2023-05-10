import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import RecentlyAddedVehicleCard from '../../components/recently-added-vehicle-card.component'
import { useState } from 'react'
import axios from 'axios'

export default function AddVehicle() {
    const [name, setName] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [pricePerDay, setPricePerDay] = useState('')
    const [pricePerWeek, setPricePerWeek] = useState('')
    const [pricePerMonth, setPricePerMonth] = useState('')
    const [description, setDescription] = useState('')

    let token = JSON.parse(localStorage.getItem('@user_details')).token

    const addVehicleSubmit = async (e) => {
        e.preventDefault()
        
        const images = e.target.elements.images.files
        const formData = new FormData()

        formData.append('name', name)
        formData.append('registrationNo', registrationNumber)
        formData.append('pricePerDay', pricePerDay)
        formData.append('pricePerWeek', pricePerWeek)
        formData.append('pricePerMonth', pricePerMonth)
        formData.append('description', description)
        
        for(let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        await axios.post('http://localhost:8001/cars/add', formData, {
            headers: {
                Authorization: token
            }
        })

        setName('')
        setRegistrationNumber('')
        setPricePerDay('')
        setPricePerWeek('')
        setPricePerMonth('')
        setDescription('')
    }
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
                            <CustomInput placeholder='Registration #' value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)}/>
                            <CustomInput placeholder='Price/Day' value={pricePerDay} onChange={e => setPricePerDay(e.target.value)}/>
                            <CustomInput placeholder='Price/Week' value={pricePerWeek} onChange={e => setPricePerWeek(e.target.value)}/>
                            <CustomInput placeholder='Price/Month' value={pricePerMonth} onChange={e => setPricePerMonth(e.target.value)}/>
                            <CustomInput placeholder='Description' value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className='border-2 border-[#FEBD20] w-fit flex flex-col items-center p-3 ml-4 mt-4 rounded-lg'>
                            <img src={require('../../assets/icons/camera.png')} alt='' />
                            <input type='file' name='images' multiple placeholder='Add vehicle images' />
                        </div>

                        <div className='flex space-x-3 ml-4 mt-10'>
                            <CustomButton>Cancel</CustomButton>
                            <CustomButton type='submit'>Add Vehicle</CustomButton>
                        </div>
                    </form>
                </div>
                <div className='border-l-2 h-[550px] xl:w-[1000px] mt-10 xl:mt-0 border-gray-300 pl-4 overflow-scroll'>
                    <h1 className='font-bold text-2xl'>Recently Added</h1>
                    <RecentlyAddedVehicleCard />
                    <RecentlyAddedVehicleCard />
                    <RecentlyAddedVehicleCard />
                    <RecentlyAddedVehicleCard />
                </div>
            </CustomContainer>
        </Layout>
    )
}