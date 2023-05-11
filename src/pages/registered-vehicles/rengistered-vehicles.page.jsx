import CustomContainer from "../../components/custom-container.component";
import CustomTable from "../../components/custom-table/custom-table.component";
import Layout from "../../components/layout.component";
import { registeredVehiclesColumns } from '../../config/columns'
import CustomButton from '../../components/custom-button.component'
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API from '../../api/api'

export const CustomIndexCell = ({ rowIndex }) => <div>{rowIndex}</div>;

export default function RentedVehicles() {
    const [vehicles, setVehicles] = useState([])

    const getVehicles = async () => {
        try {
            const response = await axios.get(API.GET_VEHICLES)
            setVehicles(response.data.data)
        } catch (err) { 
            console.log(err)
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
                <CustomTable columns={registeredVehiclesColumns} data={vehicles} />
            </CustomContainer>
        </Layout>
    )
}