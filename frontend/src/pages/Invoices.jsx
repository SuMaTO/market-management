import { useState } from "react";

function Invoices() {
  const contracts = [
    {
      id: 1,
      contractNo: "CT-0001",
      tenant: "สมชาย ใจดี",
      stall: "A002",
      rentAmount: 1500,
      paymentFrequency: "รายเดือน",
    },
    {
      id: 2,
      contractNo: "CT-0002",
      tenant: "สมหญิง รักดี",
      stall: "B001",
      rentAmount: 1200,
      paymentFrequency: "รายปี",
    },
  ];

  const utilityRates = {
    น้ำ: 10,
    ไฟ: 5,
  };

  const utilityReadings = [
    {
      contractId: 1,
      utilityType: "น้ำ",
      unitUsed: 15,
    },
    {
      contractId: 1,
      utilityType: "ไฟ",
      unitUsed: 90,
    },
    {
      contractId: 2,
      utilityType: "น้ำ",
      unitUsed: 18,
    },
  ];

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNo: "INV-0001",
      contractId: 1,
      invoiceDate: "2026-09-01",
      periodStart: "2026-09-01",
      periodEnd: "2026-09-30",
      rent: 1500,
      water: 150,
      electricity: 450,
      penalty: 0,
      total: 2100,
      status: "รอชำระ",
    },
    {
      id: 2,
      invoiceNo: "INV-0002",
      contractId: 2,
      invoiceDate: "2026-01-01",
      periodStart: "2026-01-01",
      periodEnd: "2026-12-31",
      rent: 14400,
      water: 180,
      electricity: 0,
      penalty: 0,
      total: 14580,
      status: "ชำระแล้ว",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const [formData, setFormData] = useState({
    invoiceNo: "",
    contractId: "",
    invoiceDate: "",
    periodStart: "",
    periodEnd: "",
    rent: "",
    water: "",
    electricity: "",
    penalty: "0",
    status: "รอชำระ",
  });

  const resetForm = () => {
    setFormData({
      invoiceNo: "",
      contractId: "",
      invoiceDate: "",
      periodStart: "",
      periodEnd: "",
      rent: "",
      water: "",
      electricity: "",
      penalty: "0",
      status: "รอชำระ",
    });
  };

  const getContract = (contractId) => {
    return contracts.find(
      (contract) => contract.id === Number(contractId)
    );
  };

  const getUtilityAmount = (contractId, utilityType) => {
    const reading = utilityReadings.find(
      (item) =>
        item.contractId === Number(contractId) &&
        item.utilityType === utilityType
    );

    if (!reading) return 0;

    return reading.unitUsed * utilityRates[utilityType];
  };

  const calculateRent = (contract) => {
    if (!contract) return 0;

    if (contract.paymentFrequency === "รายปี") {
      return contract.rentAmount * 12;
    }

    return contract.rentAmount;
  };

  const handleAdd = () => {
    setEditingInvoice(null);
    resetForm();
    setShowModal(true);
  };

  const handleContractChange = (contractId) => {
    const contract = getContract(contractId);

    if (!contract) {
      setFormData({
        ...formData,
        contractId,
      });

      return;
    }

    const rent = calculateRent(contract);
    const water = getUtilityAmount(contractId, "น้ำ");
    const electricity = getUtilityAmount(
      contractId,
      "ไฟ"
    );

    setFormData({
      ...formData,
      contractId,
      rent,
      water,
      electricity,
    });
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);

    setFormData({
      invoiceNo: invoice.invoiceNo,
      contractId: invoice.contractId,
      invoiceDate: invoice.invoiceDate,
      periodStart: invoice.periodStart,
      periodEnd: invoice.periodEnd,
      rent: invoice.rent,
      water: invoice.water,
      electricity: invoice.electricity,
      penalty: invoice.penalty,
      status: invoice.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.invoiceNo.trim() ||
      !formData.contractId ||
      !formData.invoiceDate ||
      !formData.periodStart ||
      !formData.periodEnd
    ) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }

    if (formData.periodStart > formData.periodEnd) {
      alert("วันที่เริ่มรอบบิลต้องไม่เกินวันที่สิ้นสุด");
      return;
    }

    const duplicateInvoiceNo = invoices.some(
      (invoice) =>
        invoice.invoiceNo.toLowerCase() ===
          formData.invoiceNo.trim().toLowerCase() &&
        invoice.id !== editingInvoice?.id
    );

    if (duplicateInvoiceNo) {
      alert("เลขที่ใบแจ้งหนี้นี้มีอยู่แล้ว");
      return;
    }

    const rent = Number(formData.rent) || 0;
    const water = Number(formData.water) || 0;
    const electricity =
      Number(formData.electricity) || 0;
    const penalty = Number(formData.penalty) || 0;

    const total =
      rent +
      water +
      electricity +
      penalty;

    const invoiceData = {
      invoiceNo: formData.invoiceNo
        .trim()
        .toUpperCase(),
      contractId: Number(formData.contractId),
      invoiceDate: formData.invoiceDate,
      periodStart: formData.periodStart,
      periodEnd: formData.periodEnd,
      rent,
      water,
      electricity,
      penalty,
      total,
      status: formData.status,
    };

    if (editingInvoice) {
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === editingInvoice.id
            ? {
                ...invoice,
                ...invoiceData,
              }
            : invoice
        )
      );
    } else {
      setInvoices([
        ...invoices,
        {
          id: Date.now(),
          ...invoiceData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "ต้องการลบใบแจ้งหนี้นี้หรือไม่?"
    );

    if (!confirmDelete) return;

    setInvoices(
      invoices.filter((invoice) => invoice.id !== id)
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ชำระแล้ว":
        return "bg-green-100 text-green-700";

      case "รอชำระ":
        return "bg-yellow-100 text-yellow-700";

      case "ค้างชำระ":
        return "bg-red-100 text-red-700";

      case "ยกเลิก":
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
            ใบแจ้งหนี้
          </h2>

          <p className="mt-1 text-gray-500">
            จัดการใบแจ้งหนี้ค่าเช่า ค่าน้ำ ค่าไฟ และค่าปรับ
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + สร้างใบแจ้งหนี้
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
                  เลขที่ใบแจ้งหนี้
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ผู้เช่า
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  รอบบิล
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ค่าเช่า
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ค่าน้ำ
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ค่าไฟ
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ค่าปรับ
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  รวม
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
              {invoices.map((invoice, index) => {
                const contract = getContract(
                  invoice.contractId
                );

                return (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {invoice.invoiceNo}
                    </td>

                    <td className="px-5 py-4">
                      {contract?.tenant || "-"}
                      <div className="text-xs text-gray-500">
                        แผง {contract?.stall || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {invoice.periodStart}
                      <br />
                      <span className="text-gray-500 text-sm">
                        ถึง {invoice.periodEnd}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      {invoice.rent.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {invoice.water.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {invoice.electricity.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {invoice.penalty.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right font-bold">
                      {invoice.total.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(invoice)
                          }
                          className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          แก้ไข
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(invoice.id)
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

              {invoices.length === 0 && (
                <tr>
                  <td
                    colSpan="11"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    ยังไม่มีข้อมูลใบแจ้งหนี้
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
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-semibold">
                {editingInvoice
                  ? "แก้ไขใบแจ้งหนี้"
                  : "สร้างใบแจ้งหนี้"}
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
              {/* Invoice No */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขที่ใบแจ้งหนี้
                </label>

                <input
                  type="text"
                  value={formData.invoiceNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      invoiceNo: e.target.value
                        .toUpperCase()
                        .replace(/\s/g, ""),
                    })
                  }
                  placeholder="เช่น INV-0003"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Contract */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  สัญญาเช่า
                </label>

                <select
                  value={formData.contractId}
                  onChange={(e) =>
                    handleContractChange(e.target.value)
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

              {/* Invoice Date */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  วันที่ออกใบแจ้งหนี้
                </label>

                <input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      invoiceDate: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    เริ่มรอบบิล
                  </label>

                  <input
                    type="date"
                    value={formData.periodStart}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        periodStart: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    สิ้นสุดรอบบิล
                  </label>

                  <input
                    type="date"
                    value={formData.periodEnd}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        periodEnd: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>
              </div>

              {/* Rent */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ค่าเช่า
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.rent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rent: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Water */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ค่าน้ำ
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.water}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      water: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Electricity */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ค่าไฟ
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.electricity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      electricity: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Penalty */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ค่าปรับ
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.penalty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      penalty: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Status */}
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
                  <option value="รอชำระ">
                    รอชำระ
                  </option>

                  <option value="ชำระแล้ว">
                    ชำระแล้ว
                  </option>

                  <option value="ค้างชำระ">
                    ค้างชำระ
                  </option>

                  <option value="ยกเลิก">
                    ยกเลิก
                  </option>
                </select>
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex justify-between">
                  <span className="font-medium">
                    ยอดรวม
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    {(
                      (Number(formData.rent) || 0) +
                      (Number(formData.water) || 0) +
                      (Number(formData.electricity) || 0) +
                      (Number(formData.penalty) || 0)
                    ).toLocaleString()}{" "}
                    บาท
                  </span>
                </div>
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
                  {editingInvoice
                    ? "บันทึกการแก้ไข"
                    : "สร้างใบแจ้งหนี้"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoices;