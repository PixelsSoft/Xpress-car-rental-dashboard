export default function NotificationSettingCard({title, description}) {
    return (
        <div className="flex flex-col w-full lg:w-5/12">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm lg:text-base">{title}</span>
                <span>Slider</span>
            </div>
            <p className="text-xs lg:text-base">
                {description}
            </p>
        </div>
    )
}