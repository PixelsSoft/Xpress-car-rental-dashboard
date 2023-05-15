import { Oval } from 'react-loader-spinner'

export default function Spinner() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <Oval
                height={20}
                width={20}
                color="#FEBD20"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fff"
                strokeWidth={8}
                strokeWidthSecondary={8}

            />
        </div>
    )
}