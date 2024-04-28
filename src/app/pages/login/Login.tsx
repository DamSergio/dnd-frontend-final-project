import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { LoginUser } from "../../../types/User";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";

const initialState: LoginUser = {
  email: "",
  password: "",
};

const Login = () => {
  const [formState, setFormState] = useState<LoginUser>(initialState);
  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchError = await login(formState);

    if (fetchError) {
      setFormState(initialState);
      return toast.error(fetchError);
    }

    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Iniciar sesion<span className="text-blue-500"> DnD</span>
          </h1>

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
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
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
        </div>
      </div>
    </div>
  );
};

export default Login;