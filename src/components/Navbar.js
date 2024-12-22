import React, { useContext } from 'react'
import { FaArrowRight, FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import axios from 'axios';
const Navbar = () => {
    const navigate=useNavigate();
    const {isLogin,userData,setIsLogin,setUserData}=useContext(AppContent)
    const handelNavigate=(path)=>{
        navigate(path);
    }
    const sendVerificationOtp=async()=>{
      axios.defaults.withCredentials=true;
      try{
      const {data}=await axios.post('https://backend-user-authentication.vercel.app/auth/send-email-otp');
      if(data.success){
        handelNavigate('/email-verify');
        alert(data.msg);
      }
      }catch(err){

      }
    }
    const logout=async()=>{
      try{
        axios.defaults.withCredentials=true;
          const {data}=await axios.post('https://backend-user-authentication.vercel.app/auth/logout');
          if(data.success){
            setIsLogin(false);
            setUserData(false);
            handelNavigate('/')
          }
      }catch(err){
        alert(err)
      }
    }
  return (
    <div className='w-[100%] flex flex-row justify-between mx-auto py-8 px-6 fixed top-0 mr-5'>
        <FaHome className=' text-slate-800 text-5xl'/>
        {isLogin && userData?(
          <div className='w-[50px] h-[50px] bg-black text-white text-sm flex justify-center items-center rounded-full cursor-pointer relative group'>{userData.name[0].toUpperCase()}<div className='absolute hidden group-hover:block top-[15px] right-0 z-10 rounded pt-10 text-black px-4'><ul className='list-none m-0 bg-gray-100 p-2'>{userData.accountVerificationStatus?"":<li className='px-2 py-2 hover:bg-gray-200 cursor-pointer' onClick={sendVerificationOtp}>VerifyEmail</li>}<li className='px-2 py-2 hover:bg-gray-200 cursor-pointer' onClick={logout}>Logout</li></ul></div></div>
        ): <button onClick={()=>handelNavigate('/login')} className='flex items-center gap-2 bg-slate-300 shadow-sm shadow-slate-500 rounded-full py-2 px-4 text-lg'>Login<FaArrowRight/></button>}
    </div>
  )
}

export default Navbar