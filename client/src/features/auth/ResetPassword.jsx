import React, { useState } from 'react'

import Logo from '../../assets/Chat-Logo-01.png'
import ChatLogo from '../../assets/Chat-Logo-01.png'

import { Link } from 'react-router-dom'

import { LuLoader } from "react-icons/lu";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

import { clearError, resetPassword } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';

const RecoverPassword = () => {
 const { user, status, error } = useSelector((state) => state.auth);
const dispatch = useDispatch();

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const passwordChange = (e) => {
  e.preventDefault();

  dispatch(clearError());

  if (!password || !confirmPassword) {
    return alert("Please fill in all fields.");
  }

  if (password.length < 8) {
    return alert("Password must be at least 8 characters long.");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match.");
  }

  dispatch(resetPassword({ password }));

  setPassword("");
  setConfirmPassword("");
};

  return (
    <>
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
          <h1 className='text-2xl font-bold text-center mt-10'>Reset Password</h1>
          <p className='text-center mt-2 text-gray-600'>Create a new password for your account.</p>
      </div>

       <div className='flex flex-col  justify-center mt-5 px-4 w-full md:w-1/2 lg:w-1/3 mx-auto'>
          <form onSubmit={passwordChange}>
              <fieldset className='border border-gray-200 rounded mt-2 flex items-center'>
                  <legend className='pl-4 px-3 text-md font-semibold text-gray-800'>Password</legend>
                  <input 
                      className="w-full bg-transparent mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="New Password" 
                      required 
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <span 
                      onClick={()=> setShowPassword(!showPassword)}
                      className='pr-4 cursor-pointer'
                  >
                      {showPassword ? <PiEyeSlash size={25} /> : <PiEyeLight size={25} />} 
                  </span>
              </fieldset>

              <fieldset className='border border-gray-200 rounded mt-2 flex items-center'>
                  <legend className='pl-4 px-3 text-md font-semibold text-gray-800'>Confirm Password</legend>
                  <input 
                      className="w-full bg-transparent mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Confirm Password" 
                      required 
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />

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
              <p className="text-red-500 text-center text-sm font-semibold"></p>
          </form>

          <p className='text-center mt-4 text-gray-600 text-[14px]'>Don't have an account? <Link to="/get-started" className="text-red-600">Sign up</Link></p>
          <p className='text-center mt-10 text-gray-600 text-[10px]'>You agree to our Terms of Use and Privacy Policy</p> 
      </div>

      <div className='flex items-center justify-center mt-2'>
          <p className='text-[12px] text-gray-400'>Powered by</p>
          <img src={ChatLogo} className='h-8' />
      </div>
    </div>
    </>
  )
}

export default RecoverPassword