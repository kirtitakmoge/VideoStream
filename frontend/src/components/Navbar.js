import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white-100 shadow-xl w-full py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-black text-lg font-semibold">
          Taurean Surgical
        </Link>

        <div className="flex items-center">
          <div className="relative" ref={dropdownRef}>
            <div className="flex cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <p className='px-3'>{localStorage.getItem('username')}</p>
              <UserIcon className="bg-red-500" username={localStorage.getItem('username')} />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/profileupdate');
                    }}
                    className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profile Update
                  </button>
                  <Link
                    className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    to="/signout"
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
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
