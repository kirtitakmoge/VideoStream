import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    department_name: '',
  });

  const { user } = useAuth();
  const adminId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const hospitalId = user ? user.hospitalId : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/department/createDepartment/${adminId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            department_name: formData.department_name,
            hospitalId: hospitalId,
          }),
        }
      );

      if (response.ok) {
        toast.success(`Department created successfully`, {
          duration: 2000,
          position: 'top-center',
        });
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
        toast.error(`Error creating department: ${errorMessage}`, {
          duration: 2000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error creating department:', error.message);
      toast.error(`Error creating department: ${error.message}`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Create Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="department_name" className="block font-medium">
              Department Name
            </label>
            <input
              type="text"
              id="department_name"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2 hover:bg-blue-600"
          >
            Create Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
