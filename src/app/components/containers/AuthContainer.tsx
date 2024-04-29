import { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
