import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { login } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
      });

      console.log("Login Response:", res.data);

      // Save Token
      localStorage.setItem("token", res.data.token);

      // Save User ID
      if (res.data.user && res.data.user._id) {
        localStorage.setItem("userId", res.data.user._id);
      }

      console.log("Saved UserId:", localStorage.getItem("userId"));

      alert("Login Successful");

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <div className="left-panel">
          <div className="form-wrap">

            <h1 className="title">
              Sign In to
              <br />
              Your Account
            </h1>

            <form onSubmit={handleLogin}>

              <div className="input-group">
                <span className="icon">
                  <MdEmail />
                </span>

                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="icon">
                  <FaLock />
                </span>

                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Link className="forgot">
                Forgot Password?
              </Link>

              <button type="submit" className="sign-in-btn">
                SIGN IN
              </button>

            </form>

          </div>
        </div>

        <div className="right-panel">

          <div className="shapes">
            <div className="shape shape-top-right"></div>
            <div className="shape shape-triangle-top"></div>
            <div className="shape shape-circle-left"></div>
            <div className="shape shape-diamond-mid"></div>
            <div className="shape shape-dot-bottom"></div>
            <div className="shape shape-triangle-bottom"></div>
          </div>

          <div className="right-content">

            <h2 className="hello-title">
              Hello Friend!
            </h2>

            <p className="hello-text">
              Enter your personal details and
              <br />
              start your journey with us
            </p>

            <Link to="/signup">
              <button className="sign-up-btn">
                SIGN UP
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}