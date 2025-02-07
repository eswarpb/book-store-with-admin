import React, { useContext, useEffect, useState } from 'react';
import loginImg from '../assets/login.png';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {token,setToken,navigate,backendurl}=useContext(ShopContext)
  const [currstate, setCurrstate] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try{
      if(currstate === "Sign Up"){
        const response=await axios.post(backendurl+'/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendurl+'/api/user/login',{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)

    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="object-cover aspect-square h-full w-full"
          />
        </div>
        <div className="flexCenter w-full sm:w-1/2">
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800">
            <div className="w-full mb-4">
              <h3 className="bold-36">{currstate}</h3>
            </div>

            {currstate === 'Sign Up' && (
              <div className="w-full">
                <label htmlFor="name" className="medium-14">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                />
              </div>
            )}

            <div className="w-full">
              <label htmlFor="email" className="medium-14">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="medium-14">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>

            <button type="submit" className="btn-dark w-full mt-5 !py-[7px] !rounded">
              {currstate === 'Sign Up' ? 'Sign Up' : 'Login'}
            </button>

            <div className="w-full flex flex-col gap-y-3 medium-14">
              <div className="underline">Forget your password?</div>

              {currstate === 'Login' ? (
                <div className="underline">
                  Don't have an account?
                  <span
                    onClick={(e) => setCurrstate('Sign Up')}
                    className="cursor-pointer hover:text-secondaryOne"
                  >
                    Create account
                  </span>
                </div>
              ) : (
                <div className="underline">
                  Already have an account?
                  <span
                    onClick={(e) => setCurrstate('Login')}
                    className="cursor-pointer hover:text-secondaryOne"
                  >
                    Login
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
