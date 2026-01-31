import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask as createTaskApi } from "../api/task";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useCreateTask() {
	const queryClient = useQueryClient();

	const { planId } = useParams();

	const {
		mutate: createTask,
		isPending,

	} = useMutation({
		mutationFn: (task) => createTaskApi({ data: task, planId }),
		onSuccess: () => {
			toast.success('Task succesfully created');
			queryClient.invalidateQueries({ queryKey: ["tasks"] });

			queryClient.invalidateQueries({ queryKey: ["tasks", planId] });
		},
		onError: (err) => {
			toast.error("Failed to create goal", err);
		},
	});

	return { createTask, isPending };
}
