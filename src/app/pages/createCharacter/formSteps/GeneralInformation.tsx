/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useFormStateContext } from "../components/FormContext";
import { useForm } from "react-hook-form";
import CreateCharacterButtons from "../components/CreateCharacterButtons";
import toast from "react-hot-toast";

import { Backgrounds, Background } from "../../../data/backgrounds";
import { Alignments, Alignment } from "../../../data/alignments";

const initialBackground: Background = {
  name: "",
  description: "",
  benefits: "",
  icon: "",
  proficiencies: {
    skills: [],
  },
};

const initialAligment: Alignment = {
  name: "Alineamiento",
  description: "",
};

const GeneralInformation = () => {
  const [selectedAlignment, setSelectedAlignment] = useState(initialAligment);
  const [background, setBackground] = useState<Background>(initialBackground);

  const { form, setForm } = useFormStateContext();
  const { register, handleSubmit } = useForm({
    defaultValues: form.generalInformation.values,
    mode: "onSubmit",
  });

  useEffect(() => {
    setBackground(
      Backgrounds.find(
        (background) =>
          background.name === form.generalInformation.values.background
      ) || initialBackground
    );

    setSelectedAlignment(
      Alignments.find(
        (alignment) =>
          alignment.name === form.generalInformation.values.alignment
      ) || initialAligment
    );
  }, []);

  const saveChanges = (values: {
    name: string;
    background: string;
    alignment: string;
  }) => {
    if (!values.name) return toast.error("El nombre es obligatorio");
    if (!values.background) return toast.error("El transfondo es obligatorio");
    if (!values.alignment) return toast.error("El alineamiento es obligatorio");

    console.log(values);
    setForm({ ...form, step: form.step + 1, generalInformation: { values } });
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const backgroundName = e.target.value;
    const background = Backgrounds.find(
      (background) => background.name === backgroundName
    ) as Background;

    setBackground(background);
  };

  const handleAlignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const alignmentName = e.target.value;
    const alignment = Alignments.find(
      (alignment) => alignment.name === alignmentName
    );

    setSelectedAlignment(alignment || initialAligment);
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3 h-full"
      onSubmit={handleSubmit(saveChanges)}
    >
      <div className="w-2/3 h-full flex-1">
        <h1 className="text-3xl text-yellow-500 font-bold">
          Informacion General
        </h1>
        <label className="label p-2">
          <span className="text-base label-text">Nombre</span>
        </label>
        <input
          type="text"
          placeholder="Nombre"
          className="w-full input input-bordered h-10"
          defaultValue={form.generalInformation.values.name || ""}
          {...register("name")}
        />

        <label className="label p-2">
          <span className="text-base label-text">Transfondo</span>
        </label>
        <div className="flex items-center">
          <select
            className="select select-bordered w-full max-w-xs text-gray-400 h-auto"
            defaultValue={form.generalInformation.values.background}
            {...register("background")}
            onChangeCapture={handleBackgroundChange}
          >
            {Backgrounds.map((background, index) => (
              <option key={index} value={background.name}>
                {background.name}
              </option>
            ))}
          </select>
          {background.icon && (
            <img
              src={background.icon}
              alt={background.name}
              className="w-10 h-10 ml-4"
            />
          )}
        </div>

        {background.name && (
          <div className="flex flex-col p-2 mt-2 rounded bg-slate-700">
            <p className="text-md text-gray-400">
              <span className="font-bold">Descripcion:</span>{" "}
              {background.description}
            </p>
            <div className="divider" />
            <p className="text-md text-gray-400">
              <span className="font-bold">Beneficios:</span>{" "}
              {background.benefits}
            </p>
          </div>
        )}

        <label className="label p-2">
          <span className="text-base label-text">Alineamiento</span>
        </label>
        <div className="flex items-center">
          <select
            className="select select-bordered w-full max-w-xs text-gray-400 h-auto"
            defaultValue={
              form.generalInformation.values.alignment || "Alineamiento"
            }
            {...register("alignment")}
            onChangeCapture={handleAlignmentChange}
          >
            {Alignments.map((aligment, index) => (
              <option key={index} value={aligment.name}>
                {aligment.name}
              </option>
            ))}
          </select>
        </div>

        {selectedAlignment.name !== "Alineamiento" && (
          <div className="flex flex-col p-2 mt-2 rounded bg-slate-700">
            <p className="text-md text-gray-400">
              <span className="font-bold">Descripcion:</span>{" "}
              {selectedAlignment.description}
            </p>
          </div>
        )}
      </div>
      <CreateCharacterButtons />
    </form>
  );
};

export default GeneralInformation;
