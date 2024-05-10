import { useFormStateContext } from "./FormContext";

const CreateCharacterHeader = () => {
  const { form } = useFormStateContext();

  return (
    <>
      <div className="overflow-x-auto w-full flex justify-center items-center">
        <ul className="steps">
          <li className={`step ${form.step >= 0 ? "step-warning" : ""}`} />
          <li className={`step ${form.step >= 1 ? "step-warning" : ""}`} />
          <li className={`step ${form.step >= 2 ? "step-warning" : ""}`} />
          <li className={`step ${form.step >= 3 ? "step-warning" : ""}`} />
          <li className={`step ${form.step >= 4 ? "step-warning" : ""}`} />
          <li className={`step ${form.step >= 5 ? "step-warning" : ""}`} />
          <li className={`step ${form.step >= 6 ? "step-warning" : ""}`} />
        </ul>
      </div>

      <div className="divider" />
    </>
  );
};

export default CreateCharacterHeader;
