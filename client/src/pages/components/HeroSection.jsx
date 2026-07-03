import React, { useState } from 'react'
import LogoBot from '../../assets/Zuri-01.png'

import { Link } from 'react-router-dom'

const HeroSection = () => {
  const[mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className='flex flex-col items-center bg-linear-to-b from-[#2F8CFF] to-white px-4 pt-6'>
        <nav className="flex items-center justify-center bg-[#4E9EFF] border border-white/40 rounded-full pl-4  pr-3 md:pr-2 py-1.5 w-full max-w-2xl" >
            <div>
                <img src={LogoBot} className='h-15'/>
            </div>
        </nav>

        <h1 className='text-5xl md:text-[62px]/18 text-white text-center max-w-[700px] mt-24 md:mt-30 bg-clip-text leading-tight font-bold tracking-tighter'>The live chat software that gets the job done</h1>
        <p className="text-md md:text-xl text-white text-center max-w-[480px] mt-2">
            Zuri® is intuitive customer service software. Quick to set up, easy for your team to use and a go-to choice for your customers.
        </p>

        <div className='flex gap-4 mt-8'>
            <Link to="/get-started" className="border border-white hover:bg-sky-200/30 text-white text-sm px-6 py-3 rounded-full tracking-tight transition cursor-pointer">
                Get started
            </Link>
            <button className="bg-amber-600 hover:bg-amber-700 text-sm text-white px-5 py-3 rounded-full tracking-tight transition cursor-pointer">
                Chat with us
            </button>
        </div>

        <div className='mt-12.5 w-full'>
            <img src="https://assets.prebuiltui.com/images/components/hero-section/hero-modern-dashboard.png" alt="dashboardImg" className='border-4 md:border-8 border-blue-300 rounded-2xl object-cover object-top mx-auto max-h-full md:max-h-full w-full max-w-[926px]' />
        </div>

        <div className='flex gap-4 my-10'>
            <button className="border border-black hover:bg-black hover:text-white text-black text-sm px-6 py-3 rounded-sm tracking-tight transition cursor-pointer">
                Watch a 4-Minute Zuri® Demo
            </button>
        </div>
    </div>
  )
}

export default HeroSection
//   md:rounded-t-2xl md:rounded-b-none md:border-b-0 