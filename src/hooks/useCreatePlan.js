import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlanApi } from "../services/requests";
import toast from "react-hot-toast";

export function useCreatePlan() {
    const queryClient = useQueryClient();

    const { mutate: createPlan, isPending } = useMutation({
        mutationFn: (data) => createPlanApi(data),
        onSuccess: () => {
            toast.success('Plan Succesfully Created');
            queryClient.invalidateQueries({ queryKey: ["plans"] });
        },
        onError: (err) => {
            toast.error(` ${err.message}`);
        },
    });

    return { createPlan, isPending };
}
