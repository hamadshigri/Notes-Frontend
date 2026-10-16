import axios from "axios";
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../lib/config";


const Login = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passRef.current.value;

        const data = {
            email,
            password
        }
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, data);
            const savedToken = localStorage.setItem("token", response.data.token);
            console.log(savedToken);
            navigate("/dashboard");
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className="flex justify-center pt-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[450px] pt-8">
                    <input type="email" ref={emailRef} placeholder="Type Your Email" className="bg-[#F7F7F7] p-4" required />
                    <input type="password" ref={passRef} placeholder="Type Your Password" className="bg-[#F7F7F7] p-4" required />
                    <button type="submit" className='bg-[#437993] p-4 text-white font-bold rounded w-full hover:opacity-[0.9] cursor-pointer' >Login</button>
                    <Link to="/"><p className="text-center">Don't have an Account?</p></Link>
                </form>
            </div>
        </>
    )
}

export default Login