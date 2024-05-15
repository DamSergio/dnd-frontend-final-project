/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import { useEffect } from "react";
import AuthContainer from "../../components/Containers/AuthContainer";
import { Helmet } from "react-helmet";

export const EmailVerified = () => {
  const { token } = useParams() as { token: string };
  const { loading, fetchError, verifyEmail } = useVerifyEmail();

  useEffect(() => {
    verifyEmail(token);
  }, [token]);

  return (
    <AuthContainer>
      <Helmet>
        <title>Email verificado</title>
      </Helmet>
      {loading && (
        <>
          <p className="text-base label-text">Verificando email...</p>
          <span className="loading loading-spinner text-3xl" />
        </>
      )}
      {fetchError && <p className="text-base label-text">{fetchError}</p>}
      {!loading && !fetchError && (
        <p className="text-base label-text">¡Email verificado correctamente!</p>
      )}
    </AuthContainer>
  );
};
