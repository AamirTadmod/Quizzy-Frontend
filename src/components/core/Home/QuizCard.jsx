import { useEffect, useState } from 'react';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { FaUserCircle, FaClock } from 'react-icons/fa';

const QuizCard = ({ quiz }) => {
    const [attempted, setAttempted] = useState(false)
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        setAttempted(user?.attemptedQuizzes?.includes(quiz._id) ? true : false)
    }, [user, quiz._id])

    return (
        <div className='bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col'>
            
            {/* Completion Ribbon */}
            {attempted && (
                <div className="absolute top-0 right-0">
                    <div className="bg-green-600 text-white text-[10px] font-bold uppercase py-1 px-8 transform rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm">
                        Completed
                    </div>
                </div>
            )}

            <div className='p-6 flex-grow'>
                {/* Title */}
                <h2 className='text-2xl font-bold text-[#1e3a8a] mb-2 line-clamp-1'>
                    {quiz.title}
                </h2>

                {/* Description */}
                <p className='text-gray-500 mb-4 line-clamp-2 min-h-[48px]'>
                    {quiz.description || "Learn more about Intellectual Property Rights through this interactive quiz."}
                </p>

                {/* Category & Metadata */}
                <div className='space-y-2 mb-6'>
                    <p className='text-sm text-gray-700 font-bold'>
                        Category: <span className='font-normal text-gray-500'>{quiz.category || "General"}</span>
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-400'>
                        <span className='flex items-center gap-1'>
                            <FaUserCircle className='text-[#1e3a8a]' /> {quiz.createdBy.username}
                        </span>
                        <span className='flex items-center gap-1'>
                            <FaClock /> {formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Button - Matches "Visit Resource" in screenshot */}
            <div className='px-6 pb-6'>
                <Link 
                    to={`/quiz/${quiz._id}`} 
                    className='block w-full text-center bg-[#1e3a8a] hover:bg-[#152a61] text-white font-bold py-3 rounded-lg transition-colors'
                >
                    {attempted ? "Re-attempt Quiz" : "Start Quiz"}
                </Link>
            </div>
        </div>
    )
}

export default QuizCard