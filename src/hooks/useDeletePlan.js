import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlan as deletePlanApi } from "../api/plan";
import toast from "react-hot-toast";

export function useDeletePlan() {
    const queryClient = useQueryClient();

    const { mutate: deletePlan, isPending } = useMutation({
        mutationFn: deletePlanApi,
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