import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGoalApi } from '../services/requests';
import toast from "react-hot-toast";

export function useDeleteGoal() {
    const queryClient = useQueryClient();

    const { mutate: deleteGoal, isPending } = useMutation({
        mutationFn: deleteGoalApi,
        onSuccess: () => {
            toast.success('Goal deleted successfully');
            queryClient.invalidateQueries(['plans']);
        },
        onError: (err) => {
            toast.error('Failed to delete Goal:', err);
        },
    });

    return { deleteGoal, isPending };
}