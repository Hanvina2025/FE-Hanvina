import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PATH, ADMIN_PATHS } from "./libs/constants/path";

// CLIENT
import ProtectedRoute from "./client/components/ProtectedRoute";
import Layout from "./client/components/Layout";
import Home from "./client/pages/Home";

// LOGIN REGISTER
import Login from "./admin/Login";
import Register from "./admin/Register";

// ADMIN_PATHS
import { AuthProvider } from "./admin/components/AuthProvider";
import AdminLayout from "./admin/components/Layout";
import Dashboard from "./admin/Dashboard";
import ProtectedAdminRoute from "./admin/components/ProtectedRoute";
import { ListTour } from "./client/pages/ListTour";
import Reserve from "./client/pages/Reserve";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Client Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path={PATH.LIST_TOUR} element={<ListTour />} />
              <Route path={PATH.RESERVE} element={<Reserve />} />
              <Route path={PATH.HOME} element={<Home />} />
            </Route>

            {/* Login Register Routes  */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />

            {/* Admin Routes */}

            <Route
              path={ADMIN_PATHS.DASHBOARD}
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
