import { useParams } from "react-router-dom";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import { useEffect } from "react";

const EmailVerified = () => {
  const { token } = useParams() as { token: string };
  const { loading, fetchError, verifyEmail } = useVerifyEmail();

  useEffect(() => {
    verifyEmail(token);
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
        {loading && (
          <>
            <p className="text-base label-text">Verificando email...</p>
            <span className="loading loading-spinner text-3xl" />
          </>
        )}
        {fetchError && <p className="text-base label-text">{fetchError}</p>}
        {!loading && !fetchError && (
          <p className="text-base label-text">
            ¡Email verificado correctamente!
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
