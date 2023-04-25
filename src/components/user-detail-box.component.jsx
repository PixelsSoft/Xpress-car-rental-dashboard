export default function UserDetailBox({title, description}) {
    return (
        <div className="flex flex-col m-4 lg:mx-10 lg:my-10">
            <label className="font-medium">{title}:</label>
            <span>{description}</span>
        </div>
    )
}