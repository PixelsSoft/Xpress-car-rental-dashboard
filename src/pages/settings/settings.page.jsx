import { useState } from "react";
import CustomContainer from "../../components/custom-container.component";
import Layout from "../../components/layout.component";
// import NotificationSetting from './notification-setting.page'
import ProfileSetting from "./profile-setting.page";
import PasswordChange from './password-change.page';

export default function Settings() {
    const settingsMenu = ['Profile Setting', 'Password Change']

    const [selected, setSelected] = useState(0)

    const onClick = (idx) => setSelected(idx)
    return (
        <Layout>
            <CustomContainer otherStyles='p-4 flex'>

                <div className="shadow-md w-fit p-4 rounded-lg h-[600px]">
                    <h1 className="font-bold text-sm lg:text-2xl">Settings</h1>


                    <ul className="mt-10">
                        {settingsMenu.map((item, idx) => (
                            <li style={{ boxShadow: `${selected === idx ? '10px 20px 15px rgba(0, 0, 0,0.16)' : '0 0 0 rgba(0,0,0,0)'}` }} key={idx} className={`${selected === idx && 'bg-[#FEBD20] text-white'} my-4 p-4 w-[200px] text-xs lg:text-base rounded-full ease-in duration-200 cursor-pointer`} onClick={() => onClick(idx)}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="ml-4 w-full p-4">
                    {/* {selected === 0 && <NotificationSetting />} */}
                    {selected === 0 && <ProfileSetting />}
                    {selected === 1 && <PasswordChange />}
                </div>

            </CustomContainer>
        </Layout>
    )
}