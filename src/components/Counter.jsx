import { useState, useEffect } from 'react';

export default function Counter({ title }) {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Step 1: Mark that we're on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Step 2: Load from localStorage only after mount
  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem(`count-${title}`);
      if (saved) setCount(parseInt(saved));
    }
  }, [isMounted, title]);

  // Step 3: Save to localStorage when count changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(`count-${title}`, count);
    }
  }, [count, title, isMounted]);

  // Prevent showing wrong number during SSR
  if (!isMounted) {
    return (
      <div className="bg-neutral-800 p-6 rounded-xl text-center border border-neutral-700">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-5xl font-bold mb-6">0</p>
        <div className="flex gap-2 justify-center">
          <button className="bg-teal-500 px-4 py-2 rounded font-bold">+1</button>
          <button className="bg-pink-500 px-4 py-2 rounded font-bold">-1</button>
          <button className="bg-neutral-600 px-4 py-2 rounded font-bold">Reset</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 p-6 rounded-xl text-center border border-neutral-700">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-5xl font-bold mb-6">{count}</p>
      <div className="flex gap-2 justify-center">
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-teal-500 hover:bg-teal-400 px-4 py-2 rounded font-bold"
        >
          +1
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-pink-500 hover:bg-pink-400 px-4 py-2 rounded font-bold"
        >
          -1
        </button>
        <button 
          onClick={() => setCount(0)}
          className="bg-neutral-600 hover:bg-neutral-500 px-4 py-2 rounded font-bold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}