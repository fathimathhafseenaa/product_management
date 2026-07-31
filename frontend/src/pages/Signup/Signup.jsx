import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { signup } from "../../services/authService";

export default function SignUpScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signup({
        name,
        email,
        password,
      });

      alert(res.data.message);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="su-page">
      <div className="su-card">

        {/* Left Panel */}
        <div className="su-left-panel">
          <div className="su-shapes">
            <div className="su-shape su-shape-diamond-top"></div>
            <div className="su-shape su-shape-triangle-mid"></div>
            <div className="su-shape su-shape-circle-bottom"></div>
            <div className="su-shape su-shape-rect-bottom"></div>
          </div>

          <div className="su-left-content">
            <h2 className="su-welcome-title">Welcome Back!</h2>

            <p className="su-welcome-text">
              To keep connected with us please
              <br />
              login with your personal info
            </p>

            <Link to="/">
              <button type="button" className="su-signin-btn">
                SIGN IN
              </button>
            </Link>
          </div>
        </div>

        {/* Right Panel */}
        <div className="su-right-panel">

          <div className="su-form-wrap">

            <h1 className="su-title">Create Account</h1>

            <form onSubmit={handleSignup}>

              <div className="su-input-group">
                <span className="su-icon">
                  <FaUser />
                </span>

                <input
                  type="text"
                  placeholder="Name"
                  className="su-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="su-input-group">
                <span className="su-icon">
                  <MdEmail />
                </span>

                <input
                  type="email"
                  placeholder="Email"
                  className="su-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="su-input-group">
                <span className="su-icon">
                  <FaLock />
                </span>

                <input
                  type="password"
                  placeholder="Password"
                  className="su-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="su-signup-btn">
                SIGN UP
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}