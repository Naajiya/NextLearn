import React from 'react'
import nextLearn from "../public/auth/nextLearn.png"
import learn from "../public/auth/Learn.png"
import Image from 'next/image'


function Authentication() {
    return (
        <div className='hidden lg:flex w-full lg:w-1/2 flex-col items-center justify-between p-8'>
            <div className='w-full flex justify-center'>
                <Image src={nextLearn} alt='nextlearn' priority />
            </div>
            <div className='w-full flex justify-center'>
                <Image className='w-3/5' src={learn} alt='learn' />
            </div>
        </div>
    )
}

export default Authentication