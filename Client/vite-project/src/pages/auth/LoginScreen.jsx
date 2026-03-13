import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // typing ke time error remove
    setError("");

  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.email || !formData.password) {
      setError("Email and Password are required");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.data.token);

      navigate("/dashboard/home");

    } catch (error) {

      console.log("Login error ---->", error.response);

      setError(
        error.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-right-content">

      <div className="login-top-container">
        <h1>Login to your Product Account</h1>
        {error && (
          <p className="error-text">{error}</p>
        )}
        <form className="login-form" onSubmit={handleLogin}>

          <div className="login-input-container">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          <div className="login-input-container">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

      <div className="login-bottom-container">
        <span>Don't have a Product Account </span>
        <Link to="/signup">SignUp Here</Link>
      </div>

    </div>
  );
};

export default LoginScreen;