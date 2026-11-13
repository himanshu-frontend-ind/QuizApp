import React from 'react';

const Timer = ({ seconds }) => {
  return (
    <div
      className={`w-20 h-20 border-4 flex items-center justify-center text-3xl font-bold rounded-full bg-white mb-5 transition-colors duration-300 ${
        seconds <= 5
          ? 'border-red-500 text-red-600 shadow-[0_4px_15px_rgba(239,68,68,0.25)]'
          : 'border-blue-500 text-slate-800 shadow-[0_4px_15px_rgba(59,130,246,0.2)]'
      }`}
    >
      {seconds}
    </div>
  );
};

export default Timer;
