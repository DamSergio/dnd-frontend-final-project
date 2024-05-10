import { useAuthContext } from "../../../contexts/AuthContext";
import { LogoutIcon, ProfileIcon, SettingsIcon } from "../Icons/Icons";

const AvatarDropDown = () => {
  const { profilePicture, username, setAuthUser } = useAuthContext();

  const handleLogout = () => {
    setAuthUser({
      username: "",
      email: "",
      profilePicture: "",
      rol: "",
      token: "",
    });
    localStorage.removeItem("authUser");
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
            <img alt={username} src={profilePicture} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>
              <ProfileIcon />
              Profile
            </a>
          </li>
          <li>
            <a>
              <SettingsIcon />
              Settings
            </a>
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
