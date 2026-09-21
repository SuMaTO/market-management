import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../auth/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(false);

        const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const result = await loginUser(username, password);

            console.log("LOGIN RESULT:", result);

            login(result.user, result.token);

            navigate("/");

        } catch (error) {
            console.error("LOGIN ERROR:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

                <h1 className="text-2xl font-bold text-center mb-6">
                    เข้าสู่ระบบ
                </h1>

                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                        <label className="block mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                        {loading
                            ? "กำลังเข้าสู่ระบบ..."
                            : "เข้าสู่ระบบ"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;