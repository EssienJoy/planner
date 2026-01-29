import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
    const navigate = useNavigate();
    const {
        mutate: signUp,
        isPending,
    } = useMutation({
        mutationFn: signUpApi,
        onSuccess: () => {
            toast.success("Account Created Successfully");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.message);

        },
    });

    return { signUp, isPending };
}
