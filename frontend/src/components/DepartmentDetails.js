import React, { useState } from "react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import Overlay from "./Overlay";
import{toast} from "react-hot-toast"
import { useDepartment } from "./DepartmentContext";
const DepartmentDetails = ({  department }) => {
  const { departmentId, department_name } = useParams();
   const[name,setName]=useState(department_name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState(""); // For renaming
  const token=localStorage.getItem("token");
  const adminId=localStorage.getItem("id");
  const { deleteDepartmentById,updateDepartment } = useDepartment(); // Using the deleteDepartmentById function from DepartmentContext
const navigate=useNavigate();
  const handleDeleteDepartment = async () => {
    try {
      const response = await deleteDepartmentById(departmentId, adminId, token);

      if (response) {
        setShowDeleteModal(false);
        toast.success(`${department_name} Department deleted successfully`, {
          duration: 2000,
          position: 'top-center',
        });
        navigate(-1);
      } else {
        
        toast.error(`Error deleting department `, {
          duration: 2000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error deleting department:', error.message);
      toast.error(`Error deleting department: ${error.message}`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const handleRenameDepartment = async () => {
    try {
      const new1=await updateDepartment(departmentId,adminId, newDepartmentName,token);
      setShowRenameModal(false);
      setName(new1.department_name);
      toast.success(`Department renamed successfully`, {
        duration: 2000,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error renaming department:', error.message);
      toast.error(`Error renaming department: ${error.message}`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 relative">
      <h1 className="text-2xl font-bold text-center mb-10">{name} Department</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 shadow-md">
          {/* Style the link to resemble a button */}
          <Link to={`/surgeonList/${departmentId}`} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200 w-full">
            <h2 className="text-2xl text-center font-bold mb-4">Surgeons</h2>
          </Link>
        </div>
        <div className="col-span-1 shadow-md">
          {/* Style the link to resemble a button */}
          <Link to={`/cameralist/${departmentId}`} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200 w-full">
            <h2 className="text-2xl text-center font-bold mb-4">Live stream from camera</h2>
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/deviceListadmin/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Recorded Video from camera</h2>
            
          </Link>
        </div>
        <div className="col-span-1 shadow-md">
          <Link to={`/createCamera/${departmentId}/${department_name}`} className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200">
            <h2 className="text-2xl text-center font-bold mb-4">Add new Camera</h2>
          </Link>
        </div>
        <div className="col-span-1 shadow-md">
          <Link to={`/patientData/${departmentId}`} className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200">
            <h2 className="text-2xl text-center font-bold mb-4">Patients</h2>
          </Link>
        </div>
        <div className="col-span-1 shadow-md">
          {/* Button to show delete modal */}
          <button onClick={() => setShowDeleteModal(true)} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200 w-full">
            <h2 className="text-2xl  text-center font-bold mb-4">Remove Department</h2>
          </button>
        </div>
        <div className="col-span-1 shadow-md">
          {/* Button to show rename modal */}
          <button onClick={() => setShowRenameModal(true)} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200 w-full">
            <h2 className="text-2xl font-bold mb-4">Rename Department</h2>
          </button>
        </div>
      </div>

      {/* Delete Department Overlay */}
      <Overlay
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        heading="Confirm Delete"
        message="Are you sure you want to delete this department?"
        onDelete={handleDeleteDepartment}
      />

      {/* Rename Department Overlay */}
      <Overlay
        show={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        heading="Rename Department"
        message={
          <div>
            <label htmlFor="newDepartmentName" className="text-center">New Department Name</label>
            <input
              type="text"
              id="newDepartmentName"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              className="border my-4 border-gray-300 px-3 py-2 rounded-md w-full mb-4"
            />
          </div>
        }
        onRename={handleRenameDepartment}
      />
    </div>
  );
};

export default DepartmentDetails;
