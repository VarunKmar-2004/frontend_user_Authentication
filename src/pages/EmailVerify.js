import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials=true;
  const navigate=useNavigate();
  const handleNavigate=(path)=>{
    navigate(path);
  }
  const {setIsLogin,getUser,isLogin,userData}=useContext(AppContent);
  const inputRefs=React.useRef([]);
  const handleInput=(e,index)=>{
    if(e.target.value.length>0&&index<inputRefs.current.length-1){
      inputRefs.current[index+1].focus();
    }
  }
  const handleKeyDown=(e,index)=>{
    if(e.key==='Backspace' && e.target.value==='' &&index>0 ){
      inputRefs.current[index-1].focus();
    }
  }
  const handleSubmit=async(e)=>{
    try{
      e.preventDefault();
      const otparray=inputRefs.current.map(e=>e.value);
      const otp=otparray.join('');
      const {data}=await axios.post('https://backend-user-authentication.vercel.app/api/auth/verify-email-otp',{otp})
      if(data.success){
        setIsLogin(true);
        getUser();
        handleNavigate('/');
      }
      else{
        alert(data.message);
      }
    }catch(err){
      alert(err.message)
    }
  }
  useEffect(()=>{
    isLogin && userData && userData.accountVerificationStatus && handleNavigate('/');
  },[isLogin,userData]);
  return (
    <div className='w-[100%] min-h-screen py-2 px-4 flex justify-center items-center bg-gradient-to-br from-blue-300 to bg-purple-400'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center py-4 px-4 bg-slate-800 rounded-[10px]'>
           <div className='flex flex-col justify-center items-center py-2 px-2 gap-2'>
            <h1 className="text-xl font-semibold text-white">Email Verification</h1>
            <p className='text-sm text-slate-300 font-semibold'>Enter 6 digit otp sent to your email</p>
           </div>
           <div className='flex justify-between mb-4'>
             {
              Array(6).fill(0).map((_,index)=>(
                <input key={index} type="text" required maxLength={1} ref={e=>{inputRefs.current[index]=e}} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)} className='w-12 h-12 bg-[#333A5C] rounded-md text-white text-center text-xl ml-1 mr-1'/>
              ))
             }
           </div>
           <button type='submit' className='w-[100%] px-4 py-2 bg-gradient-to-br from-indigo-400 to-indigo-900 text-white text-lg rounded-full'>Verify Email</button>
        </form>
    </div>
  )
}

export default EmailVerify