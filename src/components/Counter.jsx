import { useState, useEffect } from 'react';

export default function Counter({ title, theme }) {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => { setIsMounted(true) }, []);

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

  // Keyboard controls
  useEffect(() => {
    if (!isMounted || !isFocused) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCount(prev => prev + 1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCount(prev => prev - 1);
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setCount(0);
      }
      if (e.key === ' ') {
        e.preventDefault();
        setCount(prev => prev * 2);
      }
      if (e.key === '5') {
        e.preventDefault();
        setCount(prev => prev + 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, isFocused]);

  const bgClass = theme === 'dark' 
   ? `bg-neutral-800 border-neutral-700 ${isFocused ? 'ring-2 ring-teal-500' : ''}`
    : `bg-white border-gray-300 shadow-lg ${isFocused ? 'ring-2 ring-teal-500' : ''}`;
  
  const textClass = theme === 'dark'? 'text-white' : 'text-black';

  if (!isMounted) return <div className={`p-6 rounded-xl border ${bgClass} ${textClass}`}>Loading...</div>;

  return (
    <div 
      className={`${bgClass} p-6 rounded-xl text-center border ${textClass} transition-all duration-200 cursor-pointer`}
      onClick={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {isFocused && <p className="text-xs mb-2 text-teal-400">↑/↓ +1/-1 • R Reset • Space x2 • 5 +5</p>}
      {!isFocused && <p className="text-xs mb-2 opacity-50">Click to enable keyboard</p>}
      <p className="text-5xl font-bold mb-6">{count}</p>
      <div className="grid grid-cols-3 gap-2 justify-center">
        <button onClick={() => setCount(count + 1)} className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded font-bold transition">+1</button>
        <button onClick={() => setCount(count - 1)} className="bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded font-bold transition">-1</button>
        <button onClick={() => setCount(0)} className="bg-neutral-600 hover:bg-neutral-500 text-white px-4 py-2 rounded font-bold transition">Reset</button>
        <button onClick={() => setCount(count + 5)} className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded font-bold transition">+5</button>
        <button onClick={() => setCount(count - 5)} className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded font-bold transition">-5</button>
        <button onClick={() => setCount(count * 2)} className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded font-bold transition">x2</button>
      </div>
    </div>
  )
}