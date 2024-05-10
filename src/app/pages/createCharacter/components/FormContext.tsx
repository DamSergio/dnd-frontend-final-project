/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { Skill } from "../../../data/skills";

export const FORM_STATE = {
  step: 0,
  generalInformation: {
    values: {
      name: "",
      background: "",
      alignment: "",
    },
  },
  characterInformation: {
    values: {
      age: 0,
      gender: "",
      personalTraits: "",
      ideals: "",
      bonds: "",
      flaws: "",
      history: "",
    },
  },
  race: {
    values: {
      race: "",
      subRace: "",
    },
  },
  class: {
    values: {
      class: "",
    },
  },
  skills: [] as Skill[],
  stats: {
    values: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
  },
};

export const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (form: typeof FORM_STATE) => {},
});

export const useFormStateContext = () => {
  return useContext(FormStateContext);
};
