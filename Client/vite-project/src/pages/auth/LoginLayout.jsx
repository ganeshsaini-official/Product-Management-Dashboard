import { Outlet } from "react-router-dom";
import LoginLeft from "./LoginLeft.jsx ";

const LoginLayout = () => {
    return (
        <div className="login-page">
            <div className="login-left-container">
                <LoginLeft />
            </div>

            <div className="login-right-container">
                <Outlet />
            </div>

        </div>
    );
};

export default LoginLayout;
