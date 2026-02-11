import runningImg from "../../assets/cart.jpg"
import logo from "../../assets/logo.png"
const LoginLeft = () => {
  return (
    <>
      <section>
        <div className="login-img-cotainer">
          <div className="login-banner-img" >
          </div>

          <div className="running-img-container">
            <img
              id="running-img"
              src={runningImg}
              alt="RunningImg"
            />
          </div>

          <span>
            Uplist your <br />
            product to market
          </span>

          <div className="logo-img-container">
            <img
              id="logo-img"
              src={logo}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginLeft;