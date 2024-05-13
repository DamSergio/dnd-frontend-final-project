import { useEffect, useRef, useState } from "react";

import CreateCharacterButtons from "../components/CreateCharacterButtons";
import { useFormStateContext } from "../components/FormContext";
import { Races } from "../../../data/races";
import toast from "react-hot-toast";

const DEFAULT_STAT_LEVEL = 8;
const POINTS_TO_SPEND = 27;

const CharacterStats = () => {
  const [points, setPoints] = useState(POINTS_TO_SPEND);
  const { form, setForm } = useFormStateContext();

  const str = useRef<HTMLInputElement>(null);
  const dex = useRef<HTMLInputElement>(null);
  const con = useRef<HTMLInputElement>(null);
  const int = useRef<HTMLInputElement>(null);
  const wis = useRef<HTMLInputElement>(null);
  const cha = useRef<HTMLInputElement>(null);

  const bonusStats = useGetBonusStats(
    form.race.values.race,
    form.race.values.subRace
  );

  const saveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (points !== 0) return toast.error("Debes gastar todos los puntos");

    const stats = {
      str: parseInt(str.current?.value || "") || DEFAULT_STAT_LEVEL,
      dex: parseInt(dex.current?.value || "") || DEFAULT_STAT_LEVEL,
      con: parseInt(con.current?.value || "") || DEFAULT_STAT_LEVEL,
      int: parseInt(int.current?.value || "") || DEFAULT_STAT_LEVEL,
      wis: parseInt(wis.current?.value || "") || DEFAULT_STAT_LEVEL,
      cha: parseInt(cha.current?.value || "") || DEFAULT_STAT_LEVEL,
    };

    setForm({ ...form, step: form.step + 1, stats: { values: stats } });
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3"
      onSubmit={saveChanges}
    >
      <div className="w-full md:w-2/3 flex-1">
        <h1 className="text-3xl text-yellow-500 font-bold mb-4">
          Estadisticas
        </h1>
        <h2 className="text-lg text-white font-bold mb-4">
          Puntos para repartir: {points}
        </h2>
        <StatRow
          defaultValue={bonusStats.str}
          name={"str"}
          points={points}
          setPoints={setPoints}
          refe={str}
        />
        <StatRow
          defaultValue={bonusStats.dex}
          name={"dex"}
          points={points}
          setPoints={setPoints}
          refe={dex}
        />
        <StatRow
          defaultValue={bonusStats.con}
          name={"con"}
          points={points}
          setPoints={setPoints}
          refe={con}
        />
        <StatRow
          defaultValue={bonusStats.int}
          name={"int"}
          points={points}
          setPoints={setPoints}
          refe={int}
        />
        <StatRow
          defaultValue={bonusStats.wis}
          name={"wis"}
          points={points}
          setPoints={setPoints}
          refe={wis}
        />
        <StatRow
          defaultValue={bonusStats.cha}
          name={"cha"}
          points={points}
          setPoints={setPoints}
          refe={cha}
        />
      </div>
      <CreateCharacterButtons />
    </form>
  );
};

type StatRowProps = {
  defaultValue: number;
  name: string;
  points: number;
  setPoints: (points: number | ((prev: number) => number)) => void;
  refe: React.RefObject<HTMLInputElement>;
};

const StatRow = ({
  defaultValue,
  name,
  points,
  setPoints,
  refe,
}: StatRowProps) => {
  const [statValue, setStatValue] = useState(DEFAULT_STAT_LEVEL);

  useEffect(() => {
    setStatValue(DEFAULT_STAT_LEVEL + defaultValue);
  }, [defaultValue]);

  return (
    <div className="w-full flex items-center justify-center my-2">
      <p className="w-10">{name}</p>
      <div className="flex-1 flex items-center justify-center gap-2 lg:gap-10">
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            if (statValue <= DEFAULT_STAT_LEVEL + defaultValue) return;

            setStatValue((prev) => prev - 1);
            setPoints(statValue > 14 ? points + 2 : points + 1);
          }}
        >
          -
        </button>
        <input
          type="number"
          className="w-14 input input-bordered h-10 text-center"
          disabled
          value={statValue}
          ref={refe}
        />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            if (statValue >= 15 + defaultValue) return;
            if (points <= 0) return;
            if (points === 1 && statValue > 13) return;

            setStatValue((prev) => prev + 1);
            setPoints(statValue > 13 ? points - 2 : points - 1);
          }}
        >
          +
        </button>
      </div>
      <p className="w-10">
        +{statValue >= 10 ? Math.floor((statValue - 10) / 2) : "0"}
      </p>
    </div>
  );
};

const useGetBonusStats = (race: string, subRace?: string) => {
  const [bonusStats, setBonusStats] = useState({
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  });

  useEffect(() => {
    const characterRace = Races.find((r) => r.name === race);
    const charcaterSubRace = characterRace?.subRace?.find(
      (sb) => sb.name === subRace
    );

    const calculateStats = () => {
      setBonusStats((prev) => ({
        ...prev,
        ...characterRace?.stats,
      }));

      if (charcaterSubRace) {
        setBonusStats((prev) => ({
          ...prev,
          ...charcaterSubRace.stats,
        }));
      }
    };

    calculateStats();
  }, [race, subRace]);

  return bonusStats;
};

export default CharacterStats;
