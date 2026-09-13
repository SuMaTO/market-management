import { useEffect, useState } from "react";
import {
    getStalls,
    createStall,
    updateStall,
    deleteStall,
    getZones,
} from "../services/api";

function Stalls() {
    const [stalls, setStalls] = useState([]);
    const [zones, setZones] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingStall, setEditingStall] = useState(null);

    const [formData, setFormData] = useState({
        zone_id: "",
        stall_code: "",
        stall_name: "",
        stall_size: "",
        rent_rate: "",
        status: "vacant",
        description: "",
    });

    // โหลดข้อมูลแผงค้า
    const loadStalls = async () => {
        try {
            setLoading(true);

            const result = await getStalls();

            if (result.status) {
                setStalls(result.data);
            }
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถโหลดข้อมูลแผงค้าได้");
        } finally {
            setLoading(false);
        }
    };

    // โหลดโซน
    const loadZones = async () => {
        try {
            const result = await getZones();

            if (result.status) {
                setZones(result.data);
            }
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถโหลดข้อมูลโซนได้");
        }
    };

    useEffect(() => {
        loadStalls();
        loadZones();
    }, []);

    // เปิดเพิ่ม
    const handleAdd = () => {
        setEditingStall(null);

        setFormData({
            zone_id: "",
            stall_code: "",
            stall_name: "",
            stall_size: "",
            rent_rate: "",
            status: "vacant",
            description: "",
        });

        setShowForm(true);
    };

    // เปิดแก้ไข
    const handleEdit = (stall) => {
        setEditingStall(stall);

        setFormData({
            zone_id: stall.zone_id || "",
            stall_code: stall.stall_code || "",
            stall_name: stall.stall_name || "",
            stall_size: stall.stall_size || "",
            rent_rate: stall.rent_rate || "",
            status: stall.status || "vacant",
            description: stall.description || "",
        });

        setShowForm(true);
    };

    // เปลี่ยนข้อมูลฟอร์ม
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // บันทึก
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.zone_id) {
            alert("กรุณาเลือกโซน");
            return;
        }

        if (!formData.stall_code.trim()) {
            alert("กรุณาระบุรหัสแผงค้า");
            return;
        }

        if (formData.stall_size === "" || formData.rent_rate === "") {
            alert("กรุณาระบุขนาดแผงและอัตราค่าเช่า");
            return;
        }

        try {
            const data = {
                ...formData,
                zone_id: Number(formData.zone_id),
                stall_size: Number(formData.stall_size),
                rent_rate: Number(formData.rent_rate),
            };

            if (editingStall) {
                await updateStall(editingStall.stall_id, data);
                alert("แก้ไขข้อมูลแผงค้าเรียบร้อยแล้ว");
            } else {
                await createStall(data);
                alert("เพิ่มแผงค้าเรียบร้อยแล้ว");
            }

            setShowForm(false);

            await loadStalls();
        } catch (error) {
            console.error(error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    // ลบ
    const handleDelete = async (id) => {
        if (!confirm("ต้องการลบแผงค้านี้หรือไม่?")) {
            return;
        }

        try {
            await deleteStall(id);

            alert("ลบแผงค้าเรียบร้อยแล้ว");

            await loadStalls();
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถลบแผงค้าได้");
        }
    };

    // แปลงสถานะ
    const getStatusText = (status) => {
        const statuses = {
            vacant: "ว่าง",
            reserved: "จอง",
            rented: "เช่า",
            maintenance: "ซ่อมบำรุง",
        };

        return statuses[status] || status;
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        จัดการแผงค้า
                    </h1>

                    <p className="text-gray-500 mt-1">
                        จัดการแผงค้าและสถานะการใช้งาน
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + เพิ่มแผงค้า
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-4">
                        {editingStall ? "แก้ไขแผงค้า" : "เพิ่มแผงค้า"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* รหัสแผง */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    รหัสแผงค้า
                                </label>

                                <input
                                    type="text"
                                    name="stall_code"
                                    value={formData.stall_code}
                                    onChange={handleChange}
                                    placeholder="เช่น A001"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* ชื่อแผง */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    ชื่อแผงค้า
                                </label>

                                <input
                                    type="text"
                                    name="stall_name"
                                    value={formData.stall_name}
                                    onChange={handleChange}
                                    placeholder="เช่น แผง A001"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* ขนาดแผง */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    ขนาดแผง (ตร.ม.)
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="stall_size"
                                    value={formData.stall_size}
                                    onChange={handleChange}
                                    placeholder="เช่น 4.00"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* อัตราค่าเช่า */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    อัตราค่าเช่า/เดือน (บาท)
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="rent_rate"
                                    value={formData.rent_rate}
                                    onChange={handleChange}
                                    placeholder="เช่น 1500.00"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* โซน */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    โซน
                                </label>

                                <select
                                    name="zone_id"
                                    value={formData.zone_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        -- เลือกโซน --
                                    </option>

                                    {zones.map((zone) => (
                                        <option
                                            key={zone.zone_id}
                                            value={zone.zone_id}
                                        >
                                            {zone.zone_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* สถานะ */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    สถานะ
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="vacant">
                                        ว่าง
                                    </option>

                                    <option value="reserved">
                                        จอง
                                    </option>

                                    <option value="rented">
                                        เช่า
                                    </option>

                                    <option value="maintenance">
                                        ซ่อมบำรุง
                                    </option>
                                </select>
                            </div>

                        </div>

                        {/* รายละเอียด */}
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium">
                                รายละเอียด
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="รายละเอียดเพิ่มเติม"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-4">

                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                {editingStall
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

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

                {loading ? (
                    <div className="p-6 text-center text-gray-500">
                        กำลังโหลดข้อมูล...
                    </div>
                ) : stalls.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        ยังไม่มีข้อมูลแผงค้า
                    </div>
                ) : (
                    <table className="w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    #
                                </th>

                                <th className="px-6 py-3 text-left">
                                    รหัสแผง
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ชื่อแผง
                                </th>

                                <th className="px-6 py-3 text-left">
                                    โซน
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ขนาด (ตร.ม.)
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ค่าเช่า/เดือน
                                </th>

                                <th className="px-6 py-3 text-left">
                                    สถานะ
                                </th>

                                <th className="px-6 py-3 text-center">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {stalls.map((stall, index) => (
                                <tr
                                    key={stall.stall_id}
                                    className="border-t"
                                >
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {stall.stall_code}
                                    </td>

                                    <td className="px-6 py-4">
                                        {stall.stall_name || "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {stall.zone_name || "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {stall.stall_size ?? "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {stall.rent_rate ?? "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {getStatusText(stall.status)}
                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            onClick={() => handleEdit(stall)}
                                            className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded"
                                        >
                                            แก้ไข
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(stall.stall_id)
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

export default Stalls;