/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Class, Classes } from "../../../data/classes";
import CreateCharacterButtons from "../components/CreateCharacterButtons";
import { useFormStateContext } from "../components/FormContext";
import toast from "react-hot-toast";

const CharacterClass = () => {
  const { form, setForm } = useFormStateContext();
  const [selectedClass, setSelectedClass] = useState<Class | null>();

  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLInputElement>(
      "input[name=my-accordion-1]"
    );
    buttons.forEach((button) => {
      if (button.value === form.class.values.class) button.checked = true;
    });

    setSelectedClass(
      Classes.find((cls) => cls.name === form.class.values.class) || null
    );
  }, []);

  const saveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedClass) return toast.error("Debes seleccionar una clase");

    const values = {
      class: selectedClass.name,
    };
    setForm({ ...form, step: form.step + 1, class: { values } });
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3 h-full"
      onSubmit={saveChanges}
    >
      <div className="w-2/3 h-full flex-1">
        <h1 className="text-3xl text-yellow-500 font-bold">
          Clase{" "}
          {selectedClass?.name && (
            <span className="text-gray-400">: {selectedClass.name}</span>
          )}
        </h1>
        <label className="label p-2">
          <span className="text-base label-text">Elige tu Clase</span>
        </label>

        {Classes.map((cls, index) => (
          <div
            className={`collapse mb-4 bg-base-200 ${
              selectedClass?.name === cls.name
                ? "border-yellow-500 border-2"
                : ""
            }`}
            key={index}
            onClick={() => setSelectedClass(cls)}
          >
            <input type="radio" name="my-accordion-1" value={cls.name} />
            <div className="collapse-title text-xl font-medium flex flex-row items-center justify-between">
              {cls.name}
              <img src={cls.icon} alt={cls.name} className="h-12" />
            </div>
            <div className="collapse-content" id="raceContainer">
              <p>{cls.description}</p>
            </div>
          </div>
        ))}
      </div>
      <CreateCharacterButtons />
    </form>
  );
};

export default CharacterClass;
