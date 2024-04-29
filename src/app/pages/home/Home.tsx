import { useAuthContext } from "../../../contexts/AuthContext";
import MainContainer from "../../components/containers/MainContainer";

const Home = () => {
  const { username } = useAuthContext();

  return (
    <MainContainer>
      <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300 ">
        Bienvenido de vuelta <span className="text-blue-500">{username}</span>
      </h1>
      <div className="divider" />
    </MainContainer>
  );
};

export default Home;
