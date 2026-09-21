import { useEffect, useState } from "react";
import {
    getTenants,
    createTenant,
    updateTenant,
    deleteTenant,
} from "../services/api";

function Tenants() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingTenant, setEditingTenant] = useState(null);

    const [formData, setFormData] = useState({
        id_card: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
    });

    // โหลดข้อมูลผู้เช่า
    const loadTenants = async () => {
        try {
            setLoading(true);

            const result = await getTenants();

            if (result.status) {
                setTenants(result.data);
            }
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถโหลดข้อมูลผู้เช่าได้");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTenants();
    }, []);

    // เปิดฟอร์มเพิ่ม
    const handleAdd = () => {
        setEditingTenant(null);

        setFormData({
            id_card: "",
            first_name: "",
            last_name: "",
            phone: "",
            address: "",
        });

        setShowForm(true);
    };

    // เปิดฟอร์มแก้ไข
    const handleEdit = (tenant) => {
        setEditingTenant(tenant);

        setFormData({
            id_card: tenant.id_card || "",
            first_name: tenant.first_name || "",
            last_name: tenant.last_name || "",
            phone: tenant.phone || "",
            address: tenant.address || "",
        });

        setShowForm(true);
    };

    // เปลี่ยนข้อมูล
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // บันทึก
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.id_card.length !== 13) {
            alert("เลขบัตรประชาชนต้องมี 13 หลัก");
            return;
        }

        if (!formData.first_name.trim()) {
            alert("กรุณากรอกชื่อ");
            return;
        }

        if (!formData.last_name.trim()) {
            alert("กรุณากรอกนามสกุล");
            return;
        }

        try {
            if (editingTenant) {
                await updateTenant(
                    editingTenant.tenant_id,
                    formData
                );

                alert("แก้ไขข้อมูลผู้เช่าสำเร็จ");
            } else {
                await createTenant(formData);

                alert("เพิ่มข้อมูลผู้เช่าสำเร็จ");
            }

            setShowForm(false);
            await loadTenants();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // ลบ
    const handleDelete = async (id) => {
        if (!confirm("ต้องการลบข้อมูลผู้เช่านี้หรือไม่?")) {
            return;
        }

        try {
            await deleteTenant(id);

            alert("ลบข้อมูลผู้เช่าสำเร็จ");

            await loadTenants();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        จัดการผู้เช่า
                    </h1>

                    <p className="text-gray-500 mt-1">
                        จัดการข้อมูลผู้เช่าของตลาด
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + เพิ่มผู้เช่า
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-4">
                        {editingTenant
                            ? "แก้ไขข้อมูลผู้เช่า"
                            : "เพิ่มผู้เช่า"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* เลขบัตร */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    เลขบัตรประชาชน
                                </label>

                                <input
                                    type="text"
                                    name="id_card"
                                    value={formData.id_card}
                                    onChange={handleChange}
                                    maxLength={13}
                                    placeholder="เลขบัตรประชาชน 13 หลัก"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* ชื่อ */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    ชื่อ
                                </label>

                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="ชื่อ"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* นามสกุล */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    นามสกุล
                                </label>

                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="นามสกุล"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* เบอร์โทร */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    เบอร์โทรศัพท์
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="เบอร์โทรศัพท์"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                        </div>

                        {/* ที่อยู่ */}
                        <div className="mt-4">

                            <label className="block mb-2 text-sm font-medium">
                                ที่อยู่
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                placeholder="ที่อยู่ผู้เช่า"
                                className="w-full border rounded-lg px-3 py-2"
                            />

                        </div>

                        {/* ปุ่ม */}
                        <div className="flex gap-2 mt-4">

                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                {editingTenant
                                    ? "บันทึกการแก้ไข"
                                    : "บันทึก"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                ยกเลิก
                            </button>

                        </div>

                    </form>
                </div>
            )}

            {/* ตาราง */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

                {loading ? (
                    <div className="p-6 text-center text-gray-500">
                        กำลังโหลดข้อมูล...
                    </div>
                ) : tenants.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        ยังไม่มีข้อมูลผู้เช่า
                    </div>
                ) : (
                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="px-6 py-3 text-left">
                                    #
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ชื่อ-นามสกุล
                                </th>

                                <th className="px-6 py-3 text-left">
                                    เลขบัตรประชาชน
                                </th>

                                <th className="px-6 py-3 text-left">
                                    เบอร์โทร
                                </th>

                                <th className="px-6 py-3 text-center">
                                    จัดการ
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {tenants.map((tenant, index) => (

                                <tr
                                    key={tenant.tenant_id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {tenant.first_name}{" "}
                                        {tenant.last_name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {tenant.id_card}
                                    </td>

                                    <td className="px-6 py-4">
                                        {tenant.phone || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            onClick={() =>
                                                handleEdit(tenant)
                                            }
                                            className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded"
                                        >
                                            แก้ไข
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    tenant.tenant_id
                                                )
                                            }
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            ลบ
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                )}

            </div>

        </div>
    );
}

export default Tenants;