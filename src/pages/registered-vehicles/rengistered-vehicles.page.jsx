import CustomContainer from "../../components/custom-container.component";
import CustomTable from "../../components/custom-table/custom-table.component";
import Layout from "../../components/layout.component";
import { registeredVehiclesColumns } from '../../config/columns'
import CustomButton from '../../components/custom-button.component'
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API from '../../api/api'
import {errorNotify, successNotify} from '../../utils/success-notify.util'

export const CustomIndexCell = ({ rowIndex }) => <div>{rowIndex + 1}</div>;

export default function RentedVehicles() {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(false)

    const getVehicles = async () => {
        try {
            setLoading(true)
            const response = await axios.get(API.GET_VEHICLES)
            setVehicles(response.data.data)
            setLoading(false)
        } catch (err) { 
            console.log(err)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(API.DELETE_VEHICLE_PROFILE + id)

            if(response.data.success) {
                setVehicles(prevState => (
                    prevState.filter(vehicle => vehicle._id !== id)
                ))
                successNotify(response.data.message)
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            errorNotify(err.message)
        }
    }

    useEffect(() => {
        getVehicles()
    }, [])
    return (
        <Layout>
            <div className="flex items-center mt-10 justify-between p-3">
                <div className="flex items-center">
                    <div className="flex items-center space-x-2 mr-10 font-bold text-lg">
                        <img src={require('../../assets/icons/car-front.png')} alt="" />
                        <span>Registered Vehicle</span>
                    </div>
                    <span className="bg-[#FEBD20] hidden lg:flex opacity-70 p-2">2k+</span>
                </div>
                <div className="flex space-x-2">
                    <div className="p-2">
                        <img src={require('../../assets/icons/candle.png')} alt='' />
                    </div>

                    <Link to="/add-vehicle">
                        <CustomButton>Add New Vehicle</CustomButton>
                    </Link>
                </div>
            </div>
            <CustomContainer>
                <CustomTable loading={loading} columns={registeredVehiclesColumns(handleDelete)} data={vehicles} />
            </CustomContainer>
        </Layout>
    )
}