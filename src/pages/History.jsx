import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from '../services/APIs'
import toast from 'react-hot-toast'
import AttemptCard from '../components/core/History/AttemptCard'
import { FaHistory } from 'react-icons/fa'

const History = () => {
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState([])
  const { token } = useSelector(state => state.auth)

  const fetchUserAttempts = async () => {
    setLoading(true)
    try {
      const response = await apiConnector("GET", quizEndpoints.GET_USER_ATTEMPS, null, {
        Authorization: `Bearer ${token}`
      })

      if (!response.data.success) {
        throw new Error(response.data.error)
      }

      setAttempts(response?.data?.data)
    } catch (e) {
      console.log("Failed to get User Attempts")
      toast.error("Failed to load your history")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserAttempts();
  }, [])

  return (
    <div className='min-h-screen bg-[#f8fafc] py-10 px-4 md:px-10'>
      <section className='max-w-7xl mx-auto'>
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#1e3a8a] p-3 rounded-lg shadow-md">
            <FaHistory className="text-white text-2xl" />
          </div>
          <div>
            <h1 className='text-3xl md:text-4xl text-[#1e3a8a] font-extrabold tracking-tight'>
              Your Quiz History
            </h1>
            <p className="text-gray-500">Track your progress and review previous IPR quiz attempts.</p>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className='min-h-[50vh] w-full flex flex-col items-center justify-center gap-4'>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1e3a8a]"></div>
            <p className="text-gray-500 font-medium">Retrieving your records...</p>
          </div>
        ) : (
          <div className='w-full'>
            {attempts.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {attempts.map((item, index) => (
                  <div key={item._id} className="transition-transform hover:scale-[1.01]">
                    <AttemptCard item={item} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col justify-center items-center py-20 text-center'>
                <p className='text-gray-400 text-lg font-medium'>You haven't attempted any quizzes yet.</p>
                <p className='text-gray-400 text-sm'>Your completed quizzes will appear here.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer Branding */}
      <footer className="mt-20 text-center text-gray-400 text-sm">
        © 2026 IPQuest - Empowering IPR Awareness Through Gamification
      </footer>
    </div>
  )
}

export default History