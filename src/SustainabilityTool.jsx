import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  { category: "Environmental Impact", subcategory: "Climate impact & emissions", text: "Does the company have insight into its CO₂ emissions (scope 1 and 2)?" },
  { category: "Environmental Impact", subcategory: "Energy management", text: "Does the company use renewable energy?" }
];

export default function SustainabilityTool() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [hoveredQuestionIndex, setHoveredQuestionIndex] = useState(null);

  const explanations = questions.map((q, i) => `Explanation for: ${q.text}`);

  const handleAnswer = (index, value) => {
    setAnswers({ ...answers, [index]: value });
    setSelectedQuestion(null);
  };

  const getColor = (value) => {
    if (value === "yes") return "bg-green-200";
    if (value === "no") return "bg-red-200";
    return "bg-white";
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Partner Self-Assessment Tool</h1>

      {selectedQuestion === null ? (
        <div className="w-full flex flex-col items-center space-y-2">
          {questions.map((q, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredQuestionIndex(index)}
              onMouseLeave={() => setHoveredQuestionIndex(null)}
              className={`text-xs cursor-pointer p-2 text-center rounded-md shadow ${getColor(answers[index])}`}
              onClick={() => setSelectedQuestion(index)}
            >
              {q.text}
            </div>
          ))}
          {hoveredQuestionIndex !== null && (
            <div className="fixed bottom-0 left-0 w-full bg-white bg-opacity-90 text-gray-800 text-sm px-6 py-3 shadow-inner border-t border-gray-300 z-50">
              <strong>Explanation:</strong> {explanations[hoveredQuestionIndex]}
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-lg font-medium mb-4">
            {questions[selectedQuestion].text}
          </h2>
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAnswer(selectedQuestion, "yes")}
            >
              Yes
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAnswer(selectedQuestion, "no")}
            >
              No
            </button>
          </div>
          <button
            className="mt-6 border px-4 py-2 rounded"
            onClick={() => setSelectedQuestion(null)}
          >
            Back to Overview
          </button>
        </motion.div>
      )}
    </div>
  );
}
