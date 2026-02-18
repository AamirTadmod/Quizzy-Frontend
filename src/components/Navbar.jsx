import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);

    const navLinkStyles = ({ isActive }) => 
        `transition-all duration-200 hover:text-blue-200 font-medium ${
            isActive ? "text-white border-b-2 border-white pb-1" : "text-gray-200"
        }`;

    return (
        <nav className='bg-[#1e3a8a] text-white shadow-md'>
            <div className='max-w-7xl mx-auto flex items-center justify-between py-4 px-6'>
                
                {/* Logo Section */}
                <Link to={"/"} className='text-3xl font-black tracking-tighter hover:opacity-90 transition-opacity'>
                    IPQuest
                </Link>

                {/* Navigation Links */}
                <div className='hidden md:flex items-center gap-8'>
                    <NavLink to={"/"} className={navLinkStyles}>
                        Home
                    </NavLink>
                    
                    
                    
                    <NavLink to={"/leaderboard"} className={navLinkStyles}>
                        Leaderboard
                    </NavLink>

                    {/* This matches the Reference Hub button in your screenshot
                    <NavLink to={"/https://spectacular-gelato-0498cd.netlify.app/"} className={navLinkStyles}>
                        Reference Hub
                    </NavLink> */}

                    {/* Dashboard/Profile Link */}
                    <NavLink to={"/dashboard"} className={navLinkStyles}>
                        {user?.role === "admin" ? "Admin Panel" : "My Dashboard"}
                    </NavLink>
                </div>

                {/* Mobile Menu Icon (Visual Only) */}
                <div className='md:hidden'>
                    <button className='text-white p-2'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar