import { PlusIcon } from "../Icons/Icons";
import { Link } from "react-router-dom";

const NewCharacterCard = () => {
  return (
    <Link to="/createCharacter">
      <div className="rounded-lg border-2 border-slate-700 bg-gray-600 glass h-96 flex justify-center items-center hover:text-green-500">
        <PlusIcon className={"w-12 h-12"} />
      </div>
    </Link>
  );
};

export default NewCharacterCard;
