import { useLocation } from 'react-router-dom'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { logout } from '../services/operations/AuthAPIs'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser, FaPlusSquare, FaListUl, FaHistory, FaSignOutAlt } from 'react-icons/fa'

const DashboardLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.auth)

    // Helper to style active links
    const activeStyle = "bg-[#1e3a8a] text-white shadow-md";
    const inactiveStyle = "text-gray-600 hover:bg-gray-100";

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <section className='max-w-7xl mx-auto px-4 py-6'>
                {/* Modern Sub-Header Navigation */}
                <div className='flex flex-wrap md:flex-nowrap py-3 px-4 justify-between items-center gap-4 mb-8 bg-white rounded-xl border border-gray-100 shadow-sm'>
                    
                    <nav className='flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar'>
                        <NavLink 
                            to={"/dashboard"} 
                            className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-sm md:text-base ${location.pathname === "/dashboard" ? activeStyle : inactiveStyle}`}
                        >
                            <FaUser className="text-xs" /> Profile
                        </NavLink>

                        {user?.role === "admin" ? (
                            <>
                                <Link 
                                    to={"/dashboard/create-quiz"} 
                                    className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-sm md:text-base ${location.pathname.includes("create") ? activeStyle : inactiveStyle}`}
                                >
                                    <FaPlusSquare className="text-xs" /> Create
                                </Link>
                                <Link 
                                    to={"/dashboard/quizes"} 
                                    className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-sm md:text-base ${location.pathname.includes("quizes") ? activeStyle : inactiveStyle}`}
                                >
                                    <FaListUl className="text-xs" /> Manage
                                </Link>
                            </>
                        ) : (
                            <Link 
                                to={"/dashboard/history"} 
                                className={`flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-sm md:text-base ${location.pathname.includes("history") ? activeStyle : inactiveStyle}`}
                            >
                                <FaHistory className="text-xs" /> History
                            </Link>
                        )}
                    </nav>

                    <div className='w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0'>
                        <Button
                            active={false}
                            onClick={() => logout(dispatch, navigate)}
                            className="py-2 px-4 rounded bg-red-600 text-white text-sm flex items-center gap-2"
                            >
                            <FaSignOutAlt /> Logout
                        </Button>

                    </div>
                </div>

                {/* Main Content Area */}
                <main className="animate-in fade-in duration-500">
                    {children}
                </main>
            </section>
        </div>
    )
}

export default DashboardLayout