import React, { useContext, useEffect, useState } from 'react'
import { FaMailBulk, FaUser, FaUserSecret } from 'react-icons/fa'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AppContent } from '../context/AppContext'
const Login = () => {
    const [state,setState]=useState("Sign-Up");
    const {setIsLogin, getUser}=useContext(AppContent);
    const [username,setUsername]=useState(null);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const navigate=useNavigate();
    const handelSubmit=async(e)=>{
       try{
        e.preventDefault();
        axios.defaults.withCredentials=true;
        if(state==="Login"){
            const {data}=await axios.post("http:localhost:4000/api/auth/login",{email,password});
            console.log(data)
            if(data.success){
                setIsLogin(true);
                getUser();
                navigate('/');
            }
            else{
                alert(data.msg);
            }
        }
        else{
            const {data}=await axios.post('https://backend-user-authentication.vercel.app/api/auth/register',{username,email,password});
            if(data.success){
                setIsLogin(true);
                getUser();
                navigate('/');
            }
            else{
                alert(data.msg);
            }
        }
       }catch(err){
        alert(err.message)
    }
    }
  return (
    <div className='w-[100%] min-h-screen py-2 px-4 flex justify-center items-center bg-gradient-to-br from-blue-200 to bg-purple-400'>
        <div className='flex flex-col justify-center items-center py-4 px-4 bg-slate-800 rounded-[10px]'>
            <h1 className='text-2xl text-white'>{state==="Sign-Up"?'Create Account':"Login"}</h1>
            <form className='flex flex-col justify-center items-center gap-4 mt-4' onSubmit={(e)=>handelSubmit(e)}>
                { state==="Sign-Up" ?(<div className='flex items-center justify-center bg-slate-700 px-2 rounded-[5px]'>
                    <FaUser className="text-white"/>
                    <input className="border-none outline-none rounded-[5px] px-2 py-2 bg-transparent text-white" type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>):""}
                <div className='flex items-center justify-center bg-slate-700 px-2 rounded-[5px]'>
                    <FaMailBulk className="text-white"/>
                    <input className="border-none outline-none rounded-[5px] px-2 py-2 bg-transparent text-white"  type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex items-center justify-center bg-slate-700 px-2 rounded-[5px]'>
                    <FaUserSecret className="text-white"/>
                    <input className="border-none outline-none rounded-[5px] px-2 py-2 bg-transparent text-white" type="password" placeholder={state==="Sign-Up"?"Choose a Password":"Enter Password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {state==="Sign-Up"?"":<p className="text-sm text-blue-500 cursor-pointer mr-36 hover:underline" onClick={()=>navigate("/reset-pass")}>Forgot Password?</p>}
                <button className='w-[100%] px-4 py-2 rounded-full text-white text-xl bg-blue-500' type="submit">{state==="Sign-Up"?"Sign-Up":"Login"}</button>
            </form>
            {
                state==="Sign-Up"?<p className='text-white text-sm mt-4'>Already have an account.<span className='text-blue-500 cursor-pointer underline' onClick={()=>setState('Login')}>Login</span></p>:<p className='text-white text-sm mt-4'>Don't have an account <span className='text-blue-500 cursor-pointer underline' onClick={()=>setState('Sign-Up')}>Sign-Up</span></p>
            }
        </div>
    </div>
  )
}

export default Login