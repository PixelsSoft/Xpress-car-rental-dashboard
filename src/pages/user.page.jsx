import Layout from "../components/layout.component";
import CustomTable from '../components/custom-table/custom-table.component';
import CustomContainer from '../components/custom-container.component'
import {usersColumn} from '../config/columns'
import {usersData} from '../config/table-data'

export default function User() {
    return (
        <Layout>
                <div className="flex items-center p-3">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2 mr-10 font-bold text-lg">
                            <img src={require('../assets/icons/user-tie.png')} alt="" />
                            <span>Registered User</span>
                        </div>
                        <span className="bg-[#FEBD20] opacity-70 p-2">2k+</span>
                    </div>
                    <div className="rounded-full mx-auto" style={{ boxShadow: '10px 10px 100px rgba(0,0,0,0.50)', }}>
                        <button className="bg-[#FEBD20] rounded-full text-white w-[160px] py-3 px-5">All</button>
                        <button className="bg-white rounded-full text-black w-[160px] py-3 px-5">Activated</button>
                        <button className="bg-white rounded-full text-black w-[160px] py-3 px-5">Deactivate</button>
                    </div>
                </div>
            <CustomContainer>
                <CustomTable columns={usersColumn} data={usersData} pagination={true} perPage={10} />
            </CustomContainer>
        </Layout>
    )
}