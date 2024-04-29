import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
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
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem('username')) {
      toast.success(`Signed Out Successfully`, {
        duration: 2000,
        position: 'top-center',
      });
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
    } else {
      toast.success(`Already Logged Out`, {
        duration: 2000,
        position: 'top-center',
      });
    }
    navigate('/login');
  };

  return (
    <nav className="bg-white-100 shadow-xl w-full py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-blacktext-lg font-semibold">
          Taurean Surgical
        </Link>

        <div className="flex items-center">
         
          <div className="relative ">
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
                  <Link className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 w-full text-left" to="/signout">Signout</Link>
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
