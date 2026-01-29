import { useQuery } from "@tanstack/react-query";
import { getPlan } from "../api/plan";

export function usePlan(planId) {
    const { data: plan, isLoading } = useQuery({
        queryKey: ["plan", planId],
        queryFn: () => getPlan(planId),
    });

    return { plan, isLoading };
}