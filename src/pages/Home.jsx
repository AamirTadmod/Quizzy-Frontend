import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from "../services/APIs/index"
import { Link } from "react-router-dom";
import QuizCard from '../components/core/Home/QuizCard'
import SimpleNavCard from "../components/core/Home/SimpleNavCard";


const Home = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useSelector(state => state.auth)

  const fetchQuizzes = async () => {
    setLoading(true)
    try {
      const response = await apiConnector("GET", quizEndpoints.GET_ALL_QUIZES, null, {
        Authorization: `Bearer ${token}`
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      setQuizzes(response.data.data);

    } catch (e) {
      console.log("COULDNT GET QUIZZES")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, [])

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Header Section */}
      <header className="py-16 text-center px-4">
        <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-4">
          IPQuest
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          
        </p>
        <div className="mt-6">
  {/* <Link to="/leaderboard">
    <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded-md hover:bg-blue-800">
      🏆 View Leaderboard
    </button>
  </Link> */}
</div>

      </header>

      {/* Main Content Area */}
      <section className='max-w-7xl mx-auto px-6 pb-20'>

  {/* Navigation Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <SimpleNavCard
      title="Reference Hub"
      description="Explore official IPR resources, government portals, and trusted legal references."
      buttonText="Visit Reference Hub"
      link="/reference-hub"
    />

    <SimpleNavCard
      title="Fact Explorer"
      description="Discover interesting Intellectual Property facts and strengthen your legal awareness."
      buttonText="Visit Fact Explorer"
      link="/fact-explorer"
    />
  </div>

  {
    loading ? (

            <div className='text-center min-h-[40vh] flex items-center justify-center text-xl text-gray-600'>
              Loading quizzes...
            </div>
          ) : !loading && quizzes?.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {
                quizzes.map((quiz, index) => (
                  <QuizCard key={quiz._id} quiz={quiz} index={index} />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-medium">No quizzes found at the moment.</p>
            </div>
          )
        }
      </section>
    </div>
  )
}

export default Home