import React, {useEffect, useState} from "react";
import Layout from "../../../components/layout.component";
import CustomContainer from '../../../components/custom-container.component'
import CustomInput from "../../../components/custom-input.component";
import CustomButton from "../../../components/custom-button.component";
import InvoiceTable from '../../../components/invoice-table.component'
import CustomFileInput from '../../../components/custom-file-input/custom-file-input.component'
import axios from "axios";
import API from '../../../api/api'

export default function CreateInvoice() {
    const [vehicles, setVehicles] = useState([])
    const getVehicles = async () => {
        try {
            const response = await axios.get(API.GET_VEHICLES, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('@user_details')).token
                }
            })

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
            <CustomContainer otherStyles='p-6 flex flex-col xl:flex-row mt-8'>
                <div>
                    <div className='flex items-center space-x-3'>
                        <h1 className='font-bold text-xl'>Create Invoice</h1>
                    </div>

                    <form className='w-full mt-6 flex justify-between'>
                        <div className="flex flex-col items-center justify-center border-dotted w-[300px] border-gray-400 border-2 py-10 px-4 rounded-lg">
                            <div className="flex items-center pb-4">
                                <img src={require('../../../assets/icons/upload-pic.png')} alt='' />
                                <span className="font-bold pl-2 w-fit text-sm">Add a customer</span>
                            </div>
                            <CustomFileInput />
                        </div>
                        <div className="w-full">
                            <div className='flex w-full flex-wrap justify-end'>
                                <CustomInput placeholder='Invoice #' />
                                <CustomInput placeholder='P.O/S.O number' />
                                <CustomInput placeholder='Customer Name' />
                                <CustomInput
                                    type="text"
                                    placeholder='Invoice Date'
                                    onChange={(e) => console.log(e.target.value)}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                />
                                <CustomInput
                                    placeholder='Payment Due'
                                    onChange={(e) => console.log(e.target.value)}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    type="text"
                                />
                            </div>
                        </div>
                    </form>
                    <div className="mt-4">
                        <InvoiceTable vehicles={vehicles} />
                    </div>
                    <div className='flex space-x-3 ml-4 mt-10'>
                        <CustomButton>Print</CustomButton>
                        <CustomButton type='submit'>Email Receipt</CustomButton>
                    </div>
                </div>
            </CustomContainer>
        </Layout>
    )
}