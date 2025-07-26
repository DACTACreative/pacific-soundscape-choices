import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-16 h-16 mb-4">
        {/* Ocean wave loading animation */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#35c5f2] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#0066cc] animate-spin animation-delay-150"></div>
        <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-[#003f7f] animate-spin animation-delay-300"></div>
      </div>
      <p className="text-white/80 text-center font-inter">
        {message}
      </p>
    </div>
  );
}