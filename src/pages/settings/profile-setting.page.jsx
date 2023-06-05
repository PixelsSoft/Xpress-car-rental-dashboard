import CustomContainer from '../../components/custom-container.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { errorNotify } from '../../utils/success-notify.util'
import API from '../../api/api'
import Spinner from '../../components/spinner.component'

export default function PasswordChange() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState('')

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('@user_details')).token
    const getUserDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(API.GET_USER_DETAILS, {
          headers: {
            Authorization: token,
          },
        })
        setFullName(response.data.data.fullName)
        setEmail(response.data.data.email)
        setImage(response.data.data.profilePicture.url)
        setLoading(false)
      } catch (err) {
        console.log(err)
        errorNotify(err.response.data.message)
        setLoading(false)
      }
    }
    getUserDetails()
  }, [])

  const editProfile = async (e) => {
    e.preventDefault()
    try {
      let token = JSON.parse(localStorage.getItem('@user_details')).token
      const formData = new FormData()

      if (fullName.length > 0) formData.append('fullName', fullName)
      if (email.length > 0) formData.append('email', email)
      if (file) formData.append('profileImage', file)

      const response = await axios.patch(API.EDIT_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      })
      if (response.data.success === true) {
        setLoading(true)
        const response2 = await axios.get(API.GET_USER_DETAILS, {
          headers: {
            Authorization: token,
          },
        })
        localStorage.setItem(
          '@user_details',
          JSON.stringify({ user: response2.data.data, token: token }),
        )
        setFullName(response2.data.data.fullName)
        setEmail(response2.data.data.email)
        setImage(response2.data.data.profilePicture.url)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      errorNotify(err.response.data.message)
      setLoading(false)
    }
  }

  return (
    <>
      <CustomContainer otherStyles="p-4 h-full">
        <h1 className="font-bold text-sm lg:text-2xl text-black">
          Profile Setting
        </h1>
        <div className="flex h-full">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <form className="flex flex-col mt-10 w-full">
                <CustomInput
                  placeholder="Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <CustomInput
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CustomButton onClick={editProfile}>Save Changes</CustomButton>
              </form>
              <div className="space-y-4">
                <img
                  src={
                    image
                      ? image
                      : require('../../assets/images/profile-empty.png')
                  }
                  alt=""
                  className="w-40 h-40 border-2 border-gray-600 rounded-full"
                />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="profileImage"
                />
              </div>
            </>
          )}
        </div>
      </CustomContainer>
    </>
  )
}
