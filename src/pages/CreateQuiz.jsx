import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button';
import RequiredError from '../components/RequiredError';
import toast from 'react-hot-toast';
import { createQuiz, updateQuiz } from '../services/operations/QuizAPIs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setEdit, setQuiz } from '../slices/QuizSlice';
import { IoMdArrowForward } from "react-icons/io";
import { FaEdit, FaPlusCircle } from 'react-icons/fa';

const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { edit, quiz } = useSelector((state) => state.quiz);
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id: quizId } = useParams()

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      if (edit) {
        const response = await updateQuiz(data, token, quizId);
        if (response) {
          setValue("title", "")
          setValue("description", "")
          setValue("timer", "")
        }
        navigate("/dashboard/create-quiz/" + response._id)
        return
      }

      const response = await createQuiz(data, token);
      if (response) {
        setValue("title", "")
        setValue("description", "")
        setValue("timer", "")

        dispatch(setQuiz(response))
        navigate("/dashboard/create-quiz/" + response._id)
        toast.success("Quiz Created Successfully");
      } else {
        throw new Error("Quiz cannot be created at this moment")
      }
    } catch (e) {
      console.log(e);
      toast.error("Quiz cannot be created at this moment")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (edit && quiz) {
      setValue("title", quiz.title)
      setValue("description", quiz.description)
      setValue("timer", quiz.timer)
    }

    if (location.pathname === "/dashboard/create-quiz" && edit) {
      dispatch(setEdit(false))
      dispatch(setQuiz(null))
      reset();
    }
  }, [edit, quiz, setValue, location.pathname, dispatch, reset])

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-4'>
      
      {/* Header Section */}
      <div className='text-center mb-10'>
        <div className='flex items-center justify-center gap-3 mb-2'>
           {edit ? <FaEdit className="text-[#1e3a8a] text-2xl"/> : <FaPlusCircle className="text-[#1e3a8a] text-2xl"/>}
           <h3 className='text-3xl font-extrabold text-[#1e3a8a]'>
             {edit ? "Edit Quiz Details" : "Create New Quiz"}
           </h3>
        </div>
        <p className='text-gray-500'>Fill in the information below to set up your IPR quiz</p>
      </div>

      {/* Form Card */}
      <form 
        onSubmit={handleSubmit(submitHandler)} 
        className='w-full max-w-[550px] bg-white border border-gray-100 shadow-sm p-8 md:p-10 rounded-2xl flex flex-col gap-6 transition-all'
      >
        
        {/* Title Input */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="title" className='font-bold text-gray-700 text-sm uppercase tracking-wide'>Quiz Title</label>
          <input
            type="text"
            placeholder='e.g. Patent Law Fundamentals'
            id='title'
            className='py-3 text-base border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all'
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <RequiredError>{errors.title.message}</RequiredError>}
        </div>

        {/* Description Input */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="description" className='font-bold text-gray-700 text-sm uppercase tracking-wide'>Description</label>
          <textarea
            placeholder='Briefly explain what this quiz covers...'
            rows={4}
            id='description'
            className='py-3 text-base resize-none border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all'
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && <RequiredError>{errors.description.message}</RequiredError>}
        </div>

        {/* Timer Input */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="timer" className='font-bold text-gray-700 text-sm uppercase tracking-wide'>Time Limit (Minutes)</label>
          <input
            type="number"
            placeholder='15'
            id='timer'
            min={5}
            max={60}
            className='py-3 text-base border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all'
            {...register("timer", { required: "Time is required" })}
          />
          <p className='text-[11px] text-gray-400 italic'>Note: Minimum 5 minutes, Maximum 60 minutes.</p>
          {errors.timer && <RequiredError>{errors.timer.message}</RequiredError>}
        </div>

        {/* Submit Button */}
        <div className='mt-4 flex flex-col gap-4'>
          <Button 
            disabled={loading} 
            type='submit'
            className="w-full bg-[#1e3a8a] hover:bg-[#152a61] text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center"
          >
            {loading ? "Processing..." : (edit ? "Save Changes" : "Create & Continue")}
          </Button>

          {edit && (
            <button
              type='button'
              className='flex items-center gap-2 justify-center text-gray-500 hover:text-[#1e3a8a] font-semibold transition-all group'
              onClick={() => navigate("/dashboard/create-quiz/" + quiz._id)}
            >
              Skip to Questions <IoMdArrowForward className='group-hover:translate-x-1 transition-transform' />
            </button>
          )}
        </div>
      </form>

      {/* Footer Branding */}
      <footer className="mt-12 text-gray-400 text-sm">
        © 2026 IPQuest Admin Panel - Intellectual Property Rights Awareness
      </footer>
    </div>
  )
}

export default CreateQuiz;