import toast, { Toast } from "react-hot-toast";

const ToastSessionExpired = ({ t }: { t: Toast | null }) => {
  return (
    <div
      className={`${
        t?.visible ? "animate-enter" : "animate-leave"
      } max-w-[50%] w-full bg-base-300 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 flex items-center p-4">
        <div className="w-full">
          <p className="text-md font-medium text-yellow-500">Sesión caducada</p>
          <p className="text-sm text-gray-200">
            Tu sesión ha caducado, por favor inicia sesión de nuevo.
          </p>
        </div>
      </div>
      <div className="flex border-l border-black">
        <button
          onClick={() => toast.dismiss(t?.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ToastSessionExpired;
