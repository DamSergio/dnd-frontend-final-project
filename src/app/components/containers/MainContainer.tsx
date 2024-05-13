import { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-400 overflow-y-auto">
      {children}
    </div>
  );
};

export default MainContainer;
