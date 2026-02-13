import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../Button';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiConnector';
import { quizEndpoints } from "../../../services/APIs";
import { setUser } from "../../../slices/AuthSlice";
import { FaPlay, FaHourglassHalf, FaCheckDouble } from 'react-icons/fa';

const QuizQuestions = ({ quizDetails, quizQuestions }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const { token, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (quizDetails?.timer) {
            setRemainingTime(quizDetails.timer * 60);
        }
    }, [quizDetails]);

    useEffect(() => {
        let timer;
        if (quizStarted && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (quizStarted && remainingTime === 0) {
            clearInterval(timer);
            submitQuiz();
        }
        return () => clearInterval(timer);
    }, [quizStarted, remainingTime]);

    const handleAnswerChange = useCallback((questionId, selectedOption) => {
        setUserAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.questionId === questionId
            );
            const updatedAnswers = [...prevAnswers];
            if (existingAnswerIndex >= 0) {
                updatedAnswers[existingAnswerIndex].selectedOption = selectedOption;
            } else {
                updatedAnswers.push({ questionId, selectedOption });
            }
            return updatedAnswers;
        });
    }, []);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const submitQuiz = async () => {
        try {
            const response = await apiConnector(
                'POST',
                `${quizEndpoints.ATTEMMP_QUIZ}/${quizDetails._id}/attempt`,
                {
                    quizId: quizDetails._id,
                    answers: userAnswers,
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            dispatch(setUser({ ...user, attemptedQuizzes: [...(user.attemptedQuizzes || []), quizDetails._id] }));
            navigate('/quiz-results', { state: { score: response.data.score, total: quizQuestions?.length } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='w-full min-h-[60vh] flex flex-col items-center justify-center'>
            {!quizStarted ? (
                <div className="text-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaPlay className="text-[#1e3a8a] text-xl ml-1" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">Ready to Start?</h2>
                    <p className="text-gray-500 mb-8">Once you start, the timer will begin. Ensure you have a stable connection.</p>
                    <Button className='!w-full py-4' onClick={startQuiz}>
                        Begin Quiz
                    </Button>
                </div>
            ) : (
                <div className='w-full max-w-4xl mx-auto'>
                    {/* Sticky Timer Bar */}
                    <div className='sticky top-4 z-20 mb-8 flex justify-between items-center bg-white border border-gray-200 py-3 px-6 rounded-xl shadow-md'>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Quiz in Progress</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaHourglassHalf className={remainingTime < 60 ? "text-red-500 animate-bounce" : "text-[#1e3a8a]"} />
                            <span className={`text-xl font-black ${remainingTime < 60 ? "text-red-600" : "text-[#1e3a8a]"}`}>
                                {formatTime(remainingTime)}
                            </span>
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className='space-y-6 mb-10'>
                        {quizQuestions && quizQuestions.map((ques) => {
                            // Find if this question already has an answer in the state
                            const currentAnswer = userAnswers.find(a => a.questionId === ques._id);
                            return (
                                <QuestionCard
                                    key={ques._id}
                                    question={ques}
                                    selectedAnswer={currentAnswer?.selectedOption}
                                    onAnswerChange={handleAnswerChange}
                                />
                            );
                        })}
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-blue-50 rounded-2xl border border-blue-100 mb-20">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <p className="text-[#1e3a8a] font-bold">Finished with your answers?</p>
                            <p className="text-blue-400 text-sm">Double check before submitting.</p>
                        </div>
                        <Button className='w-full md:w-max px-10 flex items-center gap-2' onClick={submitQuiz}>
                            <FaCheckDouble /> Finish and Submit
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;