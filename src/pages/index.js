import Counter from '../components/Counter';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">RNet Counter v0.4</h1>
        <p className="text-neutral-400 mb-8">Day 6 of 100 Days of Code</p>
      </div>
      
      <Counter title="Main Counter" />
      <Counter title="Second Counter" />
      
      <p className="text-neutral-500 text-sm mt-6">Deployed on Vercel • Auto-updates via GitHub</p>
    </main>
  );
}