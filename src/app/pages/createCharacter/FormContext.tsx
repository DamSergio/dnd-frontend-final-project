/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";

const FORM_STATE = {
  index: 0,
  proficiencies: {
    languages: [],
    weapons: [],
    armor: [],
    skills: [],
  },
  steps: {
    generalInformation: {
      valid: false,
      values: {
        name: "",
        background: "",
        alignment: "",
      },
    },
    characterInformation: {
      valid: false,
      values: {
        personalTraits: "",
        ideals: "",
        bonds: "",
        flaws: "",
        history: "",
      },
    },
    race: {
      valid: false,
      values: {
        race: "",
        subRace: "",
      },
    },
    class: {
      valid: false,
      values: {
        class: "",
        subClass: "",
      },
    },
    stats: {
      valid: false,
      values: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
      },
    },
  },
};

const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (
    form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)
  ) => {},
});

export const useFormStateContext = () => {
  return useContext(FormStateContext);
};

export const FormStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [form, setForm] = useState(FORM_STATE);

  return (
    <FormStateContext.Provider value={{ form, setForm }}>
      {children}
    </FormStateContext.Provider>
  );
};
