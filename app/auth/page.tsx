"use client"

import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, MenuItem, Select, CircularProgress } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import useOtp from "@/hooks/useOtp";
import Authentication from '@/components/Authentication';

function Page() {
    const {
         loading,
        setLoading,
        error,
        setError,
        countryCode,
        setCountryCode,
        countryCodes,
        getMaxLength,
        handleGetStarted,
        validateMobileNumber,
        handleMobileChange,
        setMobile,
        mobile
    }= useOtp()

    return (
        <div className='min-h-screen w-full flex flex-col lg:flex-row bg-[#1C3141]'>
           
            
            {/* Left Section - Hidden on mobile */}
           <Authentication/>

            {/* Right Section - Form */}
            <div className='w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white
                  lg:my-8 lg:mr-8 lg:rounded-2xl 
                  p-6 sm:p-8 flex flex-col justify-between'>
                
                <div className='flex-1'>
                    <h3 className='text-2xl sm:text-3xl font-semibold text-gray-800'>
                        Enter your phone number
                    </h3>
                    <p className='mt-2 text-gray-600 text-sm sm:text-base'>
                        We use your mobile number to identify your account
                    </p>
                    
                    <div className="mt-6">
                        <TextField
                            id="mobile-number"
                            label="Phone number"
                            variant="outlined"
                            fullWidth
                            type="tel"
                            placeholder={countryCode === '+91' ? "9876543210" : "Enter mobile number"}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FormControl variant="standard" sx={{ minWidth: 70 }}>
                                            <Select
                                                value={countryCode}
                                                onChange={(e) => {
                                                    setCountryCode(e.target.value);
                                                    setMobile('');
                                                    setError('');
                                                }}
                                                disableUnderline
                                                disabled={loading}
                                                sx={{
                                                    fontSize: 'inherit',
                                                    '& .MuiSelect-select': {
                                                        padding: '8px 0',
                                                        color: '#1C3141',
                                                        fontWeight: 500,
                                                    },
                                                }}
                                            >
                                                {countryCodes.map((country) => (
                                                    <MenuItem key={country.code} value={country.code}>
                                                        {country.code}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </InputAdornment>
                                ),
                            }}
                            value={mobile}
                            onChange={handleMobileChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && mobile.length === getMaxLength() && !loading) {
                                    handleGetStarted();
                                }
                            }}
                            helperText={
                                error || (
                                    mobile.length > 0 && mobile.length !== getMaxLength()
                                        ? `Enter ${getMaxLength()}-digit mobile number`
                                        : " "
                                )
                            }
                            error={!!error || (mobile.length > 0 && mobile.length !== getMaxLength())}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#1C3141',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1C3141',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1C3141',
                                },
                            }}
                        />
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4">
                        By tapping Get Started, you agree to the terms & conditions
                    </p>
                </div>

                <div className="actions mt-6">
                    <button 
                        onClick={handleGetStarted} 
                        disabled={loading || !mobile || mobile.length !== getMaxLength()}
                        className={`w-full bg-[#1C3141] text-white rounded-xl p-3 
                                  font-semibold transition-all duration-200
                                  ${(loading || !mobile || mobile.length !== getMaxLength()) 
                                      ? 'opacity-50 cursor-not-allowed' 
                                      : 'hover:bg-[#2A4559] transform hover:scale-[1.02]'
                                  }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <CircularProgress size={20} color="inherit" />
                                <span>Sending OTP...</span>
                            </div>
                        ) : (
                            'Get Started'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page;