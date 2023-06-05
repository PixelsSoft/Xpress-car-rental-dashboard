import { useState } from 'react'
import CustomInput from './custom-input.component'
import CustomButton from './custom-button.component'
import Popup from 'reactjs-popup'
import API from '../api/api'
import axios from 'axios'

export default function AddVendorForm({ component, getAllVendors }) {
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [vendorFirstName, setVendorFirstName] = useState('')
  const [vendorLastName, setVendorLastName] = useState('')
  const [loading, setLoading] = useState(false)

  const onCreateVendor = async (close) => {
    try {
      setLoading(true)
      const response = await axios.post(API.CREATE_VENDOR, {
        name: vendorName,
        email: vendorEmail,
        firstName: vendorFirstName,
        lastName: vendorLastName,
      })

      console.log(response.data)

      if (response.data.success) {
        setVendorEmail('')
        setVendorFirstName('')
        setVendorName('')
        setVendorLastName('')
        getAllVendors()
        close()
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <Popup modal trigger={component}>
      {(close) => (
        <div>
          <div className="flex border-b-2 border-slate-100 items-center justify-between p-2">
            <h1>Add Vendor</h1>
            <span className="cursor-pointer" onClick={close}>
              X
            </span>
          </div>

          <div className="flex flex-col items-center p-3">
            <CustomInput
              full
              placeholder="Vendor name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
            <CustomInput
              full
              placeholder="Email"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
            />
            <CustomInput
              full
              placeholder="First Name"
              value={vendorFirstName}
              onChange={(e) => setVendorFirstName(e.target.value)}
            />
            <CustomInput
              full
              placeholder="Last Name"
              value={vendorLastName}
              onChange={(e) => setVendorLastName(e.target.value)}
            />

            <div className="space-x-3 p-3">
              <CustomButton type="button" onClick={close}>
                Cancel
              </CustomButton>
              <CustomButton
                loading={loading}
                onClick={() => onCreateVendor(close)}
              >
                Add Vendor
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )
}
