import React from 'react';
import  {cardsData}  from '../data/cardsData';

const Home = ({ onStartQuiz }) => {
  const cards = cardsData  

  const getTagStyle = (tag) => {
    switch (tag) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20";
      case "Hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-100">
          Select Topic & Mode
        </h1>
        <p className="text-zinc-400 mt-2">
          Click on Easy, Medium, or Hard inside any topic card to start
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-zinc-600 transition-all duration-300 shadow-lg"
          >
            <h2 className="text-2xl font-bold tracking-wide text-zinc-100">
              {card.name}
            </h2>

            {/* Kisi bhi mode tag par click karne se topic aur mode dono set honge */}
            <div className="flex flex-wrap items-center gap-3">
              {card.tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => onStartQuiz(card.name, tag)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border cursor-pointer transition-all ${getTagStyle(
                    tag
                  )}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
