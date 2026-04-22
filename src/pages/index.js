import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="w-full py-6 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold tracking-tight">RNet Counter v0.1</h1>
        <p className="text-gray-400 mt-1">Day 3 of 100 Days of Code</p>
      </header>
      
      <div className="flex items-center justify-center mt-20">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 w-80 text-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-300">Live Counter</h2>
          
          <div className="text-7xl font-bold mb-8 text-green-400">
            {count}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-green-600 hover:bg-green-500 active:scale-95 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              +1
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-gray-700 hover:bg-gray-600 active:scale-95 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Reset
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            Deployed on Vercel • Auto-updates via GitHub
          </p>
        </div>
      </div>
    </main>
  );
}