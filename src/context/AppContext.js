import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AppContent=createContext();
export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const [isLogin,setIsLogin]=useState(false);
    const [userData,setUserData]=useState(null);
    const isUserAuthorized=async()=>{
        const {data}=await axios.get('https://backend-user-authentication.vercel.app/api/auth/is-auth');
        try{
        if(data.success){
            setIsLogin(true);
            getUser();
        }
    }catch(err){
        alert(err.message);
    }
    }
    const getUser = async () => {
        try {
            const { data } = await axios.get('https://backend-user-authentication.vercel.app/api/user/userdata');
            console.log("User Data Response:", data);
            if (data.success) {
                setUserData(data.userData);
            } else {
                alert('User not found');
                setIsLogin(false);  // Logout if user data is not found
            }
        } catch (err) {
            console.error("Fetching User Data Error:", err.message);
            alert('Failed to fetch user data');
        }
    }
    useEffect(()=>{
        isUserAuthorized();
    },[])
    const value={
        isLogin,
        setIsLogin,
        userData,
        getUser,
        setUserData,
        isUserAuthorized
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}
