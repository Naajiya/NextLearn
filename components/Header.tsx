'use client'

import React from 'react'
import nextLearn from "../public/auth/nextLearnBlue.png"
import Image from 'next/image'
import useLogout from '@/hooks/useLogout'

function Header() {
    const {
        handleLogout
    } = useLogout()
    return (
        <div>
            <header className='flex p-1 items-center justify-center'>
                <div className='w-1/2 flex items-center justify-end'>
                    <Image src={nextLearn} alt='nextlearn' priority />
                </div>
                <div className='w-1/2 flex justify-end items-center'>
                    <button
                        className=' bg-[#177A9C] text-white rounded px-3 p-2
                     font-semibold transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed mr-3' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Header