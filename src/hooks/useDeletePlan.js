import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlanId } from '../services/requests';
import toast from "react-hot-toast";

export function useDeletePlan() {
    const queryClient = useQueryClient();

    const { mutate: deletePlan, isPending } = useMutation({
        mutationFn: deletePlanId,
        onSuccess: () => {
            toast.success('Plan deleted Successfully');
            queryClient.invalidateQueries(['plans']);
        },
        onError: (err) => {
            toast.error('Failed to delete plan:', err);
        },
    });

    return { deletePlan, isPending };
}