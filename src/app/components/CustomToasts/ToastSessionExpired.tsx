import toast, { Toast, useToaster } from "react-hot-toast";

const ToastSessionExpired = ({ t }: { t: Toast | null }) => {
  const { handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div
      role="alert"
      className={`alert alert-error w-full lg:w-1/2 ${
        t?.visible ? "animate-enter" : "animate-leave"
      }`}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Tu sesión ha caducado, por favor inicia sesión de nuevo.</span>
      <div>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => toast.dismiss(t?.id)}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ToastSessionExpired;
