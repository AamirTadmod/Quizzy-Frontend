import React from 'react'

const Button = ({
    type = 'button',
    className = '',
    disabled = false,
    children,
    active = true,
    onClick = () => { }
}) => {
    // Defining brand colors based on the IPQuest UI
    const primaryBlue = "bg-[#1e3a8a] hover:bg-[#152a61] focus:ring-4 focus:ring-blue-200"
    const dangerRed = "bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200"

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full 
                ${active ? primaryBlue : dangerRed} 
                text-white 
                font-bold 
                py-3 
                px-6 
                rounded-xl 
                transition-all 
                duration-300 
                disabled:opacity-50 
                disabled:cursor-not-allowed 
                flex 
                items-center 
                justify-center 
                shadow-sm 
                active:scale-[0.98]
                ${className}
            `}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button