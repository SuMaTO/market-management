import { useEffect, useState } from "react";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../services/api";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        full_name: "",
        role: "staff",
        phone: "",
        email: "",
        status: "ใช้งาน",
    });

    // ==================== Load Users ====================

    const loadUsers = async () => {
        try {
            setLoading(true);

            const result = await getUsers();

            setUsers(result.data || []);
        } catch (error) {
            console.error("GET USERS ERROR:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // ==================== Form ====================

    const resetForm = () => {
        setFormData({
            username: "",
            password: "",
            full_name: "",
            role: "staff",
            phone: "",
            email: "",
            status: "ใช้งาน",
        });
    };

    const handleAdd = () => {
        setEditingUser(null);
        resetForm();
        setShowModal(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);

        setFormData({
            username: user.username || "",
            password: "",
            full_name: user.full_name || "",
            role: user.role || "staff",
            phone: user.phone || "",
            email: user.email || "",
            status: user.status || "ใช้งาน",
        });

        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==================== Create / Update ====================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username.trim()) {
            alert("กรุณากรอก Username");
            return;
        }

        if (!editingUser && !formData.password) {
            alert("กรุณากรอก Password");
            return;
        }

        if (!formData.full_name.trim()) {
            alert("กรุณากรอกชื่อผู้ใช้งาน");
            return;
        }

        try {
            if (editingUser) {
                const data = {
                    username: formData.username.trim(),
                    full_name: formData.full_name.trim(),
                    role: formData.role,
                    phone: formData.phone.trim(),
                    email: formData.email.trim(),
                    status: formData.status,
                };

                // ถ้ากรอก Password ใหม่ จึงส่งไปเปลี่ยน
                if (formData.password) {
                    data.password = formData.password;
                }

                await updateUser(editingUser.user_id, data);

                alert("แก้ไขข้อมูลผู้ใช้งานสำเร็จ");
            } else {
                await createUser({
                    username: formData.username.trim(),
                    password: formData.password,
                    full_name: formData.full_name.trim(),
                    role: formData.role,
                    phone: formData.phone.trim(),
                    email: formData.email.trim(),
                    status: formData.status,
                });

                alert("เพิ่มผู้ใช้งานสำเร็จ");
            }

            setShowModal(false);
            resetForm();

            await loadUsers();
        } catch (error) {
            console.error("SAVE USER ERROR:", error);
            alert(error.message);
        }
    };

    // ==================== Delete ====================

    const handleDelete = async (user) => {
        const confirmDelete = window.confirm(
            `ต้องการลบผู้ใช้งาน "${user.username}" หรือไม่?`
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(user.user_id);

            alert("ลบผู้ใช้งานสำเร็จ");

            await loadUsers();
        } catch (error) {
            console.error("DELETE USER ERROR:", error);
            alert(error.message);
        }
    };

    // ==================== Status ====================

    const getStatusClass = (status) => {
        if (status === "ใช้งาน") {
            return "bg-green-100 text-green-700";
        }

        return "bg-red-100 text-red-700";
    };

    const getRoleClass = (role) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-700";

            case "manager":
                return "bg-blue-100 text-blue-700";

            case "staff":
                return "bg-gray-100 text-gray-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // ==================== Render ====================

    return (
        <div>
            {/* Header */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        จัดการผู้ใช้งาน
                    </h2>

                    <p className="mt-1 text-gray-500">
                        จัดการบัญชีผู้ใช้งานและสิทธิ์การเข้าถึงระบบ
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + เพิ่มผู้ใช้งาน
                </button>
            </div>

            {/* Table */}

            <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-5 py-4 text-left text-sm font-semibold">
                                    ลำดับ
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold">
                                    Username
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold">
                                    ชื่อผู้ใช้งาน
                                </th>

                                <th className="px-5 py-4 text-center text-sm font-semibold">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold">
                                    Email
                                </th>

                                <th className="px-5 py-4 text-left text-sm font-semibold">
                                    เบอร์โทร
                                </th>

                                <th className="px-5 py-4 text-center text-sm font-semibold">
                                    สถานะ
                                </th>

                                <th className="px-5 py-4 text-center text-sm font-semibold">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        กำลังโหลดข้อมูล...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        ยังไม่มีข้อมูลผู้ใช้งาน
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user.user_id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-5 py-4">
                                            {index + 1}
                                        </td>

                                        <td className="px-5 py-4 font-semibold">
                                            {user.username}
                                        </td>

                                        <td className="px-5 py-4">
                                            {user.full_name || "-"}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm ${getRoleClass(
                                                    user.role
                                                )}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            {user.email || "-"}
                                        </td>

                                        <td className="px-5 py-4">
                                            {user.phone || "-"}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(
                                                    user.status
                                                )}`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                    className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                                >
                                                    แก้ไข
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(user)
                                                    }
                                                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}

                        <div className="flex items-center justify-between p-5 border-b">
                            <h3 className="text-lg font-semibold">
                                {editingUser
                                    ? "แก้ไขผู้ใช้งาน"
                                    : "เพิ่มผู้ใช้งาน"}
                            </h3>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-800 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 space-y-4"
                        >

                            {/* Username */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                />
                            </div>

                            {/* Password */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={
                                        editingUser
                                            ? "เว้นว่างหากไม่ต้องการเปลี่ยน"
                                            : "กรอก Password"
                                    }
                                    className="w-full border rounded-lg px-4 py-2.5"
                                />
                            </div>

                            {/* Full Name */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    ชื่อผู้ใช้งาน
                                </label>

                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                />
                            </div>

                            {/* Role */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    สิทธิ์การใช้งาน
                                </label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                >
                                    <option value="admin">
                                        Admin
                                    </option>

                                    <option value="staff">
                                        Staff
                                    </option>

                                    <option value="manager">
                                        Manager
                                    </option>
                                </select>
                            </div>

                            {/* Phone */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    เบอร์โทรศัพท์
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                />
                            </div>

                            {/* Email */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                />
                            </div>

                            {/* Status */}

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    สถานะ
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                >
                                    <option value="ใช้งาน">
                                        ใช้งาน
                                    </option>

                                    <option value="ระงับ">
                                        ระงับ
                                    </option>
                                </select>
                            </div>

                            {/* Buttons */}

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    ยกเลิก
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingUser
                                        ? "บันทึกการแก้ไข"
                                        : "เพิ่มผู้ใช้งาน"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;