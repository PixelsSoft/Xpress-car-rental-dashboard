import SettingCard from "../../components/setting-card.component"

export default function NotificationSetting() {
    return (
        <>
            <h1 className="font-bold text-sm lg:text-2xl">Notification Setting</h1>
            <div className="mt-10 flex flex-col justify-between h-2/3 md:flex-row flex-wrap">
                <SettingCard title='Email Notificaiton' description='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor' />
                <SettingCard title='Email Notificaiton' description='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor' />
                <SettingCard title='Email Notificaiton' description='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor' />
            </div>
        </>
    )
}