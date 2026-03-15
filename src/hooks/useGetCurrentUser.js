import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";

export function useGetCurrentUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    });


    return { user, isLoading, isAuthenticated: !!user };
}