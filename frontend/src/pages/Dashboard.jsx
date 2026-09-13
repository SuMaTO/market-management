function Dashboard() {
  const summary = [
    {
      title: "แผงค้าทั้งหมด",
      value: 120,
      detail: "แผง",
    },
    {
      title: "แผงว่าง",
      value: 25,
      detail: "แผง",
    },
    {
      title: "ผู้เช่า",
      value: 82,
      detail: "ราย",
    },
    {
      title: "ค้างชำระ",
      value: 13,
      detail: "รายการ",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="mt-1 text-gray-500">
          ภาพรวมระบบบริหารจัดการแผงค้าและค่าเช่าตลาด
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
                {item.value}
              </p>

              <span className="text-sm text-gray-500 mb-1">
                {item.detail}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        {/* Stall Status */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            สถานะแผงค้า
          </h3>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span>ว่าง</span>
              <span className="font-semibold">25</span>
            </div>

            <div className="flex justify-between">
              <span>จอง</span>
              <span className="font-semibold">8</span>
            </div>

            <div className="flex justify-between">
              <span>เช่า</span>
              <span className="font-semibold">82</span>
            </div>

            <div className="flex justify-between">
              <span>ซ่อมบำรุง</span>
              <span className="font-semibold">5</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            รายการล่าสุด
          </h3>

          <div className="mt-4 space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium">
                มีการบันทึกการชำระเงิน
              </p>
              <p className="text-sm text-gray-500">
                ใบแจ้งหนี้ INV-0001
              </p>
            </div>

            <div className="border-b pb-3">
              <p className="font-medium">
                เพิ่มผู้เช่ารายใหม่
              </p>
              <p className="text-sm text-gray-500">
                ผู้เช่าใหม่
              </p>
            </div>

            <div>
              <p className="font-medium">
                มีการสร้างสัญญาเช่า
              </p>
              <p className="text-sm text-gray-500">
                สัญญา CT-0001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;