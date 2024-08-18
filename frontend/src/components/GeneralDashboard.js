import React ,{useEffect, useState} from "react";
import HospitalDepartmentSelector from "./HospitalDepartmentSelector";

import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";

const GeneralDashboard=()=>
{
    const [selectedHospital, setSelectedHospital] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const navigate=useNavigate();
    const { user } = useAuth(); 
    const handleSelection = (hospitalId, departmentId) => {
        setSelectedHospital(hospitalId);
        setSelectedDepartment(departmentId);
        navigate(`/surgeonDashboard/${selectedDepartment}`);
      };
    useEffect(()=>
       { 
        if(user)console.log("General ",user)}
,[user])
    return(

        <>{user && <HospitalDepartmentSelector onSelection={handleSelection}/>}
        </>
    )

}
export default GeneralDashboard;