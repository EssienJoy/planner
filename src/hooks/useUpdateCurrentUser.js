import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../api/user";
import toast from "react-hot-toast";

export function useUpdateCurrentUser() {
    const queryClient = useQueryClient();

    const {
        mutate: updateCurrentUser,
        isPending,
    } = useMutation({
        mutationFn: updateCurrentUserApi,
        onSuccess: () => {
            toast.success("Data Updated Successfully");
            queryClient.invalidateQueries(['user']);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { updateCurrentUser, isPending };
}
