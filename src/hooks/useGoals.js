import { useQuery } from "@tanstack/react-query";

import { getGoals } from "../services/requests";

export function useGoals(planId) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["goals"],
        queryFn: () => getGoals(planId),
        enabled: !!planId,
    });

    return { goals: data ?? [], isLoading, error };

}