import { useState, useEffect } from 'react';

export default function Counter({ title }) {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem(`count-${title}`);
      if (saved) setCount(parseInt(saved));
    }
  }, [isMounted, title]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(`count-${title}`, count);
    }
  }, [count, title, isMounted]);

  if (!isMounted) {
    return (
      <div className="bg-neutral-800 p-6 rounded-xl text-center border border-neutral-700">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-5xl font-bold mb-6">0</p>
        <div className="grid grid-cols-3 gap-2 justify-center">
          <button className="bg-teal-500 px-3 py-2 rounded font-bold text-sm">+1</button>
          <button className="bg-pink-500 px-3 py-2 rounded font-bold text-sm">-1</button>
          <button className="bg-neutral-600 px-3 py-2 rounded font-bold text-sm">Reset</button>
          <button className="bg-teal-600 px-3 py-2 rounded font-bold text-sm">+5</button>
          <button className="bg-pink-600 px-3 py-2 rounded font-bold text-sm">-5</button>
          <button className="bg-amber-500 px-3 py-2 rounded font-bold text-sm">x2</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 p-6 rounded-xl text-center border border-neutral-700">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-5xl font-bold mb-6">{count}</p>
      <div className="grid grid-cols-3 gap-2 justify-center">
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-teal-500 hover:bg-teal-400 px-3 py-2 rounded font-bold text-sm"
        >
          +1
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-pink-500 hover:bg-pink-400 px-3 py-2 rounded font-bold text-sm"
        >
          -1
        </button>
        <button 
          onClick={() => setCount(0)}
          className="bg-neutral-600 hover:bg-neutral-500 px-3 py-2 rounded font-bold text-sm"
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 5)}
          className="bg-teal-600 hover:bg-teal-500 px-3 py-2 rounded font-bold text-sm"
        >
          +5
        </button>
        <button 
          onClick={() => setCount(count - 5)}
          className="bg-pink-600 hover:bg-pink-500 px-3 py-2 rounded font-bold text-sm"
        >
          -5
        </button>
        <button 
          onClick={() => setCount(count * 2)}
          className="bg-amber-500 hover:bg-amber-400 px-3 py-2 rounded font-bold text-sm"
        >
          x2
        </button>
      </div>
    </div>
  );
}