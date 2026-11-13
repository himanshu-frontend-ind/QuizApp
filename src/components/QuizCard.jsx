import React from 'react';

const QuizCard = ({
  questionData,
  questionNumber,
  totalQuestions,
  answered,
  selectedOption,
  onSelectOption,
  onNextQuestion,
}) => {
  return (
    <div className="bg-white w-full max-w-[600px] p-7 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-200">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-5">
          {questionNumber}. {questionData.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {questionData.options.map((option, index) => {
          let optionStyles =
            'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400';

          if (answered) {
            if (index === questionData.answer) {
              optionStyles =
                'bg-emerald-100 border-emerald-500 text-emerald-900 font-semibold';
            } else if (index === selectedOption) {
              optionStyles =
                'bg-red-100 border-red-500 text-red-900 font-semibold';
            } else {
              optionStyles = 'bg-slate-50 border-slate-200 text-slate-400';
            }
          }

          return (
            <button
              key={index}
              onClick={() => onSelectOption(index)}
              disabled={answered}
              className={`p-4 border-2 rounded-xl text-[15px] text-left font-medium transition-all duration-200 disabled:cursor-not-allowed ${optionStyles}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <button
          onClick={onNextQuestion}
          className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-base font-semibold cursor-pointer transition-colors duration-200"
        >
          {questionNumber === totalQuestions ? 'View Result' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default QuizCard;
