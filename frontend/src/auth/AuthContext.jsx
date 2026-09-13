import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (username, password) => {
    // ข้อมูลจำลอง
    const users = [
      {
        username: "admin",
        password: "1234",
        name: "ผู้ดูแลระบบ",
        role: "admin",
      },
      {
        username: "staff",
        password: "1234",
        name: "เจ้าหน้าที่ตลาด",
        role: "staff",
      },
      {
        username: "manager",
        password: "1234",
        name: "ผู้บริหารตลาด",
        role: "manager",
      },
    ];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return false;
    }

    localStorage.setItem("user", JSON.stringify(foundUser));
    setUser(foundUser);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}