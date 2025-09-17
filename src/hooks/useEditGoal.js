import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editGoalApi } from '../services/requests';

export function useEditGoal() {
    const queryClient = useQueryClient();

    const { mutate: editGoal, isPending } = useMutation({
        mutationFn: ({ goalId, data }) => editGoalApi(goalId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['goal']);
        }
    });

    return { editGoal, isPending };
}