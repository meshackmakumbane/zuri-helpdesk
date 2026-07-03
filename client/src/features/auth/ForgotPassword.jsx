import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import Logo from '../../assets/Chat-Logo-01.png'
import ChatLogo from '../../assets/Chat-Logo-01.png'

import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

import { LuLoader } from "react-icons/lu";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleForgotPassoword = async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const { data } = await api.post('/api/auth/forgot-password', { email })
            toast.success("Check your email", {
                description : `We have sent reset instructions to ${email}`
            })
            if(data.success === true){
                setSuccess(true)
            }
        } catch (error) {
            setErrorMessage(error.message || "Error in resetting password")
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(success === true){
            navigate('/reset-password')
        }
    },[success])

  return ( 
    <>
        <Toaster position="top-right" />
        <div>
        <div className='flex items-center justify-between bg-gradient-to-b from-[#2F8CFF] to-white px-4 pt-6'>
                <Link to='/'>
                <img src={Logo} alt="Logo" className='h-10'/>
                </Link>
                <Link to='/auth/login' className="border-2 border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-sm text-white px-8 py-2 rounded-md tracking-tight transition cursor-pointer">
                    Log in
                </Link>
        </div>

        <div>
            <h1 className='text-2xl font-bold text-center mt-10'>Forgot password?</h1>
            <p className='text-center mt-2 text-gray-600'>No worries! Just enter your email <br />and we’ll send you login instructions.</p>
        </div>

        <div className='flex flex-col  justify-center mt-5 px-4 w-full md:w-1/2 lg:w-1/3 mx-auto'>
            <form onSubmit={handleForgotPassoword}>
                <fieldset className='border border-gray-200 rounded mt-2 flex items-center'>
                    <legend className='pl-4 px-3 text-md font-semibold text-gray-800'>Business Email</legend>
                    <input 
                        className="w-full bg-transparent mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                        type='email' 
                        placeholder="name@work-email.com" 
                        required 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>


                <button
                    type="submit"
                    className="w-full mb-3 bg-black py-2.5 rounded hover:bg-red-700 text-white mt-4 cursor-pointer flex items-center justify-center"
                >
                    {status === "loading" ? (
                    <LuLoader className="animate-spin" size={22} />
                    ) : (
                    "Send reset email"
                    )}
                </button>
                <p className="text-red-500 text-center text-sm font-semibold"></p>
            </form>

            <div className='flex items-center justify-center mt-2'>
                <p className='text-[12px] text-gray-400'>Powered by</p>
                <img src={ChatLogo} className='h-6' />
            </div>
        </div>

        </div>
    </>
  )
}

export default ForgotPassword