import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { IoAdd, IoClose } from "react-icons/io5";
import { FaQuestionCircle, FaCheckCircle, FaTrash } from "react-icons/fa";
import { createQuestion } from '../../../services/operations/questionAPIs';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CreateQuestionModal = ({ quiz, setQuestions, setCreateQuestionModalData }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState('');
  const [isCurrentOptionCorrect, setIsCurrentOptionCorrect] = useState(false);
  const [optionError, setOptionError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useSelector(state => state.auth);

  const submitHandler = async (data) => {
    if (!options.some(option => option.isCorrect)) {
      setOptionError("There must be at least one correct option.");
      return;
    }
    if (options.length < 2) {
      setOptionError("Please add at least two options.");
      return;
    }
    
    setLoading(true);
    data.options = options;
    data.quizId = quiz._id;

    try {
      const response = await createQuestion(data, token);
      if (response) {
        setQuestions(prevQuestions => [...prevQuestions, response]);
        setCreateQuestionModalData(null);
        toast.success("Question added!");
      }
    } catch (e) {
      console.log("ERROR WHILE CREATING THE QUESTION:", e);
      toast.error("Question cannot be created");
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    if (!currentOption.trim()) return;
    if (isCurrentOptionCorrect && options.some(option => option.isCorrect)) {
      toast.error("There can be only one correct option.");
      return;
    }
    setOptions([...options, { text: currentOption, isCorrect: isCurrentOptionCorrect }]);
    setOptionError("");
    setCurrentOption('');
    setIsCurrentOptionCorrect(false);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className='fixed inset-0 z-[100] grid place-items-center overflow-auto bg-slate-900 bg-opacity-40 backdrop-blur-sm'>
      <div className='w-11/12 max-w-[550px] bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200'>
        
        {/* Modal Header */}
        <div className='flex items-center justify-between mb-8 border-b pb-4'>
          <div className='flex items-center gap-3'>
            <div className='bg-blue-50 p-2 rounded-lg'>
              <FaQuestionCircle className='text-[#1e3a8a] text-xl' />
            </div>
            <h3 className='text-2xl font-black text-[#1e3a8a]'>Create Question</h3>
          </div>
          <button onClick={() => setCreateQuestionModalData(null)} className='text-gray-400 hover:text-red-500 transition-colors'>
            <IoClose size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-6'>
          
          {/* Question Text Input */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="questionText" className='text-sm font-bold text-gray-700 uppercase tracking-wider'>Question Description</label>
            <input
              type="text"
              placeholder='e.g. What does a patent protect?'
              className='py-3 px-4 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all'
              {...register("questionText", { required: "Question is required" })}
            />
            {errors.questionText && <p className='text-red-500 text-xs font-semibold'>{errors.questionText.message}</p>}
          </div>

          {/* Add Option Section */}
          <div className='bg-gray-50 p-5 rounded-xl border border-gray-100'>
            <label className='text-sm font-bold text-gray-700 uppercase tracking-wider block mb-3'>Add Answer Options</label>
            <div className='flex flex-col gap-3'>
              <input
                type="text"
                placeholder='Option text'
                className='py-2 px-4 text-base border border-gray-200 rounded-lg outline-none bg-white focus:border-[#1e3a8a]'
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
              />
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 cursor-pointer group' onClick={() => setIsCurrentOptionCorrect(!isCurrentOptionCorrect)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isCurrentOptionCorrect ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                    {isCurrentOptionCorrect && <FaCheckCircle className='text-white text-xs' />}
                  </div>
                  <span className='text-sm font-medium text-gray-600'>Mark as Correct</span>
                </div>
                <button 
                  onClick={addOption} 
                  type='button' 
                  className='bg-[#1e3a8a] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-[#152a61] transition-all shadow-sm'
                >
                  <IoAdd size={18}/> Add Option
                </button>
              </div>
            </div>
          </div>

          {/* Options Display List */}
          <div className='flex flex-col gap-2 max-h-[150px] overflow-y-auto'>
            {options.map((option, index) => (
              <div key={index} className='flex justify-between items-center bg-white border border-gray-100 p-3 rounded-lg shadow-sm group'>
                <div className='flex items-center gap-3'>
                  {option.isCorrect ? <FaCheckCircle className='text-green-500' /> : <div className='w-4 h-4 rounded-full border border-gray-200' />}
                  <p className={`text-sm ${option.isCorrect ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{option.text}</p>
                </div>
                <button type='button' onClick={() => removeOption(index)} className='text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100'>
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>

          {optionError && <p className='text-red-500 text-xs font-bold bg-red-50 p-2 rounded border border-red-100'>{optionError}</p>}

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 mt-4 border-t pt-6'>
            <Button onClick={() => setCreateQuestionModalData(null)} className='!w-max !py-2 !px-6 shadow-none !bg-gray-100 !text-gray-600 hover:!bg-gray-200' active={false}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className='!w-max !py-2 !px-8' active>
              {loading ? "Saving..." : "Create Question"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateQuestionModal;