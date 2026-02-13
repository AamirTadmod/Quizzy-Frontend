import { useEffect, useState } from 'react'
import React from 'react'
import { apiConnector } from "../services/apiConnector"
import { useParams } from 'react-router-dom'
import { questionEndpoints, quizEndpoints } from '../services/APIs'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import QuizQuestions from '../components/core/attemptQuiz/QuizQuestions'
import { FaClock, FaUserEdit, FaInfoCircle } from 'react-icons/fa'

const AttemptQuiz = () => {
    const [quizDetails, setQuizDetails] = useState(null);
    const [quizQuestions, setQuisQuestions] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [questionsLoading, setQuestionsLoading] = useState(true);

    const { token } = useSelector(state => state.auth)
    const { id: quizId } = useParams();

    const fetchQuizQuestions = async () => {
        setQuestionsLoading(true);
        try {
            const response = await apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${quizId}`, null, {
                Authorization: `Bearer ${token}`
            })
            setQuisQuestions(response?.data?.data);
        } catch (error) {
            console.log('Error fetching quiz questions:', error);
        } finally {
            setQuestionsLoading(false);
        }
    };

    const fetchQuizDetails = async () => {
        try {
            setDetailsLoading(true);
            const response = await apiConnector("GET", `${quizEndpoints.GET_QUIZ_DETAILS}/${quizId}`, null, {
                Authorization: `Bearer ${token}`
            })
            setQuizDetails(response?.data?.data);
        } catch (error) {
            console.log('Error fetching quiz details:', error);
        } finally {
            setDetailsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizDetails();
        fetchQuizQuestions();
    }, [quizId]);

    return (
        <div className="bg-[#f8fafc] min-h-screen py-8 px-4">
            <section className='max-w-5xl mx-auto'>
                {/* Quiz Header Information Card */}
                <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 md:p-8 mb-8'>
                    {
                        questionsLoading || detailsLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-pulse text-[#1e3a8a] font-bold text-xl">Loading Quiz Environment...</div>
                            </div>
                        ) : (
                            <>
                                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 text-[#1e3a8a] mb-1">
                                            <FaInfoCircle />
                                            <span className="text-xs font-bold uppercase tracking-widest">Active Quiz Session</span>
                                        </div>
                                        <h3 className='text-2xl md:text-3xl font-black text-[#1e3a8a] leading-tight'>
                                            {quizDetails?.title}
                                        </h3>
                                    </div>
                                    
                                    <div className='flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100'>
                                        <FaClock className="text-[#1e3a8a]" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400 leading-none">Time Limit</span>
                                            <span className='text-[#1e3a8a] font-bold text-lg leading-none'>
                                                {quizDetails?.timer} Minutes
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-6 border-t border-gray-50'>
                                    <p className='text-gray-500 max-w-2xl text-base italic leading-relaxed'>
                                        "{quizDetails?.description}"
                                    </p>
                                    
                                    <div className='flex flex-col items-end gap-1 text-sm text-gray-400'>
                                        <span className="flex items-center gap-2">
                                            <FaUserEdit className="text-xs" />
                                            Author: <span className="font-semibold text-gray-600">{quizDetails?.createdBy?.username}</span>
                                        </span>
                                        <span>
                                            Published {quizDetails?.createdAt && formatDistanceToNow(new Date(quizDetails.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>

                {/* Questions Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <QuizQuestions quizDetails={quizDetails} quizQuestions={quizQuestions} />
                </div>
            </section>
            
            <footer className="mt-12 text-center text-gray-400 text-xs">
                © 2026 IPQuest - Please ensure a stable connection before submitting your responses.
            </footer>
        </div>
    )
}

export default AttemptQuiz