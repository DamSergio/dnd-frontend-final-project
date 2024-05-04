import { ReactNode } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignUp from "./pages/signup/SignUp";
import EmailSent from "./pages/signup/EmailSent";
import EmailVerified from "./pages/signup/EmailVerified";
import Login from "./pages/login/Login";
import { useAuthContext } from "../contexts/AuthContext";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Characters from "./pages/characters/Characters";
import CreateCharacter from "./pages/createCharacter/CreateCharacter";
import { FormStateContextProvider } from "./pages/createCharacter/FormContext";

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
              <FormStateContextProvider>
                <CreateCharacter />
              </FormStateContextProvider>
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
