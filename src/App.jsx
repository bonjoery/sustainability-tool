import { questions } from './questions';
import Bubble from './Bubble';

export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50 p-10 flex flex-wrap justify-center items-start">
      <h1 className="text-3xl font-bold text-center w-full mb-10">Partner Self-Assessment Tool</h1>
      {questions.map((cat, index) => (
        <Bubble key={index} category={cat.category} questions={cat.questions} />
      ))}
    </div>
  );
}