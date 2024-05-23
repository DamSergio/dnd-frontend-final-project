import React from "react";
import { Roll as RollType } from "../../../../types/Roll";
import { useAuthContext } from "../../../../contexts/AuthContext";

const Roll = ({ roll }: { roll: RollType }) => {
  const { authUser } = useAuthContext();

  const myRoll = authUser.id === roll.user_id;
  const chatClass = myRoll ? "chat-end" : "chat-start";
  const chatBubbleColor = myRoll ? "bg-blue-500" : "bg-gray-500";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={roll.profile_picture}
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>

      <div className={`chat-bubble text-white ${chatBubbleColor} pb-2`}>
        <span className="font-bold">{roll.username}</span>
        {` tiro un ${roll.dice} y obtuvo un ${roll.result}!`}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {roll.username}
      </div>
    </div>
  );
};

export default Roll;
