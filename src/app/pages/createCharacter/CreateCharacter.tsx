import { useEffect, useState } from "react";

import MainContainer from "../../components/containers/MainContainer";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "../../components/icons/Icons";
import useWindowSize from "../../hooks/useWindowSize";
import { useFormStateContext } from "./FormContext";

// FormSteps
import GeneralInformation from "./formSteps/GeneralInformation";
import CharacterInformation from "./formSteps/CharacterInformation";

const CreateCharacter = () => {
  const [height, setHeight] = useState(0);
  const windowSize = useWindowSize();
  const { form, setForm } = useFormStateContext();
  const steps = [<GeneralInformation />, <CharacterInformation />];

  useEffect(() => {
    const containerHeight = document.getElementById("container")?.clientHeight;
    setHeight(containerHeight || 0);
  }, [windowSize.height]);

  const nextStep = () => {
    if (form.index === steps.length - 1) return;

    setForm({ ...form, index: form.index + 1 });
    // console.log(form);
  };

  const previousStep = () => {
    if (form.index === 0) return;

    setForm({ ...form, index: form.index - 1 });
    // console.log(form);
  };

  return (
    <MainContainer>
      <div className="overflow-x-auto w-full flex justify-center items-center">
        <ul className="steps">
          <li className={`step ${form.index >= 0 ? "step-warning" : ""}`} />
          <li className={`step ${form.index >= 1 ? "step-warning" : ""}`} />
          <li className={`step ${form.index >= 2 ? "step-warning" : ""}`} />
          <li className={`step ${form.index >= 3 ? "step-warning" : ""}`} />
          <li className={`step ${form.index >= 4 ? "step-warning" : ""}`} />
        </ul>
      </div>

      <div className="divider" />

      <div
        className="w-full lg:w-4/6 flex-1 flex flex-col justify-center items-center text-white"
        id="container"
      >
        <form className="w-full overflow-y-auto" style={{ height: height }}>
          {steps[form.index]}
        </form>
      </div>

      <div className="flex flex-row justify-between items-center w-full lg:w-2/6 px-5 mt-4">
        <button
          className="btn border-2 border-slate-700 px-10"
          onClick={previousStep}
          disabled={form.index === 0}
        >
          <ChevronDoubleLeftIcon className="w-6 h-6 text-yellow-400" />
        </button>
        <button
          className="btn border-2 border-slate-700 px-10"
          onClick={nextStep}
          disabled={form.index === steps.length - 1}
        >
          <ChevronDoubleRightIcon className="w-6 h-6 text-yellow-400" />
        </button>
      </div>
    </MainContainer>
  );
};

export default CreateCharacter;
