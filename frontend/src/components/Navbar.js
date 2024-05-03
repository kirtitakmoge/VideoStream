import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserIcon = ({ username }) => {
  const initials = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div className="rounded-full h-8 w-8 bg-red-500 flex items-center justify-center text-gray-600">
      {initials}
    </div>
  );
};

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleProfileUpdateClick = () => {
    setIsDropdownOpen(false);
    navigate('/profileupdate');
  };

  const handleSignoutClick = () => {
    setIsDropdownOpen(false);
    // Perform signout action
  };

  return (
    <nav className="bg-white-100 shadow-xl w-full py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div>
          {/* Add your logo or other navbar content here */}
        </div>
        <div className="flex items-center">
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <UserIcon username={localStorage.getItem('username')} />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    onClick={handleProfileUpdateClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    Profile Update
                  </button>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                    to="/signout"
                    onClick={handleSignoutClick}
                  >
                    Signout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
