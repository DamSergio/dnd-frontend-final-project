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
import useRefreshToken from "./hooks/useRefreshToken";
import { CharacterPage } from "./pages/CharacterPage";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthContext();
  const headerH = document.getElementById("header")?.offsetHeight;
  const divH = `calc(100vh - ${headerH}px)`;

  return authUser.accessToken ? (
    <>
      <Header />
      <div
        className="w-full max-h-screen flex flex-col items-center"
        style={{ height: divH, marginTop: `${headerH}px` }}
      >
        <main className="w-full h-full max-h-full flex flex-col justify-center p-4 z-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const UnProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthContext();

  return authUser.accessToken ? <Navigate to="/" /> : children;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthContext();
  const headerH = document.getElementById("header")?.offsetHeight;
  const divH = `calc(100vh - ${headerH}px)`;

  return (
    <>
      {authUser.accessToken && <Header />}
      <div
        className="w-full max-h-screen flex flex-col items-center"
        style={{
          height: authUser.accessToken ? divH : "100vh",
          marginTop: authUser.accessToken ? `${headerH}px` : "",
        }}
      >
        <main className="w-full h-full max-h-full flex flex-col justify-center p-4 z-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
};

const App = () => {
  useRefreshToken();

  return (
    <div className="max-h-screen">
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

        <Route
          path="/character/:id"
          element={
            <PublicRoute>
              <CharacterPage />
            </PublicRoute>
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
