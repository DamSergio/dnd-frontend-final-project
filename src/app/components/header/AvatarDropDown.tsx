import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { LogoutIcon, ProfileIcon } from "../Icons/Icons";

const AvatarDropDown = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthUser({
      id: "",
      username: "",
      email: "",
      profilePicture: "",
      rol: "",
      accessToken: "",
      invitations: [],
    });
    localStorage.removeItem("authUser");

    navigate("/");
  };

  return (
    <div className="navbar-end w-auto">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt={authUser.username} src={authUser.profilePicture} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to={"/profile"}>
              <ProfileIcon />
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvatarDropDown;
