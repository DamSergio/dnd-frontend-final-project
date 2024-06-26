import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { LoginUser } from "../../../types/User";
import AuthContainer from "../../components/Containers/AuthContainer";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Helmet } from "react-helmet";

const initialState: LoginUser = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formState, setFormState] = useState<LoginUser>(initialState);
  const { loading, login } = useLogin();
  const navigate = useNavigate();
  const { authMessage } = useAuthContext();

  const validateForm = () => {
    if (!formState.email) {
      toast.error("El email es requerido");
      return false;
    }

    if (!formState.password) {
      toast.error("La contraseña es requerida");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const fetchError = await login(formState);

    if (fetchError) {
      setFormState(initialState);
      return toast.error(fetchError);
    }

    navigate("/characters", { replace: true });
  };

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>Iniciar sesion</title>
      </Helmet>
      <AuthContainer>
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Iniciar sesion<span className="text-yellow-400"> DnD portable</span>
        </h1>

        {authMessage && (
          <p className="text-center text-red-700 font-bold p-2">
            {authMessage}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="label p-2">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="w-full input input-bordered h-10"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label className="label p-2">
            <span className="text-base label-text">Contraseña</span>
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full input input-bordered h-10"
            value={formState.password}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-yellow-600 mt-2 inline-block"
          >
            ¿Todavia no tienes cuenta?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Iniciar sesion"
              )}
            </button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};
