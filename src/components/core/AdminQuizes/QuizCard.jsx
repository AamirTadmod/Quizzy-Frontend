import React, { useState } from 'react'
import Score from './Score';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegClock, FaTrashAlt, FaEdit, FaChartBar } from 'react-icons/fa';
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { setEdit, setQuiz } from '../../../slices/QuizSlice';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quiz, handleDeleteQuiz }) => {
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditQuiz = () => {
        dispatch(setQuiz(quiz))
        dispatch(setEdit(true))
        navigate(`/dashboard/edit-quiz/${quiz._id}`)
    }

    return (
        <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 transition-all hover:shadow-md'>
            {/* Header Section */}
            <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                    <h3 className='text-2xl font-bold text-[#1e3a8a] mb-1'>
                        {quiz.title}
                    </h3>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span className='flex items-center gap-1'>
                            <FaRegClock className='text-xs' /> {quiz.timer} Minutes
                        </span>
                        <span className='bg-blue-50 text-[#1e3a8a] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider'>
                            Admin Entry
                        </span>
                    </div>
                </div>
                <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className='text-gray-400 hover:text-[#1e3a8a] transition-colors p-2'
                >
                    <IoIosArrowDown className={`text-xl transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Description Section */}
            <p className='text-gray-600 mb-6 line-clamp-2 italic'>
                {quiz.description || "No description provided for this quiz."}
            </p>

            {/* Action Bar */}
            <div className='flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-50'>
                <Button 
                    onClick={handleEditQuiz} 
                    active 
                    className='flex-1 flex gap-2 items-center py-2 text-sm'
                >
                    <FaEdit /> Edit Quiz
                </Button>
                
                <Button 
                    onClick={() => setShowDetails(!showDetails)} 
                    className='flex-1 flex gap-2 items-center py-2 text-sm bg-gray-100 !text-gray-700 hover:bg-gray-200 shadow-none'
                >
                    <FaChartBar /> {showDetails ? "Hide Scores" : "View Scores"}
                </Button>

                <Button 
                    onClick={() => handleDeleteQuiz(quiz._id)} 
                    active={false}
                    className='md:w-max flex gap-2 items-center py-2 text-sm'
                >
                    <FaTrashAlt />
                </Button>
            </div>

            {/* Score Dropdown Area */}
            {showDetails && (
                <div className='mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100 animate-in fade-in slide-in-from-top-2'>
                    <Score quiz={quiz} />
                </div>
            )}
        </div>
    )
}

export default QuizCard