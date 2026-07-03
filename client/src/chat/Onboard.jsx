import React from 'react'
import ChatLogo from '../assets/Zuri-Icon-01.png'

const Onboard = ({ setOpenChat }) => {
  return (
    <div className='z-10 fixed bg-green-400 rounded-full w-15 bottom-10 right-5 cursor-pointer hover:bg-green-500' onClick={() => setOpenChat(true)}>
      <img src={ChatLogo} className='h-15'/>
    </div>
  )
}

export default Onboard