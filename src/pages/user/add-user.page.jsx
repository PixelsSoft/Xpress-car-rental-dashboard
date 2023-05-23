import CustomContainer from '../../components/custom-container.component'
import Layout from '../../components/layout.component'
import CustomInput from '../../components/custom-input.component'
import CustomButton from '../../components/custom-button.component'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API from '../../api/api'
import { useState } from 'react'
import { errorNotify, successNotify } from '../../utils/success-notify.util'

export default function AddUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [IdNumber, setIdNumber] = useState('')

  const navigate = useNavigate()
  const onCancel = (e) => {
    e.preventDefault()
    navigate('/users')
  }

  const submitUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(API.CREATE_CUSTOMER, {
        customer, 
        email,
        phone,
        firstName,
        lastName,
        address,
        IdNumber
      })

      if(response.data) {
        setCustomer('')
        setEmail('')
        setPhone('')
        setFirstName('')
        setLastName('')
        setAddress('')
        setIdNumber('')

        successNotify('User added')
      }
    } catch (err) {
        console.log(err)
        errorNotify(err.response.data.message)
    }
  }
  return (
    <Layout>
      <div className="flex items-center p-3 mt-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center mb-4 space-x-2 mr-10 font-bold text-lg">
            <img
              src={require('../../assets/icons/user-tie.png')}
              alt=""
              className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]"
            />
            <span className="text-md">Add User</span>
          </div>
        </div>
      </div>
      <CustomContainer otherStyles="p-4">
        <form onSubmit={submitUser}>
          <div className="flex flex-wrap">
            <CustomInput
              placeholder="Customer (Business or Person)"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <CustomInput
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <CustomInput
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <CustomInput
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              value={phone}
              placeholder="Phone #"
              onChange={(e) => setPhone(e.target.value)}
            />
            <CustomInput
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <CustomInput
              value={IdNumber}
              placeholder="National ID Card #"
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
          <div className="space-x-3 mt-4">
            <CustomButton onClick={onCancel}>Cancel</CustomButton>
            <CustomButton>Add</CustomButton>
          </div>
        </form>
      </CustomContainer>
    </Layout>
  )
}
