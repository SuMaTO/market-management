import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        ระบบบริหารจัดการแผงค้าและจัดเก็บค่าเช่าตลาด
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          ออกจากระบบ
        </button>
      </div>
    </header>
  );
}

export default Navbar;