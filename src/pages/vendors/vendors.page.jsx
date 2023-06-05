import CustomContainer from '../../components/custom-container.component'
import Layout from '../../components/layout.component'
import CustomTable from '../../components/custom-table/custom-table.component'
import { useEffect, useState } from 'react'
import { errorNotify, successNotify } from '../../utils/success-notify.util'
import axios from 'axios'
import API from '../../api/api'
import { vendorsColumns } from '../../config/columns'
import CustomButton from '../../components/custom-button.component'
import AddVendorForm from '../../components/add-vendor-form.component'

export default function Vendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(false)
  const getAllVendors = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API.GET_ALL_VENDORS)
      setVendors(response.data.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }

  const deleteVendor = async (id) => {
    try {
      const response = await axios.delete(`${API.DELETE_VENDOR}/${id}`)

      if (response.data.success) {
        successNotify(response.data.message)
        getAllVendors()
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllVendors()
  }, [])
  return (
    <Layout>
      <CustomContainer>
        <div className="flex items-center justify-between mt-10 p-2">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-sm md:text-lg lg:text-xl">Vendors</h1>
          </div>
          <AddVendorForm
            getAllVendors={getAllVendors}
            component={<CustomButton>Add Vendor</CustomButton>}
          />
        </div>
        <CustomContainer>
          <div className="mt-6">
            <CustomTable
              columns={vendorsColumns(deleteVendor)}
              data={vendors}
              perPage={8}
              pagination={true}
              loading={loading}
            />
          </div>
        </CustomContainer>
      </CustomContainer>
    </Layout>
  )
}
