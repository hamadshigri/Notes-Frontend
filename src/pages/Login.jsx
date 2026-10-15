import { Link } from "react-router-dom"

const Login = () => {
    return (
        <>
            <div className="flex justify-center pt-8">
                <form className="flex flex-col gap-4 w-[850px] pt-4">
                    <input type="email" placeholder="Type Your Email" className="bg-[#F7F7F7] p-4" required />
                    <input type="text" placeholder="Type Your Password" className="bg-[#F7F7F7] p-4" required />
                    <button type="submit" className='bg-[#437993] p-4 text-white font-bold rounded w-full hover:opacity-[0.9] cursor-pointer' >Login</button>
                    <Link to="/"><p className="text-center">Don't have an Account?</p></Link>
                </form>
            </div>
        </>
    )
}

export default Login