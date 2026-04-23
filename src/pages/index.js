import { useState, useEffect } from 'react';
import Counter from '../components/Counter';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [isMounted, setIsMounted] = useState(false);

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
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isMounted]);

  if (!isMounted) return null; // prevent hydration mismatch

  return (
    <div className={`${theme === 'dark'? 'bg-neutral-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-8`}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">RNet Counter v0.6</h1>
            <p className={theme === 'dark'? 'text-neutral-400' : 'text-gray-600'}>Day 8 of 100 Days of Code</p>
          </div>
          <button 
            onClick={() => setTheme(theme === 'dark'? 'light' : 'dark')}
            className="text-3xl p-2 rounded-lg hover:bg-neutral-700"
          >
            {theme === 'dark'? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Counter title="Main Counter" theme={theme} />
          <Counter title="Second Counter" theme={theme} />
        </div>
      </div>
    </div>
  )
}