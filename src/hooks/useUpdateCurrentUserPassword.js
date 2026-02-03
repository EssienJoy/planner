import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUserPassword as updateCurrentUserPasswordApi } from "../api/auth";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

export function useUpdateCurrentUserPassword() {
    const queryClient = useQueryClient();

    const {
        mutate: updateCurrentUserPassword,
        isPending,
    } = useMutation({
        mutationFn: updateCurrentUserPasswordApi,
        onSuccess: () => {
            toast.success("Data Updated Successfully");
            queryClient.invalidateQueries(['user']);
        },
        onError: (err) => {
            handleApiError(err);
        },
    });

    return { updateCurrentUserPassword, isPending };
}
