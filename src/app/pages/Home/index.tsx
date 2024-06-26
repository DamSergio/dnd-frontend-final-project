import { Helmet } from "react-helmet";
import { useAuthContext } from "../../../contexts/AuthContext";
import MainContainer from "../../components/Containers/MainContainer";

export const Home = () => {
  const { authUser } = useAuthContext();

  return (
    <MainContainer>
      <Helmet>
        <title>Inicio</title>
      </Helmet>
      <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300">
        Bienvenido de vuelta{" "}
        <span className="text-yellow-400">{authUser.username}</span>
      </h1>
      <div className="divider" />
    </MainContainer>
  );
};
