import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Zones from "./pages/Zones";
import Stalls from "./pages/Stalls";
import Tenants from "./pages/Tenants";
import Contracts from "./pages/Contracts";
import Utilities from "./pages/Utilities";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Receipts from "./pages/Receipts";
import Reports from "./pages/Reports";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* หน้า Login */}
          <Route path="/login" element={<Login />} />

          {/* ระบบหลัก */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>

                    {/* Dashboard */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute
                          roles={["admin", "staff", "manager"]}
                        >
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* จัดการโซน */}
                    <Route
                      path="/zones"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Zones />
                        </ProtectedRoute>
                      }
                    />

                    {/* จัดการแผงค้า */}
                    <Route
                      path="/stalls"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Stalls />
                        </ProtectedRoute>
                      }
                    />

                    {/* ผู้เช่า */}
                    <Route
                      path="/tenants"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Tenants />
                        </ProtectedRoute>
                      }
                    />

                    {/* สัญญาเช่า */}
                    <Route
                      path="/contracts"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Contracts />
                        </ProtectedRoute>
                      }
                    />

                    {/* มิเตอร์น้ำ-ไฟ */}
                    <Route
                      path="/utilities"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Utilities />
                        </ProtectedRoute>
                      }
                    />

                    {/* ใบแจ้งหนี้ */}
                    <Route
                      path="/invoices"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                         <Invoices />
                        </ProtectedRoute>
                      }
                    />

                    {/* การชำระเงิน */}
                    <Route
                      path="/payments"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Payments />
                        </ProtectedRoute>
                      }
                    />

                    {/* ใบเสร็จรับเงิน */}
                    <Route
                      path="/receipts"
                      element={
                        <ProtectedRoute roles={["admin", "staff"]}>
                          <Receipts />
                        </ProtectedRoute>
                      }
                    />

                    {/* รายงาน */}
                    <Route
                      path="/reports"
                      element={
                        <ProtectedRoute roles={["admin", "manager"]}>
                          <Reports />
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* จัดการผู้ใช้งาน */}
                    <Route
                      path="/users"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <Users />
                        </ProtectedRoute>
                      }
                    />

                    {/* ถ้าไม่พบหน้า */}
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />

                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;