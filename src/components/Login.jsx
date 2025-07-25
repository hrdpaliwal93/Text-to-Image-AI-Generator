import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.jsx';
import {motion} from'framer-motion'
import axios from 'axios'


const Login = () => {
  const [state, setstate] = useState('Login')
  const {setshowlogin, backendurl, setuser, settoken} = useContext(AppContext)
  const [name, setname] = useState("")
  const [email,  setemail] = useState("")
  const [password,  setpassword] = useState("")


const onsubmit = async(e)=>{
  e.preventDefault();
  try{
    if(state === 'Login'){
      const {data} = await axios.post('http://localhost:3000/api/user/login', {email,password})
     

    if(data.success){
      settoken(data.token)
      setuser(data.user)
      localStorage.setItem('token', data.token)
      setshowlogin(false)

    }else{
      alert(data.message)

    }

  }else{
    const data = await axios.post(backendurl+ '/api/user/register', {name, email, password})
    console.log(data.data.success)

    if(data.data.success){
      settoken(data.data.token)
      setuser(data.data.user)
      localStorage.setItem('token', data.data.token)
      setshowlogin(false)

    }else{
      alert(data.data.message)

    }
  }

}catch(e){
  console.log(e)
}
}

useEffect(()=>{
  document.body.style.overflow = 'hidden';
  return () =>{
    document.body.style.overflow = 'unset';
  }
}, [])


  return (
    <div className='fixed  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

    <motion.form onSubmit={onsubmit}
    
    initial={{opacity:0.2, y:50}}
      transition={{duration:0.3}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
    
    className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutrsl-700 font-medium'>{state}</h1>
        <p>Welcome back! Please sign in to continue</p>

        { state !== 'Login' &&  <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt="" />
            <input onChange={(e)=>setname(e.target.value)} value={name}  className='outline-none text-sm' type='text' placeholder='Full Name' required />
        </div>}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt="" />
            <input onChange={(e)=>setemail(e.target.value)} value={email} className='outline-none text-sm' type='email' placeholder='Email ID' required />
         </div>

         <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setpassword(e.target.value)} value={password} className='outline-none text-sm' type='password' placeholder='Password' required />

            
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state=='Login' ? 'login' : 'create account'}</button>

        {state=='Login' ? <p className='mt-5 text-center' >Don't have an account? <span onClick={()=>setstate('Signup')} className='text-blue-600 cursor-pointer' >Sign up</span></p>
            :
        <p className='mt-5 text-center' >Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setstate('Login')} >Login</span></p>}

        <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
    </motion.form>
    </div>
  )
}

export default Login