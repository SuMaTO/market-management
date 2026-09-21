export function getUser() {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
}

export function getRole() {
    const user = getUser();

    return user?.role || null;
}

export function hasRole(...roles) {
    const role = getRole();

    return roles.includes(role);
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
}