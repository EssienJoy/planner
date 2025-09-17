import toast from "react-hot-toast";

// Sign up
export async function createUser(userData) {
    const res = await fetch(`http://localhost:8000/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        throw new Error("Failed to create user");
    }

    return res.json();
}


// Authenticate User
export async function getUserId(email) {
    const res = await fetch(
        `http://localhost:8000/users?email=${encodeURIComponent(email)}`
    );

    if (!res.ok) toast.error("Unable to connect to server");
    console.log(res);

    const [user] = await res.json();


    if (!user) toast.error("User not found");

    return user;
}

// Get Authenticated User
export async function getUser() {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error('Login not Successful');

    const res = await fetch(
        `http://localhost:8000/users?id=${userId}`
    );

    if (!res.ok) throw new Error("Unable to connect to server");

    const [user] = await res.json();

    if (!user) throw new Error("User not found");

    return user;
}

// Create plan
export async function createPlanApi(data) {
    const res = await fetch("http://localhost:8000/plans", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Plan could not be created");

    return await res.json();
}


// Get plans
export async function getPlans() {
    const userId = localStorage.getItem("userId");
    if (!userId) return [];

    const res = await fetch(`http://localhost:8000/plans?userId=${userId}`);

    if (!res.ok) throw new Error('User plans could not be loaded');

    const data = await res.json();

    return data ?? [];
}

export async function getPlan(planId) {
    const res = await fetch(`http://localhost:8000/plans/${planId}`);

    if (!res.ok) throw new Error('User plans could not be loaded');

    const data = await res.json();

    return data;
}

// Delete Plan
export async function deletePlanId(planId) {
    const res = await fetch(`http://localhost:8000/plans/${planId}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Plans could not be deleted');

    return true;
}


// Get goals
export async function getGoals(planId) {


    const res = await fetch(`http://localhost:8000/goals?planId=${planId}`);

    if (!res.ok) throw new Error('User plans could not be loaded');

    const data = await res.json();

    return data;

}

// Delete Goal
export async function deleteGoalApi(goalId) {
    const res = await fetch(`http://localhost:8000/goals/${goalId}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Goal could not be deleted');

    return true;
}

// Edit Goal
export async function editGoalApi(goalId, data) {
    const res = await fetch(`http://localhost:8000/goals/${goalId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Goal could not be updated");

    return await res.json();
}

// Create Goal
export async function createGoalApi(data) {
    const res = await fetch("http://localhost:8000/goals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Goal could not be created");

    return await res.json();
}
