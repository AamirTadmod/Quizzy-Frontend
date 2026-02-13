import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { questionEndpoints } from '../services/APIs';
import Button from '../components/Button';
import CreateQuestionModal from '../components/core/createQuiz/CreateQuestionModal';
import QuestionCard from "../components/core/createQuiz/QuestionCard"
import { deleteQuestion } from '../services/operations/questionAPIs';
import { setQuiz, setEdit } from '../slices/QuizSlice';
import { FaPlus, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

const CreateQuestions = () => {
    const { quiz, edit } = useSelector(state => state.quiz);
    const { token } = useSelector(state => state.auth);

    const [questions, setQuestions] = useState([]);
    const [createQuestionModalData, setCreateQuestionModalData] = useState(null);
    const [laoding, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const finishHandler = () => {
        navigate("/dashboard/create-quiz")
        dispatch(setQuiz(null))
        dispatch(setEdit(false))
    }

    const deleteQuestionHandler = async (question) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        try {
            const response = await deleteQuestion(question._id, token)
            if (response) {
                setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== question._id))
            }
        } catch (e) {
            console.log("ERRO DELETING QUESTION : ", e);
        }
    }

    const fetchQuestions = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${id}`, null, {
                Authorization: `Bearer ${token}`
            })
            if (response) {
                setQuestions(response?.data?.data);
            }
        } catch (error) {
            console.log("ERROR FETCHING QUIZ QUESTIONS : ", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (quiz === null) {
            navigate("/dashboard/create-quiz")
        }
    }, [])

    useEffect(() => {
        if (edit) {
            fetchQuestions();
        }
    }, [quiz, edit, id]);

    return (
        <div className="bg-[#f8fafc] min-h-screen py-10 px-4">
            <div className='max-w-5xl mx-auto flex flex-col gap-8'>
                
                {/* Header Navigation/Title */}
                <div className="text-center mb-4">
                    <h3 className='text-3xl font-extrabold text-[#1e3a8a]'>Question Management</h3>
                    <div className="h-1 w-20 bg-[#1e3a8a] mx-auto mt-2 rounded-full"></div>
                </div>

                {/* Quiz Summary Card */}
                <section className='bg-white border border-gray-100 shadow-sm p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6'>
                    <div className='flex items-start gap-4'>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <FaBookOpen className="text-[#1e3a8a] text-xl" />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-xl font-bold text-gray-800'>
                                {quiz?.title}
                            </h2>
                            <p className="text-gray-500 text-sm">{quiz?.description}</p>
                        </div>
                    </div>
                    
                    <Button
                        onClick={() => setCreateQuestionModalData({ ...quiz })}
                        className='w-full md:w-max flex items-center justify-center gap-2 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#152a61] transition-all'
                    >
                        <FaPlus className="text-sm" /> Create Question
                    </Button>
                </section>

                {/* Questions List Area */}
                <div className='w-full flex flex-col gap-4 min-h-[40vh]'>
                    {laoding ? (
                        <div className="flex justify-center items-center py-20 text-gray-400">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a8a] mr-3"></div>
                             Loading Questions...
                        </div>
                    ) : questions.length === 0 ? (
                        <div className='bg-white border-2 border-dashed border-gray-200 rounded-xl flex flex-col justify-center items-center p-20 text-center'>
                            <p className='text-gray-400 text-lg font-medium'>No questions added to this quiz yet.</p>
                            <p className='text-gray-400 text-sm'>Click the button above to start building your quiz.</p>
                        </div>
                    ) : (
                        questions.map((ques) => (
                            <div key={ques?._id} className="transition-all hover:translate-x-1">
                                <QuestionCard
                                    deleteQuestionHandler={deleteQuestionHandler}
                                    question={ques}
                                    quiz={quiz}
                                    setCreateQuestionModalData={setCreateQuestionModalData}
                                    setQuestions={setQuestions}
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* Bottom Action Area */}
                <div className='flex justify-end pt-6 border-t border-gray-200' onClick={finishHandler}>
                    <Button 
                        className="bg-[#1e3a8a] text-white px-10 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-green-600 transition-colors"
                    >
                        <FaCheckCircle /> Finish & Save Quiz
                    </Button>
                </div>
            </div>

            {/* Modal Overlay */}
            {createQuestionModalData && (
                <CreateQuestionModal
                    quiz={createQuestionModalData}
                    setCreateQuestionModalData={setCreateQuestionModalData}
                    setQuestions={setQuestions}
                />
            )}
        </div>
    )
}

export default CreateQuestions