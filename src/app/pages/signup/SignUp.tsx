import React from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSignUp from "../../hooks/useSignUp";

type SignUpState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: SignUpState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const SignUp = () => {
  const [state, setState] = React.useState<SignUpState>(initialState);
  const { loading, fetchError, signUp } = useSignUp();
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !state.username ||
      !state.email ||
      !state.password ||
      !state.confirmPassword
    ) {
      toast.error("Por favor, rellena todos los campos");
      return false;
    }

    if (state.password !== state.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }

    if (!emailRegex.test(state.email)) {
      toast.error("Email inválido");
      return false;
    }

    if (!passwordRegex.test(state.password)) {
      toast.error(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setState((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    await signUp(state);
    if (fetchError) {
      setState((prev) => ({
        ...prev,
        username: "",
        password: "",
        confirmPassword: "",
      }));
      return toast.error(fetchError);
    }

    toast.success("Usuario registrado");
    navigate("/signup/email-sent", { state: { email: state.email } });
    setState(initialState);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Resgristro<span className="text-blue-500"> DnD</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="label p-2">
            <span className="text-base label-text">Nombre de usuario</span>
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="w-full input input-bordered h-10"
            value={state.username}
            onChange={(e) =>
              setState((prev) => ({ ...prev, username: e.target.value }))
            }
          />

          <label className="label p-2">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="w-full input input-bordered h-10"
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label className="label p-2">
            <span className="text-base label-text">Contraseña</span>
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full input input-bordered h-10"
            value={state.password}
            onChange={(e) =>
              setState((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <label className="label p-2">
            <span className="text-base label-text">Confirmar contraseña</span>
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full input input-bordered h-10"
            value={state.confirmPassword}
            onChange={(e) =>
              setState((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            ¿Ya tienes una cuenta?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Resgistrarse"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
