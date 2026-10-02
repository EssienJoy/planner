import { BACKEND_URL } from "@/lib/utils";

export async function getCurrentUser(cookie) {
    const headers = new Headers();
    if (cookie) headers.set("Cookie", cookie);

    const res = await fetch(`${BACKEND_URL}users/me`, {
        method: "GET",
        credentials: 'include',
        headers,
    });


    return await res.json();
}

export async function updateCurrentUser(data, cookie) {
    const headers = new Headers();
    if (cookie) headers.set("Cookie", cookie);

    const res = await fetch(`${BACKEND_URL}users/updateMe`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: data,
    });

    const result = await res.json();
    if (!res.ok || result.status !== "success") {
        throw new Error(result.message || "Unable to update your profile.");
    }
    return result;
}
