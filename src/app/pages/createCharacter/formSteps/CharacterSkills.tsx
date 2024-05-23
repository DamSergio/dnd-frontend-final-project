import React, { useState } from "react";

import CreateCharacterButtons from "../components/CreateCharacterButtons";
import { useFormStateContext } from "../components/FormContext";
import { Skill, Skills } from "../../../data/skills";
import { Backgrounds } from "../../../data/backgrounds";
import toast from "react-hot-toast";

const CharacterSkills = () => {
  const { form, setForm } = useFormStateContext();
  const [skills, setSkills] = useState<Skill[]>(form.skills);

  const isChecked = (skill: Skill) => {
    const currentSkills = Backgrounds.find(
      (bg) => bg.name === form.generalInformation.values.background
    )?.proficiencies.skills;

    return currentSkills?.includes(skill);
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    skill: Skill
  ) => {
    if (skills.length >= 2) {
      e.currentTarget.checked = false;

      if (skills.includes(skill)) {
        const newSkills = skills.filter((s) => s.name !== skill.name);
        setSkills(newSkills);
      }

      return;
    }

    if (e.target.checked) {
      setSkills((prev) => [...prev, skill]);
    } else {
      const newSkills = skills.filter((s) => s.name !== skill.name);
      setSkills(newSkills);
    }
  };

  const saveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (skills.length < 2) return toast.error("Debes escoger 2 habilidades");

    setForm({ ...form, step: form.step + 1, skills });
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3"
      onSubmit={saveChanges}
    >
      <div className="w-full md:w-2/3 flex-1">
        <h1 className="text-3xl text-yellow-500 font-bold">Habilidades</h1>
        <h2 className="text-lg text-white font-bold mb-4">
          Puedes escoger {2 - skills.length} habilidades
        </h2>

        {Skills.map((skill, index) => (
          <div className="form-control" key={index}>
            <label className="label cursor-pointer">
              <div className="tooltip" data-tip={skill.description}>
                <span className="label-text">{skill.name}</span>
              </div>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked={isChecked(skill) || skills.includes(skill)}
                disabled={isChecked(skill)}
                onChange={(e) => handleCheck(e, skill)}
              />
            </label>
          </div>
        ))}
      </div>
      <CreateCharacterButtons />
    </form>
  );
};

export default CharacterSkills;
