import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../api/auth";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";
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
            handleApiError(err);
        },
    });
    return { logout, isPending };
}