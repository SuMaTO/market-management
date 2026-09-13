import { useState } from "react";

function Payments() {
  const invoices = [
    {
      id: 1,
      invoiceNo: "INV-0001",
      tenant: "สมชาย ใจดี",
      stall: "A002",
      total: 2100,
    },
    {
      id: 2,
      invoiceNo: "INV-0002",
      tenant: "สมหญิง รักดี",
      stall: "B001",
      total: 14580,
    },
    {
      id: 3,
      invoiceNo: "INV-0003",
      tenant: "วิชัย มั่นคง",
      stall: "A003",
      total: 1800,
    },
  ];

  const [payments, setPayments] = useState([
    {
      id: 1,
      invoiceId: 1,
      paymentDate: "2026-09-05",
      amount: 2100,
      paymentMethod: "PromptPay",
      slipImage: "slip-0001.jpg",
      transactionRef: "PP202609050001",
      status: "รอตรวจสอบ",
      note: "",
    },
    {
      id: 2,
      invoiceId: 2,
      paymentDate: "2026-01-05",
      amount: 14580,
      paymentMethod: "โอนเงิน",
      slipImage: "slip-0002.jpg",
      transactionRef: "TRX202601050001",
      status: "ตรวจสอบแล้ว",
      note: "ยอดถูกต้อง",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] =
    useState(null);

  const [formData, setFormData] = useState({
    invoiceId: "",
    paymentDate: "",
    amount: "",
    paymentMethod: "PromptPay",
    slipImage: "",
    transactionRef: "",
    status: "รอตรวจสอบ",
    note: "",
  });

  const resetForm = () => {
    setFormData({
      invoiceId: "",
      paymentDate: "",
      amount: "",
      paymentMethod: "PromptPay",
      slipImage: "",
      transactionRef: "",
      status: "รอตรวจสอบ",
      note: "",
    });
  };

  const getInvoice = (invoiceId) => {
    return invoices.find(
      (invoice) => invoice.id === Number(invoiceId)
    );
  };

  const handleAdd = () => {
    setEditingPayment(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);

    setFormData({
      invoiceId: payment.invoiceId,
      paymentDate: payment.paymentDate,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      slipImage: payment.slipImage,
      transactionRef: payment.transactionRef,
      status: payment.status,
      note: payment.note,
    });

    setShowModal(true);
  };

  const handleInvoiceChange = (invoiceId) => {
    const invoice = getInvoice(invoiceId);

    setFormData({
      ...formData,
      invoiceId,
      amount: invoice ? invoice.total : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.invoiceId ||
      !formData.paymentDate ||
      !formData.amount ||
      !formData.paymentMethod
    ) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }

    const invoice = getInvoice(formData.invoiceId);

    if (!invoice) {
      alert("ไม่พบข้อมูลใบแจ้งหนี้");
      return;
    }

    const amount = Number(formData.amount);

    if (amount <= 0) {
      alert("จำนวนเงินต้องมากกว่า 0");
      return;
    }

    if (amount > invoice.total) {
      alert("จำนวนเงินที่ชำระไม่ควรมากกว่ายอดใบแจ้งหนี้");
      return;
    }

    const paymentData = {
      invoiceId: Number(formData.invoiceId),
      paymentDate: formData.paymentDate,
      amount,
      paymentMethod: formData.paymentMethod,
      slipImage: formData.slipImage,
      transactionRef: formData.transactionRef.trim(),
      status: formData.status,
      note: formData.note.trim(),
    };

    if (editingPayment) {
      setPayments(
        payments.map((payment) =>
          payment.id === editingPayment.id
            ? {
                ...payment,
                ...paymentData,
              }
            : payment
        )
      );
    } else {
      setPayments([
        ...payments,
        {
          id: Date.now(),
          ...paymentData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "ต้องการลบรายการชำระเงินนี้หรือไม่?"
    );

    if (!confirmDelete) return;

    setPayments(
      payments.filter((payment) => payment.id !== id)
    );
  };

  const handleVerify = (id) => {
    const confirmVerify = window.confirm(
      "ยืนยันการตรวจสอบรายการชำระเงินนี้หรือไม่?"
    );

    if (!confirmVerify) return;

    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: "ตรวจสอบแล้ว",
            }
          : payment
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ตรวจสอบแล้ว":
        return "bg-green-100 text-green-700";

      case "รอตรวจสอบ":
        return "bg-yellow-100 text-yellow-700";

      case "ไม่ผ่าน":
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
            การชำระเงิน
          </h2>

          <p className="mt-1 text-gray-500">
            จัดการรายการชำระเงินและตรวจสอบหลักฐานการชำระ
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + บันทึกการชำระเงิน
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
                  ใบแจ้งหนี้
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ผู้เช่า
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  วันที่ชำระ
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  จำนวนเงิน
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  วิธีชำระ
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  หลักฐาน
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
              {payments.map((payment, index) => {
                const invoice = getInvoice(
                  payment.invoiceId
                );

                return (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {invoice?.invoiceNo || "-"}
                    </td>

                    <td className="px-5 py-4">
                      {invoice?.tenant || "-"}
                      <div className="text-xs text-gray-500">
                        แผง {invoice?.stall || "-"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {payment.paymentDate}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      {payment.amount.toLocaleString()} บาท
                    </td>

                    <td className="px-5 py-4 text-center">
                      {payment.paymentMethod}
                    </td>

                    <td className="px-5 py-4 text-center">
                      {payment.slipImage ? (
                        <span className="text-blue-600 text-sm">
                          มีหลักฐาน
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          ไม่มี
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        {payment.status === "รอตรวจสอบ" && (
                          <button
                            onClick={() =>
                              handleVerify(payment.id)
                            }
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            ตรวจสอบ
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleEdit(payment)
                          }
                          className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          แก้ไข
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(payment.id)
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

              {payments.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    ยังไม่มีรายการชำระเงิน
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
                {editingPayment
                  ? "แก้ไขการชำระเงิน"
                  : "บันทึกการชำระเงิน"}
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
              {/* Invoice */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  ใบแจ้งหนี้
                </label>

                <select
                  value={formData.invoiceId}
                  onChange={(e) =>
                    handleInvoiceChange(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="">
                    -- เลือกใบแจ้งหนี้ --
                  </option>

                  {invoices.map((invoice) => (
                    <option
                      key={invoice.id}
                      value={invoice.id}
                    >
                      {invoice.invoiceNo} -{" "}
                      {invoice.tenant} - {invoice.total.toLocaleString()} บาท
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Date */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  วันที่ชำระ
                </label>

                <input
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentDate: e.target.value,
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

              {/* Payment Method */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  วิธีชำระเงิน
                </label>

                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                >
                  <option value="PromptPay">
                    PromptPay
                  </option>

                  <option value="โอนเงิน">
                    โอนเงิน
                  </option>

                  <option value="เงินสด">
                    เงินสด
                  </option>
                </select>
              </div>

              {/* Slip */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  หลักฐานการชำระเงิน
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slipImage:
                        e.target.files?.[0]?.name || "",
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2.5"
                />

                {formData.slipImage && (
                  <p className="text-xs text-gray-500 mt-1">
                    ไฟล์: {formData.slipImage}
                  </p>
                )}
              </div>

              {/* Transaction Ref */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  เลขอ้างอิงธุรกรรม
                </label>

                <input
                  type="text"
                  value={formData.transactionRef}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactionRef: e.target.value,
                    })
                  }
                  placeholder="เช่น PP202609050001"
                  className="w-full border rounded-lg px-4 py-2.5"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  สถานะการตรวจสอบ
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
                  <option value="รอตรวจสอบ">
                    รอตรวจสอบ
                  </option>

                  <option value="ตรวจสอบแล้ว">
                    ตรวจสอบแล้ว
                  </option>

                  <option value="ไม่ผ่าน">
                    ไม่ผ่าน
                  </option>
                </select>
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
                  {editingPayment
                    ? "บันทึกการแก้ไข"
                    : "บันทึกการชำระเงิน"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;