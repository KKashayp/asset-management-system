import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setToken("");
    setShowRegister(false);
  };

  return (
    <>
      {!token ? (
        showRegister ? (
          <>
            <RegisterPage />
            <p className="auth-switch">
              Already have account?{" "}
              <button type="button" onClick={() => setShowRegister(false)}>
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginPage onLogin={handleLogin} />
            <p className="auth-switch">
              New user?{" "}
              <button type="button" onClick={() => setShowRegister(true)}>
                Register
              </button>
            </p>
          </>
        )
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <>
  {/* your existing routes/components */}

  <Footer />
</>
    </>
    



  );
}

export default App;