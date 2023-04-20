export default function TransactionCard() {
    return (
        <div className='w-full space-x-10 p-3 border-2 flex justify-between items-center border-slate-200 rounded-lg' style={{ boxShadow: '10px 20px 15px rgba(0, 0, 0, 0, 0.16)' }}>
            <img src={require('../assets/images/visa-card.png')} alt='' />
            <div className='flex flex-col items-end'>
                <span>12:00 AM - 02/12/23</span>
                <span>$2000 Dollars received in your account from AC no 4201-213-21312-2313 AC Title Jim Gordon</span>
            </div>
        </div>
    )
}