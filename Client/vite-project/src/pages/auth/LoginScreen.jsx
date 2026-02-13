import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.data.token);

      alert("Login Successful");

      navigate("/dashboard/home");

    } catch (error) {
      console.log("Login error ---->", error.response);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-right-content">
      <div className="login-top-container">
        <h1>Login to your Product Account</h1>

        <div className="login-input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div className="login-input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className="login-bottom-container">
        <span>Don't have a Product Account </span>
        <Link to="/signup">SignUp Here</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
