export async function createPlan(plan) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}users/${plan.user}/plans`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(plan)
    });

    const newPlan = await res.json();

    if (!res.ok) {
        throw new Error(newPlan.message);
    }

    return newPlan;
}


export async function getAllPlans(userId) {
    // console.log(userId);
    const res = await fetch(`${import.meta.env.VITE_API_URL}users/${userId}/plans`, {
        method: "GET",
        credentials: 'include',
    });


    const plans = await res.json();
    if (!res.ok) {
        throw new Error(plans.message);
    }

    return plans.data.doc;
}

export async function getPlan(planId) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}plans/${planId}`, {
        method: "GET",
        credentials: 'include',
    });


    const plan = await res.json();
    if (!res.ok) {
        throw new Error(plan.message);

    }

    return plan.data.data ?? {};

}

export async function editPlan({ plan, planId }) {
    // console.log(plan, planId);
    const res = await fetch(`${import.meta.env.VITE_API_URL}plans/${planId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(plan)
    });

    const newPlan = await res.json();

    if (!res.ok) {
        // console.log(newPlan);
        throw new Error(newPlan.message);
    }

    return newPlan;
}


export async function deletePlan(planId) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}plans/${planId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    const result = await res.json();

    if (result.status !== 'success') {
        // console.log(result);
        throw new Error(result.message);
    }

    return result;

}