import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AppContent=createContext();
export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const [isLogin,setIsLogin]=useState(false);
    const [userData,setUserData]=useState(false);
    const isUserAuthorized=async()=>{
        const {data}=await axios.get('https://backend-user-authentication.vercel.app/auth/is-auth',{withCredentials:true});
        try{
        if(data.success){
            setIsLogin(true);
            getUser();
        }
    }catch(err){
        alert(err.message);
    }
    }
    const getUser=async()=>{
        const {data}=await axios.get('https://backend-user-authentication.vercel.app/user/userdata')
        console.log(data)
        data.success ? setUserData(data.userData) : alert('user not found');

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