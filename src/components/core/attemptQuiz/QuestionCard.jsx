import React from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

const QuestionCard = React.memo(({ question, onAnswerChange, selectedAnswer }) => {
    
    const handleOptionChange = (optionId) => {
        onAnswerChange(question._id, optionId);
    };

    return (
        <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 mb-6 transition-all hover:shadow-md'>
            {/* Question Header */}
            <div className='flex items-start gap-3 mb-6'>
                <div className='mt-1'>
                    <FaRegQuestionCircle className='text-[#1e3a8a] text-lg' />
                </div>
                <h3 className='text-xl font-bold text-gray-800 leading-tight'>
                    {question.questionText}
                </h3>
            </div>

            {/* Options Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {question.options.map((option) => {
                    const isSelected = selectedAnswer === option._id;
                    
                    return (
                        <div
                            key={option._id}
                            onClick={() => handleOptionChange(option._id)}
                            className={`
                                cursor-pointer flex items-center p-4 rounded-xl border-2 transition-all duration-200
                                ${isSelected 
                                    ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]' 
                                    : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-white'
                                }
                            `}
                        >
                            {/* Custom Radio Circle */}
                            <div className={`
                                w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                                ${isSelected ? 'border-[#1e3a8a]' : 'border-gray-300'}
                            `}>
                                {isSelected && <div className='w-2.5 h-2.5 bg-[#1e3a8a] rounded-full' />}
                            </div>

                            <span className={`text-base font-medium ${isSelected ? 'font-bold' : ''}`}>
                                {option.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default QuestionCard;