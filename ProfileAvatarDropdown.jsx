import React, { useState, useRef, useEffect } from "react";

const ProfileAvatarDropdown = ({ users, selectedUser, onUserSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserSelect = (user) => {
    onUserSelect(user);
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-gray-800 text-white rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <img
          className="h-8 w-8 rounded-full"
          src={
            selectedUser
              ? users.find((user) => user.name === selectedUser)?.avatar
              : users[0].avatar
          }
          alt={selectedUser}
        />
      </button>
      {isDropdownOpen && (
        <ul
          className="relative right-50 w-48 bg-black text-sm border border-gray-300 rounded-md shadow-lg mt-2"
          style={{
            right: "0px",
            left: "80px",
            bottom: "0px",
            position: "absolute",
          }}
        >
          {users.map((user) => (
            <li
              key={user.name}
              onClick={() => handleUserSelect(user)}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer flex items-center"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-6 w-6 rounded-full mr-2"
              />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileAvatarDropdown;
