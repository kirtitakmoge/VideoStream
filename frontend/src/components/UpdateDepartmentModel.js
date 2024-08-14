import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast"

const UpdateDepartmentModal = ({ surgeon, onClose }) => {
    const [hospitalId, setHospitalId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(surgeon.departmentId ? surgeon.departmentId._id : '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (hospitalId) {
            // Fetch departments based on the provided hospital ID
            const fetchDepartments = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospital_Id/${hospitalId}`, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
              

                    if (response.ok) {
                        const data = await response.json();
                        setDepartments(data.departments);
                        setError(''); // Clear any previous errors
                    } else {
                        setDepartments([]);
                        setError('Error fetching departments. Please check the hospital ID.');
                    }
                } catch (err) {
                    console.error('Error fetching departments:', err);
                    setDepartments([]);
                    setError('Error fetching departments.');
                }
            };

            fetchDepartments();
        } else {
            setDepartments([]);
        }
    }, [hospitalId]);
const adminId=localStorage.getItem("id");
    const handleAddSubmit = async (e) => {
        console.log(selectedDepartment);
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/addDepartment/${adminId}/${surgeon._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ hospitalId,departmentId:selectedDepartment}),
            });

            if (response.ok) {
                toast.success('Department added successfully', {
                    duration: 2000,
                    position: 'top-center',
                  });
                onClose();
            } else {
                toast.error('Failed to add department', {
                    duration: 2000,
                    position: 'top-center',
                  });
            }
        } catch (err) {
            console.error(err);
           
        }
    };

const handleChangeSubmit = async (e) => {
    console.log(selectedDepartment);
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/updateDepartment/${adminId}/${surgeon._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ hospitalId,departmentId:selectedDepartment}),
        });

        if (response.ok) {
            toast.success('Department added successfully', {
                duration: 2000,
                position: 'top-center',
              });
            onClose();
        } else {
            toast.error('Failed to add department', {
                duration: 2000,
                position: 'top-center',
              });
        }
    } catch (err) {
        console.error(err);
       
    }
};


    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Update Department for {surgeon.firstname} {surgeon.lastname}</h3>
                <form >
                    <div className="mb-4">
                        <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700">Hospital ID</label>
                        <input
                            id="hospitalId"
                            name="hospitalId"
                            type="text"
                            value={hospitalId}
                            onChange={(e) => setHospitalId(e.target.value)}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter hospital ID"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Select New Department</label>
                        <select
                            id="department"
                            name="department"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            disabled={!hospitalId} // Disable if no hospital ID is provided
                        >
                            <option value="">Select a department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.department_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleAddSubmit}
                            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                        >
                            Add to department
                        </button>
                        <button
                            type="submit"
                            onClick={handleChangeSubmit}
                            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                        >
                            Change department
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDepartmentModal;
