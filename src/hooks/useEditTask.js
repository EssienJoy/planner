import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask as editTaskApi } from "../api/task";

export function useEditTask() {
    const queryClient = useQueryClient();

    const { mutate: editTask, isPending } = useMutation({
        mutationFn: (task) => editTaskApi({ taskId: task.id, data: task.data }),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        }
    });

    return { editTask, isPending };
}