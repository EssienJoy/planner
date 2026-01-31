import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask as editTaskApi } from "../api/task";
import toast from "react-hot-toast";

export function useEditTask() {
    const queryClient = useQueryClient();

    const { mutate: editTask, isPending } = useMutation({
        mutationFn: (task) => editTaskApi({ taskId: task.id, data: task.data }),
        onSuccess: () => {
            toast.success('Task Succesfully Updated');
            queryClient.invalidateQueries(['tasks']);
        }, onError: (err) => {
            toast.error(err.message);
        }
    });

    return { editTask, isPending };
}