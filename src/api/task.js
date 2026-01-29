export async function createTask({ data, planId }) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}plans/${planId}/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    );

    const task = await res.json();

    if (task.status === 'fail') {
        throw new Error(task.message);
    }

    return task.data.tasks;

}

export async function getAllTask(planId) {

    const res = await fetch(`${import.meta.env.VITE_API_URL}plans/${planId}/tasks`,
        {
            method: "GET",
            credentials: 'include',
        }
    );


    const tasks = await res.json();
    if (!res.ok) {
        throw new Error(tasks.message);

    }

    return tasks.data.doc ?? [];
}

export async function editTask({ taskId, data }) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}tasks/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    );

    const task = await res.json();

    if (task.status === 'fail') {
        throw new Error(task.message);
    }

    return task.data.tasks;
}