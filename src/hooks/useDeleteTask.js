import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask as deleteTaskApi } from "../api/task";
import toast from "react-hot-toast";

export function useDeleteTask() {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isPending } = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => {
            toast.success('Task deleted Successfully');
            queryClient.invalidateQueries(['Tasks']);
        },
        onError: (err) => {
            toast.error('Failed to delete task:', err);
        },
    });

    return { deleteTask, isPending };
}