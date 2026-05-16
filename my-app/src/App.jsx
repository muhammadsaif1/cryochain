import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Crisis from "./pages/Opportunity";
import Platform from "./pages/Platform";
import Vision from "./pages/Vision";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Profile from "./pages/admin/profile/Profile";

// Create a wrapper component to conditionally show Header/Footer
function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // If trying to access admin login while already logged in, redirect to dashboard
  const isLoginPage = location.pathname === "/admin/login";
  if (isLoginPage && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/opportunity" element={<Crisis />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin Login - Public */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
