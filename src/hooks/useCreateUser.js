import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/requests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateUser() {
    const navigate = useNavigate();
    const {
        mutate: addUser,
        isPending,
    } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully!");
            navigate("/login");
        },
        onError: (err) => {
            toast.error(err.message);

        },
    });

    return { addUser, isLoading: isPending };
}
