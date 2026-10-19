import { useLocation } from 'react-router-dom';


const Header = () => {
    const { pathname } = useLocation();

    const token = localStorage.getItem("token");


    const handleLogout = async (e) => {
        localStorage.removeItem("token");
        window.location.href = "/login"; 
    }

    return (
        <>
            <div className="bg-[#437993] flex justify-center">
                <div className="flex justify-between items-center w-full max-w-[75%]">
                    <div className="flex flex-col gap-2 p-[11px]">
                        <h2 className="text-white text-4xl font-bold pt-2">Notes App</h2>
                        <p className="text-white text-base font-light">Take Notes and never forget</p>
                    </div>
                    {(pathname === "/dashboard" || pathname === "/note")? (<div className="flex gap-3">
                        <button onClick={handleLogout} className='bg-white p-4 text-[#437993] font-bold rounded w-[120px] hover:opacity-[0.9] cursor-pointer'>Logout</button></div>) : ""}
                </div>

            </div>
        </>
    )
}

export default Header