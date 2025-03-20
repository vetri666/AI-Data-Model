import React from "react";
import { NavLink } from "react-router-dom";
import ProfileAvatarDropdown from "./ProfileAvatarDropdown";

const Sidebar = ({ children, username, setUsername, users }) => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-4">
      <div className="text-xl font-bold mb-6 m-auto">Invoice Insights</div>
      <ul>
        <li>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 rounded-md bg-blue-500 text-white"
                : "block py-2 px-4 rounded-md hover:bg-gray-700"
            }
          >
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 rounded-md bg-blue-500 text-white"
                : "block py-2 px-4 rounded-md hover:bg-gray-700"
            }
          >
            Invoice
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 rounded-md bg-blue-500 text-white"
                : "block py-2 px-4 rounded-md hover:bg-gray-700"
            }
          >
            Setting
          </NavLink>
        </li>
      </ul>

      <div className="absolute bottom-4 left-4 flex items-center">
        <ProfileAvatarDropdown
          users={users}
          selectedUser={username ?? users[0].name}
          onUserSelect={(user) => setUsername(user.name)}
          dropdownPosition="right"
        />
        <span className="ml-2 text-white">
          {!!username ? username : users[0].name}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
