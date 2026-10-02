import { BACKEND_URL } from "@/lib/utils";

function taskHeaders(cookie, includeJson = false) {
    const headers = new Headers();
    if (includeJson) headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    return headers;
}

export async function createTask({ data, planId }, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}plans/${planId}/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: taskHeaders(cookie, true),
        body: JSON.stringify(data)
    }
    );

    return await res.json();
}

export async function getAllTask(planId, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}plans/${planId}/tasks`,
        {
            method: "GET",
            credentials: 'include',
            headers: taskHeaders(cookie),
        }
    );


    return await res.json();

}

export async function editTask({ taskId, data }, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}tasks/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: taskHeaders(cookie, true),
        body: JSON.stringify(data)
    }
    );

    return await res.json();

}


export async function deleteTask(taskId, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: taskHeaders(cookie),
    });

    return await res.json();



}