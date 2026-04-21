   import { useState } from 'react'

   export default function Home() {
     const [count, setCount] = useState(0)

     return (
       <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
         <h1>Day 2 Counter</h1>
         <h2>Count: {count}</h2>
         
         <button onClick={() => setCount(count + 1)}>
           +1
         </button>
         
         <button 
           onClick={() => setCount(0)}
           style={{ marginLeft: '10px' }}
         >
           Reset
         </button>

         {count > 10 && <p>🔥 Nice! You’re clicking a lot</p>}
       </div>
     )
   }