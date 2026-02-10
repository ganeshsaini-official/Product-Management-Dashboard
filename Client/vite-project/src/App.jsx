import { Routes, Route } from "react-router-dom";
import LoginLayout from "./pages/auth/LoginLayout";
import LoginScreen from "./pages/auth/LoginScreen";
import OtpScreen from "./pages/auth/OtpScreen";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Products from "./pages/dashboard/Products";
import Published from "./pages/dashboard/Published";
import Unpublished from "./pages/dashboard/Unpublished";
import SignUp from "./pages/auth/SignUp";

const App = () => {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<LoginScreen />} />
        <Route path="otp" element={<OtpScreen />} />
        <Route path="signup" element={<SignUp/>} />
      </Route>

      {/* DASHBOARD */}
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
