import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          ระบบบริหารจัดการตลาด
        </h1>

        <p className="text-center text-gray-500 mt-2">
          กรุณาเข้าสู่ระบบ
        </p>

        {error && (
          <div className="mt-4 bg-red-100 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              ชื่อผู้ใช้
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              รหัสผ่าน
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          <p>สำหรับทดสอบระบบ:</p>
          <p>admin / 1234</p>
          <p>staff / 1234</p>
          <p>manager / 1234</p>
        </div>
      </div>
    </div>
  );
}

export default Login;