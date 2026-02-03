import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";

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
            handleApiError(err);
        },
    });

    return { signUp, isPending };
}
