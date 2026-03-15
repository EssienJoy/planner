import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask as editTaskApi } from "../../../api/task";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/handleApiError";

export function useEditTask() {
    const queryClient = useQueryClient();

    const { mutate: editTask, isPending } = useMutation({
        mutationFn: (task) => editTaskApi({ taskId: task.id, data: task.data }),
        onSuccess: () => {
            toast.success('Task Succesfully Updated');
            queryClient.invalidateQueries(['tasks']);
        }, onError: (err) => {
            handleApiError(err);
        }
    });

    return { editTask, isPending };
}