import React, { useEffect, useState } from 'react';


const AllSurgeon = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
const token=localStorage.getItem("token");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                
                    const response = await fetch(
                      `${process.env.REACT_APP_API_URL}/api/users/allSurgeon`,
                      {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                        },
                      
                      }
                    ); // Adjust the URL based on your backend setup
                    if(response.ok){
                        const response1 =await response.json()
                setUsers(response1);
                setLoading(false);}
            } catch (err) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bucket Active</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.hospitalId ? user.hospitalId.Hospital_Name : 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.departmentId ? user.departmentId.department_name : 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.Specialization}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.mobile_no}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.bucketActive ? 'Yes' : 'No'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.active ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AllSurgeon;
