/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import charactersData from "../CharacterCreation.json";
import { Background, Aligment } from "../CharcaterCreation";
import { useFormStateContext } from "../FormContext";

const initialBackground: Background = {
  name: "Transfondo",
  description: "",
  benefits: "",
};

const initialAligment: Aligment = {
  name: "Alineamiento",
  description: "",
};

const GeneralInformation = () => {
  const [selectedBackground, setSelectedBackground] =
    useState(initialBackground);
  const [selectedAlignment, setSelectedAlignment] = useState(initialAligment);
  const { form, setForm } = useFormStateContext();

  useEffect(() => {
    setSelectedBackground(
      charactersData.backgrounds.find(
        (background) =>
          background.name === form.steps.generalInformation.values.background
      ) || initialBackground
    );

    setSelectedAlignment(
      charactersData.aligments.find(
        (alignment) =>
          alignment.name === form.steps.generalInformation.values.alignment
      ) || initialAligment
    );
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      steps: {
        ...form.steps,
        generalInformation: {
          ...form.steps.generalInformation,
          values: {
            ...form.steps.generalInformation.values,
            name: e.target.value,
          },
        },
      },
    });
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const backgroundName = e.target.value;
    setSelectedBackground(
      charactersData.backgrounds.find(
        (background) => background.name === backgroundName
      ) || initialBackground
    );

    setForm({
      ...form,
      steps: {
        ...form.steps,
        generalInformation: {
          ...form.steps.generalInformation,
          values: {
            ...form.steps.generalInformation.values,
            background: backgroundName,
          },
        },
      },
    });

    e.target.blur();
  };

  const handleAlignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const alignmentName = e.target.value;
    setSelectedAlignment(
      charactersData.aligments.find(
        (alignment) => alignment.name === alignmentName
      ) || initialAligment
    );

    form.steps.generalInformation.values.alignment = alignmentName;

    e.target.blur();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="w-2/3 max-h-full">
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
          value={form.steps.generalInformation.values.name}
          onChange={handleNameChange}
        />

        <label className="label p-2">
          <span className="text-base label-text">Transfondo</span>
        </label>
        <div className="flex items-center">
          <select
            className="select select-bordered w-full max-w-xs text-gray-400 h-auto"
            defaultValue={
              form.steps.generalInformation.values.background ||
              selectedBackground.name
            }
            onChange={handleBackgroundChange}
            onMouseDown={(e) => (e.currentTarget.size = 5)}
            onBlur={(e) => (e.currentTarget.size = 1)}
            size={1}
          >
            <option disabled>Transfondo</option>
            {charactersData.backgrounds.map((background) => (
              <option key={background.name} value={background.name}>
                {background.name}
              </option>
            ))}
          </select>
          {selectedBackground.icon && (
            <img
              src={selectedBackground.icon}
              alt={selectedBackground.name}
              className="w-10 h-10 ml-4"
            />
          )}
        </div>

        {selectedBackground.name !== "Transfondo" && (
          <div className="flex flex-col p-2 mt-2 rounded bg-slate-700">
            <p className="text-md text-gray-400">
              <span className="font-bold">Descripcion:</span>{" "}
              {selectedBackground.description}
            </p>
            <div className="divider" />
            <p className="text-md text-gray-400">
              <span className="font-bold">Beneficios:</span>{" "}
              {selectedBackground.benefits}
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
              form.steps.generalInformation.values.alignment ||
              selectedAlignment.name
            }
            onChange={handleAlignmentChange}
            onMouseDown={(e) => (e.currentTarget.size = 5)}
            onBlur={(e) => (e.currentTarget.size = 1)}
            size={1}
          >
            <option disabled>Alineamiento</option>
            {charactersData.aligments.map((aligment) => (
              <option key={aligment.name} value={aligment.name}>
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
    </div>
  );
};

export default GeneralInformation;
