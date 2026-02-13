import React from 'react'

const HighLightText = ({ children }) => {
  return (
    <span className='mx-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] bg-clip-text text-transparent font-extrabold'>
      {children}
    </span>
  )
}

export default HighLightText