import React from 'react'
import Button from '../../Button';
import { FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';

const QuestionCard = ({ question, deleteQuestionHandler }) => {

  return (
    <div className='bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden transition-all hover:shadow-md'>
      <div className='p-6 space-y-4'>
        
        {/* Question Header */}
        <div className='flex justify-between items-start gap-5 border-b border-gray-50 pb-4'>
          <div className='flex items-start gap-3'>
            <div className='mt-1 text-[#1e3a8a]'>
              <FaQuestionCircle />
            </div>
            <h4 className='text-lg font-bold text-gray-800 leading-tight'>
              {question.questionText}
            </h4>
          </div>
        </div>

        {/* Options Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {question.options.map((option) => (
            <div 
              key={option._id} 
              className={`
                flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium border
                ${option.isCorrect 
                  ? "bg-green-50 border-green-100 text-green-700" 
                  : "bg-gray-50 border-gray-100 text-gray-500"}
              `}
            >
              <span className="flex-1">{option?.text}</span>
              {option.isCorrect ? (
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
              ) : (
                <FaTimesCircle className="text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end pt-2'>
          <Button
            onClick={() => deleteQuestionHandler(question)}
            className='!w-max !py-2 !px-4 flex items-center gap-2 text-xs uppercase tracking-widest'
            active={false}
          >
            <FaTrashAlt /> Delete Question
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard