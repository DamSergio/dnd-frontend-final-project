import { ReactNode } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignUp from "./pages/signup/SignUp";
import EmailSent from "./pages/signup/EmailSent";
import EmailVerified from "./pages/signup/EmailVerified";
import Login from "./pages/login/Login";
import { useAuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthContext();

  return authUser ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/email-sent" element={<EmailSent />} />
        <Route path="/signup/verify/:token" element={<EmailVerified />} />

        {/* App routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <span>Home</span>
            </ProtectedRoute>
          }
        />

        {/* TODO: Admin routes */}

        {/* Route not found */}
        <Route path="*" element={<span>Not found</span>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
