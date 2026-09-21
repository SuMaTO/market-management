const API_URL = "http://localhost:8080/api";

// ==================== API Fetch ====================

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...(options.headers || {}),
            ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : {}),
        },
    });

    const result = await response.json();

    // Token ไม่มี / หมดอายุ
    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        throw new Error("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
    }

    if (!response.ok) {
        throw new Error(
            result.message || "เกิดข้อผิดพลาด"
        );
    }

    return result;
}


// ==================== Auth ====================

export async function loginUser(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "เข้าสู่ระบบไม่สำเร็จ"
        );
    }

    return result;
}


// ==================== Zones ====================

export async function getZones() {
    return apiFetch("/zones");
}

export async function createZone(data) {
    return apiFetch("/zones", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateZone(id, data) {
    return apiFetch(`/zones/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteZone(id) {
    return apiFetch(`/zones/${id}`, {
        method: "DELETE",
    });
}


// ==================== Stalls ====================

export async function getStalls() {
    return apiFetch("/stalls");
}

export async function createStall(data) {
    return apiFetch("/stalls", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateStall(id, data) {
    return apiFetch(`/stalls/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteStall(id) {
    return apiFetch(`/stalls/${id}`, {
        method: "DELETE",
    });
}

// ==================== Tenants ====================

export async function getTenants() {
    return apiFetch("/tenants");
}

export async function createTenant(data) {
    return apiFetch("/tenants", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateTenant(id, data) {
    return apiFetch(`/tenants/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteTenant(id) {
    return apiFetch(`/tenants/${id}`, {
        method: "DELETE",
    });
}

// ==================== Contracts ====================

export async function getContracts() {
    return apiFetch("/contracts");
}

export async function createContract(data) {
    return apiFetch("/contracts", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateContract(id, data) {
    return apiFetch(`/contracts/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteContract(id) {
    return apiFetch(`/contracts/${id}`, {
        method: "DELETE",
    });
}

// ==================== Users ====================

export async function getUsers() {
    return apiFetch("/users");
}

export async function createUser(data) {
    return apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateUser(id, data) {
    return apiFetch(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteUser(id) {
    return apiFetch(`/users/${id}`, {
        method: "DELETE",
    });
}