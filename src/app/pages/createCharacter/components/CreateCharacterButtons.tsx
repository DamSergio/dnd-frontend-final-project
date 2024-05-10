import { useCallback } from "react";
import { useFormStateContext } from "./FormContext";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "../../../components/Icons/Icons";

const CreateCharacterButtons = () => {
  const { form, setForm } = useFormStateContext();

  const prev = useCallback(() => {
    setForm({ ...form, step: form.step - 1 });
  }, [form, setForm]);

  return (
    <div className="flex flex-row justify-between items-center w-full md:w-2/6 px-5 mt-4">
      <button
        className="btn border-2 border-slate-700 px-10"
        disabled={form.step === 0}
        onClick={prev}
      >
        <ChevronDoubleLeftIcon className="w-6 h-6 text-yellow-400" />
      </button>
      <button
        className="btn border-2 border-slate-700 px-10"
        disabled={form.step === 6}
      >
        <ChevronDoubleRightIcon className="w-6 h-6 text-yellow-400" />
      </button>
    </div>
  );
};

export default CreateCharacterButtons;
