import React from "react";
import { Link } from "react-router-dom";

const SimpleNavCard = ({ title, description, buttonText, link }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      <div className="p-6 flex-grow">
        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1e3a8a] mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Button */}
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
