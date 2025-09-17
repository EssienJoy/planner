import { useQuery } from "@tanstack/react-query";

import { getPlan } from "../services/requests";

export function usePlan(planId) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["plan", planId],
        queryFn: () => getPlan(planId),
        // enabled: !!planId,
    });

    return { plan: data ?? {}, isLoading, error };
}