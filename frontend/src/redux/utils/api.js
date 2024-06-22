// utils/api.js

const baseURL = 'https://example.com/api';

// Function to fetch user data
export const fetchUserData = async (token, dispatch) => {
  try {
    const response = await fetch(`${baseURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    dispatch(setUser(userData)); // Dispatching action here
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Add more API call functions for other slices as needed
