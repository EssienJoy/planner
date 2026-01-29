import { useQuery } from "@tanstack/react-query";
import { getAllPlans } from "../api/plan";

export function usePlans(id) {
    const { data: plans, isLoading } = useQuery({
        queryKey: ["plans"],
        queryFn: () => getAllPlans(id),
    });


    return { plans, isLoading };
}