
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { setCredentials, setUser } from '@/store/authSlice';
import { createProfile } from "@/services/api";

export default function () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [qualification, setQualification] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const mobile = useAppSelector((state) => state.auth.mobile);

    const redirected = useRef(false);
    useEffect(() => {
        if (!mobile && !redirected.current) {
            redirected.current = true;
            toast.error('Session expired. Please start again.');
            router.push('/auth');
        }
    }, []);

    const validate = () => {
        if (!name.trim()) {
            toast.error('Please enter your name');
            return false;
        }
        if (!email.trim()) {
            toast.error('Please enter your email');
            return false;
        }
        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (!qualification.trim()) {
            toast.error('Please enter your qualification');
            return false;
        }
        if (!profileImage) {
            toast.error('Please upload a profile image');
            return false;
        }
        return true;
    };

    const handleCreateProfile = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await createProfile({
                mobile,
                name,
                email,
                qualification,
                profile_image: profileImage!,
            });

            if (res.data.success) {
                // Save token and user in Redux
                dispatch(setCredentials({
                    access_token: res.data.access_token,
                    refresh_token: res.data.refresh_token,
                }));

                // Save user details if returned
                if (res.data.user) {
                    dispatch(setUser(res.data.user));
                }

                toast.success('Profile created successfully!');
                router.push('/exam');
            } else {
                toast.error(res.data.message || 'Failed to create profile');
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
    }
}