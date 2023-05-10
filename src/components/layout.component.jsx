import Menu from "./menu.component";
import Header from "./header.component";

export default function Layout({ children }) {
    return (
        <div className="flex">
            <Menu />
            <div className="md:pl-[300px] w-full p-3">
                <Header />
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}