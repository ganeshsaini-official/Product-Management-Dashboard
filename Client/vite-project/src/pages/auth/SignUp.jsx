import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSignup = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Signup successful. Please login now.");

    // phone pass kar do OTP screen ko
    navigate("/");

  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="signup-content">
      <div className="signup-container">
        <h1>SignUp to your Product Account</h1>

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
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSignup}>SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
