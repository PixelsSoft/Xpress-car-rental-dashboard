export default function CustomContainer({ children, otherStyles }) {
    return (
        <div style={{
            boxShadow: '10px 20px 30px rgba(0,0,0,0.16)',
            background: 'linear-gradient(180deg, #ffffff 0.00%, rgba(255,255,255,0.06) 100.00%)',
            opacity: 0.70,
        }}
            className={`${otherStyles}`}
        >
            {children}
        </div>
    )
}