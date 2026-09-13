import { useEffect, useState } from "react";
import {
    getZones,
    createZone,
    updateZone,
    deleteZone,
} from "../services/api";

function Zones() {
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingZone, setEditingZone] = useState(null);

    const [formData, setFormData] = useState({
        zone_name: "",
        description: "",
    });

    // โหลดข้อมูลโซน
    const loadZones = async () => {
        try {
            setLoading(true);

            const result = await getZones();

            if (result.status) {
                setZones(result.data);
            }
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถโหลดข้อมูลโซนได้");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadZones();
    }, []);

    // เปิดฟอร์มเพิ่ม
    const handleAdd = () => {
        setEditingZone(null);

        setFormData({
            zone_name: "",
            description: "",
        });

        setShowForm(true);
    };

    // เปิดฟอร์มแก้ไข
    const handleEdit = (zone) => {
        setEditingZone(zone);

        setFormData({
            zone_name: zone.zone_name || "",
            description: zone.description || "",
        });

        setShowForm(true);
    };

    // เปลี่ยนค่าฟอร์ม
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // บันทึก
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.zone_name.trim()) {
            alert("กรุณาระบุชื่อโซน");
            return;
        }

        try {
            if (editingZone) {
                await updateZone(editingZone.zone_id, formData);
                alert("แก้ไขข้อมูลโซนเรียบร้อยแล้ว");
            } else {
                await createZone(formData);
                alert("เพิ่มโซนเรียบร้อยแล้ว");
            }

            setShowForm(false);

            await loadZones();
        } catch (error) {
            console.error(error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    // ลบ
    const handleDelete = async (id) => {
        if (!confirm("ต้องการลบโซนนี้หรือไม่?")) {
            return;
        }

        try {
            await deleteZone(id);

            alert("ลบโซนเรียบร้อยแล้ว");

            await loadZones();
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถลบโซนได้");
        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        จัดการโซน
                    </h1>

                    <p className="text-gray-500 mt-1">
                        จัดการพื้นที่และโซนภายในตลาด
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + เพิ่มโซน
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-4">
                        {editingZone ? "แก้ไขโซน" : "เพิ่มโซน"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                ชื่อโซน
                            </label>

                            <input
                                type="text"
                                name="zone_name"
                                value={formData.zone_name}
                                onChange={handleChange}
                                placeholder="เช่น โซน A"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                รายละเอียด
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="รายละเอียดของโซน"
                                className="w-full border rounded-lg px-3 py-2"
                                rows="3"
                            />
                        </div>

                        <div className="flex gap-2">

                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                {editingZone ? "บันทึกการแก้ไข" : "บันทึก"}
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
                ) : zones.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        ยังไม่มีข้อมูลโซน
                    </div>
                ) : (
                    <table className="w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    #
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ชื่อโซน
                                </th>

                                <th className="px-6 py-3 text-left">
                                    รายละเอียด
                                </th>

                                <th className="px-6 py-3 text-center">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {zones.map((zone, index) => (
                                <tr
                                    key={zone.zone_id}
                                    className="border-t"
                                >
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {zone.zone_name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {zone.description || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            onClick={() => handleEdit(zone)}
                                            className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded"
                                        >
                                            แก้ไข
                                        </button>

                                        <button
                                            onClick={() => handleDelete(zone.zone_id)}
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

export default Zones;