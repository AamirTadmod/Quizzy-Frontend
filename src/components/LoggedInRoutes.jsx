import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const LoggedInRoutes = ({ children }) => {
    const navigate = useNavigate();
    const { token, user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!token || !user) {
            navigate('/login')
            return
        }
    }, [token, user, navigate])

    return (
        <div className='min-h-screen bg-[#f8fafc]'>
            {/* The Navbar from your screenshot stays fixed or at the top */}
            <Navbar />
            
            {/* Main content wrapper to ensure consistent padding and max-width */}
            <main className='animate-in fade-in duration-500'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {children}
                </div>
            </main>

            {/* Optional: Branding Footer that appears on all logged-in pages */}
            <footer className="py-10 text-center text-gray-400 text-sm">
                © 2026 IPQuest - Empowering IPR Awareness Through Gamification
            </footer>
        </div>
    )
}

export default LoggedInRoutes