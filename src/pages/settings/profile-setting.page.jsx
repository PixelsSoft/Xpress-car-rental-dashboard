import SettingCard from '../../components/setting-card.component'

export default function ProfileSetting() {
    return (
        <>
            <h1 className='text-sm font-bold lg:text-2xl'>Profile Setting</h1>

            <div className='flex flex-col h-2/3 justify-evenly'>
                <SettingCard title='Make Profile Public' description='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'/>
                <SettingCard title='Make Profile Public' description='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'/>
            </div>
        </>
    )
}