import Menu from "./menu.component";
import background from '../assets/images/car.png'
import Header from "./header.component";

export default function Layout({ children }) {
    return (
        <div className="flex">
            <Menu />
            <div className="pl-[150px] w-full p-3">
                <Header />
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}