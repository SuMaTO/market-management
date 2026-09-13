function Reports() {
  const summary = [
    {
      title: "รายได้ค่าเช่า",
      value: 156800,
      unit: "บาท",
    },
    {
      title: "ยอดค้างชำระ",
      value: 28500,
      unit: "บาท",
    },
    {
      title: "ผู้เช่าทั้งหมด",
      value: 82,
      unit: "ราย",
    },
    {
      title: "แผงที่มีสัญญาเช่า",
      value: 82,
      unit: "แผง",
    },
  ];

  const stallStatus = [
    {
      status: "ว่าง",
      count: 25,
    },
    {
      status: "จอง",
      count: 8,
    },
    {
      status: "เช่า",
      count: 82,
    },
    {
      status: "ซ่อมบำรุง",
      count: 5,
    },
  ];

  const paymentSummary = [
    {
      status: "ชำระแล้ว",
      count: 65,
      amount: 156800,
    },
    {
      status: "รอตรวจสอบ",
      count: 5,
      amount: 12500,
    },
    {
      status: "ค้างชำระ",
      count: 13,
      amount: 28500,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          รายงาน
        </h2>

        <p className="mt-1 text-gray-500">
          สรุปข้อมูลการบริหารจัดการแผงค้าและค่าเช่าตลาด
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {summary.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm border p-5"
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <div className="flex items-end gap-2 mt-2">
              <p className="text-3xl font-bold text-gray-800">
                {item.value.toLocaleString()}
              </p>

              <span className="text-sm text-gray-500 mb-1">
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stall Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            สรุปสถานะแผงค้า
          </h3>

          <div className="mt-5 space-y-4">
            {stallStatus.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between border-b pb-3"
              >
                <span className="text-gray-600">
                  {item.status}
                </span>

                <span className="font-semibold text-gray-800">
                  {item.count.toLocaleString()} แผง
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            สรุปการชำระเงิน
          </h3>

          <div className="mt-5 space-y-4">
            {paymentSummary.map((item) => (
              <div
                key={item.status}
                className="border-b pb-3"
              >
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {item.status}
                  </span>

                  <span className="font-semibold">
                    {item.count} รายการ
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {item.amount.toLocaleString()} บาท
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Income Report */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              รายงานรายได้ค่าเช่า
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              สรุปรายได้ตามเดือน
            </p>
          </div>

          <select className="border rounded-lg px-4 py-2">
            <option>ปี 2569</option>
            <option>ปี 2568</option>
            <option>ปี 2567</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  เดือน
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  จำนวนใบแจ้งหนี้
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ยอดเรียกเก็บ
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ยอดชำระแล้ว
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  ยอดค้างชำระ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr>
                <td className="px-5 py-4">
                  มกราคม
                </td>

                <td className="px-5 py-4 text-right">
                  82
                </td>

                <td className="px-5 py-4 text-right">
                  125,000 บาท
                </td>

                <td className="px-5 py-4 text-right">
                  120,000 บาท
                </td>

                <td className="px-5 py-4 text-right">
                  5,000 บาท
                </td>
              </tr>

              <tr>
                <td className="px-5 py-4">
                  กุมภาพันธ์
                </td>

                <td className="px-5 py-4 text-right">
                  82
                </td>

                <td className="px-5 py-4 text-right">
                  128,500 บาท
                </td>

                <td className="px-5 py-4 text-right">
                  124,000 บาท
                </td>

                <td className="px-5 py-4 text-right">
                  4,500 บาท
                </td>
              </tr>

              <tr>
                <td className="px-5 py-4">
                  มีนาคม
                </td>

                <td className="px-5 py-4 text-right">
                  82
                </td>

                <td className="px-5 py-4 text-right">
                  130,200 บาท
                </td>

                <td className="px-5 py-4 text-right">
                  126,000 บาท
                </td>

                <td className="px-5 py-4 text-right">
                  4,200 บาท
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Export */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() =>
            alert("ฟังก์ชันส่งออกรายงานจะเชื่อมกับ Backend ภายหลัง")
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ส่งออกรายงาน
        </button>
      </div>
    </div>
  );
}

export default Reports;