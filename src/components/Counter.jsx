import { useState } from 'react';

export default function Counter({ title }) {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-neutral-800 rounded-lg p-8 text-center shadow-xl">
      <h2 className="text-xl mb-4">{title}</h2>
      <div className="text-6xl font-bold mb-6">{count}</div>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded font-semibold"
        >
          +1
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded font-semibold"
        >
          -1
        </button>
        <button 
          onClick={() => setCount(0)}
          className="bg-neutral-600 hover:bg-neutral-700 px-6 py-2 rounded font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}