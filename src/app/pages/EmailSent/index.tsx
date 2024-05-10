import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import AuthContainer from "../../components/Containers/AuthContainer";

const maskEmail = (email: string) => {
  if (!email) return "";

  const [username, domain] = email.split("@");
  const maskedUsername = `${username[0]}${"*".repeat(username.length - 2)}${
    username[username.length - 1]
  }`;
  return `${maskedUsername}@${domain}`;
};

export const EmailSent = () => {
  const location = useLocation();
  const email = location.state?.email as string;
  const maskedEmail = maskEmail(email);

  return (
    <AuthContainer>
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Verificacion de email
      </h1>
      <span className="text-blue-500 text-2xl">{maskedEmail}</span>
      <p className="text-2xl">Esta accion puede tardar unos minutos</p>
      <div className="flex float-end">
        <Link
          to="/login"
          className="text-sm hover:underline hover:text-yellow-600 mt-2 inline-block"
        >
          Volver al inicio de sesion
        </Link>
      </div>
    </AuthContainer>
  );
};
