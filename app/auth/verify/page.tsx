'use client'
import Authentication from '@/components/Authentication'
import useVerify from '@/hooks/useVerify';
import { useAppSelector } from '@/store/hooks';
import { TextField } from '@mui/material';
import { useEffect,useRef} from 'react';
import toast from 'react-hot-toast';

function page() {
    const {
        otp,
        setOtp,
        loading,
        setLoading,
        handleVerify,
        mobile,
        router
    } = useVerify()

     const redirected = useRef(false);


    useEffect(() => {
        if (!mobile && !redirected.current) {
            redirected.current = true;
            toast.error('Session expired. Please try again.');
            router.push('/auth');
        }
    }, []);

     if (!mobile) return null;
    return (
        <main className='min-h-screen w-full flex flex-col lg:flex-row bg-[#1C3141]'>
            <Authentication />
            <div className='w-full lg:w-1/2 min-h-screen lg:min-h-0 bg-white
                  lg:my-4 lg:mr-4 lg:rounded-2xl 
                  p-6 sm:p-4 flex flex-col justify-between'>
                <div>
                    <h3 className='text-2xl sm:text-2xl font-semibold text-gray-800'>
                        Enter the code we texted you
                    </h3>
                    <p className='mt-2 text-gray-600 text-sm sm:text-base'>
                        We've sent an SMS to {String(mobile)}
                    </p>
                    <div className='mt-3'>
                        <TextField
                            label="SMS code"
                            variant="outlined"
                            fullWidth
                            type="tel"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            inputProps={{ maxLength: 6 }}
                        />
                    </div>
                    <p className='text-sm mt-5'>Your 6 digit code is on the way. This can sometime taken a few moments to arrive</p>
                </div>
                <div className=''>
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className='w-full bg-[#1C3141] text-white rounded-xl p-3 
                                  font-semibold transition-all duration-200
                                  disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? 'Verifying...' : 'Get Started'}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default page