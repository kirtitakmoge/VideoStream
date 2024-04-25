import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
const AllHospitals=()=>
{
    const [hospitals,setHospitals]=useState([]);
    useEffect(() => {
        const fetchHospitals = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getAllHospitals`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              const userData = await response.json();
              setHospitals(userData);
             
            }
          } catch (error) {
            console.error('Error fetching hospitals:', error);
           
          }
        };
        fetchHospitals();
      }, []);

      return(<><div>
        <h2 className="text-2xl mt-6 font-bold text-center">Hospitals</h2>
      <div className="grid m-6  grid-cols-3 gap-4 ">
        {hospitals.map((hospital) => (
          <div className="col-span-1 shadow-md">
           { <Link
              to={`/hospitalAdminData/${hospital._id}`}
              className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"
            > 
              <h2 className="text-2xl font-bold mb-4">
                {" "}
                {hospital.Hospital_Name}
              </h2>
            </Link>}
          </div>
        ))}
      </div>
      </div>
      </>);


}
export default AllHospitals;
