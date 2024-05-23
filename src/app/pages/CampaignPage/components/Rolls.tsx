import { useEffect, useRef } from "react";

import { Roll as RollType } from "../../../../types/Roll";
import Roll from "./Roll";

const Rolls = ({ rolls }: { rolls: RollType[] }) => {
  const lastRollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastRollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [rolls]);

  return (
    <div className="h-full overflow-y-auto px-2">
      {rolls.map((roll, index) => (
        <div key={index} ref={lastRollRef}>
          <Roll roll={roll} />
        </div>
      ))}
    </div>
  );
};

export default Rolls;
