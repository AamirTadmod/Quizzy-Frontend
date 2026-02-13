import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { login } from '../services/operations/AuthAPIs'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";
import toast from 'react-hot-toast'

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Logging in...")
    try {
      const response = await login(data, dispatch)
      if (response) {
        navigate("/dashboard")
      }
    } catch (e) {
      console.log("ERROR WHILE LOGGING IN : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4'>
      {/* Brand Header matching Screenshot */}
      <div className="mb-8 text-center">
        <h1 className='text-4xl font-extrabold text-[#1e3a8a] tracking-tight'>IPQuest</h1>
        <p className='text-gray-500 mt-2'>Empowering IPR Awareness</p>
      </div>

      <section className='w-full max-w-[500px]'>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-5 bg-white shadow-sm border border-gray-100 p-10 rounded-xl'
        >
          <div>
            <h3 className='text-3xl font-bold text-[#1e3a8a] text-center'>
              Welcome Back
            </h3>
            <p className='text-center text-gray-500 mt-2'>Login to access your quiz dashboard</p>
          </div>

          {loading && (
            <div className='bg-blue-50 p-3 rounded-md border border-blue-100 text-center'>
              <span className='text-blue-600 text-xs font-medium'>
                Server is waking up, this may take a moment...
              </span>
            </div>
          )}

          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
            <input
              id='email'
              placeholder='name@example.com'
              className='py-2.5 text-base border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && <RequiredError>{errors.email.message}</RequiredError>}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="password" throws className="font-semibold text-gray-700">Password</label>
            <div className='relative flex items-center w-full'>
              <input
                id='password'
                placeholder='Enter your password'
                className='py-2.5 text-base border border-gray-300 w-full rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                type={hidePassword ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className='absolute right-3 cursor-pointer text-gray-500 text-xl'
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </div>
            {errors?.password && <RequiredError>{errors.password.message}</RequiredError>}
          </div>

          <div className='mt-4'>
            {/* Styled the internal button via className if your component allows, 
                otherwise this overrides the general primary look */}
            <Button 
                disabled={loading} 
                type={"submit"}
                className="w-full bg-[#1e3a8a] hover:bg-[#152a61] text-white py-3 rounded-lg font-bold transition-all shadow-md"
            >
              Log In
            </Button>
          </div>

          <p className='text-center mt-2 text-gray-600'>
            Don't have an account?{" "}
            <span 
              onClick={() => navigate("/signup")} 
              className='cursor-pointer text-[#1e3a8a] font-bold hover:underline'
            >
              Sign Up
            </span>
          </p>
        </form>
      </section>
      
      <footer className="mt-10 text-gray-400 text-sm">
        © 2026 IPQuest - Empowering IPR Awareness Through Gamification
      </footer>
    </div>
  )
}

export default LogIn