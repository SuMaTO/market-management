import { useState } from "react";

function Utilities() {
  const contracts = [
    {
      id: 1,
      contractNo: "CT-0001",
      tenant: "สมชาย ใจดี",
      stall: "A002",
    },
    {
      id: 2,
      contractNo: "CT-0002",
      tenant: "สมหญิง รักดี",
      stall: "B001",
    },
  ];

  const [readings, setReadings] = useState([
    {
      id: 1,
      contractId: 1,
      utilityType: "น้ำ",
      meterNo: "W-A002",
      readingDate: "2026-09-01",
      previousReading: 120,
      currentReading: 135,
      unitUsed: 15,
    },
    {
      id: 2,
      contractId: 1,
      utilityType: "ไฟ",
      meterNo: "E-A002",
      readingDate: "2026-09-01",
      previousReading: 850,
      currentReading: 940,
      unitUsed: 90,
    },
    {
      id: 3,
      contractId: 2,
      utilityType: "น้ำ",
      meterNo: "W-B001",
      readingDate: "2026-09-01",
      previousReading: 200,
      currentReading: 218,
      unitUsed: 18,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingReading, setEditingReading] = useState(null);

  const [formData, setFormData] = useState({
    contractId: "",
    utilityType: "น้ำ",
    meterNo: "",
    readingDate: "",
    previousReading: "",
    currentReading: "",
  });

  const resetForm = () => {
    setFormData({
      contractId: "",
      utilityType: "น้ำ",
      meterNo: "",
      readingDate: "",
      previousReading: "",
      currentReading: "",
    });
  };

  const handleAdd = () => {
    setEditingReading(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (reading) => {
    setEditingReading(reading);

    setFormData({
      contractId: reading.contractId,
      utilityType: reading.utilityType,
      meterNo: reading.meterNo,
      readingDate: reading.readingDate,
      previousReading: reading.previousReading,
      currentReading: reading.currentReading,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.contractId ||
      !formData.meterNo.trim() ||
      !formData.readingDate ||
      formData.previousReading === "" ||
      formData.currentReading === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const previous = Number(formData.previousReading);
    const current = Number(formData.currentReading);

    if (current < previous) {
      alert("เลขมิเตอร์ปัจจุบันต้องไม่น้อยกว่าเลขมิเตอร์ครั้งก่อน");
      return;
    }

    const unitUsed = current - previous;

    const readingData = {
      contractId: Number(formData.contractId),
      utilityType: formData.utilityType,
      meterNo: formData.meterNo.trim().toUpperCase(),
      readingDate: formData.readingDate,
      previousReading: previous,
      currentReading: current,
      unitUsed,
    };

    if (editingReading) {
      setReadings(
        readings.map((reading) =>
          reading.id === editingReading.id
            ? {
                ...reading,
                ...readingData,
              }
            : reading
        )
      );
    } else {
      setReadings([
        ...readings,
        {
          id: Date.now(),
          ...readingData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "ต้องการลบรายการมิเตอร์นี้หรือไม่?"
    );

    if (!confirmDelete) return;

    setReadings(
      readings.filter((reading) => reading.id !== id)
    );
  };

  const getContract = (contractId) => {
    return contracts.find(
      (contract) => contract.id === contractId
    );
  };

  const getUtilityClass = (type) => {
    if (type === "น้ำ") {
      return "bg-cyan-100 text-cyan-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            มิเตอร์น้ำ-ไฟ
          </h2>

          <p className="mt-1 text-gray-500">
            บันทึกเลขมิเตอร์และคำนวณหน่วยการใช้น้ำและไฟฟ้า
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + บันทึกมิเตอร์
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
                  สัญญา
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ผู้เช่า
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  ประเภท
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  เลขมิเตอร์
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  วันที่อ่าน
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ครั้งก่อน
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ครั้งนี้
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ใช้ไป
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  จัดการ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {readings.map((reading, index) => {
                const contract = getContract(
                  reading.contractId
                );

                return (
                  <tr
                    key={reading.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {contract?.contractNo || "-"}
                    </td>

                    <td className="px-5 py-4">
                      {contract?.tenant || "-"}
                      <div className="text-xs text-gray-500">
                        แผง {contract?.stall || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${getUtilityClass(
                          reading.utilityType
                        )}`}
                      >
                        {reading.utilityType}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {reading.meterNo}
                    </td>

                    <td className="px-5 py-4">
                      {reading.readingDate}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {reading.previousReading.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {reading.currentReading.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      {reading.unitUsed.toLocaleString()} หน่วย
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(reading)
                          }
                          className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          แก้ไข
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(reading.id)
                          }
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {readings.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    ยังไม่มีข้อมูลมิเตอร์
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
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold">
                {editingReading
                  ? "แก้ไขข้อมูลมิเตอร์"
                  : "บันทึกมิเตอร์"}
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
              {/* Contract */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  สัญญาเช่า
                </label>

                <select
                  value={formData.contractId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contractId: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="">
                    -- เลือกสัญญาเช่า --
                  </option>

                  {contracts.map((contract) => (
                    <option
                      key={contract.id}
                      value={contract.id}
                    >
                      {contract.contractNo} -{" "}
                      {contract.tenant} - แผง{" "}
                      {contract.stall}
                    </option>
                  ))}
                </select>
              </div>

              {/* Utility Type */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ประเภทมิเตอร์
                </label>

                <select
                  value={formData.utilityType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      utilityType: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="น้ำ">น้ำ</option>
                  <option value="ไฟ">ไฟ</option>
                </select>
              </div>

              {/* Meter No */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขมิเตอร์
                </label>

                <input
                  type="text"
                  value={formData.meterNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meterNo: e.target.value,
                    })
                  }
                  placeholder="เช่น W-A002"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Reading Date */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  วันที่อ่านมิเตอร์
                </label>

                <input
                  type="date"
                  value={formData.readingDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      readingDate: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Previous Reading */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขมิเตอร์ครั้งก่อน
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.previousReading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      previousReading: e.target.value,
                    })
                  }
                  placeholder="เช่น 120"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Current Reading */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขมิเตอร์ครั้งนี้
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.currentReading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentReading: e.target.value,
                    })
                  }
                  placeholder="เช่น 135"
                  className="w-full border rounded-lg px-4 py-2.5"
                />

                <p className="text-xs text-gray-500 mt-1">
                  ระบบจะคำนวณหน่วยที่ใช้ = ครั้งนี้ - ครั้งก่อน
                </p>
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
                  {editingReading
                    ? "บันทึกการแก้ไข"
                    : "บันทึกมิเตอร์"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Utilities;