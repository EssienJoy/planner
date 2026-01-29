
// Sugn up
export async function signUp(user) {

    if (!user.fullName) {
        throw new Error('full name is required');
    }

    if (!user.email) {
        throw new Error('email is required');
    }

    if (!user.password || !user.confirmPassword) {
        throw new Error('password and confirm password is required');
    }

    if (!user.email.includes('@') || !user.email.includes('.com')) {
        throw new Error('Please enter a valid email');
    }

    if (user.password !== user.confirmPassword) {
        throw new Error('Passwords are not the same');
    }

    if (user.password.length < 8 || user.confirmPassword.length < 8) {
        throw new Error('Password and confirm Password must be at least 8 characters');
    }


    const res = await fetch(`${import.meta.env.VITE_API_URL}users/signUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data ?? {};
}


// login
export async function login(user) {

    if (!user.email) {
        throw new Error('email is required');
    }

    if (!user.password) {
        throw new Error('password  is required');
    }

    if (!user.email.includes('@') || !user.email.includes('.com')) {
        throw new Error('Please enter a valid email');
    }

    if (user.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });

    const result = await res.json();
    if (result.status !== 'success') {
        console.log(result);
        throw new Error(result.message);
    }
    return result ?? {};
}

//Update Password

export async function updateCurrentUserPassword(data) {

    if (data.confirmPassword.length < 8 ||
        data.password.length < 8 ||
        data.currentPassword.length < 8
    ) {
        throw new Error('password,current and confirm Passwords must be at least 8 characters');
    }

    if (data.password !== data.confirmPassword) {
        throw new Error('New and confirm passwords are not the same');
    }

    if (data.password === data.currentPassword) {
        throw new Error('new and old passwords must not be the same');
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}users/updateMyPassword`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.status !== 'success') {

        throw new Error(result.message);
    }
    return {};
}

// Forgot password
export async function forgotPassword(email) {
    if (!email.email.includes('@') || !email.email.includes('.com')) {
        throw new Error('Please enter a valid email');
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}users/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(email),
    });

    const result = await res.json();
    if (!result.status !== 'success') {
        throw new Error(result.message);
    }
    return result;
}

//logout

export async function logout() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}users/logout`, {
        method: "GET",
        credentials: 'include',
    });


    const data = await res.json();


    return data;
}