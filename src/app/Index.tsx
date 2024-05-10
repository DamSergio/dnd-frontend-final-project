import { ReactNode } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SignUp } from "./pages/SignUp/Loadeable";
import { EmailSent } from "./pages/EmailSent/Loadeable";
import { EmailVerified } from "./pages/EmailVerified/Loadeable";
import { Login } from "./pages/Login/Loadeable";
import { useAuthContext } from "../contexts/AuthContext";
import { Home } from "./pages/Home/Loadeable";
import Header from "./components/Header/Header";
import { Characters } from "./pages/Characters/Loadeable";
import { CreateCharacter } from "./pages/CreateCharacter/Loadeable";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuthContext();

  return token ? (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <Header />
      <main className="w-full flex-1 flex flex-col justify-center p-4 z-0">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const UnProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuthContext();

  return token ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Auth routes */}
        <Route
          path="/login"
          element={
            <UnProtectedRoute>
              <Login />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnProtectedRoute>
              <SignUp />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/signup/email-sent"
          element={
            <UnProtectedRoute>
              <EmailSent />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/signup/verify/:token"
          element={
            <UnProtectedRoute>
              <EmailVerified />
            </UnProtectedRoute>
          }
        />

        {/* App routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/characters"
          element={
            <ProtectedRoute>
              <Characters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createCharacter"
          element={
            <ProtectedRoute>
              <CreateCharacter />
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
