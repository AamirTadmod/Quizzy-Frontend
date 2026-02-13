import React, { useEffect, useState } from 'react'
import { quizEndpoints } from '../../../services/APIs'
import { apiConnector } from '../../../services/apiConnector'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import { FaUserCircle, FaAward } from 'react-icons/fa'

const Score = ({ quiz }) => {
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await apiConnector("GET", `${quizEndpoints.GET_SCORES}/${quiz._id}`, null, {
                    Authorization: `Bearer ${token}`
                })
                setScores(response?.data?.data)
            } catch (error) {
                console.log("error : ", error)
            } finally {
                setLoading(false)
            }
        }
        fetchScores()
    }, [quiz._id, token])

    return (
        <div className='w-full'>
            {loading ? (
                <div className='flex items-center justify-center py-6 gap-2 text-[#1e3a8a]'>
                    <div className='w-4 h-4 border-2 border-t-transparent border-[#1e3a8a] rounded-full animate-spin'></div>
                    <span className='text-sm font-medium'>Fetching results...</span>
                </div>
            ) : scores && scores.length > 0 ? (
                <div className='overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm'>
                    {/* Table Header */}
                    <div className='grid grid-cols-2 bg-gray-50 border-b border-gray-200 px-5 py-3'>
                        <p className='text-xs font-bold text-[#1e3a8a] uppercase tracking-wider flex items-center gap-2'>
                            <FaUserCircle /> Participant
                        </p>
                        <p className='text-xs font-bold text-[#1e3a8a] uppercase tracking-wider text-right flex items-center justify-end gap-2'>
                            <FaAward /> Result
                        </p>
                    </div>

                    {/* Results List */}
                    <div className='max-h-[300px] overflow-y-auto custom-scrollbar'>
                        {[...scores].reverse().map((score, index) => {
                            const isPassed = score?.score / score.answers.length >= 0.4;
                            return (
                                <div 
                                    className={`grid grid-cols-2 items-center px-5 py-4 transition-colors hover:bg-gray-50 ${
                                        index !== scores.length - 1 ? 'border-b border-gray-100' : ''
                                    }`} 
                                    key={index}
                                >
                                    <div className='flex flex-col'>
                                        <p className='text-sm font-bold text-gray-800'>
                                            {score?.userId?.username}
                                        </p>
                                        <p className='text-[10px] text-gray-400 font-medium'>
                                            {formatDistanceToNow(new Date(score.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>

                                    <div className='text-right'>
                                        <span className={`text-sm font-black ${isPassed ? "text-green-600" : "text-red-500"}`}>
                                            {score?.score}
                                        </span>
                                        <span className='text-xs text-gray-400 font-bold'> / {score.answers.length}</span>
                                        
                                        {/* Pass/Fail Indicator */}
                                        <div className={`text-[9px] font-bold uppercase mt-0.5 ${isPassed ? "text-green-500" : "text-red-400"}`}>
                                            {isPassed ? 'Passed' : 'Review Required'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className='py-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200'>
                    <p className='text-sm text-gray-400 font-medium'>No attempts recorded for this quiz yet.</p>
                </div>
            )}
        </div>
    )
}

export default Score