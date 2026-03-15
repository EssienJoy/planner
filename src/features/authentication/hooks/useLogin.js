import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../../utils/handleApiError";
import { login as loginApi } from "../../../api/auth";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        mutate: login,
        isPending,
    } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            toast.success("Successfully logged in");
            queryClient.setQueryData(["user"], data.user);
            navigate("/");
        },
        onError: (err) => {
            handleApiError(err);
        },
    });
    return { login, isPending };
}