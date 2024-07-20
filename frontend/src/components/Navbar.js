import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

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

  const UserIcon = ({ username }) => {
    const initials = username ? username.charAt(0).toUpperCase() : '';

    return (
      <div className="rounded-full h-8 w-8 bg-red-500 flex items-center justify-center text-gray-600">
        {initials}
      </div>
    );
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-0 px-4 py-2 flex items-center justify-between">
        {/* Branding/logo */}
       

        {/* User dropdown and menu */}
        <div className="flex items-center">
          {/* User icon and dropdown toggle */}
          <div className="relative lg:hidden">
            <button
              className="text-white p-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              {isDropdownOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    onClick={handleProfileUpdateClick}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Profile Update
                  </button>
                  <Link
                    to="/signout"
                    onClick={handleSignoutClick}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Signout
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User icon on desktop */}
          <div className="hidden lg:block ml-4">
            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <UserIcon username={localStorage.getItem('username')} />
                <span className="ml-2">{localStorage.getItem('username')}</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={handleProfileUpdateClick}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      Profile Update
                    </button>
                    <Link
                      to="/signout"
                      onClick={handleSignoutClick}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      Signout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
