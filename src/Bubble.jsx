import Draggable from "react-draggable";

export default function Bubble({ category, questions }) {
  return (
    <Draggable>
      <div className="rounded-full bg-green-100 p-6 m-4 w-[300px] h-auto shadow-xl border border-green-400">
        <h2 className="font-bold text-center text-green-900">{category}</h2>
        <ul className="mt-3 space-y-2">
          {questions.map((q, i) => (
            <li key={i} className="hover:bg-green-200 p-2 rounded cursor-pointer">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </Draggable>
  );
}