import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// import ProtectedRoute from './components/protected-route/protected-route';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Route</div>} />
        {/* <Route path="/welcome" element={<Welcome />} />
        <Route path="/registration" element={<AccountCreationForm />} />
        <Route path="/registration-confirm" element={<RegistrationConfirmation />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
