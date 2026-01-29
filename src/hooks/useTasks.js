import { useQuery } from "@tanstack/react-query";
import { getAllTask } from "../api/task";
import { useParams } from "react-router-dom";

export function useTasks() {
    const { planId } = useParams();
    const { data: tasks, isLoading, } = useQuery({
        queryKey: ["tasks", planId],
        queryFn: () => getAllTask(planId),
    });

    return { tasks, isLoading };

}