import CustomContainer from '../../components/custom-container.component'
import Layout from '../../components/layout.component'
import CustomTable from '../../components/custom-table/custom-table.component'
import { useEffect, useState } from 'react'
import { errorNotify } from '../../utils/success-notify.util'
import axios from 'axios'
import API from '../../api/api'
import { vendorsColumns } from '../../config/columns'

export default function Vendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(false)
  const getAllVendors = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API.GET_ALL_VENDORS)
      console.log(response.data)
      setVendors(response.data.data)
      setLoading(false)
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
        </div>
        <CustomContainer>
          <div className="mt-6">
            <CustomTable
              columns={vendorsColumns}
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
