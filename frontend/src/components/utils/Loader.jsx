// src/components/utils/Loader.jsx
import React from "react";

const Loader = ({ size = 4, className = "" }) => {
  return (
    <div className="flex justify-center items-center my-8">
      <div
        className={`w-${size} h-${size} bg-primary rounded-full animate-pulse ${className}`}
      ></div>
    </div>
  );
};

export default Loader;
