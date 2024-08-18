// SurgeonList.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SurgeonData from "./SurgeonData";
import { FaEdit, FaTrash, FaInfoCircle, FaToggleOn } from "react-icons/fa";
import toast from "react-hot-toast";
import Overlay from "./Overlay";
const SurgeonList = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const [surgeons, setSurgeons] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [surgeonToDelete,setSurgeonToDelete]=useState(null);
  const handleClickDelete = (surgeon) => {
    setDeleteShow(true);
    setSurgeonToDelete(surgeon);
  };
  const token = localStorage.getItem("token");
  const handleDeleteSurgeon = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/deleteUserById/${surgeonToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch surgeons");
      }
      const data = await response.json();
      toast.success(`Surgeon deleted SuccessFully`, {
        duration: 2000,
        position: "top-center",
      });
      setSurgeons((prevSurgeons) =>
        prevSurgeons.filter((surgeon) => surgeon._id !== surgeonToDelete._id)
      );
      setSurgeonToDelete(null);
      setDeleteShow(false);
      
  
      
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    // Fetch surgeons when component mounts
    fetchSurgeons();
  }, []);

  const fetchSurgeons = async () => {
   
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/getUsersByDepartmentId/${departmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch surgeons");
      }
      if(response.status==404)
        setSurgeons([]);
      else{
      const data = await response.json();
      console.log(data);
      setSurgeons(data);}
    } catch (error) {
      console.error(error);
    }
  };

  const handleSurgeon = (surgeon) => {
    navigate(`/surgeonData/${surgeon._id}`);
  };
  const handleUpdate = (surgeon) => {
    navigate(`/surgeonUpdate/${surgeon._id}`);
  };

  return (
    <>
      {
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-center mb-4">Surgeons</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {surgeons.length>0 ?
            surgeons?.map(
              (surgeon) =>
                surgeon.role !== "Hospital Admin" &&
                surgeon.role !== "Super Admin" && (
                  <div
                    key={surgeon._id}
                    className="bg-gray-200  hover:bg-gray-300 p-4 rounded shadow "
                  >
                    <h2 className="text-lg font-bold mb-2">
                      {surgeon.firstname} {surgeon.lastname}
                    </h2>
                    <p className="text-gray-600">{surgeon.email}</p>
                    {/* Render other surgeon details here */}
                    <div className="flex gap-5 justify-end bg-transparent">
                      <div
                        onClick={() => handleUpdate(surgeon)}
                        className="cursor-pointer flex flex-col items-center text-blue-500"
                      >
                        <FaEdit size={20} />
                        <span className="text-sm">Edit</span>
                      </div>
                      <div className="cursor-pointer flex flex-col items-center text-red-500">
                        <FaTrash
                          onClick={() => handleClickDelete(surgeon)}
                          size={20}
                        />
                        <span className="text-sm">Delete</span>
                      </div>
                      <div className="cursor-pointer flex flex-col items-center text-gray-500">
                        <FaInfoCircle
                          onClick={() => handleSurgeon(surgeon)}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                )
            ):<div>No Surgeons Found</div>}
          </div>
        </div>
      }

      <Overlay
        show={deleteShow}
        onClose={() => setDeleteShow(false)}
        heading="Confirm Delete"
        message="Are you sure you want to delete this Surgeon?"
        onDelete={handleDeleteSurgeon}
      />
    </>
  );
};

export default SurgeonList;
