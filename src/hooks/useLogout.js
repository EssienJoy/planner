import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../api/auth";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useLogout() {
    // const navigate = useNavigate();
    const {
        mutate: logout,
        isPending,
    } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            window.location.href = "/";
            toast.success("Account Logged out Successfully");
        },
        onError: (err) => {
            if (err.message.startsWith('Failed')) {
                return toast.error('Check Internet connection');
            }
            toast.error(err.message);
        },
    });
    return { logout, isPending };
}