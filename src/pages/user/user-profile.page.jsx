import Layout from '../../components/layout.component'
import CustomContainer from '../../components/custom-container.component'
import CustomButton from '../../components/custom-button.component'
import UserDetailBox from '../../components/user-detail-box.component'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { errorNotify, successNotify } from '../../utils/success-notify.util'
import axios from 'axios'
import API from '../../api/api'

export default function UserProfile() {
  const params = useParams()

  const navigate = useNavigate()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    IdNumber: '',
    phone: '',
    email: '',
    customer: '',
    status: '',
    _id: '',
  })

  const deleteProfile = async () => {
    try {
      const response = await axios.delete(
        API.DELETE_CUSTOMER_PROFILE + `/${params.id}`,
      )
      if (response.data.success) {
        successNotify(response.data.message)
      }
      navigate('/users')
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  const deactivateProfile = async () => {
    try {
      const response = await axios.post(API.DEACTIVATE_PROFILE + params.id)

      if (response.data.success) {
        successNotify(response.data.message)
        const response2 = await axios.get(API.GET_CUSTOMERS + `${params.id}`)
        setUser(response2.data.data)
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
    }
  }

  useEffect(() => {
    const getCustomerProfile = async () => {
      try {
        const response = await axios.get(API.GET_CUSTOMERS + `${params.id}`)
        console.log(response)
        setUser(response.data.data)
      } catch (err) {
        console.log(err)
        errorNotify(err.response.data.message)
      }
    }
    getCustomerProfile()
  }, [params.id])
  return (
    <Layout>
      <CustomContainer>
        <div className="flex items-center justify-between mt-10 p-2">
          <div className="flex items-center space-x-2">
            <img
              src={require('../../assets/icons/user-tie.png')}
              className="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px]"
              alt=""
            />
            <h1 className="font-bold text-sm md:text-lg lg:text-xl">
              User Profile
            </h1>
          </div>
          {user.status === 'Deactivated' && (
            <span className="font-bold text-red-600 underline">
              DEACTIVATED PROFILE
            </span>
          )}
          <div className="flex items-center space-x-4">
            <CustomButton onClick={deleteProfile}>Delete Profile</CustomButton>
            <CustomButton onClick={deactivateProfile}>
              {user.status === 'Active'
                ? 'Deactivate Profile'
                : 'Activate Profile'}
            </CustomButton>
          </div>
        </div>

        <div className="flex w-full mt-4 items-center justify-center p-3 flex-col lg:flex-row">
          <div className="flex flex-wrap w-full lg:w-3/4">
            <UserDetailBox
              title="Name"
              description={user.firstName + ' ' + user.lastName}
            />
            <UserDetailBox title="User ID" description={user._id} />
            <UserDetailBox title="Contact" description={user.phone} />
            <UserDetailBox
              title="National ID Card No"
              description={user.IdNumber}
            />
            <UserDetailBox title="Address" description={user.address} />
            {/* <UserDetailBox title='Payment Method' description='VISA' /> */}
            <UserDetailBox title="Status" description={user.status} />
          </div>

          {/* <img
            src={require('../../assets/images/user-profile-picture.png')}
            alt=""
          /> */}
        </div>
      </CustomContainer>
    </Layout>
  )
}
