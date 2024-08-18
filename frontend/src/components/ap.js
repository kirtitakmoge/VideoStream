// DepartmentDetails.js

import React from "react";
import { Link ,useParams} from "react-router-dom";

const DepartmentDetails = () => {
  const { departmentId,department_name } = useParams();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-10"> {department_name} Department</h1>
      <div className="grid grid-cols-3 gap-8 ">
      
        <div className="col-span-1  shadow-md ">
          <Link to={`/surgeonList/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Surgeons</h2>
            
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/showvideo/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Live Streaming from Camera</h2>
            
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/deviceListadmin/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Recorded Video from camera</h2>
            
          </Link>
        </div>
        <div className="col-span-1 shadow-md">
          <Link to={`/createCamera/${departmentId}`} className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Add new Camera</h2>
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/renameDepartment/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Rename Department</h2>
            
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/deleteDepartment/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Delete Department</h2>
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;



import React, { useEffect, useState } from 'react';
import UpdateDepartmentModel from './UpdateDepartmentModel'; // Import the modal component
import { useNavigate } from 'react-router-dom';

const AllSurgeon = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSurgeon, setSelectedSurgeon] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");
const navigate=useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/users/allSurgeon`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.ok) {
                    const response1 = await response.json();
                    setUsers(response1);
                    setLoading(false);
                } else {
                    setError('Error fetching users');
                    setLoading(false);
                }
            } catch (err) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    const handleOpenModal = (user) => {
        setSelectedSurgeon(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSurgeon(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto px-4 mt-5">
            <h2 className="text-2xl font-bold mb-4 text-center">All Surgeons</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospitals & Departments</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bucket Active</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.hospitals.map((entry, index) => (
                                        <div key={index}>
                                            <div><strong>Hospital:</strong> {entry.hospitalId ? entry.hospitalId.Hospital_Name : 'N/A'}</div>
                                            <div>
                                                <strong>Departments:</strong>
                                                {entry.departmentId.length > 0 ? (
                                                    entry.departmentId?.map((dept, deptIndex) => (
                                                        <div key={deptIndex}>{dept.department_name}</div>
                                                    ))
                                                ) : (
                                                    'N/A'
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.mobile_no}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.bucketActive ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.active ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        className="text-white px-4 py-3 rounded-md bg-red-400 hover:bg-red-700"
                                        onClick={() => handleOpenModal(user)}
                                    >
                                        Change Department
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        className="text-white px-4 py-3 rounded-md bg-red-400 hover:bg-red-700"
                                        onClick={() =>navigate(`/surgeonUpdate/${user._id}`)}
                                    >
                                        Update Surgeon
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <UpdateDepartmentModel
                    surgeon={selectedSurgeon}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default AllSurgeon;
