import { useQuery } from "@tanstack/react-query";

import { getUser } from "../services/requests";
import toast from "react-hot-toast";

export function useUser() {
    const userId = localStorage.getItem("userId");
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        enabled: !!userId,
        onError: (err) => {
            toast.error(`Failed to fetch user: ${err.message}`);
        },
    });

    return { user: data ?? null, isLoading };
}