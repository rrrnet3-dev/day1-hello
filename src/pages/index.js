import { useState, useEffect } from 'react';
import Counter from '../components/Counter';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [activeCounter, setActiveCounter] = useState(null); // 'main' or 'second' or null

  useEffect(() => { setIsMounted(true) }, []);

  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem('theme');
      if (saved) setTheme(saved);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme(theme === 'dark'? 'light' : 'dark');
  };

  const bgClass = theme === 'dark'? 'bg-neutral-900 text-white' : 'bg-gray-100 text-black';

  if (!isMounted) return <div className={`${bgClass} min-h-screen`}></div>;

  return (
    <div 
      className={`${bgClass} min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-300`}
      onClick={() => setActiveCounter(null)} // Click background = deselect all
    >
      <button 
        onClick={toggleTheme} 
        className="absolute top-4 right-4 bg-teal-500 hover:bg-teal-400 text-white p-3 rounded-full font-bold text-xl transition"
        onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
      >
        {theme === 'dark'? '☀️' : '🌙'}
      </button>
      
      <div onClick={(e) => e.stopPropagation()}> {/* Prevent deselect when clicking counters */}
        <h1 className="text-4xl font-bold">RNet Counter v1.0</h1>
<p className={theme === 'dark'? 'text-neutral-400' : 'text-gray-600'}>Day 12 of 100 Days of Code</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Counter 
            title="Main Counter" 
            theme={theme} 
            isActive={activeCounter === 'main'}
            onActivate={() => setActiveCounter('main')}
          />
          <Counter 
            title="Second Counter" 
            theme={theme}
            isActive={activeCounter === 'second'}
            onActivate={() => setActiveCounter('second')}
          />
        </div>
      </div>
    </div>
  )
}