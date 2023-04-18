export default function CustomContainer({children, otherStyles}) {
    return (
        <div style={{boxShadow: '10px 20px 30px rgba(0,0,0,0.16)'}} className={`bg-transparent bg-white bg-opacity-10 ${otherStyles}`}>
            {children}
        </div>
    )
}