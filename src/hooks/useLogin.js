import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    const {
        mutate: login,
        isPending,
    } = useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            toast.success("Account Created Successfully");
            navigate("/");
        },
        onError: (err) => {
            if (err.message.startsWith('Failed')) {
                return toast.error('Check Internet connection');
            }
            toast.error(err.message);
        },
    });
    return { login, isPending };
}