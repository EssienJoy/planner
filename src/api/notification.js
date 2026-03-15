export async function getUserNotif() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}notifications`, {
        method: 'GET',
        credentials: 'include'
    });

    const results = await res.json();
    console.log(results);

    if (results.status !== 'success') {
        throw new Error(results.message);
    }

    return results.data;
}