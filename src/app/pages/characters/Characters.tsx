import React from "react";
import MainContainer from "../../components/containers/MainContainer";
import { SearchIcon } from "../../components/icons/Icons";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Characters = () => {
  const { token } = useAuthContext();

  return (
    <MainContainer>
      <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300">
        Personajes
      </h1>
      <div className="divider" />
      <div className="flex-1 w-full flex flex-col md:flex-row">
        {/* Search container */}
        <div className="w-full flex-1 min-h-full flex flex-col md:w-6/12">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <SearchIcon />
          </label>

          <div className="divider" />

          <div className="flex-1 min-h-0 flex flex-col bg-black">
            {/* Characters */}
          </div>

          <div className="divider" />

          <Link to={"/createCharacter"} className="btn glass">
            Crear Personaje
          </Link>
        </div>

        <div className="divider divider-horizontal hidden md:flex" />

        <div className="bg-black hidden min-h-full flex-1 md:flex items-center justify-center">
          {/* Character card container */}
        </div>
      </div>
    </MainContainer>
  );
};

export default Characters;
