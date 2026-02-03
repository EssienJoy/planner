import { useQuery } from "@tanstack/react-query";
import { getAllPlans } from "../api/plan";

export function usePlans(id) {
    const { data: plans, isLoading } = useQuery({
        queryKey: ["plans", id],
        queryFn: () => getAllPlans(id),
        enabled: !!id,
    });


    return { plans, isLoading };
}