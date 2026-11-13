import React from 'react';

const ProgressBar = ({ currentQuestionIndex, totalQuestions, progressPercent }) => {
  return (
    <div className="w-full max-w-[600px] mb-6">
      <div className="flex justify-between items-center text-sm font-semibold text-slate-600 mb-2">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span>{progressPercent}%</span>
      </div>
      <div className="w-full h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
