import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Provider component to wrap your app and provide the user context
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch users by hospital Admin
  const fetchUsersByAdmin = async (adminId,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/admin/getAllUsers/${adminId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        return data.users;
      } else {
        setError('Failed to fetch users');
        return null;
      }
    } catch (error) {
      setError('Error fetching users');
      return null;
    }
  };

  // Function to create a user
  const createUser = async (userData,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        return createdUser;
      } else {
        setError('Failed to create user');
        return null;
      }
    } catch (error) {
      setError('Error creating user');
      return null;
    }
  };

  // Function to update a user
  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        const updatedUsers = users.map(user =>
          user._id === userId ? updatedUser : user
        );
        setUsers(updatedUsers);
        return updatedUser;
      } else {
        setError('Failed to update user');
        return null;
      }
    } catch (error) {
      setError('Error updating user');
      return null;
    }
  };

  // Function to delete a user
  const deleteUserById = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // Add any authorization headers if needed
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        console.log('User deleted successfully');
        return true;
      } else {
        setError('Failed to delete user');
        return false;
      }
    } catch (error) {
      setError('Error deleting user');
      return false;
    }
  };

  // Context value
  const value = {
    users,
    error,
    fetchUsersByAdmin,
    createUser,
    updateUser,
    deleteUserById,
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
