import React from "react";

import toast from "react-hot-toast";

const DiceDropDown = () => {
  const throwDice = (dice: number) => {
    const result = Math.floor(Math.random() * dice) + 1;
    toast(`D${dice} -> ${result}`, { duration: 8000, icon: "🎲" });
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-btn font-bold min-h-0 h-9"
      >
        Dados
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <button onClick={() => throwDice(4)}>D4</button>
        </li>
        <li>
          <button onClick={() => throwDice(6)}>D6</button>
        </li>
        <li>
          <button onClick={() => throwDice(8)}>D8</button>
        </li>
        <li>
          <button onClick={() => throwDice(10)}>D10</button>
        </li>
        <li>
          <button onClick={() => throwDice(12)}>D12</button>
        </li>
        <li>
          <button onClick={() => throwDice(20)}>D20</button>
        </li>
      </ul>
    </div>
  );
};

export default DiceDropDown;
