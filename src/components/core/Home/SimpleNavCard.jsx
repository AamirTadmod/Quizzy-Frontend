import React from "react";
import { Link } from "react-router-dom";

const SimpleNavCard = ({ title, buttonText, link }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      
      <div className="p-6 flex-grow flex items-center justify-center">
        <h2 className="text-2xl font-bold text-[#1e3a8a] text-center">
          {title}
        </h2>
      </div>

      <div className="px-6 pb-6">
        <Link
          to={link}
          className="block w-full text-center bg-[#1e3a8a] hover:bg-[#152a61] text-white font-bold py-3 rounded-lg transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default SimpleNavCard;
