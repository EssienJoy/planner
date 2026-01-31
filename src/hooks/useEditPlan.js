import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPlan as editPlanApi } from "../api/plan";
import toast from "react-hot-toast";

export function useEditPlan() {
    const queryClient = useQueryClient();

    const { mutate: editPlan, isPending } = useMutation({
        mutationFn: ({ plan, planId }) => editPlanApi({ plan, planId }),
        onSuccess: () => {
            toast.success('Plan Succesfully Updated');
            queryClient.invalidateQueries({ queryKey: ["plans"] });
        },
        onError: (err) => {
            toast.error(` ${err.message}`);
        },
    });

    return { editPlan, isPending };
}
