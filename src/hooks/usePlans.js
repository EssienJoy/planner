import { useQuery } from "@tanstack/react-query";

import { getPlans } from "../services/requests";

export function usePlans() {
    const { data, isLoading } = useQuery({
        queryKey: ["plans"],
        queryFn: getPlans,
    });


    return { plans: data, isLoading };
}