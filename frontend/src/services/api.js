const API_URL = "http://localhost:8080/api";

// ==================== Zones ====================

export async function getZones() {
    const response = await fetch(`${API_URL}/zones`);

    if (!response.ok) {
        throw new Error("ไม่สามารถโหลดข้อมูลโซนได้");
    }

    return response.json();
}

export async function createZone(data) {
    const response = await fetch(`${API_URL}/zones`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("ไม่สามารถเพิ่มโซนได้");
    }

    return response.json();
}

export async function updateZone(id, data) {
    const response = await fetch(`${API_URL}/zones/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("ไม่สามารถแก้ไขโซนได้");
    }

    return response.json();
}

export async function deleteZone(id) {
    const response = await fetch(`${API_URL}/zones/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("ไม่สามารถลบโซนได้");
    }

    return response.json();
}


// ==================== Stalls ====================

export async function getStalls() {
    const response = await fetch(`${API_URL}/stalls`);

    if (!response.ok) {
        throw new Error("ไม่สามารถโหลดข้อมูลแผงค้าได้");
    }

    return response.json();
}

export async function createStall(data) {
    const response = await fetch(`${API_URL}/stalls`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("ไม่สามารถเพิ่มแผงค้าได้");
    }

    return response.json();
}

export async function updateStall(id, data) {
    const response = await fetch(`${API_URL}/stalls/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("ไม่สามารถแก้ไขแผงค้าได้");
    }

    return response.json();
}

export async function deleteStall(id) {
    const response = await fetch(`${API_URL}/stalls/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("ไม่สามารถลบแผงค้าได้");
    }

    return response.json();
}