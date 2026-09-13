import { useState } from "react";

function Receipts() {
  const payments = [
    {
      id: 1,
      invoiceNo: "INV-0001",
      tenant: "สมชาย ใจดี",
      stall: "A002",
      paymentDate: "2026-09-05",
      amount: 2100,
      status: "ตรวจสอบแล้ว",
    },
    {
      id: 2,
      invoiceNo: "INV-0002",
      tenant: "สมหญิง รักดี",
      stall: "B001",
      paymentDate: "2026-01-05",
      amount: 14580,
      status: "ตรวจสอบแล้ว",
    },
    {
      id: 3,
      invoiceNo: "INV-0003",
      tenant: "วิชัย มั่นคง",
      stall: "A003",
      paymentDate: "2026-09-08",
      amount: 1800,
      status: "รอตรวจสอบ",
    },
  ];

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      paymentId: 1,
      receiptNo: "RC-0001",
      receiptDate: "2026-09-05",
      amount: 2100,
      issuedBy: "ผู้ดูแลระบบ",
      note: "",
    },
    {
      id: 2,
      paymentId: 2,
      receiptNo: "RC-0002",
      receiptDate: "2026-01-05",
      amount: 14580,
      issuedBy: "เจ้าหน้าที่ตลาด",
      note: "",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);

  const [formData, setFormData] = useState({
    paymentId: "",
    receiptNo: "",
    receiptDate: "",
    amount: "",
    issuedBy: "",
    note: "",
  });

  const verifiedPayments = payments.filter(
    (payment) => payment.status === "ตรวจสอบแล้ว"
  );

  const getPayment = (paymentId) => {
    return payments.find(
      (payment) => payment.id === Number(paymentId)
    );
  };

  const handleAdd = () => {
    setEditingReceipt(null);

    setFormData({
      paymentId: "",
      receiptNo: "",
      receiptDate: "",
      amount: "",
      issuedBy: "",
      note: "",
    });

    setShowModal(true);
  };

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);

    setFormData({
      paymentId: receipt.paymentId,
      receiptNo: receipt.receiptNo,
      receiptDate: receipt.receiptDate,
      amount: receipt.amount,
      issuedBy: receipt.issuedBy,
      note: receipt.note,
    });

    setShowModal(true);
  };

  const handlePaymentChange = (paymentId) => {
    const payment = getPayment(paymentId);

    setFormData({
      ...formData,
      paymentId,
      amount: payment ? payment.amount : "",
      receiptDate: payment
        ? payment.paymentDate
        : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.paymentId ||
      !formData.receiptNo ||
      !formData.receiptDate ||
      !formData.amount ||
      !formData.issuedBy
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const payment = getPayment(formData.paymentId);

    if (!payment) {
      alert("ไม่พบข้อมูลการชำระเงิน");
      return;
    }

    if (payment.status !== "ตรวจสอบแล้ว") {
      alert(
        "ไม่สามารถออกใบเสร็จจากรายการที่ยังไม่ได้ตรวจสอบ"
      );
      return;
    }

    const duplicateReceiptNo = receipts.some(
      (receipt) =>
        receipt.receiptNo.toLowerCase() ===
          formData.receiptNo.trim().toLowerCase() &&
        receipt.id !== editingReceipt?.id
    );

    if (duplicateReceiptNo) {
      alert("เลขที่ใบเสร็จนี้มีอยู่แล้ว");
      return;
    }

    const receiptData = {
      paymentId: Number(formData.paymentId),
      receiptNo: formData.receiptNo.trim().toUpperCase(),
      receiptDate: formData.receiptDate,
      amount: Number(formData.amount),
      issuedBy: formData.issuedBy.trim(),
      note: formData.note.trim(),
    };

    if (editingReceipt) {
      setReceipts(
        receipts.map((receipt) =>
          receipt.id === editingReceipt.id
            ? {
                ...receipt,
                ...receiptData,
              }
            : receipt
        )
      );
    } else {
      setReceipts([
        ...receipts,
        {
          id: Date.now(),
          ...receiptData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "ต้องการลบใบเสร็จนี้หรือไม่?"
    );

    if (!confirmDelete) return;

    setReceipts(
      receipts.filter((receipt) => receipt.id !== id)
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            ใบเสร็จรับเงิน
          </h2>

          <p className="mt-1 text-gray-500">
            จัดการและออกใบเสร็จรับเงินจากรายการชำระเงิน
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + ออกใบเสร็จ
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
                  เลขที่ใบเสร็จ
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ใบแจ้งหนี้
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ผู้เช่า
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  วันที่ออก
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  จำนวนเงิน
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ผู้ออกใบเสร็จ
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  จัดการ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {receipts.map((receipt, index) => {
                const payment = getPayment(
                  receipt.paymentId
                );

                return (
                  <tr
                    key={receipt.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {receipt.receiptNo}
                    </td>

                    <td className="px-5 py-4">
                      {payment?.invoiceNo || "-"}
                    </td>

                    <td className="px-5 py-4">
                      {payment?.tenant || "-"}
                      <div className="text-xs text-gray-500">
                        แผง {payment?.stall || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {receipt.receiptDate}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      {receipt.amount.toLocaleString()} บาท
                    </td>

                    <td className="px-5 py-4">
                      {receipt.issuedBy}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(receipt)
                          }
                          className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          แก้ไข
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(receipt.id)
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

              {receipts.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    ยังไม่มีใบเสร็จรับเงิน
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
                {editingReceipt
                  ? "แก้ไขใบเสร็จรับเงิน"
                  : "ออกใบเสร็จรับเงิน"}
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
              {/* Payment */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  รายการชำระเงิน
                </label>

                <select
                  value={formData.paymentId}
                  onChange={(e) =>
                    handlePaymentChange(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="">
                    -- เลือกรายการชำระเงิน --
                  </option>

                  {verifiedPayments.map((payment) => (
                    <option
                      key={payment.id}
                      value={payment.id}
                    >
                      {payment.invoiceNo} -{" "}
                      {payment.tenant} -{" "}
                      {payment.amount.toLocaleString()} บาท
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  แสดงเฉพาะรายการที่ตรวจสอบการชำระเงินแล้ว
                </p>
              </div>

              {/* Receipt No */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขที่ใบเสร็จ
                </label>

                <input
                  type="text"
                  value={formData.receiptNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      receiptNo: e.target.value
                        .toUpperCase()
                        .replace(/\s/g, ""),
                    })
                  }
                  placeholder="เช่น RC-0003"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Receipt Date */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  วันที่ออกใบเสร็จ
                </label>

                <input
                  type="date"
                  value={formData.receiptDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      receiptDate: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  จำนวนเงิน
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Issued By */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ผู้ออกใบเสร็จ
                </label>

                <input
                  type="text"
                  value={formData.issuedBy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issuedBy: e.target.value,
                    })
                  }
                  placeholder="ชื่อผู้รับผิดชอบ"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  หมายเหตุ
                </label>

                <textarea
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      note: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="หมายเหตุเพิ่มเติม"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
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
                  {editingReceipt
                    ? "บันทึกการแก้ไข"
                    : "ออกใบเสร็จ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Receipts;