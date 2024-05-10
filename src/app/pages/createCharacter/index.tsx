import { useState } from "react";

import MainContainer from "../../components/Containers/MainContainer";

// FormSteps
import GeneralInformation from "./formSteps/GeneralInformation";
import CharacterInformation from "./formSteps/CharacterInformation";
import CreateCharacterHeader from "./components/CreateCharacterHeader";
import { FORM_STATE, FormStateContext } from "./components/FormContext";
import CharacterRace from "./formSteps/CharacterRace";
import CharacterClass from "./formSteps/CharacterClass";
import CharacterStats from "./formSteps/CharacterStats";
import CharacterConfirm from "./formSteps/CharacterConfirm";
import CharacterSkills from "./formSteps/CharacterSkills";

const STEPS = [
  <GeneralInformation />,
  <CharacterInformation />,
  <CharacterRace />,
  <CharacterClass />,
  <CharacterSkills />,
  <CharacterStats />,
  <CharacterConfirm />,
];

export const CreateCharacter = () => {
  const [form, setForm] = useState(FORM_STATE);

  return (
    <MainContainer>
      <FormStateContext.Provider
        value={{
          form,
          setForm,
        }}
      >
        <CreateCharacterHeader />
        {STEPS[form.step]}
      </FormStateContext.Provider>
    </MainContainer>
  );
};
