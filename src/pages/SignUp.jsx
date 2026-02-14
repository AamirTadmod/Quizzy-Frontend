import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { signUp } from '../services/operations/AuthAPIs'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState({
    password: true,
    confirmPassword: true,
  })
  // const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true);
    const toastId = toast.loading("Creating account...")
    try {
      const response = await signUp(data)
      if (response) {
        navigate("/login")
      }
    } catch (e) {
      console.log("ERROR WHILE SIGNING UP : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  // useEffect(() => {
  //   setValue("role", "user")
  // }, [setValue])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 py-10'>
      
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <h1 className='text-4xl font-extrabold text-[#1e3a8a] tracking-tight'>IPQuest</h1>
        <p className='text-gray-500 mt-2'>Join the IPR Awareness Community</p>
      </div>

      <section className='w-full max-w-[500px]'>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-4 bg-white shadow-sm border border-gray-100 p-8 md:p-10 rounded-xl'
        >
          <div className="mb-2">
            <h3 className='text-3xl font-bold text-[#1e3a8a] text-center'>
              Create Account
            </h3>
          </div>

          {loading && (
            <div className='bg-blue-50 p-3 rounded-md border border-blue-100 text-center'>
              <span className='text-blue-600 text-xs font-medium'>
                Setting up your profile, please wait...
              </span>
            </div>
          )}

          {/* Username */}
          <div className='flex flex-col gap-1'>
            <label htmlFor="username" className="font-semibold text-gray-700">Username</label>
            <input
              id='username'
              placeholder='johndoe123'
              className='py-2 text-base border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all'
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            {errors?.username && <RequiredError>{errors.username.message}</RequiredError>}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
            <input
              id='email'
              placeholder='email@example.com'
              className='py-2 text-base border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all'
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && <RequiredError>{errors.email.message}</RequiredError>}
          </div>

          {/* Password */}
          <div className='flex flex-col gap-1'>
            <label htmlFor="password" throws className="font-semibold text-gray-700">Password</label>
            <div className='relative flex items-center'>
              <input
                id='password'
                placeholder='Create password'
                className='py-2 text-base border border-gray-300 w-full rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500'
                type={hidePassword.password ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className='absolute right-3 cursor-pointer text-gray-500'
                onClick={() => setHidePassword((prev) => ({ ...prev, password: !hidePassword.password }))}
              >
                {hidePassword.password ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </div>
            {errors?.password && <RequiredError>{errors.password.message}</RequiredError>}
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col gap-1'>
            <label htmlFor="confirmPassword" throws className="font-semibold text-gray-700">Confirm Password</label>
            <div className='relative flex items-center'>
              <input
                id='confirmPassword'
                placeholder='Confirm password'
                className='py-2 text-base border border-gray-300 w-full rounded-lg px-4 outline-none focus:ring-2 focus:ring-blue-500'
                type={hidePassword.confirmPassword ? "password" : "text"}
                {...register("confirmPassword", { required: "Confirm your password" })}
              />
              <span
                className='absolute right-3 cursor-pointer text-gray-500'
                onClick={() => setHidePassword((prev) => ({ ...prev, confirmPassword: !hidePassword.confirmPassword }))}
              >
                {hidePassword.confirmPassword ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </div>
            {errors?.confirmPassword && <RequiredError>{errors.confirmPassword.message}</RequiredError>}
          </div>

          {/* Role Switcher */}
          {/* <div className='flex flex-col gap-2 mt-2'>
            <label className="font-semibold text-gray-700 text-sm uppercase tracking-wider">I am an:</label>
            <div className='flex bg-gray-100 p-1 rounded-lg w-full'>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === "user" ? "bg-white text-[#1e3a8a] shadow-sm" : "text-gray-500"}`}
                onClick={() => { setValue("role", "user"); setRole("user") }}>
                User
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === "admin" ? "bg-white text-[#1e3a8a] shadow-sm" : "text-gray-500"}`}
                onClick={() => { setValue("role", "admin"); setRole("admin") }}>
                Admin
              </button>
            </div>
          </div> */}

          <div className='mt-4'>
            <Button disabled={loading} type={"submit"} className="w-full bg-[#1e3a8a] hover:bg-[#152a61] text-white py-3 rounded-lg font-bold shadow-md transition-all">
              Sign Up
            </Button>
          </div>

          <p className='text-center mt-2 text-gray-600'>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className='text-[#1e3a8a] font-bold cursor-pointer hover:underline'>
              Log In
            </span>
          </p>
        </form>
      </section>

      <footer className="mt-8 text-gray-400 text-sm text-center">
        © 2026 IPQuest - Empowering IPR Awareness Through Gamification
      </footer>
    </div>
  )
}

export default SignUp