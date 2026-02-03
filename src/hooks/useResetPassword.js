import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../api/auth";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

export function useResetPassword() {
    const {
        mutate: forgotPassword,
        isPending,
    } = useMutation({
        mutationFn: forgotPasswordApi,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (err) => {
            handleApiError(err);

        },
    });

    return { forgotPassword, isPending };
}
