import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import Button from "../components/Button"
import { FaHome, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../services/operations/AuthAPIs";


const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      });
    };

  const handleSave = async () => {
  const success = await updateProfile(formData, dispatch);
  if (success) {
      setEditMode(false);
    }
  };



  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4">
      <section className='max-w-4xl mx-auto'>
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#1e3a8a] p-3 rounded-lg">
                <FaUserCircle className="text-white text-3xl" />
            </div>
            <div>
                <h1 className='text-3xl font-extrabold text-[#1e3a8a]'>User Profile</h1>
                <p className="text-gray-500">Manage your account details and preferences</p>
            </div>
        </div>

        {/* Profile Card */}
        <div className='bg-white border border-gray-100 shadow-sm rounded-xl p-6 md:p-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-lg'>
            
            <div className="flex flex-col gap-1">
  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Username</span>

  {!editMode ? (
    <h2 className="text-[#1e3a8a] font-semibold">{user.username}</h2>
  ) : (
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  )}
</div>

<div className="flex flex-col gap-1">
  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</span>

  {!editMode ? (
    <p className="text-gray-700">{user.email}</p>
  ) : (
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  )}
</div>


            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Member Since</span>
                <p className="text-gray-700">
                    {user.createdAt ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true }) : "N/A"}
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Account Role</span>
                <div className="flex">
                    <span className="bg-blue-50 text-[#1e3a8a] px-3 py-1 rounded-full text-sm font-bold border border-blue-100 uppercase">
                        {user.role}
                    </span>
                </div>
            </div>

          </div>

          <hr className="my-10 border-gray-100" />

          <div className="flex justify-end gap-3 mb-6">
  {!editMode ? (
    <Button
      onClick={() => setEditMode(true)}
      className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg"
    >
      Edit Profile
    </Button>
  ) : (
    <>
      <Button
        onClick={handleSave}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Save
      </Button>

      <Button
        onClick={() => setEditMode(false)}
        className="bg-gray-400 text-white px-6 py-2 rounded-lg"
      >
        Cancel
      </Button>
    </>
  )}
</div>


          {/* Action Area */}
          <div className='flex flex-col items-center justify-center gap-4 py-6'>
              <p className="text-gray-500 text-sm">Need to take a quiz or browse resources?</p>
              <Button 
                onClick={() => navigate('/')} 
                className='flex gap-3 items-center py-3 px-8 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#152a61] transition-all font-bold shadow-md'
              >
                <FaHome /> Return to Home
              </Button>
          </div>
        </div>

        {/* Footer info matching IPQuest style */}
        <p className="text-center mt-8 text-gray-400 text-sm">
            Logged in as <span className="font-semibold text-gray-500">{user.username}</span>
        </p>
      </section>
    </div>
  )
}

export default Profile