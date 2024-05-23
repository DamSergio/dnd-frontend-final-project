import React from "react";

import MainContainer from "../../components/Containers/MainContainer";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCreateCampaign from "../../hooks/useCreateCampaign";
import Loader from "../../components/Loader/Loader";

export const CreateCampaign = () => {
  const { loading, createCampaign } = useCreateCampaign();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      notes: "",
    },
    mode: "onSubmit",
  });

  const saveChanges = (values: {
    name: string;
    description: string;
    notes: string;
  }) => {
    if (!values.name) return toast.error("Nombre obligatorio");
    if (!values.description) return toast.error("Descripcion obligatorio");

    createCampaign(values);
  };

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>Crear campaña</title>
      </Helmet>
      <MainContainer>
        <form
          className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3"
          onSubmit={handleSubmit(saveChanges)}
        >
          <div className="w-full md:w-2/3 flex-1">
            <h1 className="text-3xl text-yellow-500 font-bold">
              Creacion de campaña
            </h1>
            <div className="divider" />
            <label className="label p-2">
              <span className="text-base label-text">Nombre de la campaña</span>
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full input input-bordered h-10"
              {...register("name")}
            />

            <label className="label p-2">
              <span className="text-base label-text">Descripcion</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("description")}
            />

            <label className="label p-2">
              <span className="text-base label-text">Notas de DM</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("notes")}
            />

            <div className="divider" />

            <button className="btn btn-success w-full">
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Crear campaña"
              )}
            </button>
          </div>
        </form>
      </MainContainer>
    </>
  );
};
