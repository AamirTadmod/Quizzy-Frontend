import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

const RequiredError = ({ children }) => {
  return (
    <div className='flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-200'>
      <FaExclamationCircle className="text-red-500 text-xs" />
      <span className='text-xs font-semibold text-red-500 italic'>
        {children}
      </span>
    </div>
  )
}

export default RequiredError