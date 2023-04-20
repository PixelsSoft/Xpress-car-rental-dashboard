import Layout from "../components/layout.component";
import CustomTable from '../components/custom-table/custom-table.component';
import CustomContainer from '../components/custom-container.component'
import {usersColumn} from '../config/columns'
import {usersData} from '../config/table-data'
import CustomBreadcumb from '../components/custom-breadcumb.component'

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
                    <CustomBreadcumb filters={['All', 'Activated', 'Deactivated']} />
                </div>
            <CustomContainer>
                <CustomTable columns={usersColumn} data={usersData} pagination={true} perPage={10} />
            </CustomContainer>
        </Layout>
    )
}