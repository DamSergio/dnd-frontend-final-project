import { useAuthContext } from "../../../contexts/AuthContext";
import MainContainer from "../../components/Containers/MainContainer";

export const Home = () => {
  const { username } = useAuthContext();

  return (
    <MainContainer>
      <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300">
        Bienvenido de vuelta <span className="text-yellow-400">{username}</span>
      </h1>
      <div className="divider" />
    </MainContainer>
  );
};
