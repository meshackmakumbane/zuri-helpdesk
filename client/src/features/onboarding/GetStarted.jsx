import React, { useState } from 'react'
import Logo from '../../assets/Chat-Logo-01.png'
import ChatLogo from '../../assets/Chat-Logo-01.png'
import { Link, useNavigate } from 'react-router-dom'

import { createBusiness } from './onboardingSlice'
import { useDispatch, useSelector } from 'react-redux'

import { LuLoader } from "react-icons/lu";

import { clearError } from './onboardingSlice'

import ChatContainer from '../../chat/ChatContainer'

const GetStarted = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { business, status, error } = useSelector(state => state.onboard)
  const [businessForm, setBusinessForm] = useState({
    businessName: '',
    businessEmail: ''
  })

  const onboarding = async (e) => {
    e.preventDefault();

    dispatch(clearError());

    try {
      const resultAction = await dispatch(createBusiness(businessForm));

      if (createBusiness.fulfilled.match(resultAction)) {
        
        setBusinessForm({
          businessName: "",
          businessEmail: "",
        });

        navigate("/verify-email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
          <div className='flex items-center justify-between bg-gradient-to-b from-[#2F8CFF] to-white px-4 pt-6'>
            <Link to='/'>
              <img src={Logo} alt="Logo" className='h-10'/>
            </Link>
              <button className="border-2 border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-sm text-white px-8 py-2 rounded-md tracking-tight transition cursor-pointer">
                  Log in
              </button>
          </div>

          <div>
            <h1 className='text-3xl font-bold text-center mt-10'>Welcome to Zuri®</h1>
            <p className='text-center mt-4 text-gray-600'>One-stop solution for efficient customer support.</p>
          </div>

          <div className='flex flex-col items-center justify-center mt-5 px-4 w-full md:w-1/2 lg:w-1/3 mx-auto'>
              <form onSubmit={onboarding}>
                <input 
                  className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                  type="text" 
                  placeholder="Business Name" 
                  required 
                  name="businessName"
                  value={businessForm.businessName}
                  onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
                />

                <input 
                  className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                  type="text" 
                  placeholder="Business Email" 
                  required 
                  name="businessEmail"
                  value={businessForm.businessEmail}
                  onChange={(e) => setBusinessForm({ ...businessForm, businessEmail: e.target.value })}
                />

                <button
                  type="submit"
                  className="w-full mb-3 bg-red-700 py-2.5 rounded text-white mt-4 cursor-pointer flex items-center justify-center"
                >
                  {status === "loading" ? (
                    <LuLoader className="animate-spin" size={22} />
                  ) : (
                    "Sign up"
                  )}
                </button>
                <p className="text-red-500 text-center text-sm font-semibold">{error}</p>
              </form>

              <p className='text-center mt-4 text-gray-600 text-[14px]'>Already have an account? <Link to="#" className="text-red-600">Log in</Link></p>
              <p className='text-center mt-10 text-gray-600 text-sm'>You agree to our Terms of Use and Privacy Policy</p> 
          </div>

          <div className='flex items-center justify-center mt-2'>
              <p className='text-[10px]'>Powered by</p>
              <img src={ChatLogo} className='h-5' />
          </div>

      </div>
      <ChatContainer />
    </>
  )
}

export default GetStarted