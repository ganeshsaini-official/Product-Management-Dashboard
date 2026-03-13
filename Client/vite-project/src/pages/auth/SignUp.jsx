import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // typing ke time error remove
    setError("");

  };

  const handleSignup = async () => {

    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard/home");
      } else {
        navigate("/login");
      }

    } catch (error) {

      console.error("Signup error:", error);
      setError("Something went wrong");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="signup-content">
      <div className="signup-container">

        <h1>SignUp to your Product Account</h1>
        {error && (
          <p className="error-text">{error}</p>
        )}

        <div className="signup-input-container">

          <div className="singup-input">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          <div className="singup-input">
            <input
              type="email"
              name="email"
              placeholder="Enter your email id"
              onChange={handleChange}
            />
          </div>

          <div className="singup-input">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <div className="singup-input">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </div>

          <div className="singup-input">
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSignup} disabled={loading}>
            {loading ? "Creating Account..." : "SignUp"}
          </button>

        </div>

        <div className="login-bottom-container">
          <span>If you already have a Product Account </span>
          <Link to="/login">Login Here</Link>
        </div>

      </div>
    </div>
  );
};

export default SignUp;