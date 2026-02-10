import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const identifier = state?.identifier; // email or phone

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

const handleVerifyOTP = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 6) {
    alert("Enter valid 6 digit OTP");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/verify-otp",
      {
        identifier,
        otp: enteredOtp
      }
    );

    localStorage.setItem("token", res.data.data.token);

    navigate("/dashboard/home");

  } catch (error) {
    console.log("invaid otp error --->" , error.response?.data?.message );
    
    alert(error.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};


  const handleResend = async () => {
    try {
      const payload = identifier.includes("@")
        ? { email: identifier }
        : { phone: identifier };

      await axios.post(
        "http://localhost:5000/api/auth/request-otp",
        payload
      );

      setOtp(new Array(6).fill(""));
      setTimer(20);
      inputsRef.current[0].focus();

    } catch (error) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Login to your Productr Account</h2>
      <p className="label">Enter OTP</p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button className="otp-btn" onClick={handleVerifyOTP} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <p className="resend">
        Didn't receive OTP?{" "}
        {timer > 0 ? (
          <span className="timer">Resend in {timer}s</span>
        ) : (
          <span className="resend-btn" onClick={handleResend}>
            Resend
          </span>
        )}
      </p>

    </div>
  );
};

export default OtpScreen;
