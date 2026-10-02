import { BACKEND_URL } from "@/lib/utils";

function headersWithCookie(headers, cookie) {
    const requestHeaders = new Headers(headers);
    if (cookie) requestHeaders.set("Cookie", cookie);
    return requestHeaders;
}

export async function createPlan(plan, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}plans`, {
        method: 'POST',
        credentials: 'include',
        headers: headersWithCookie({
            "Content-Type": "application/json",
        }, cookie),
        body: JSON.stringify(plan)
    });

    return await res.json();


}


export async function getAllPlans(options = {}) {
    const cookie = typeof options === "object" ? options?.cookie : undefined;
    const res = await fetch(`${BACKEND_URL}plans`, {
        method: "GET",
        credentials: 'include',
        headers: headersWithCookie({}, cookie),
    });


    return await res.json();

}

export async function getPlan(planId, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}plans/${planId}`, {
        method: "GET",
        credentials: 'include',
        headers: headersWithCookie({}, cookie),
    });


    return await res.json();


}

export async function editPlan({ plan, planId }, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}plans/${planId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: headersWithCookie({
            "Content-Type": "application/json",
        }, cookie),
        body: JSON.stringify({ plan })
    });

    return await res.json();


}

export async function deletePlan(planId, { cookie } = {}) {
    const res = await fetch(`${BACKEND_URL}plans/${planId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: headersWithCookie({}, cookie),
    });

    return await res.json();


}