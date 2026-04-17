import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setShowRegister(false);
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
          <RegisterPage
            onLogin={handleLogin}
            onShowLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onShowRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;