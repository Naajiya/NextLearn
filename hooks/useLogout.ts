import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function (){
const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully!');
        router.push('/auth');
    };

    return { handleLogout };
}