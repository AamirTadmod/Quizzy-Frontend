import React, { useEffect, useState } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from '../services/APIs';
import { useSelector } from "react-redux"
import QuizCard from '../components/core/AdminQuizes/QuizCard';
import { deleteQuiz } from '../services/operations/QuizAPIs';
import { FaPlus, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminQuizes = () => {
    const [quizes, setQuizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleDeleteQuiz = async (id) => {
        if (!window.confirm("Are you sure you want to delete this quiz?")) return;
        try {
            setLoading(true);
            const response = await deleteQuiz(id, token)
            if (response) {
                setQuizes(quizes.filter(quiz => quiz._id !== id));
            }
        } catch (e) {
            console.log("ERROR DELETING QUIZ : ", e);
        } finally {
            setLoading(false);
        }
    }

    const fetchAdminQuizes = async () => {
        try {
            const response = await apiConnector("GET", quizEndpoints.GET_ADMIN_QUIZES, null, {
                Authorization: `Bearer ${token}`
            })
            setQuizes(response?.data?.data);
        } catch (error) {
            console.error('Error fetching admin quizes:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAdminQuizes();
    }, [])

    return (
        <div className="bg-[#f8fafc] min-h-screen py-10 px-4 md:px-10">
            <section className="max-w-7xl mx-auto">
                
                {/* Admin Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#1e3a8a] p-3 rounded-lg">
                            <FaTools className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className='text-3xl font-extrabold text-[#1e3a8a]'>Admin Management</h1>
                            <p className="text-gray-500">Create, edit, and manage your IPR quizzes</p>
                        </div>
                    </div>

                    {/* <button 
                        onClick={() => navigate('/create-quiz')}
                        className="flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#152a61] transition-all shadow-md w-full md:w-auto"
                    >
                        <FaPlus /> Create New Quiz
                    </button> */}
                </div>

                {/* Content Area */}
                <div className='flex flex-col gap-6'>
                    {
                        loading ? (
                            <div className='flex flex-col justify-center items-center min-h-[40vh] text-gray-500 gap-4'>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
                                <p className="font-medium">Fetching administrative data...</p>
                            </div>
                        ) :
                        !loading && quizes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {quizes.map((quiz, index) => (
                                    <QuizCard 
                                        handleDeleteQuiz={handleDeleteQuiz} 
                                        key={quiz._id} 
                                        quiz={quiz} 
                                        index={index} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='bg-white border border-dashed border-gray-300 rounded-2xl flex flex-col justify-center items-center min-h-[40vh] text-center p-10'>
                                <p className="text-xl text-gray-400 font-medium mb-4">No quizzes found in your database.</p>
                                <button 
                                    onClick={() => navigate('/create-quiz')}
                                    className="text-[#1e3a8a] font-bold hover:underline"
                                >
                                    Start by creating your first quiz &rarr;
                                </button>
                            </div>
                        )
                    }
                </div>
            </section>
            
            <footer className="mt-20 text-center text-gray-400 text-sm">
                © 2026 IPQuest Admin Panel - Intellectual Property Rights Awareness
            </footer>
        </div>
    )
}

export default AdminQuizes