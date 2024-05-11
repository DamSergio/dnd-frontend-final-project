import diceLoaderImg from "../../assets/dice_loader.webp";

const Loader = () => {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col items-center justify-center h-full"
      style={{ background: "#4b4a4a3c" }}
    >
      <img
        src={diceLoaderImg}
        alt="spinning wireframe dice"
        className="w-1/4"
      />
    </div>
  );
};

export default Loader;
