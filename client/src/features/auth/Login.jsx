import React, { useState, useEffect } from 'react'
import Logo from '../../assets/Chat-Logo-01.png'
import ChatLogo from '../../assets/Chat-Logo-01.png'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearError, loginUser } from './authSlice'

import { LuLoader } from "react-icons/lu";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

import ChatContainer from '../../chat/ChatContainer'

const Login = () => {
    const { user, status, error } = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
      })

    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(clearError());
        dispatch(loginUser(loginForm));

        setLoginForm({
            email: "",
            password: "",
        });
    };

    useEffect(() => {
        if (user) {
            navigate("/account");
        }
    }, [user, navigate]);

    return (
        <>
            <div>
                <div className='flex items-center justify-between bg-gradient-to-b from-[#2F8CFF] to-white px-4 pt-6'>
                    <Link to='/'>
                        <img src={Logo} alt="Logo" className='h-10'/>
                    </Link>
                    <Link to='/get-started' className="border-2 border-black bg-black hover:bg-red-700 hover:border-red-700 text-sm text-white px-8 py-2 rounded-md tracking-tight transition cursor-pointer">
                        Sign up for free
                    </Link>
                </div>

                <div>
                    <h1 className='text-3xl font-bold text-center mt-10'>Welcome back</h1>
                    <p className='text-center mt-4 text-gray-600'>Log in to your account</p>
                </div>

                <div className='flex flex-col  justify-center mt-5 px-4 w-full md:w-1/2 lg:w-1/3 mx-auto'>
                    <form onSubmit={handleLogin}>
                

                        <fieldset className='border border-gray-200 rounded mt-2'>
                            <legend className='pl-4 px-3 text-md font-semibold text-gray-800'>Email Address</legend>
                            <input 
                                className="w-full bg-transparent mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                                type="email" 
                                placeholder="name@work-email.com" 
                                required 
                                name="email"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            />
                        </fieldset>

                        <fieldset className='border border-gray-200 rounded mt-2 flex items-center'>
                            <legend className='pl-4 px-3 text-md font-semibold text-gray-800'>Password</legend>
                            <input 
                                className="w-full bg-transparent mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                required 
                                name="passoword"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            />
                            <span 
                                onClick={()=> setShowPassword(!showPassword)}
                                className='pr-4 cursor-pointer'
                            >
                               {showPassword ? <PiEyeSlash size={25} /> : <PiEyeLight size={25} />} 
                            </span>
                        </fieldset>

                    <button
                        type="submit"
                        className="w-full mb-3 bg-black py-2.5 rounded hover:bg-red-700 text-white mt-4 cursor-pointer flex items-center justify-center"
                    >
                        {status === "loading" ? (
                        <LuLoader className="animate-spin" size={22} />
                        ) : (
                        "Log in"
                        )}
                    </button>
                    <p className="text-red-500 text-center text-sm font-semibold">{error}</p>
                    </form>

                    <p className='text-center mt-4 text-gray-600 text-[14px]'><Link to="/forgot-password" className="text-red-600">Forgot Password? </Link></p>
                    <p className='text-center mt-4 text-gray-600 text-[14px]'>Don't have an account? <Link to="/get-started" className="text-red-600">Sign up</Link></p>
                    <p className='text-center mt-5 text-gray-600 text-[10px]'>You agree to our Terms of Use and Privacy Policy</p> 
                </div>

                <div className='flex items-center justify-center mt-2'>
                    <p className='text-[12px] text-gray-400'>Powered by</p>
                    <img src={ChatLogo} className='h-8' />
                </div>

            </div> 
            <ChatContainer />    
        </>

    )
}

export default Login
// flex flex-col  