import toast from "react-hot-toast";

export function handleApiError(err) {
    console.error(err);

    // ✅ Fetch / browser network error
    if (err instanceof TypeError) {
        toast.error("Unable to connect. Please check your internet and try again.");
        return;
    }

    // ✅ Axios network error
    if (err.code === "ERR_NETWORK") {
        toast.error("Unable to connect. Please check your internet and try again.");
        return;
    }

    // ✅ Backend responded (Axios)
    if (err.response) {
        toast.error(
            err.response.data?.message || "Something went wrong. Please try again."
        );
        return;
    }

    // ✅ Fallback
    toast.error(err.message || "Something went wrong. Please try again.");
}
