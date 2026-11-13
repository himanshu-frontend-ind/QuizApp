import React from 'react';

const AnalyticsDashboard = ({
  wrongAnswers,
  correctCount,
  incorrectCount,
  totalQuestions,
  timeTakenList,
  onRestartQuiz,
}) => {
  const maxTotalTime = totalQuestions * 20;
  const totalTimeTaken = timeTakenList.reduce((acc, cur) => acc + cur, 0);
  const avgTime =
    timeTakenList.length > 0
      ? Math.round(totalTimeTaken / timeTakenList.length)
      : 0;

  const correctPct = Math.round((correctCount / totalQuestions) * 100);
  const wrongPct = Math.round((incorrectCount / totalQuestions) * 100);
  const timePct = Math.round((totalTimeTaken / maxTotalTime) * 100);

  const renderTotalTime = () => {
    if (totalTimeTaken >= 60) {
      const min = Math.floor(totalTimeTaken / 60);
      const sec = totalTimeTaken % 60;
      return (
        <>
          <div>{min} Min</div>
          {sec > 0 && <div>{sec} Sec</div>}
        </>
      );
    }
    return <div>{totalTimeTaken}s</div>;
  };

  const getBadgeDetails = () => {
    if (correctPct >= 80) {
      return { label: 'Excellent', color: 'rgb(88, 204, 88)' };
    } else if (correctPct >= 60) {
      return { label: 'Good', color: 'rgb(223, 216, 39)' };
    } else if (correctPct >= 33) {
      return { label: 'Average', color: 'rgb(242, 139, 49)' };
    } else {
      return { label: 'Fail', color: 'rgb(255, 0, 0)' };
    }
  };

  const badge = getBadgeDetails();

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1100px] gap-8 items-start">
      {/* Left Side: Wrong Answers Review */}
      <div className="bg-white w-full lg:w-[55%] p-7 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-200">
        <h1 className="text-[22px] text-red-500 mb-5 font-bold">
          Review / Wrong Answers
        </h1>

        <div className="max-h-[450px] overflow-y-auto pr-2 space-y-6">
          {wrongAnswers.length === 0 ? (
            <p className="text-emerald-500 font-semibold">
              Great job! No wrong answers! 🎉
            </p>
          ) : (
            wrongAnswers.map((item, idx) => (
              <div
                key={idx}
                className="pb-4 border-b border-slate-100 last:border-b-0"
              >
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                  {idx + 1}. {item.question}
                </h2>
                <div className="flex flex-col gap-3">
                  {item.options.map((opt, oIdx) => {
                    let btnStyle =
                      'bg-slate-50 border-slate-300 text-slate-600';
                    if (oIdx === item.answer) {
                      btnStyle =
                        'bg-emerald-100 border-emerald-500 text-emerald-900 font-semibold';
                    } else if (oIdx === item.userChoice) {
                      btnStyle =
                        'bg-red-100 border-red-500 text-red-900 font-semibold';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled
                        className={`p-3.5 border-2 rounded-xl text-[15px] text-left font-medium cursor-not-allowed ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side: Analytics Panel */}
      <div className="w-full lg:w-[45%]">
        <div className="bg-white p-7 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-200">
          <h3 className="text-lg text-slate-800 mb-5 text-center font-semibold">
            Performance Analytics
          </h3>

          <div className="grid grid-cols-2 gap-5 justify-items-center mb-6">
            {/* Correct Ring */}
            <div
              className="flex items-center justify-center w-[120px] h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              style={{
                background: `conic-gradient(#3b82f6 ${
                  correctPct * 3.6
                }deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="text-slate-800 flex flex-col items-center justify-center text-lg font-bold w-[90px] h-[90px] rounded-full bg-white">
                <div>{correctCount}</div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                  correct
                </span>
              </div>
            </div>

            {/* Wrong Ring */}
            <div
              className="flex items-center justify-center w-[120px] h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              style={{
                background: `conic-gradient(#ef4444 ${
                  wrongPct * 3.6
                }deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="text-slate-800 flex flex-col items-center justify-center text-lg font-bold w-[90px] h-[90px] rounded-full bg-white">
                <div>{incorrectCount}</div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                  wrong
                </span>
              </div>
            </div>

            {/* Score Ring */}
            <div
              className="flex items-center justify-center w-[120px] h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              style={{
                background: `conic-gradient(#10b981 ${
                  correctPct * 3.6
                }deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="text-slate-800 flex flex-col items-center justify-center text-lg font-bold w-[90px] h-[90px] rounded-full bg-white">
                <div>{correctPct}%</div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                  score
                </span>
              </div>
            </div>

            {/* Avg Time Ring */}
            <div
              className="flex items-center justify-center w-[120px] h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              style={{
                background: `conic-gradient(#8b5cf6 360deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="text-slate-800 flex flex-col items-center justify-center text-lg font-bold w-[90px] h-[90px] rounded-full bg-white">
                <div>{avgTime}s</div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                  Avg Time
                </span>
              </div>
            </div>

            {/* Total Time Ring */}
            <div
              className="flex items-center justify-center w-[120px] h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              style={{
                background: `conic-gradient(#10b981 ${
                  timePct * 3.6
                }deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="text-slate-800 flex flex-col items-center justify-center text-base leading-tight font-bold w-[90px] h-[90px] rounded-full bg-white text-center">
                {renderTotalTime()}
                <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                  Total Time
                </span>
              </div>
            </div>

            {/* Badge Ring */}
            <div
              className="flex items-center justify-center w-[120px] h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
              style={{
                background: `conic-gradient(${badge.color} 360deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="text-slate-800 flex flex-col items-center justify-center text-lg font-bold w-[90px] h-[90px] rounded-full bg-white">
                <div>{badge.label}</div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                  Badge
                </span>
              </div>
            </div>
          </div>

          {/* Restart Button */}
          <button
            onClick={onRestartQuiz}
            className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-base font-semibold cursor-pointer transition-colors duration-200"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
