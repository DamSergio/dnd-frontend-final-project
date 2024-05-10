/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useEffect, useState } from "react";

import CreateCharacterButtons from "../components/CreateCharacterButtons";
import toast from "react-hot-toast";
import { useFormStateContext } from "../components/FormContext";

import { Races, Race } from "../../../data/races";
import { SubRace } from "../../../data/subRaces";

const CharacterRace = () => {
  const { form, setForm } = useFormStateContext();
  const { selectedRace, setSelectedRace, selectedSubrace, setSelectedSubrace } =
    useRaceForm(form.race.values.race, form.race.values.subRace);

  const handleRaceSelection = (race: Race) => {
    if (selectedRace === race) return;

    setSelectedRace(race);
    setSelectedSubrace(null);

    const subRaceButtons = document.querySelectorAll<HTMLInputElement>(
      "input[name=my-accordion-2]"
    );
    subRaceButtons.forEach((button) => {
      button.checked = false;
    });
  };

  const handleSubRaceSelection = (
    e: MouseEvent<HTMLDivElement>,
    subRace: SubRace
  ) => {
    e.stopPropagation();
    setSelectedSubrace(subRace);
  };

  const saveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedRace) return toast.error("Debes seleccionar una raza");

    if (selectedRace.subRace && !selectedSubrace) {
      return toast.error(
        `Debes seleccionar una subraza para la raza ${selectedRace.name}`
      );
    }

    const values = {
      race: selectedRace.name,
      subRace: selectedSubrace?.name || "",
    };
    setForm({ ...form, step: form.step + 1, race: { values } });
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3 h-full"
      onSubmit={saveChanges}
    >
      <div className="w-2/3 h-full flex-1">
        <h1 className="text-3xl text-yellow-500 font-bold">
          Raza:{" "}
          <span className="text-blue-400">
            {selectedRace?.name}
            {selectedRace?.subRace && selectedSubrace
              ? `: ${selectedSubrace.name}`
              : ""}
          </span>
        </h1>
        <label className="label p-2">
          <span className="text-base label-text">Elige tu Raza</span>
        </label>

        {Races.map((race, index) => (
          <div
            className={`collapse mb-4 bg-base-200 ${
              race.name === selectedRace?.name
                ? "border-yellow-500 border-2"
                : ""
            }`}
            onClick={() => handleRaceSelection(race)}
            key={index}
          >
            <input type="radio" name="my-accordion-1" value={race.name} />
            <div className="collapse-title text-xl font-medium flex flex-row items-center justify-between">
              {race.name}
              {selectedSubrace && selectedSubrace.name.includes(race.name)
                ? `: ${selectedSubrace.name}`
                : ""}
              <img src={race.icon} alt={race.name} className="h-12" />
            </div>
            <div className="collapse-content" id="raceContainer">
              <p>{race.description}</p>

              {race.subRace?.map((subRace, index) => (
                <div
                  className={`collapse bg-yellow-700 mb-2 mt-2 ${
                    subRace.name === selectedSubrace?.name
                      ? "border-yellow-500 border-2"
                      : ""
                  }`}
                  onClick={(e: MouseEvent<HTMLDivElement>) =>
                    handleSubRaceSelection(e, subRace)
                  }
                  key={index}
                >
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium flex flex-row items-center justify-between">
                    {subRace.name}
                  </div>
                  <div className="collapse-content hidden md:block">
                    <p>{subRace.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <CreateCharacterButtons />
    </form>
  );
};

const useRaceForm = (formRace: string, formSubRace: string) => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedSubrace, setSelectedSubrace] = useState<SubRace | null>(null);

  useEffect(() => {
    const raceButtons = document.querySelectorAll<HTMLInputElement>(
      "input[name=my-accordion-1]"
    );
    const race = Races.find((race) => race.name === formRace) || null;
    raceButtons.forEach((button) => {
      if (button.value === race?.name) button.checked = true;
    });
    setSelectedRace(race);

    const subRaceButtons = document.querySelectorAll<HTMLInputElement>(
      "input[name=my-accordion-2]"
    );
    const subRace =
      race?.subRace?.find((subRace) => subRace.name === formSubRace) || null;
    if (!subRace) return;

    subRaceButtons.forEach((button) => {
      if (button.value === subRace?.name) button.checked = true;
    });
    setSelectedSubrace(subRace);
  }, []);

  return { selectedRace, setSelectedRace, selectedSubrace, setSelectedSubrace };
};

export default CharacterRace;
