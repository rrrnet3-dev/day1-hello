import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Counter({ title, theme }) {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [slots, setSlots] = useState([null, null, null]);
  const [isMounted, setIsMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState('');

  const MIN = 0;
  const MAX = 100;

  useEffect(() => { setIsMounted(true) }, []);

  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem(`count-${title}`);
      const savedHistory = localStorage.getItem(`history-${title}`);
      const savedSlots = localStorage.getItem(`slots-${title}`);
      if (saved) setCount(parseInt(saved));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedSlots) setSlots(JSON.parse(savedSlots));
    }
  }, [isMounted, title]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(`count-${title}`, count);
      localStorage.setItem(`history-${title}`, JSON.stringify(history));
      localStorage.setItem(`slots-${title}`, JSON.stringify(slots));
    }
  }, [count, history, slots, title, isMounted]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const addToHistory = (action, oldValue, newValue) => {
    setHistory(prev => {
      const newHistory = [...prev, { action, oldValue, newValue }];
      return newHistory.slice(-5);
    });
  };

  const showMessage = (msg) => setMessage(msg);

  const updateCount = (newValue, action) => {
    addToHistory(action, count, newValue);
    setCount(newValue);
  };

  const increment = () => {
    if (count >= MAX) return showMessage('Max 100 reached');
    updateCount(count + 1, '+1');
  };

  const decrement = () => {
    if (count <= MIN) return showMessage('Min 0 reached');
    updateCount(count - 1, '-1');
  };

  const addFive = () => {
    const newValue = count + 5 > MAX? MAX : count + 5;
    if (count + 5 > MAX) showMessage('Max 100 reached');
    updateCount(newValue, '+5');
  };

  const subFive = () => {
    const newValue = count - 5 < MIN? MIN : count - 5;
    if (count - 5 < MIN) showMessage('Min 0 reached');
    updateCount(newValue, '-5');
  };

  const double = () => {
    const newValue = count * 2 > MAX? MAX : count * 2;
    if (count * 2 > MAX) showMessage('Max 100 reached');
    updateCount(newValue, 'x2');
  };

  const reset = () => updateCount(0, 'Reset');

  const undo = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    setCount(lastAction.oldValue);
    setHistory(prev => prev.slice(0, -1));
    showMessage('Undid ' + lastAction.action);
  };

  const saveSlot = (index) => {
    const newSlots = [...slots];
    newSlots[index] = { count, history, savedAt: new Date().toLocaleTimeString() };
    setSlots(newSlots);
    showMessage(`Saved to Slot ${index + 1}`);
  };

  const loadSlot = (index) => {
    const slot = slots[index];
    if (!slot) return showMessage('Slot empty');
    setCount(slot.count);
    setHistory(slot.history);
    showMessage(`Loaded Slot ${index + 1}`);
  };

  useEffect(() => {
    if (!isMounted ||!isFocused) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); increment(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); decrement(); }
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); reset(); }
      if (e.key === ' ') { e.preventDefault(); double(); }
      if (e.key === '5') { e.preventDefault(); addFive(); }
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); undo(); }
      if (e.shiftKey && e.code === 'Digit1') { e.preventDefault(); saveSlot(0); }
      if (e.shiftKey && e.code === 'Digit2') { e.preventDefault(); saveSlot(1); }
      if (e.shiftKey && e.code === 'Digit3') { e.preventDefault(); saveSlot(2); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, isFocused, count, history, slots]);

  const bgClass = theme === 'dark'
? `bg-neutral-800 border-neutral-700 ${isFocused? 'ring-2 ring-teal-500' : ''}`
    : `bg-white border-gray-300 shadow-lg ${isFocused? 'ring-2 ring-teal-500' : ''}`;

  const textClass = theme === 'dark'? 'text-white' : 'text-black';
  const disabledClass = 'opacity-40 cursor-not-allowed';
  const historyTextClass = theme === 'dark'? 'text-neutral-400' : 'text-gray-500';

  if (!isMounted) return <div className={`p-6 rounded-xl border ${bgClass} ${textClass}`}>Loading...</div>;

  return (
    <div
      className={`${bgClass} p-6 rounded-xl text-center border ${textClass} transition-all duration-200 cursor-pointer relative`}
      onClick={() => setIsFocused(true)}
      tabIndex={0}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {isFocused && <p className="text-xs mb-2 text-teal-400">↑/↓ • R • Space • 5 • Ctrl+Z • Shift+1/2/3 Save</p>}
      {!isFocused && <p className="text-xs mb-2 opacity-50">Click to enable keyboard</p>}

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs mb-2 text-rose-400 font-semibold"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.p
        key={count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-5xl font-bold mb-4"
      >
        {count}
      </motion.p>

      {history.length > 0 && (
        <div className={`text-xs mb-3 ${historyTextClass}`}>
          <p className="font-semibold mb-1">History:</p>
          <div className="flex gap-1 justify-center flex-wrap">
            {history.map((item, idx) => (
              <motion.span
                key={`${item.action}-${idx}-${history.length}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 rounded bg-neutral-700/30"
              >
                {item.action}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 justify-center mb-2">
        <motion.button whileTap={{ scale: 0.9 }} onClick={increment} disabled={count >= MAX} className={`bg-teal-500 hover:bg-teal-400 text-white px-3 py-2 rounded font-bold text-sm transition ${count >= MAX? disabledClass : ''}`}>+1</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={decrement} disabled={count <= MIN} className={`bg-rose-500 hover:bg-rose-400 text-white px-3 py-2 rounded font-bold text-sm transition ${count <= MIN? disabledClass : ''}`}>-1</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={reset} className="bg-neutral-600 hover:bg-neutral-500 text-white px-3 py-2 rounded font-bold text-sm transition">Reset</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={addFive} disabled={count >= MAX} className={`bg-cyan-500 hover:bg-cyan-400 text-white px-3 py-2 rounded font-bold text-sm transition ${count >= MAX? disabledClass : ''}`}>+5</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={subFive} disabled={count <= MIN} className={`bg-pink-500 hover:bg-pink-400 text-white px-3 py-2 rounded font-bold text-sm transition ${count <= MIN? disabledClass : ''}`}>-5</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={double} disabled={count >= MAX || count * 2 > MAX} className={`bg-amber-500 hover:bg-amber-400 text-white px-3 py-2 rounded font-bold text-sm transition ${count >= MAX || count * 2 > MAX? disabledClass : ''}`}>x2</motion.button>
      </div>

      <motion.button whileTap={{ scale: 0.95 }} onClick={undo} disabled={history.length === 0} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded font-bold text-sm transition mb-3 ${history.length === 0? disabledClass : ''}`}>
        Undo {history.length > 0? `(${history.length})` : ''}
      </motion.button>

      <div className={`border-t pt-3 mt-3 ${theme === 'dark'? 'border-neutral-700' : 'border-gray-300'}`}>
        <p className={`text-xs font-semibold mb-2 ${historyTextClass}`}>Save Slots</p>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex flex-col gap-1">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => saveSlot(i)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold transition">
                Save {i + 1}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => loadSlot(i)} disabled={!slots[i]} className={`bg-sky-600 hover:bg-sky-500 text-white px-2 py-1 rounded text-xs font-bold transition ${!slots[i]? disabledClass : ''}`}>
                {slots[i]? `Load ${slots[i].count}` : 'Empty'}
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}