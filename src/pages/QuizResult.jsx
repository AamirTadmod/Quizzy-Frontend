import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FaTrophy, FaArrowLeft } from "react-icons/fa";

const QuizResults = () => {
    const location = useLocation();
    const { score, total } = location.state || { score: 0, total: 0 };
    const navigate = useNavigate();

    // Calculate percentage for styling
    const percentage = total > 0 ? (score / total) * 100 : 0;
    const isPassed = percentage >= 40;

    return (
        <div className='min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4'>
            
            <div className='bg-white shadow-sm border border-gray-100 rounded-2xl p-8 md:p-12 max-w-md w-full text-center'>
                
                {/* Icon Header */}
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isPassed ? 'bg-green-50' : 'bg-red-50'}`}>
                    <FaTrophy className={`text-4xl ${isPassed ? 'text-green-500' : 'text-red-400'}`} />
                </div>

                <h1 className='text-3xl font-extrabold text-[#1e3a8a] mb-2'>Quiz Completed!</h1>
                <p className='text-gray-500 mb-8'>Here is how you performed in the IPR challenge.</p>

                {/* Score Display */}
                <div className='bg-slate-50 rounded-xl py-6 px-4 mb-8 border border-slate-100'>
                    <p className='text-sm font-bold text-gray-400 uppercase tracking-widest mb-1'>Your Final Score</p>
                    <div className='text-5xl font-black'>
                        <span className={isPassed ? "text-green-600" : "text-red-600"}>
                            {score}
                        </span>
                        <span className='text-gray-300 mx-2'>/</span>
                        <span className='text-[#1e3a8a]'>{total}</span>
                    </div>
                    <p className={`text-sm font-semibold mt-3 ${isPassed ? 'text-green-600' : 'text-red-500'}`}>
                        {isPassed ? "Great job! You've passed." : "Keep studying and try again!"}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col gap-3'>
                    <Button 
                        onClick={() => navigate("/")} 
                        className='w-full bg-[#1e3a8a] text-white py-4 rounded-lg font-bold hover:bg-[#152a61] transition-all flex items-center justify-center gap-2 shadow-md'
                    >
                        <FaArrowLeft className="text-sm" /> Back to Dashboard
                    </Button>
                    
                    <button 
                        onClick={() => window.location.reload()} 
                        className='text-gray-500 hover:text-[#1e3a8a] text-sm font-semibold transition-colors py-2'
                    >
                        Try Another Quiz
                    </button>
                </div>
            </div>

            {/* Branding Footer */}
            <footer className="mt-8 text-gray-400 text-xs">
                © 2026 IPQuest - Empowering IPR Awareness Through Gamification
            </footer>
        </div>
    );
};

export default QuizResults;