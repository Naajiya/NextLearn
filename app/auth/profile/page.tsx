'use client'

import Authentication from '@/components/Authentication'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'
import cameraIcon from "../../../public/auth/CameraPlus.png"
import useProfile from '@/hooks/useProfile'

function page() {
    const {
        name,
        setName,
        email,
        setEmail,
        qualification,
        setQualification,
        profileImage,
        profileImagePreview,
        loading,
        mobile,
        router,
        fileInputRef,
        handleCreateProfile,
        setProfileImage,
        setProfileImagePreview
    } = useProfile()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file))
        }
    }
    return (
        <main className='min-h-screen w-full flex flex-col lg:flex-row bg-[#1C3141]'>
            <Authentication />
            <div className='w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white
                      lg:my-4 lg:mr-4 lg:rounded-2xl 
                      p-6 sm:p-4 flex flex-col justify-between'>
                <div>
                    <div className='mb-6'>
                        <p className='text-3xl font-semibold text-[#1C3141]'>Add Your Details</p>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <div className='mb-3 text-center'>
                            <label className="relative w-50 h-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition overflow-hidden">

                                {profileImagePreview ? (
                                    <Image
                                        src={profileImagePreview}
                                        alt="preview"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <>
                                        <Image
                                            src={cameraIcon}
                                            alt="upload"
                                            width={40}
                                            height={40}
                                        />

                                        <p className="mt-3 text-gray-400">
                                            Add Your Profile picture
                                        </p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            type="text"
                            placeholder='Enter your full name'
                            className='w-full rounded-3xl'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            placeholder='Enter your full name'
                            className='w-full rounded-3xl'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField
                            id="qualification"
                            label="Qualification"
                            variant="outlined"
                            fullWidth
                            type="text"
                            placeholder='Enter your full name'
                            className='w-full rounded-3xl'
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleCreateProfile}
                        disabled={loading}
                        className='w-full mt-6 bg-[#1C3141] text-white rounded-xl p-3
                     font-semibold transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? 'Creating Profile...' : 'Get Started'}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default page