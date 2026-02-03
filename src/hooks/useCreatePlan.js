import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlan as createPlanApi } from "../api/plan";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

export function useCreatePlan() {
    const queryClient = useQueryClient();

    const { mutate: createPlan, isPending } = useMutation({
        mutationFn: (data) => createPlanApi(data),
        onSuccess: () => {
            toast.success('Plan Succesfully Created');
            queryClient.invalidateQueries({ queryKey: ["plans"] });
        },
        onError: (err) => {
            handleApiError(err);
        },
    });

    return { createPlan, isPending };
}
