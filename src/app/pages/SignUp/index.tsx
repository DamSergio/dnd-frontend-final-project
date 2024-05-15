import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useSignUp from "../../hooks/useSignUp";
import { SignUpUser } from "../../../types/User";
import AuthContainer from "../../components/Containers/AuthContainer";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";

const initialState: SignUpUser = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const SignUp = () => {
  const [formState, setFormState] = useState<SignUpUser>(initialState);
  const { loading, signUp } = useSignUp();
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      !formState.username ||
      !formState.email ||
      !formState.password ||
      !formState.confirmPassword
    ) {
      toast.error("Por favor, rellena todos los campos");
      return false;
    }

    if (formState.password !== formState.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }

    if (!emailRegex.test(formState.email)) {
      toast.error("Email inválido");
      return false;
    }

    if (!passwordRegex.test(formState.password)) {
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
      setFormState((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    const fetchError = await signUp(formState);
    if (fetchError) {
      setFormState((prev) => ({
        ...prev,
        username: "",
        password: "",
        confirmPassword: "",
      }));
      return toast.error(fetchError);
    }

    toast.success("Usuario registrado");
    navigate("/signup/email-sent", { state: { email: formState.email } });
    setFormState(initialState);
  };

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>Registro</title>
      </Helmet>
      <AuthContainer>
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Resgristro<span className="text-yellow-400"> DnD</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="label p-2">
            <span className="text-base label-text">Nombre de usuario</span>
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="w-full input input-bordered h-10"
            value={formState.username}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, username: e.target.value }))
            }
          />

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

          <label className="label p-2">
            <span className="text-base label-text">Confirmar contraseña</span>
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full input input-bordered h-10"
            value={formState.confirmPassword}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-yellow-600 mt-2 inline-block"
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
      </AuthContainer>
    </>
  );
};
