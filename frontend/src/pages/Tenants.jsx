import { useState } from "react";

function Tenants() {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      code: "TN001",
      firstName: "สมชาย",
      lastName: "ใจดี",
      phone: "0812345678",
      address: "ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดเลย",
      status: "ใช้งาน",
    },
    {
      id: 2,
      code: "TN002",
      firstName: "สมหญิง",
      lastName: "รักดี",
      phone: "0898765432",
      address: "ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดเลย",
      status: "ใช้งาน",
    },
    {
      id: 3,
      code: "TN003",
      firstName: "วิชัย",
      lastName: "มั่นคง",
      phone: "0861112233",
      address: "ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดเลย",
      status: "ไม่ใช้งาน",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    status: "ใช้งาน",
  });

  const handleAdd = () => {
    setEditingTenant(null);

    setFormData({
      code: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      status: "ใช้งาน",
    });

    setShowModal(true);
  };

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);

    setFormData({
      code: tenant.code,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      phone: tenant.phone,
      address: tenant.address,
      status: tenant.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.code.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim()
    ) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }

    const duplicateCode = tenants.some(
      (tenant) =>
        tenant.code.toLowerCase() ===
          formData.code.trim().toLowerCase() &&
        tenant.id !== editingTenant?.id
    );

    if (duplicateCode) {
      alert("รหัสผู้เช่านี้มีอยู่แล้ว");
      return;
    }

    const tenantData = {
      code: formData.code.trim().toUpperCase(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      status: formData.status,
    };

    if (editingTenant) {
      setTenants(
        tenants.map((tenant) =>
          tenant.id === editingTenant.id
            ? {
                ...tenant,
                ...tenantData,
              }
            : tenant
        )
      );
    } else {
      setTenants([
        ...tenants,
        {
          id: Date.now(),
          ...tenantData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "ต้องการลบข้อมูลผู้เช่านี้หรือไม่?"
    );

    if (!confirmDelete) return;

    setTenants(
      tenants.filter((tenant) => tenant.id !== id)
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ใช้งาน":
        return "bg-green-100 text-green-700";

      case "ไม่ใช้งาน":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            จัดการผู้เช่า
          </h2>

          <p className="mt-1 text-gray-500">
            จัดการข้อมูลผู้เช่าและผู้ประกอบการภายในตลาด
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + เพิ่มผู้เช่า
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
                  รหัสผู้เช่า
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ชื่อ-นามสกุล
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  เบอร์โทรศัพท์
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
              {tenants.map((tenant, index) => (
                <tr
                  key={tenant.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {tenant.code}
                  </td>

                  <td className="px-5 py-4">
                    {tenant.firstName} {tenant.lastName}
                  </td>

                  <td className="px-5 py-4">
                    {tenant.phone}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(
                        tenant.status
                      )}`}
                    >
                      {tenant.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(tenant)}
                        className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        แก้ไข
                      </button>

                      <button
                        onClick={() => handleDelete(tenant.id)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {tenants.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    ยังไม่มีข้อมูลผู้เช่า
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold">
                {editingTenant
                  ? "แก้ไขข้อมูลผู้เช่า"
                  : "เพิ่มผู้เช่า"}
              </h3>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-4"
            >
              {/* รหัสผู้เช่า */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  รหัสผู้เช่า
                </label>

                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value
                        .toUpperCase()
                        .replace(/\s/g, ""),
                    })
                  }
                  placeholder="เช่น TN001"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* ชื่อ / นามสกุล */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    ชื่อ
                  </label>

                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="ชื่อ"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    นามสกุล
                  </label>

                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="นามสกุล"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>
              </div>

              {/* โทรศัพท์ */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เบอร์โทรศัพท์
                </label>

                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="เช่น 0812345678"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* ที่อยู่ */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ที่อยู่
                </label>

                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="กรอกที่อยู่"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* สถานะ */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  สถานะ
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="ใช้งาน">ใช้งาน</option>
                  <option value="ไม่ใช้งาน">ไม่ใช้งาน</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingTenant
                    ? "บันทึกการแก้ไข"
                    : "เพิ่มผู้เช่า"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tenants;