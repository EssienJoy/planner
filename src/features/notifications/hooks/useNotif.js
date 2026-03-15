import { useQuery } from "@tanstack/react-query";
import { getUserNotif } from "../../../api/notification";

export function useNotif() {
    const { data: notifs, isLoading } = useQuery({
        queryKey: ["Notifications"],
        queryFn: () => getUserNotif(),
        // refetchInterval: 5000,
        // refetchIntervalInBackground: true,
        // enabled: !!id,
    });


    return { notifs, isLoading };
}