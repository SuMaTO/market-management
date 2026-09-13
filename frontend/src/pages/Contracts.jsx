import { useState } from "react";

function Contracts() {
  const tenants = [
    {
      id: 1,
      code: "TN001",
      name: "สมชาย ใจดี",
    },
    {
      id: 2,
      code: "TN002",
      name: "สมหญิง รักดี",
    },
    {
      id: 3,
      code: "TN003",
      name: "วิชัย มั่นคง",
    },
  ];

  const stalls = [
    {
      id: 1,
      code: "A001",
      zone: "โซน A",
      baseRent: 1500,
    },
    {
      id: 2,
      code: "A002",
      zone: "โซน A",
      baseRent: 1500,
    },
    {
      id: 3,
      code: "A003",
      zone: "โซน A",
      baseRent: 1800,
    },
    {
      id: 4,
      code: "B001",
      zone: "โซน B",
      baseRent: 1200,
    },
  ];

  const [contracts, setContracts] = useState([
    {
      id: 1,
      contractNo: "CT-0001",
      tenantId: 1,
      stallId: 2,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      rentAmount: 1500,
      paymentFrequency: "รายเดือน",
      deposit: 3000,
      status: "ใช้งาน",
    },
    {
      id: 2,
      contractNo: "CT-0002",
      tenantId: 2,
      stallId: 4,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      rentAmount: 1200,
      paymentFrequency: "รายปี",
      deposit: 2400,
      status: "ใช้งาน",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);

  const [formData, setFormData] = useState({
    contractNo: "",
    tenantId: "",
    stallId: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    paymentFrequency: "รายเดือน",
    deposit: "",
    status: "ใช้งาน",
  });

  const resetForm = () => {
    setFormData({
      contractNo: "",
      tenantId: "",
      stallId: "",
      startDate: "",
      endDate: "",
      rentAmount: "",
      paymentFrequency: "รายเดือน",
      deposit: "",
      status: "ใช้งาน",
    });
  };

  const handleAdd = () => {
    setEditingContract(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);

    setFormData({
      contractNo: contract.contractNo,
      tenantId: contract.tenantId,
      stallId: contract.stallId,
      startDate: contract.startDate,
      endDate: contract.endDate,
      rentAmount: contract.rentAmount,
      paymentFrequency: contract.paymentFrequency,
      deposit: contract.deposit,
      status: contract.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.contractNo.trim() ||
      !formData.tenantId ||
      !formData.stallId ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.rentAmount
    ) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }

    if (formData.startDate > formData.endDate) {
      alert("วันที่เริ่มสัญญาต้องไม่เกินวันที่สิ้นสุดสัญญา");
      return;
    }

    const duplicateContractNo = contracts.some(
      (contract) =>
        contract.contractNo.toLowerCase() ===
          formData.contractNo.trim().toLowerCase() &&
        contract.id !== editingContract?.id
    );

    if (duplicateContractNo) {
      alert("เลขที่สัญญานี้มีอยู่แล้ว");
      return;
    }

    const contractData = {
      contractNo: formData.contractNo
        .trim()
        .toUpperCase(),
      tenantId: Number(formData.tenantId),
      stallId: Number(formData.stallId),
      startDate: formData.startDate,
      endDate: formData.endDate,
      rentAmount: Number(formData.rentAmount),
      paymentFrequency: formData.paymentFrequency,
      deposit: Number(formData.deposit) || 0,
      status: formData.status,
    };

    if (editingContract) {
      setContracts(
        contracts.map((contract) =>
          contract.id === editingContract.id
            ? {
                ...contract,
                ...contractData,
              }
            : contract
        )
      );
    } else {
      setContracts([
        ...contracts,
        {
          id: Date.now(),
          ...contractData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "ต้องการลบสัญญาเช่านี้หรือไม่?"
    );

    if (!confirmDelete) return;

    setContracts(
      contracts.filter((contract) => contract.id !== id)
    );
  };

  const getTenantName = (tenantId) => {
    const tenant = tenants.find(
      (tenant) => tenant.id === tenantId
    );

    return tenant
      ? `${tenant.code} - ${tenant.name}`
      : "-";
  };

  const getStallName = (stallId) => {
    const stall = stalls.find(
      (stall) => stall.id === stallId
    );

    return stall
      ? `${stall.code} (${stall.zone})`
      : "-";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ใช้งาน":
        return "bg-green-100 text-green-700";

      case "สิ้นสุด":
        return "bg-gray-100 text-gray-600";

      case "ยกเลิก":
        return "bg-red-100 text-red-700";

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
            สัญญาเช่า
          </h2>

          <p className="mt-1 text-gray-500">
            จัดการสัญญาเช่าระยะยาวและเงื่อนไขการชำระค่าเช่า
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + เพิ่มสัญญาเช่า
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
                  เลขที่สัญญา
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ผู้เช่า
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  แผงค้า
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ระยะเวลา
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ค่าเช่า
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  รอบชำระ
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
              {contracts.map((contract, index) => (
                <tr
                  key={contract.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {contract.contractNo}
                  </td>

                  <td className="px-5 py-4">
                    {getTenantName(contract.tenantId)}
                  </td>

                  <td className="px-5 py-4">
                    {getStallName(contract.stallId)}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    {contract.startDate}
                    <br />
                    <span className="text-gray-500 text-sm">
                      ถึง {contract.endDate}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {contract.rentAmount.toLocaleString()} บาท
                  </td>

                  <td className="px-5 py-4 text-center">
                    {contract.paymentFrequency}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(
                        contract.status
                      )}`}
                    >
                      {contract.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(contract)}
                        className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        แก้ไข
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(contract.id)
                        }
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {contracts.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    ยังไม่มีข้อมูลสัญญาเช่า
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
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold">
                {editingContract
                  ? "แก้ไขสัญญาเช่า"
                  : "เพิ่มสัญญาเช่า"}
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
              {/* Contract No */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขที่สัญญา
                </label>

                <input
                  type="text"
                  value={formData.contractNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contractNo: e.target.value
                        .toUpperCase()
                        .replace(/\s/g, ""),
                    })
                  }
                  placeholder="เช่น CT-0003"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Tenant */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ผู้เช่า
                </label>

                <select
                  value={formData.tenantId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tenantId: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="">
                    -- เลือกผู้เช่า --
                  </option>

                  {tenants.map((tenant) => (
                    <option
                      key={tenant.id}
                      value={tenant.id}
                    >
                      {tenant.code} - {tenant.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stall */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  แผงค้า
                </label>

                <select
                  value={formData.stallId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stallId: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="">
                    -- เลือกแผงค้า --
                  </option>

                  {stalls.map((stall) => (
                    <option
                      key={stall.id}
                      value={stall.id}
                    >
                      {stall.code} - {stall.zone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    วันที่เริ่มสัญญา
                  </label>

                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    วันที่สิ้นสุดสัญญา
                  </label>

                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>
              </div>

              {/* Rent */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ค่าเช่าตามสัญญา
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.rentAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rentAmount: e.target.value,
                    })
                  }
                  placeholder="เช่น 1500"
                  className="w-full border rounded-lg px-4 py-2.5"
                />

                <p className="text-xs text-gray-500 mt-1">
                  ค่าเช่าจริงที่ตกลงกับผู้เช่า สามารถแตกต่างจากค่าเช่าพื้นฐานของแผงได้
                </p>
              </div>

              {/* Payment Frequency */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  รอบการชำระค่าเช่า
                </label>

                <select
                  value={formData.paymentFrequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentFrequency: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="รายเดือน">
                    รายเดือน
                  </option>

                  <option value="รายปี">
                    รายปี
                  </option>
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  ใช้กำหนดรอบการสร้างใบแจ้งหนี้ในขั้นตอนถัดไป
                </p>
              </div>

              {/* Deposit */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เงินประกัน
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.deposit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deposit: e.target.value,
                    })
                  }
                  placeholder="เช่น 3000"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  สถานะสัญญา
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
                  <option value="สิ้นสุด">สิ้นสุด</option>
                  <option value="ยกเลิก">ยกเลิก</option>
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
                  {editingContract
                    ? "บันทึกการแก้ไข"
                    : "เพิ่มสัญญาเช่า"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contracts;