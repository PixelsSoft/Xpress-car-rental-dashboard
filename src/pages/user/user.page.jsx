import Layout from "../../components/layout.component";
import CustomTable from '../../components/custom-table/custom-table.component';
import CustomContainer from '../../components/custom-container.component'
import { usersColumn } from '../../config/columns'
import CustomButton from "../../components/custom-button.component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/api";

export default function User() {
    const [customers, setCustomers] = useState([])
    const getCustomers = async () => {
        try {
            const response = await axios.get(API.GET_CUSTOMERS)
            setCustomers(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCustomers()
    }, [])

    console.log(customers)
    return (
        <Layout>
            <div className="flex items-center p-3 mt-10">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center mb-4 space-x-2 mr-10 font-bold text-lg">
                        <img src={require('../../assets/icons/user-tie.png')} alt="" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
                        <span className="text-md">Registered User</span>
                        <span className="bg-[#FEBD20] hidden lg:flex opacity-70 p-2 text-sm lg:text-base">2k+</span>
                    </div>
                    <Link to='/add-user'>
                        <CustomButton>Add User</CustomButton>
                    </Link>
                </div>
            </div>
            {/* <CustomBreadcumb filters={['All', 'Activated', 'Deactivated']} /> */}
            <CustomContainer otherStyles='mt-4'>
                <CustomTable columns={usersColumn} data={customers} pagination={true} perPage={10} />
            </CustomContainer>
        </Layout>
    )
}