import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import toast from "react-hot-toast";
import { setCredentials } from '@/store/authSlice';
import { verifyOTP } from "@/services/api";

export default function () {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

 const mobile = useAppSelector((state) => state.auth.mobile);

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);

    try {
      if (
        mobile
      ) {
        const res = await verifyOTP(mobile, otp);



        if (res.data.success) {
          if (res.data.login === true) {
            // Existing user → save token → go to exam
            dispatch(setCredentials({
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token,
            }));
            toast.success('Login successful!');
            router.push('/exam');
          } else {
            // New user → go to create profile
            toast.success('OTP verified!');
            router.push('/auth/profile');
          }
        } else {
          toast.error(res.data.message || 'Invalid OTP');
        }
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Network error. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    loading,
    setLoading,
    handleVerify,
    mobile,
    router
  }
}