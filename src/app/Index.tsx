import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import EmailSent from "./pages/signup/EmailSent";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<span>Login</span>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/email-sent" element={<EmailSent />} />

        <Route path="/" element={<span>Home</span>} />
        <Route path="*" element={<span>Not found</span>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
