/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useFormStateContext } from "../components/FormContext";
import CreateCharacterButtons from "../components/CreateCharacterButtons";
import { Background, Backgrounds } from "../../../data/backgrounds";
import { Race, Races } from "../../../data/races";
import { Class, Classes } from "../../../data/classes";
import { SubRace } from "../../../data/subRaces";
import { NewCharacter } from "../../../../types/Character";
import { Trait } from "../../../data/traits";
import { Skill } from "../../../data/skills";
import useCreateCharacter from "../../../hooks/useCreateCharacter";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CharacterConfirm = () => {
  const { form } = useFormStateContext();
  const { loading, success, fetchError, createCharacter } =
    useCreateCharacter();
  const [background, setBackground] = useState<Background>();
  const [race, setRace] = useState<Race>();
  const [subRace, setSubRace] = useState<SubRace>();
  const [cls, setCls] = useState<Class>();
  const navigate = useNavigate();

  useEffect(() => {
    const bg = Backgrounds.find(
      (bg) => bg.name === form.generalInformation.values.background
    );
    setBackground(bg);

    const race = Races.find((race) => race.name === form.race.values.race);
    setRace(race);

    if (race?.subRace) {
      const subRace = race.subRace.find(
        (subRace) => subRace.name === form.race.values.subRace
      );
      setSubRace(subRace);
    }

    const cls = Classes.find((cls) => cls.name === form.class.values.class);
    setCls(cls);
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate("/characters");
    }
  }, [success]);

  useEffect(() => {
    if (fetchError) toast.error(fetchError);
  }, [fetchError]);

  const handleConfirm = () => {
    const traits: Trait[] = [];
    race?.traits?.forEach((trait: Trait) => traits.push(trait));
    subRace?.traits?.forEach((trait: Trait) => traits.push(trait));

    const items: { name: string; quantity: number }[] = [];
    background?.proficiencies.items?.forEach((item) => items.push(item));
    cls?.items?.forEach((item) => items.push(item));

    const skills: Skill[] = [];
    background?.proficiencies.skills?.forEach((skill) => skills.push(skill));
    form.skills.forEach((skill) => skills.push(skill));

    const newCharacter: NewCharacter = {
      name: form.generalInformation.values.name,
      age: form.characterInformation.values.age,
      gender: form.characterInformation.values.gender,

      background: form.generalInformation.values.background,
      alignment: form.generalInformation.values.alignment,

      personalityTraits: form.characterInformation.values.personalTraits,
      ideals: form.characterInformation.values.ideals,
      bonds: form.characterInformation.values.bonds,
      flaws: form.characterInformation.values.flaws,
      history: form.characterInformation.values.history,

      race: {
        name: race?.name || "",
        icon: race?.icon || "",
        subRace: subRace?.name || "",
      },

      cls: {
        name: cls?.name || "",
        icon: cls?.icon || "",
      },

      hitPoints: cls?.hitPoints || 0,
      hitPointsBase: cls?.hitPoints || 0,
      hitPointsPerLevel: cls?.hitPointsPerLevel || 0,
      armorClass: 0,
      speed: subRace?.speed || race?.speed || 30,
      savingThrows: cls?.savingThrows || [],
      armorProficiencies: cls?.armorProficiencies || [],
      weaponProficiencies: cls?.weaponProficiencies || [],
      toolProficiencies: cls?.toolProficiencies || [],

      stats: {
        ...form.stats.values,
      },

      coins: {
        cp: background?.proficiencies.coins?.cp || 0,
        sp: background?.proficiencies.coins?.sp || 0,
        ep: background?.proficiencies.coins?.ep || 0,
        gp: background?.proficiencies.coins?.gp || 0,
        pp: background?.proficiencies.coins?.pp || 0,
      },

      skills: skills || [],
      traits: traits || [],
      items: items || [],
      languages: race?.lenguages || [],
    };

    createCharacter(newCharacter);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3">
        <div className="w-full md:w-2/3 flex-1">
          <h1 className="text-3xl text-yellow-500 font-bold mb-4">
            Confirmar los datos del Personaje
          </h1>
          <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full flex flex-col justify-start items-center">
              <h2 className="text-lg text-white font-bold my-4">
                Información General
              </h2>
              <div className="flex flex-col w-full">
                <p>Nombre: {form.generalInformation.values.name}</p>
                <p>Edad: {form.characterInformation.values.age}</p>
                <p>Genero: {form.characterInformation.values.gender}</p>
                <p>Transfondo: {form.generalInformation.values.background}</p>
                <p>Alineamiento: {form.generalInformation.values.alignment}</p>
              </div>

              <h2 className="text-lg text-white font-bold my-4">
                Informacion de Raza
              </h2>
              <div className="flex flex-col w-full">
                <p>Raza: {form.race.values.race}</p>
                {form.race.values.subRace && (
                  <p>Subraza: {form.race.values.subRace}</p>
                )}
              </div>

              <h2 className="text-lg text-white font-bold my-4">
                Informacion de Clase
              </h2>
              <div className="flex flex-col w-full">
                <p>Clase: {form.class.values.class}</p>
              </div>

              <h2 className="text-lg text-white font-bold my-4">
                Estadisticas
              </h2>
              <div className="flex flex-col w-full overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>str</th>
                      <th>dex</th>
                      <th>con</th>
                      <th>int</th>
                      <th>wis</th>
                      <th>cha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{form.stats.values.str}</td>
                      <td>{form.stats.values.dex}</td>
                      <td>{form.stats.values.con}</td>
                      <td>{form.stats.values.int}</td>
                      <td>{form.stats.values.wis}</td>
                      <td>{form.stats.values.cha}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-lg text-white font-bold my-4">Dinero</h2>
              <div className="flex flex-col w-full overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>cp</th>
                      <th>sp</th>
                      <th>ep</th>
                      <th>gp</th>
                      <th>pp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{background?.proficiencies.coins?.cp || 0}</td>
                      <td>{background?.proficiencies.coins?.sp || 0}</td>
                      <td>{background?.proficiencies.coins?.ep || 0}</td>
                      <td>{background?.proficiencies.coins?.gp || 0}</td>
                      <td>{background?.proficiencies.coins?.pp || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="divider divider-horizontal hidden lg:flex" />

            <div className="w-full flex flex-col justify-center items-center">
              <h2 className="text-lg text-white font-bold my-4">Habilidades</h2>
              <div className="flex flex-col w-full">
                {background?.proficiencies?.skills.map((skill, index) => (
                  <ProficienciRow proficiencie={skill} key={index} />
                ))}
                {form.skills.map((skill, index) => (
                  <ProficienciRow proficiencie={skill} key={index} />
                ))}
              </div>

              <h2 className="text-lg text-white font-bold my-4">
                Caracteristicas
              </h2>
              <div className="flex flex-col w-full">
                {race?.traits?.map((trait, index) => (
                  <ProficienciRow proficiencie={trait} key={index} />
                ))}
                {subRace &&
                  subRace?.traits?.map((trait, index) => (
                    <ProficienciRow proficiencie={trait} key={index} />
                  ))}
              </div>

              <h2 className="text-lg text-white font-bold my-4">Idiomas</h2>
              <div className="flex flex-col w-full">
                {race?.lenguages?.map((lenguage, index) => (
                  <ProficienciRow
                    proficiencie={{ name: lenguage, description: lenguage }}
                    key={index}
                  />
                ))}
              </div>

              <h2 className="text-lg text-white font-bold my-4">Objetos</h2>
              <div className="flex flex-col w-full">
                {background?.proficiencies?.items?.map((item, index) => (
                  <ItemRow item={item} key={index} />
                ))}
                {cls?.items?.map((item, index) => (
                  <ItemRow item={item} key={index} />
                ))}
              </div>
            </div>
          </div>
          <button
            className="btn btn-success w-full mt-4"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
        <CreateCharacterButtons />
      </div>
    </>
  );
};

const ItemRow = ({ item }: { item: { name: string; quantity: number } }) => {
  return (
    <li>
      <span>
        {item.quantity}x {item.name}
      </span>
    </li>
  );
};

const ProficienciRow = ({
  proficiencie,
}: {
  proficiencie: { name: string; description: string };
}) => {
  return (
    <li>
      <span className="tooltip" data-tip={proficiencie.description}>
        {proficiencie.name}
      </span>
    </li>
  );
};

export default CharacterConfirm;
