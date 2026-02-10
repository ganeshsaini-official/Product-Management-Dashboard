import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier) {
      alert("Email or phone number required");
      return;
    }

    try {
      setLoading(true);

      const payload = identifier.includes("@")
        ? { email: identifier }
        : { phone: identifier };

      await axios.post(
        "http://localhost:5000/api/auth/request-otp",
        payload
      );

      navigate("/otp", {
        state: { identifier }
      });

    } catch (error) {
      console.log("Otp send error ---->" , error.response);
      
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-right-content">
      <div className="login-top-container">
        <h1>Login to your Product Account</h1>

        <div className="login-input-container">
          <label>Email or Phone number</label>
          <input
            type="text"
            placeholder="Enter email or phone number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Sending OTP..." : "Login"}
        </button>
      </div>

      <div className="login-bottom-container">
        <span>Don't have a Productr Account </span>
        <Link to="/signup">SignUp Here</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
