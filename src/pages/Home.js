import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { AppContent } from '../context/AppContext'

const Home = () => {
  const {userData}=useContext(AppContent);
  return (
    <div className='flex flex-col gap-2 justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 to-purple-800'>
        <Navbar/>
        <div className='flex flex-col justify-center items-center mt-20 px-6 gap-4'>
            <h1 className='text-3xl'>Hey {userData?userData.name:"Developer"}</h1>
            <button className='px-4 py-2 text-lg rounded-full bg-[#2864e3] text-white'>Get Started</button>
        </div>
    </div>
  )
}

export default Home