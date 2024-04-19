import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const signOut = () => {
            if(localStorage.getItem("username")) {
                toast.success(`Signed Out Successfully`, {
                    duration: 2000,
                    position: 'top-center', 
                });
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                localStorage.removeItem("token");
            } else {
                toast.success(`Already Logged Out`, {
                    duration: 2000,
                    position: 'top-center', 
                });
            }
            navigate("/login");
        };

        signOut();
    }, []); // Include navigate in the dependency array to prevent useEffect from running again

    // Since the component doesn't render anything, you can return null
    return null;
};

export default SignOut;
