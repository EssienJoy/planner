import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoalApi } from "../services/requests";
import toast from "react-hot-toast";

export function useCreateGoal() {
	const queryClient = useQueryClient();

	const {
		mutate: createGoal,
		isPending,

	} = useMutation({
		mutationFn: (data) => createGoalApi(data),
		onSuccess: (data) => {
			toast.success('Goal succesfully created');
			queryClient.invalidateQueries({ queryKey: ["goals"] });

			queryClient.invalidateQueries({ queryKey: ["goals", data.planId] });
		},
		onError: (err) => {
			toast.error("Failed to create goal", err);
		},
	});

	return { createGoal, isPending };
}
