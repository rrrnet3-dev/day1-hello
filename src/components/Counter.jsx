import { useState, useEffect } from 'react';

export default function Counter({ title, theme }) {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');

  const MIN = 0;
  const MAX = 100;

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

  // Clear message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const showLimitMessage = (type) => {
    setMessage(type === 'max'? 'Max 100 reached' : 'Min 0 reached');
  };

  const increment = () => {
    if (count >= MAX) {
      showLimitMessage('max');
      return;
    }
    setCount(count + 1);
  };

  const decrement = () => {
    if (count <= MIN) {
      showLimitMessage('min');
      return;
    }
    setCount(count - 1);
  };

  const addFive = () => {
    if (count + 5 > MAX) {
      setCount(MAX);
      showLimitMessage('max');
      return;
    }
    setCount(count + 5);
  };

  const subFive = () => {
    if (count - 5 < MIN) {
      setCount(MIN);
      showLimitMessage('min');
      return;
    }
    setCount(count - 5);
  };

  const double = () => {
    if (count * 2 > MAX) {
      setCount(MAX);
      showLimitMessage('max');
      return;
    }
    setCount(count * 2);
  };

  // Keyboard controls with limits
  useEffect(() => {
    if (!isMounted ||!isFocused) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setCount(0);
      }
      if (e.key === ' ') {
        e.preventDefault();
        double();
      }
      if (e.key === '5') {
        e.preventDefault();
        addFive();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, isFocused, count]);

  const bgClass = theme === 'dark' 
  ? `bg-neutral-800 border-neutral-700 ${isFocused? 'ring-2 ring-teal-500' : ''}`
    : `bg-white border-gray-300 shadow-lg ${isFocused? 'ring-2 ring-teal-500' : ''}`;
  
  const textClass = theme === 'dark'? 'text-white' : 'text-black';
  const disabledClass = 'opacity-40 cursor-not-allowed';

  if (!isMounted) return <div className={`p-6 rounded-xl border ${bgClass} ${textClass}`}>Loading...</div>;

  return (
    <div 
      className={`${bgClass} p-6 rounded-xl text-center border ${textClass} transition-all duration-200 cursor-pointer relative`}
      onClick={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      
      {isFocused && <p className="text-xs mb-2 text-teal-400">↑/↓ +1/-1 • R Reset • Space x2 • 5 +5</p>}
      {!isFocused && <p className="text-xs mb-2 opacity-50">Click to enable keyboard</p>}
      
      {message && (
        <p className="text-xs mb-2 text-rose-400 font-semibold animate-pulse">{message}</p>
      )}
      
      <p className="text-5xl font-bold mb-6">{count}</p>
      
      <div className="grid grid-cols-3 gap-2 justify-center">
        <button 
          onClick={increment} 
          disabled={count >= MAX}
          className={`bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded font-bold transition ${count >= MAX? disabledClass : ''}`}
        >+1</button>
        
        <button 
          onClick={decrement} 
          disabled={count <= MIN}
          className={`bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded font-bold transition ${count <= MIN? disabledClass : ''}`}
        >-1</button>
        
        <button 
          onClick={() => setCount(0)} 
          className="bg-neutral-600 hover:bg-neutral-500 text-white px-4 py-2 rounded font-bold transition"
        >Reset</button>
        
        <button 
          onClick={addFive} 
          disabled={count >= MAX}
          className={`bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded font-bold transition ${count >= MAX? disabledClass : ''}`}
        >+5</button>
        
        <button 
          onClick={subFive} 
          disabled={count <= MIN}
          className={`bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded font-bold transition ${count <= MIN? disabledClass : ''}`}
        >-5</button>
        
        <button 
          onClick={double} 
          disabled={count >= MAX || count * 2 > MAX}
          className={`bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded font-bold transition ${count >= MAX || count * 2 > MAX? disabledClass : ''}`}
        >x2</button>
      </div>
    </div>
  )
}