import axios from 'axios';
import React,{useState} from 'react'
import { FaLock, FaMailchimp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState('');
  const [emailSent,setEmailSent]=useState(false);
  const [otp,setOtp]=useState('');
  const [sendOtp,setSendOtp]=useState(false);
  const [newPassword,setNewPass]=useState('')
  axios.defaults.withCredentials=true;
  const onEmailSubmit=async(e)=>{
       try{
        e.preventDefault();
        const {data}=await axios.post('https://backend-user-authentication.vercel.app/api/auth/send-resetotp',{email});
        if(data.success){
          setEmailSent(true);
          alert(data.msg);
        }
       }catch(err){
        alert(err.message);
       }
  }
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
   const OtpSubmitted=async(e)=>{
    try{
     e.preventDefault();
     const otparray=inputRefs.current.map(e=>e.value);
     setOtp(otparray.join(''));
     setSendOtp(true);
    }catch(err){
      alert(err.message);
    }
   }
   const handleNavigate=(path)=>{
    navigate(path);
   }
   const submitNewPass=async(e)=>{
    try{
      e.preventDefault();
      const {data}=await axios.post('https://backend-user-authentication.vercel.app/api/auth/verify-resetotp',{email,otp,newPassword});
      if(data.success){
        alert(data.msg);
        handleNavigate('/login');
      }
    }catch(err){
      alert(err.message);
    }
   }
  return (
    <div className='w-[100%] min-h-screen py-2 px-4 flex justify-center items-center bg-gradient-to-br from-blue-300 to bg-purple-400'>
      {!emailSent&&<form onSubmit={onEmailSubmit} className='flex flex-col justify-center items-center py-4 px-4 gap-3 bg-slate-800 rounded-[10px]'>
           <div className='flex flex-col justify-center items-center py-2 px-2 gap-2'>
            <h1 className="text-xl font-semibold text-white">Reset Password</h1>
            <p className='text-sm text-slate-300 font-semibold'>Enter email to reset your Password</p>
           </div>
           <div className='flex items-center justify-center bg-slate-700 px-2 rounded-[5px]'>
             <FaMailchimp/>
             <input onChange={(e)=>{setEmail(e.target.value)}} type="email" value={email} className="border-none outline-none rounded-[5px] px-2 py-2 bg-transparent text-white" placeholder="enter Email" required/>
           </div>
           <button type='submit' className='w-[100%] px-4 py-2 bg-gradient-to-br from-indigo-400 to-indigo-900 text-white text-lg rounded-full'>submit Email</button>
        </form>}
      {!sendOtp && emailSent &&
         <form onSubmit={OtpSubmitted} className='flex flex-col justify-center items-center py-4 px-4 bg-slate-800 rounded-[10px]'>
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
      }
      {sendOtp&&emailSent &&
       <form onSubmit={submitNewPass} className='flex flex-col justify-center items-center py-4 px-4 gap-3 bg-slate-800 rounded-[10px]'>
       <div className='flex flex-col justify-center items-center py-2 px-2 gap-2'>
        <h1 className="text-xl font-semibold text-white">New Password</h1>
        <p className='text-sm text-slate-300 font-semibold'>Choose New Password</p>
       </div>
       <div className='flex items-center justify-center bg-slate-700 px-2 rounded-[5px]'>
         <FaLock/>
         <input onChange={(e)=>{setNewPass(e.target.value)}} type="password" value={newPassword} className="border-none outline-none rounded-[5px] px-2 py-2 bg-transparent text-white" placeholder="enter new Password" required/>
       </div>
       <button type='submit' className='w-[100%] px-4 py-2 bg-gradient-to-br from-indigo-400 to-indigo-900 text-white text-lg rounded-full'>Submit</button>
    </form>
      }
    </div>
  )
}

export default PasswordReset