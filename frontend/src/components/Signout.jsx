import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {useAuth} from "./AuthContext";

import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/slice/userSlice'; 
const SignOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   const {logout}=useAuth();
    useEffect(() => {
        const signOut = () => {
            if(localStorage.getItem("username")) {
                toast.success(`Signed Out Successfully`, {
                    duration: 2000,
                    position: 'top-center', 
                });
                logout();
                localStorage.removeItem("username");
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn", true);
                localStorage.clear();
                dispatch(clearUser());
            } else {
                toast.success(`Already Logged Out`, {
                    duration: 2000,
                    position: 'top-center', 
                });
            }
            navigate("/");
        };

        signOut();
    }, []); // Include navigate in the dependency array to prevent useEffect from running again

    // Since the component doesn't render anything, you can return null
    return null;
};

export default SignOut;
