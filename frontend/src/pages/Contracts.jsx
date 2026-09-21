import { useEffect, useState } from "react";
import {
    getContracts,
    createContract,
    updateContract,
    deleteContract,
    getTenants,
    getStalls,
} from "../services/api";

function Contracts() {
    const [contracts, setContracts] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [stalls, setStalls] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingContract, setEditingContract] = useState(null);

    const [formData, setFormData] = useState({
        tenant_id: "",
        stall_id: "",
        contract_no: "",
        start_date: "",
        end_date: "",
        deposit_amount: "",
        status: "active",
    });

    // โหลดข้อมูลทั้งหมด
    const loadData = async () => {
        try {
            setLoading(true);

            const [
                contractResult,
                tenantResult,
                stallResult,
            ] = await Promise.all([
                getContracts(),
                getTenants(),
                getStalls(),
            ]);

            if (contractResult.status) {
                setContracts(contractResult.data);
            }

            if (tenantResult.status) {
                setTenants(tenantResult.data);
            }

            if (stallResult.status) {
                setStalls(stallResult.data);
            }
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถโหลดข้อมูลได้");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // เปิดเพิ่ม
    const handleAdd = () => {
        setEditingContract(null);

        setFormData({
            tenant_id: "",
            stall_id: "",
            contract_no: "",
            start_date: "",
            end_date: "",
            deposit_amount: "",
            status: "active",
        });

        setShowForm(true);
    };

    // เปิดแก้ไข
    const handleEdit = (contract) => {
        setEditingContract(contract);

        setFormData({
            tenant_id: contract.tenant_id || "",
            stall_id: contract.stall_id || "",
            contract_no: contract.contract_no || "",
            start_date: contract.start_date || "",
            end_date: contract.end_date || "",
            deposit_amount: contract.deposit_amount || "",
            status: contract.status || "active",
        });

        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // บันทึก
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.tenant_id) {
            alert("กรุณาเลือกผู้เช่า");
            return;
        }

        if (!formData.stall_id) {
            alert("กรุณาเลือกแผงค้า");
            return;
        }

        if (!formData.start_date || !formData.end_date) {
            alert("กรุณาระบุวันเริ่มต้นและวันสิ้นสุด");
            return;
        }

        try {
            const data = {
                ...formData,
                tenant_id: Number(formData.tenant_id),
                stall_id: Number(formData.stall_id),
                deposit_amount: Number(formData.deposit_amount || 0),
            };

            if (editingContract) {
                await updateContract(
                    editingContract.contract_id,
                    data
                );

                alert("แก้ไขสัญญาสำเร็จ");
            } else {
                await createContract(data);

                alert("เพิ่มสัญญาสำเร็จ");
            }

            setShowForm(false);
            await loadData();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // ลบ
    const handleDelete = async (id) => {
        if (!confirm("ต้องการลบสัญญานี้หรือไม่?")) {
            return;
        }

        try {
            await deleteContract(id);

            alert("ลบสัญญาสำเร็จ");

            await loadData();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // หาชื่อผู้เช่า
    const getTenantName = (id) => {
        const tenant = tenants.find(
            (item) => Number(item.tenant_id) === Number(id)
        );

        return tenant
            ? `${tenant.first_name} ${tenant.last_name}`
            : "-";
    };

    // หาเลขแผง
    const getStallCode = (id) => {
        const stall = stalls.find(
            (item) => Number(item.stall_id) === Number(id)
        );

        return stall ? stall.stall_code : "-";
    };

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        จัดการสัญญาเช่า
                    </h1>

                    <p className="text-gray-500 mt-1">
                        จัดการสัญญาเช่าของผู้เช่าและแผงค้า
                    </p>
                </div>

                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    + เพิ่มสัญญา
                </button>

            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-4">
                        {editingContract
                            ? "แก้ไขสัญญาเช่า"
                            : "เพิ่มสัญญาเช่า"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* ผู้เช่า */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    ผู้เช่า
                                </label>

                                <select
                                    name="tenant_id"
                                    value={formData.tenant_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        -- เลือกผู้เช่า --
                                    </option>

                                    {tenants.map((tenant) => (
                                        <option
                                            key={tenant.tenant_id}
                                            value={tenant.tenant_id}
                                        >
                                            {tenant.first_name}{" "}
                                            {tenant.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* แผง */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    แผงค้า
                                </label>

                                <select
                                    name="stall_id"
                                    value={formData.stall_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        -- เลือกแผงค้า --
                                    </option>

                                    {stalls.map((stall) => (
                                        <option
                                            key={stall.stall_id}
                                            value={stall.stall_id}
                                        >
                                            {stall.stall_code}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* เลขสัญญา */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    เลขที่สัญญา
                                </label>

                                <input
                                    type="text"
                                    value={
                                        editingContract
                                            ? formData.contract_no
                                            : "ระบบจะสร้างอัตโนมัติ"
                                    }
                                    readOnly
                                    disabled={!editingContract}
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                                />

                                {!editingContract && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        ระบบจะกำหนดเลขที่สัญญาให้อัตโนมัติเมื่อบันทึก
                                    </p>
                                )}
                            </div>

                            {/* เงินประกัน */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    เงินประกัน
                                </label>

                                <input
                                    type="number"
                                    name="deposit_amount"
                                    value={formData.deposit_amount}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* วันเริ่ม */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    วันเริ่มสัญญา
                                </label>

                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* วันสิ้นสุด */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    วันสิ้นสุดสัญญา
                                </label>

                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
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
                                    <option value="active">
                                        ใช้งานอยู่
                                    </option>

                                    <option value="expired">
                                        หมดอายุ
                                    </option>

                                    <option value="cancelled">
                                        ยกเลิก
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className="flex gap-2 mt-5">

                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                            >
                                บันทึก
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
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
                    <div className="p-6 text-center">
                        กำลังโหลดข้อมูล...
                    </div>
                ) : contracts.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        ยังไม่มีข้อมูลสัญญา
                    </div>
                ) : (
                    <table className="w-full">

                        <thead className="bg-gray-100">
                            <tr>

                                <th className="px-6 py-3 text-left">
                                    เลขที่สัญญา
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ผู้เช่า
                                </th>

                                <th className="px-6 py-3 text-left">
                                    แผงค้า
                                </th>

                                <th className="px-6 py-3 text-left">
                                    ระยะเวลา
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

                            {contracts.map((contract) => (

                                <tr
                                    key={contract.contract_id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4 font-medium">
                                        {contract.contract_no}
                                    </td>

                                    <td className="px-6 py-4">
                                        {getTenantName(
                                            contract.tenant_id
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {getStallCode(
                                            contract.stall_id
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {contract.start_date}
                                        {" - "}
                                        {contract.end_date}
                                    </td>

                                    <td className="px-6 py-4">
                                        {contract.status === "active"
                                            ? "ใช้งานอยู่"
                                            : contract.status === "expired"
                                            ? "หมดอายุ"
                                            : "ยกเลิก"}
                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            onClick={() =>
                                                handleEdit(contract)
                                            }
                                            className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded"
                                        >
                                            แก้ไข
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    contract.contract_id
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

export default Contracts;