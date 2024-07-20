import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-700 to-orange-200 text-white">
      <div className="container mx-auto px-8">
        <nav className="flex items-center justify-between flex-wrap py-6">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 text-gray-800">
            <span className="font-semibold text-xl tracking-tight">Surgi Cloud</span>
          </div>

          {/* Mobile menu toggle button */}
          <div className="block lg:hidden">
            <button
              id="nav-toggle"
              className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-gray-500 hover:border-gray-500"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
                />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0">
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a
                  href="#"
                  className="inline-block text-gray-600 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                >
                  Home
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="#"
                  className="inline-block text-gray-600 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                >
                  Features
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="#"
                  className="inline-block text-gray-600 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                >
                  Pricing
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="#"
                  className="inline-block text-gray-600 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                >
                  Blog
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="#"
                  className="inline-block text-gray-600 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                >
                  Contact
                </a>
              </li>
              {/* Dropdown for Login/Signup */}
              <li className="relative group">
                <a
                  href="#"
                  className="inline-block text-gray-600 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  onClick={toggleDropdown}
                >
                  Login/Signup <FaCaretDown className="inline-block ml-1" />
                </a>
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute z-20 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Login
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Signup
                    </a>
                  </div>
                )}
              </li>
            </ul>
            <a
              href="#"
              id="navAction"
              className="bg-white text-gray-800 font-bold rounded-full py-2 px-6 shadow hover:shadow-lg outline-none focus:outline-none mr-2 transition duration-300 ease-in-out"
            >
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
