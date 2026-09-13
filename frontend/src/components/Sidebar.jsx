import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "staff", "manager"],
    },
    {
      name: "จัดการโซน",
      path: "/zones",
      roles: ["admin", "staff"],
    },
    {
      name: "จัดการแผงค้า",
      path: "/stalls",
      roles: ["admin", "staff"],
    },
    {
      name: "ผู้เช่า",
      path: "/tenants",
      roles: ["admin", "staff"],
    },
    {
      name: "สัญญาเช่า",
      path: "/contracts",
      roles: ["admin", "staff"],
    },
    {
      name: "มิเตอร์น้ำ-ไฟ",
      path: "/utilities",
      roles: ["admin", "staff"],
    },
    {
      name: "ใบแจ้งหนี้",
      path: "/invoices",
      roles: ["admin", "staff"],
    },
    {
      name: "การชำระเงิน",
      path: "/payments",
      roles: ["admin", "staff"],
    },
    {
      name: "ใบเสร็จรับเงิน",
      path: "/receipts",
      roles: ["admin", "staff"],
    },
    {
      name: "รายงาน",
      path: "/reports",
      roles: ["admin", "manager"],
    },
  ];

  const allowedMenus = menus.filter((menu) =>
    menu.roles.includes(user?.role)
  );

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white">
      <div className="p-5 text-xl font-bold border-b border-gray-700">
        ระบบจัดการตลาด
      </div>

      <nav className="p-3 space-y-1">
        {allowedMenus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;