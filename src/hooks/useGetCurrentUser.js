import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";

export function useGetCurrentUser() {
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    // console.log(user);

    return { user, isLoading, isError, error, isAuthenticated: user?.role === 'user' };
}