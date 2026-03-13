import { Routes, Route, Navigate } from "react-router-dom";
import LoginLayout from "./pages/auth/LoginLayout";
import LoginScreen from "./pages/auth/LoginScreen";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Products from "./pages/dashboard/Products";
import Published from "./pages/dashboard/Published";
import Unpublished from "./pages/dashboard/Unpublished";
import SignUp from "./pages/auth/SignUp";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/" element={<LoginLayout />}>

        <Route path="login" element={<LoginScreen />} />
        <Route path="signup" element={<SignUp />} />

        <Route index element={<Navigate to="/login" replace />} />

      </Route>

      <Route path="/signup" element={<SignUp />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="home" element={<Home />}>
          <Route index element={<Published />} />
          <Route path="published" element={<Published />} />
          <Route path="unpublished" element={<Unpublished />} />
        </Route>

        <Route path="products" element={<Products />} />
      </Route>

    </Routes>
  );
};

export default App;
