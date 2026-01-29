import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUserPassword as updateCurrentUserPasswordApi } from "../api/auth";
import toast from "react-hot-toast";

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
            toast.error(err.message);
        },
    });

    return { updateCurrentUserPassword, isPending };
}
