export async function getCurrentUser() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}users/me`, {
        method: "GET",
        credentials: 'include',
    });

    const user = await res.json();
    if (!res.ok) {
        throw new Error(user.message);
    }

    return user.data.data;
}

export async function updateCurrentUser(data) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}users/updateMe`, {
        method: 'PATCH',
        credentials: 'include',
        body: data,
    });

    const user = await res.json();
    if (!res.ok) {
        throw new Error(user.message);
    }

    return user.data.data ?? {};
}
