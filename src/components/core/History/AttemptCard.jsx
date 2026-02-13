import { useNavigate } from 'react-router-dom';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import Button from '../../Button';
import { FaHistory, FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const AttemptCard = ({ item }) => {
    const navigate = useNavigate();
    const isPassed = item?.score / item?.answers?.length >= 0.4;

    return (
        <div className='bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex flex-col gap-4 transition-all hover:shadow-md'>
            
            {/* Header Section */}
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-start gap-3'>
                    <h3 className='text-lg md:text-xl font-bold text-[#1e3a8a] line-clamp-1'>
                        {item?.quizId?.title}
                    </h3>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isPassed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {isPassed ? 'Passed' : 'Failed'}
                    </div>
                </div>
                <p className='text-sm text-gray-500 line-clamp-2 leading-relaxed'>
                    {item?.quizId?.description}
                </p>
            </div>

            {/* Score Visualization */}
            <div className='bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-100'>
                <div className='flex items-center gap-3'>
                    <div className={`p-2 rounded-full ${isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        <FaTrophy size={16} />
                    </div>
                    <div>
                        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Your Score</p>
                        <p className='text-xl md:text-2xl font-black text-gray-800'>
                            <span className={isPassed ? "text-green-600" : "text-red-600"}>
                                {item?.score}
                            </span>
                            <span className='text-gray-300 mx-1'>/</span>
                            <span>{item?.answers?.length}</span>
                        </p>
                    </div>
                </div>
                
                <div className='text-right'>
                    <div className='flex items-center justify-end gap-1 text-gray-400 text-[11px] font-medium'>
                        <FaCalendarAlt size={10} />
                        <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <Button 
                onClick={() => navigate(`../../quiz/${item?.quizId?._id}`)}
                className="flex items-center gap-2 py-3 font-bold text-sm shadow-none"
            >
                <FaHistory className="text-xs" /> Attempt Again
            </Button>
        </div>
    )
}

export default AttemptCard