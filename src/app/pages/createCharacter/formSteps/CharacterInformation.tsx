import React from "react";
import CreateCharacterButtons from "../components/CreateCharacterButtons";
import { useFormStateContext } from "../components/FormContext";
import { useForm } from "react-hook-form";

const CharacterInformation = () => {
  const { form, setForm } = useFormStateContext();
  const { register, handleSubmit } = useForm({
    defaultValues: form.characterInformation.values,
    mode: "onSubmit",
  });

  const saveChanges = (values: {
    age: number;
    gender: string;
    personalTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    history: string;
  }) => {
    console.log(values);
    setForm({ ...form, step: form.step + 1, characterInformation: { values } });
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3 h-full"
      onSubmit={handleSubmit(saveChanges)}
    >
      <div className="w-2/3 h-full flex-1">
        <h1 className="text-3xl text-yellow-500 font-bold">
          Informacion del Personaje
        </h1>

        <p className="text-xs md:text-base">
          Todo es esta pagina excepto la edad y el genero es opcional y se puede
          editar en cualquier momento
        </p>

        <label className="label p-2">
          <span className="text-base label-text">Edad</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Edad"
          defaultValue={form.characterInformation.values.age || ""}
          {...register("age", {
            valueAsNumber: true,
            validate: (value) => value > 0,
          })}
          onChangeCapture={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, "");
          }}
        />

        <label className="label p-2">
          <span className="text-base label-text">Genero</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs text-gray-400 h-auto"
          defaultValue={form.characterInformation.values.gender || ""}
          {...register("gender")}
        >
          <option value="Masculino">Hombre</option>
          <option value="Femenino">Mujer</option>
        </select>

        <label className="label p-2">
          <span className="text-base label-text">Rasgos</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Rasgos"
          {...register("personalTraits")}
        />

        <label className="label p-2">
          <span className="text-base label-text">Ideales</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Ideales"
          {...register("ideals")}
        />

        <label className="label p-2">
          <span className="text-base label-text">Lazos</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Lazos"
          {...register("bonds")}
        />

        <label className="label p-2">
          <span className="text-base label-text">Defectos</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Defectos"
          {...register("flaws")}
        />

        <label className="label p-2">
          <span className="text-base label-text">Pasado</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Pasado"
          {...register("history")}
        />
      </div>
      <CreateCharacterButtons />
    </form>
  );
};

export default CharacterInformation;
