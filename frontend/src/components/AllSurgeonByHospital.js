import React, { useState, useEffect } from "react";
import UpdateDepartmentModel from "./UpdateDepartmentModel";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
const AllSurgeonByHospital = () => {
  const [users, setUsers] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedSurgeon, setSelectedSurgeon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const [refresh,setRefresh]=useState(false);
  const {hospitalId}=useParams();
  const {user}=useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
    
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/getSurgeonsByHospitalId/${hospitalId}/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [token,user?._id,refresh]);

  const handleOpenModal = (user) => {
    setSelectedSurgeon(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    
    setShowModal(false);
    setSelectedSurgeon(null);
    setRefresh(prev=>!prev);
  };

  const handleEditClick = (user) => {
    setEditingRow(user._id);
    setFormData({
      ...user,
      // bucketActive: user.bucketActive ? 'true' : 'false',
      // cameraActive: user.cameraActive ? 'true' : 'false',
      // active: user.active ? 'true' : 'false',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input Change:", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      console.log(formData);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/updateUserById/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
          
          }),
        }
      );
      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === formData._id ? { ...formData, _id: user._id } : user
          )
        );
        setEditingRow(null);
      } else {
        console.error("Error updating user");
      }
    } catch (err) {
      console.error("Error saving user", err);
    }
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setFormData({});
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">All Surgeons</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospitals & Departments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bucket Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Camera Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {editingRow === user._id ? (
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  ) : (
                    user.firstname
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRow === user._id ? (
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  ) : (
                    user.lastname
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRow === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRow === user._id ? (
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.hospitals.map((entry, index) => (
                    <div key={index}>
                      <div>
                        <strong>Hospital:</strong>{" "}
                        {entry.hospitalId
                          ? entry.hospitalId.Hospital_Name
                          : "N/A"}
                      </div>
                      <div>
                        <strong>Departments:</strong>
                        {entry.departmentId.length > 0
                          ? entry.departmentId?.map((dept, deptIndex) => (
                              <div key={deptIndex}>{dept.department_name}</div>
                            ))
                          : "N/A"}
                      </div>
                    </div>
                  ))}
                  <button
                    className="text-white px-4 py-2 rounded-md bg-red-400 hover:bg-red-500"
                    onClick={() => handleOpenModal(user)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRow === user._id ? (
                    <select
                      name="bucketActive"
                      value={formData.bucketActive}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : user.bucketActive.toString() == "true" ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRow === user._id ? (
                    <select
                      name="cameraActive"
                      value={formData.cameraActive}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : user.cameraActive.toString() == "true" ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingRow === user._id ? (
                    <select
                      name="active"
                      value={formData.active}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : user.active.toString() == "true" ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                  {editingRow === user._id ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="text-white bg-red-400 hover:bg-red-700 px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSurgeon && (
        <UpdateDepartmentModel
          showModal={showModal}
          onClose={handleCloseModal}
          surgeon={selectedSurgeon}
        />
      )}
    </div>
  );
};

export default AllSurgeonByHospital;
