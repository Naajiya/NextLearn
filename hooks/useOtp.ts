import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { setMobile as setMobileInStore, setCredentials } from '@/store/authSlice';
import { sendOTP } from "@/services/api";

export default function () {
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const mob = useAppSelector((state) => state.auth.mobile);

    const countryCodes = [
        { code: '+91', country: 'India', maxLength: 10 },
        { code: '+1', country: 'USA/Canada', maxLength: 10 },
        { code: '+44', country: 'UK', maxLength: 10 },
        { code: '+61', country: 'Australia', maxLength: 9 },
        { code: '+971', country: 'UAE', maxLength: 9 },
    ];

    const getMaxLength = () => {
        const selected = countryCodes.find(c => c.code === countryCode);
        return selected ? selected.maxLength : 10;
    };

    const handleMobileChange = (e: any) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        const maxLength = getMaxLength();
        if (value.length <= maxLength) {
            setMobile(value);
            setError('');
        }
    };

    const validateMobileNumber = () => {
        if (!mobile) {
            setError('Please enter mobile number');
            return false;
        }

        const selectedCountry = countryCodes.find(c => c.code === countryCode);
        const maxLength = selectedCountry?.maxLength || 10;

        if (mobile.length !== maxLength) {
            setError(`Please enter a valid ${selectedCountry?.country} mobile number (${maxLength} digits)`);
            return false;
        }

        if (countryCode === '+91') {
            const firstDigit = mobile.charAt(0);
            if (!['6', '7', '8', '9'].includes(firstDigit)) {
                setError('Indian mobile number must start with 6, 7, 8, or 9');
                return false;
            }
        }

        return true;
    };

    const handleGetStarted = async () => {
        if (!validateMobileNumber()) {
            toast.error(error);
            return;
        }

        const fullMobileNumber = `${countryCode}${mobile}`;
        console.log("Sending OTP to:", fullMobileNumber);

        setLoading(true);
        setError('');

        try {
            // const formData = new URLSearchParams();
            // formData.append('mobile', fullMobileNumber);

            // const res = await axios.post(
            //     'https://nexlearn.noviindusdemosites.in/auth/send-otp',
            //     formData,
            //     {
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded',
            //         },
            //     }
            // );
            const res = await sendOTP(fullMobileNumber);

            console.log("API Response:", res.data);

            if (res.data.success) {
                toast.success('OTP sent successfully!');
                localStorage.setItem('mobileNumber', fullMobileNumber);
                dispatch(setMobileInStore(fullMobileNumber));
                router.push('/auth/verify');
            } else {
                setError(res.data.message || 'Failed to send OTP');
                toast.error(res.data.message || 'Failed to send OTP');
            }
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMessage = error.response?.data?.message || 'Network error. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
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
        mobile,
    }
}