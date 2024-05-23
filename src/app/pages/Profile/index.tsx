import { useRef, useState } from "react";

import MainContainer from "../../components/Containers/MainContainer";
import { Helmet } from "react-helmet";
import { useAuthContext } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { FetchError } from "../../../types/FetchError";
import api from "../../../utils/axios";

export const Profile = () => {
  const { authUser } = useAuthContext();
  const [picture, setPicture] = useState<File | null>(null);

  const { savePicture, loading: pictureLoading } = useSavePicture();
  const { saveName, loading: nameLoading } = useSaveName();

  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Helmet>
        <title>Perfil</title>
      </Helmet>
      <MainContainer>
        <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
          <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300">
            Perfil
          </h1>
          <div className="divider" />
          <div className="w-full h-full">
            <div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <img
                  src={
                    picture
                      ? URL.createObjectURL(picture)
                      : authUser.profilePicture
                  }
                  alt="character img"
                  className="w-[200px] h-[200px] rounded-badge"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setPicture(e.target.files?.[0] || null);
                  }}
                />
              </div>
              <button
                className="btn btn-success mt-2 w-full"
                disabled={pictureLoading || !picture}
                onClick={() => {
                  savePicture(picture!, authUser.accessToken);
                  authUser.profilePicture = URL.createObjectURL(picture!);
                }}
              >
                {pictureLoading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Guardar imagen"
                )}
              </button>
            </div>
            <div className="divider" />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="input input-bordered"
                defaultValue={authUser.username}
                ref={nameRef}
              />
            </div>
            <button
              className="btn btn-success mt-2 w-full"
              disabled={nameLoading}
              onClick={() => {
                if (!nameRef.current!.value) return;

                saveName(nameRef.current!.value, authUser.accessToken);
                authUser.username = nameRef.current!.value;
              }}
            >
              {nameLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Guardar nombre"
              )}
            </button>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

const useSavePicture = () => {
  const [loading, setLoading] = useState(false);

  const savePicture = async (picture: File, accessToken: string) => {
    setLoading(true);

    try {
      const response = await api.patch(
        "/user/picture",
        { picture: picture },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { savePicture, loading };
};

const useSaveName = () => {
  const [loading, setLoading] = useState(false);

  const saveName = async (name: string, accessToken: string) => {
    setLoading(true);

    try {
      const response = await api.patch(
        "/user/name",
        { username: name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { saveName, loading };
};
