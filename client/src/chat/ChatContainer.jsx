import React, { useState } from 'react'
import ChatLogo from '../assets/Chat-Logo-01.png'
import LogoAI from '../assets/Live-AI-01.png'

import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

import { MdClose } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";

import { HiOutlinePlus } from "react-icons/hi";
import { GoArrowUp } from "react-icons/go";

import Onboard from './Onboard';

const ChatContainer = () => {
    const [ expand, setExpand ] = useState(false)
    const [ openChat, setOpenChat ] = useState(false)

    const [conversation, setConversation] = useState([
        {
            id: 1,
            sender: 'client',
            message: "Hi, I'm looking for a helpdesk solution for my business."
        },
        {
            id: 2,
            sender: 'consultant',
            zuri: LogoAI,
            message: `Hello! Welcome to Zuri Helpdesk. I'd be happy to help. Could you tell me a little about your business?`
        },
        {
            id: 3,
            sender: 'client',
            message: `We run an online store and receive customer enquiries through WhatsApp, email, and our website.`
        },
        {
            id: 4,
            sender: 'consultant',
            zuri: LogoAI,
            message: `Zuri Helpdesk is designed for businesses just like yours. It helps you manage all customer enquiries in one place, assign tickets to your support team, track response times, and ensure no customer request is missed.`
        }
    ])

    const [message, setMessage] = useState('')
  return (
    <>
        <div className={`${expand ? 'w-full max-w-150' : 'w-100'} ${ openChat ? 'flex' : 'hidden'} max-sm:w-90 flex-col justify-between z-10 bg-gray-200 max-sm:right-0 max-sm:h-screen right-4 top-5 h-140 bottom-50 fixed p-4 rounded-3xl shadow-xl overflow-y-auto justify-between transition-all duration-500 ease-in-out`}>
            <div className="flex items-center justify-between w-full relative">
                <button onClick={() => setExpand(!expand)} className='bg-gray-300 hover:bg-gray-400 p-2 rounded-full cursor-pointer max-sm:disabled'>
                    {expand 
                    ? <TbLayoutSidebarLeftExpand size={20} />
                    : <TbLayoutSidebarRightExpand size={20} />
                    }
                </button>

                <div className={`flex items-center bg-white rounded-full gap-2 p-2 w-full max-w-[165px] fixed shadow-2xl ${expand ? 'mx-50' : 'mx-20'} top-8`}>
                    <img src={LogoAI} className='h-10' />
                    <div>
                        <p className='font-bold text-[12px] -mb-2'>Zuri Helpdesk</p>
                        <span className="text-[12px]">AI Assistant</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setExpand(!expand)} className='bg-gray-300 hover:bg-gray-400 p-2 rounded-full cursor-pointer'>
                        <HiDotsHorizontal size={20} />
                    </button>

                    <button onClick={() => setOpenChat(!openChat)} className='bg-gray-300 hover:bg-gray-400 p-2 rounded-full cursor-pointer'>
                        <MdClose size={20} />
                    </button>  
                </div>
            </div>

            <div className={`flex flex-col gap-2 mt-4 overflow-y-auto ${expand ? 'h-100' : 'h-90'} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}>
                {conversation.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'} p-2`}>
                        <div className={`p-2 rounded-lg ${msg.sender === 'client' ? 'bg-green-500 text-gray-900 text-sm w-full max-w-[300px]' : 'text-black text-sm'} ${expand ? 'max-w-[400px]' : 'max-w-[300px]'}`}>

                                <div>
                                    {msg.sender === 'consultant' && (
                                        <img src={msg.zuri} className='h-8 mb-1' />
                                    )}
                                </div>
                                <div>
                                    {msg.message}
                                </div>
                     
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-between border border-gray-400 rounded-full w-full p-2 bg-white'>
                    <button onClick={() => setOpenChat(!openChat)} className='bg-gray-300 hover:bg-gray-400 p-2 rounded-full cursor-pointer'>
                        <HiOutlinePlus size={20} />
                    </button> 

                    <input
                    className='w-full bg-transparent resize-none focus:outline-none px-2 py-1 text-sm'
                    placeholder='Type your message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />

                    <button onClick={() => setOpenChat(!openChat)} className={`${message ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 text-gray-500'} p-2 rounded-full cursor-pointer`}>
                        <GoArrowUp size={20} />
                    </button> 
                </div>

                <div className='flex items-center justify-center my-2 '>
                    <p className='text-[10px]'>Powered by</p>
                    <img src={ChatLogo} className='h-5' />
                </div>
            </div>
        </div>

        {openChat ? null : <Onboard setOpenChat={ setOpenChat } />}
    </>
  )
}

export default ChatContainer