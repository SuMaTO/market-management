import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Sidebar() {
    const { user, logout } = useAuth();

    const canManage = ["admin", "staff"].includes(user?.role);
    const canReport = ["admin", "manager"].includes(user?.role);
    const isAdmin = user?.role === "admin";

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold">
                    Market Management
                </h2>

                {user && (
                    <div className="mt-2 text-sm text-gray-300">
                        {user.full_name}
                        <br />
                        Role: {user.role}
                    </div>
                )}
            </div>

            <nav className="space-y-2">

                {/* Dashboard */}
                <Link
                    to="/dashboard"
                    className="block p-2 rounded hover:bg-gray-700"
                >
                    Dashboard
                </Link>

                {/* จัดการโซน */}
                {canManage && (
                    <Link
                        to="/zones"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        จัดการโซน
                    </Link>
                )}

                {/* จัดการแผงค้า */}
                {canManage && (
                    <Link
                        to="/stalls"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        จัดการแผงค้า
                    </Link>
                )}

                {/* ผู้เช่า */}
                {canManage && (
                    <Link
                        to="/tenants"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        จัดการผู้เช่า
                    </Link>
                )}

                {/* สัญญาเช่า */}
                {canManage && (
                    <Link
                        to="/contracts"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        สัญญาเช่า
                    </Link>
                )}

                {/* มิเตอร์น้ำ-ไฟ */}
                {canManage && (
                    <Link
                        to="/utilities"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        มิเตอร์น้ำ-ไฟ
                    </Link>
                )}

                {/* ใบแจ้งหนี้ */}
                {canManage && (
                    <Link
                        to="/invoices"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        ใบแจ้งหนี้
                    </Link>
                )}

                {/* การชำระเงิน */}
                {canManage && (
                    <Link
                        to="/payments"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        การชำระเงิน
                    </Link>
                )}

                {/* ใบเสร็จ */}
                {canManage && (
                    <Link
                        to="/receipts"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        ใบเสร็จรับเงิน
                    </Link>
                )}

                {/* รายงาน */}
                {canReport && (
                    <Link
                        to="/reports"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        รายงาน
                    </Link>
                )}

                {/* Users */}
                {isAdmin && (
                    <Link
                        to="/users"
                        className="block p-2 rounded hover:bg-gray-700"
                    >
                        จัดการผู้ใช้งาน
                    </Link>
                )}

            </nav>

            {/* Logout */}
            <button
                onClick={logout}
                className="mt-8 w-full bg-red-600 p-2 rounded hover:bg-red-700"
            >
                ออกจากระบบ
            </button>

        </aside>
    );
}

export default Sidebar;