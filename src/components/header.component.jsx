import YellowText from '../components/YellowText.component'
import { useState, useEffect } from 'react'

export default function Header() {
  const [user, setUser] = useState({
    fullName: '',
    profilePicture: '',
  })

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('@user_details')).user)
  }, [])

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col ml-[100px] md:ml-0">
        <YellowText otherStyles="text-sm">Good Morning</YellowText>
        <span className="font-bold text-xl">Admin!</span>
      </div>

      <div className="w-8/12 flex justify-end xl:justify-evenly space-x-3 xl:space-x-0 items-center">
        <div className="w-7/12 relative hidden xl:flex items-center bg-[#00000029] py-2 rounded-2xl px-3">
          <input className="w-11/12 bg-transparent outline-none rounded-2xl text-xl" />
          <img
            src={require('../assets/icons/search.png')}
            alt=""
            className="absolute right-3 w-[25px] h-[30px]"
          />
        </div>

        <div className="bg-[#FEBD20] bg-opacity-50 p-2 rounded-2xl w-fit relative">
          <img
            src={require('../assets/icons/notification-bing.png')}
            alt=""
            className="w-[40px] h-[40px]"
          />
          <img
            src={require('../assets/icons/notificiation-circle.png')}
            alt=""
            className="absolute right-0 top-0"
          />
        </div>

        <div className="flex items-center space-x-2">
          <img
            className="border-2 border-[#FEBD20] rounded-xl h-[60px] w-[60px]"
            alt=""
            src={user.profilePicture.url}
          ></img>
          <div className="flex flex-col">
            <YellowText>Hi</YellowText>
            <span>{user.fullName.split(' ')[0]}!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
