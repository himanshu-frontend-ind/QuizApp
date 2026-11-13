import React, { useState, useEffect } from 'react';
import {dataQuiz} from "./data/dataQuiz"
import Home from './components/Home';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import QuizCard from './components/QuizCard';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);
  const [timeTakenList, setTimeTakenList] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  let quizData =  dataQuiz[topic]?.[mode] || [];

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    // Jab tak topic ya mode khali hai, timer nahi chalega
    if (topic === "" || mode === "" || isQuizStarted === false || isQuizFinished || answered) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prevSeconds - 1;
      });
      setQuestionTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, answered, isQuizFinished, isQuizStarted, topic, mode]);

  const handleStartQuiz = (selectedTopic, selectedMode) => {
    // Agar dono me se koi bhi khali hai toh quiz start nahi hoga
    if (!selectedTopic || !selectedMode) return;

    setTopic(selectedTopic);
    setMode(selectedMode);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setSeconds(20);
    setQuestionTimeSpent(0);
    setTimeTakenList([]);
    setWrongAnswers([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsQuizFinished(false);
    setIsQuizStarted(true);
  };

  const handleTimeOut = () => {
    setAnswered(true);
    setSelectedOption('Time Out');
    setIncorrectCount((prev) => prev + 1);
    setTimeTakenList((prev) => [...prev, 20]);
    setWrongAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        options: currentQuestion.options,
        answer: currentQuestion.answer,
        userChoice: 'Time Out',
      },
    ]);
  };

  const handleSelectOption = (index) => {
    if (answered) return;

    setAnswered(true);
    setSelectedOption(index);
    setTimeTakenList((prev) => [...prev, questionTimeSpent]);

    if (index === currentQuestion.answer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          options: currentQuestion.options,
          answer: currentQuestion.answer,
          userChoice: index,
        },
      ]);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizData.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setAnswered(false);
      setSeconds(20);
      setQuestionTimeSpent(0);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setTopic("");
    setMode("");
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setSeconds(20);
    setQuestionTimeSpent(0);
    setTimeTakenList([]);
    setWrongAnswers([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsQuizFinished(false);
    setIsQuizStarted(false);
  };

  const progressPercent = isQuizFinished
    ? 100
    : Math.round((currentQuestionIndex / quizData.length) * 100);

  // Jab tak topic ya mode khali ha tab tak Home component hi dikhega
  if (topic === "" || mode === "" || isQuizStarted === false) {
    return <Home onStartQuiz={handleStartQuiz} />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col justify-center items-center p-5 font-sans">
      {isQuizFinished === false ? (
        <>
          <div className="mb-3 flex gap-2">
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Topic: {topic}
            </span>
            <span className="px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
              Mode: {mode}
            </span>
          </div>

          <ProgressBar
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quizData.length}
            progressPercent={progressPercent}
          />
          <Timer seconds={seconds} />
          <QuizCard
            questionData={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizData.length}
            answered={answered}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
          />
        </>
      ) : (
        <AnalyticsDashboard
          wrongAnswers={wrongAnswers}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          totalQuestions={quizData.length}
          timeTakenList={timeTakenList}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default App;
