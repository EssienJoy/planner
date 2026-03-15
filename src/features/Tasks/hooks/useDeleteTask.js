import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask as deleteTaskApi } from "../../../api/task";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/handleApiError";

export function useDeleteTask() {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isPending } = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => {
            toast.success('Task deleted Successfully');
            queryClient.invalidateQueries(['Tasks']);
        },
        onError: (err) => {
            handleApiError(err);
        },
    });

    return { deleteTask, isPending };
}