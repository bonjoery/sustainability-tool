import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  // Environmental Impact
  { category: "Environmental Impact", subcategory: "Climate impact & emissions", text: "Does the company have insight into its CO₂ emissions (scope 1 and 2)?" },
  { category: "Environmental Impact", subcategory: "Energy management", text: "Does the company use renewable energy?" },
  { category: "Environmental Impact", subcategory: "Resources & circularity", text: "Is recycling or reuse being applied?" },
  { category: "Environmental Impact", subcategory: "Water management", text: "Is water usage being monitored?" },
  { category: "Environmental Impact", subcategory: "Biodiversity & land use", text: "Does the company affect nature or ecosystems?" },
  { category: "Environmental Impact", subcategory: "Chemical & material use", text: "Does the company use harmful substances?" },

  // Social Sustainability
  { category: "Social Sustainability", subcategory: "Working conditions", text: "Does the company pay fair wages?" },
  { category: "Social Sustainability", subcategory: "Diversity, equity & inclusion", text: "Is there a diverse workforce?" },
  { category: "Social Sustainability", subcategory: "Training & development", text: "Does the company offer development opportunities?" },
  { category: "Social Sustainability", subcategory: "Human rights & supply chain responsibility", text: "Is the supply chain screened for human rights?" },
  { category: "Social Sustainability", subcategory: "Social engagement", text: "Is the company involved in local initiatives?" },
  { category: "Social Sustainability", subcategory: "Stakeholder relations & complaint mechanisms", text: "Are there feedback channels for employees?" },

  // Governance
  { category: "Governance", subcategory: "Sustainability strategy & policy", text: "Is there a sustainability strategy?" },
  { category: "Governance", subcategory: "Transparency & reporting", text: "Does the company publish an ESG report?" },
  { category: "Governance", subcategory: "Certifications & external standards", text: "Does the company have certifications such as ISO 14001 or B Corp?" },
  { category: "Governance", subcategory: "Ethical governance & conduct", text: "Is there a code of conduct for employees?" },
  { category: "Governance", subcategory: "Compensation policy & management responsibility", text: "Is the compensation policy transparent?" },
  { category: "Governance", subcategory: "Lobbying & policy influence", text: "Is the company politically active or donating?" },

  // Playful Questions
  { category: "Playful Questions", subcategory: "Big picture: what if…", text: "What if this company ran the world – what would that world look like?" },
  { category: "Playful Questions", subcategory: "Big picture: what if…", text: "Would you want your friends or children to work for this company? Why (or why not)?" },
  { category: "Playful Questions", subcategory: "Big picture: what if…", text: "Which person in your circle would you recommend this company to based on personality? Why?" },
  { category: "Playful Questions", subcategory: "Behavior & impact", text: "Do you see more beautiful words or real action?" },
  { category: "Playful Questions", subcategory: "Behavior & impact", text: "Where does their responsibility end according to them – and where according to you?" },
  { category: "Playful Questions", subcategory: "Action-focused: what is actually being done?", text: "What is the most sustainable thing you’ve seen from this company?" },
  { category: "Playful Questions", subcategory: "Action-focused: what is actually being done?", text: "What is the least sustainable thing you know about this company – and what are they doing about it?" },
  { category: "Playful Questions", subcategory: "Personal values", text: "Does this company align with your values? Why or why not?" }
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

  const categories = [...new Set(questions.map((q) => q.category))];

  const categoryColors = [
    "bg-green-100", "bg-green-200", "bg-green-300",
    "bg-amber-100", "bg-amber-200", "bg-yellow-100",
    "bg-yellow-200", "bg-lime-200", "bg-lime-300", "bg-emerald-200"
  ];

  const gridPositions = [
    [20, 20], [50, 20], [80, 20],
    [30, 50], [60, 50], [20, 80],
    [50, 80], [80, 80], [40, 35],
    [70, 65]
  ];

  return (
    <div className="relative min-h-screen bg-cover bg-center p-6 space-y-6" style={{ backgroundImage: 'url(/mnt/data/ChatGPT Image 5 jun 2025, 11_41_22.png)' }}>
      <h1 className="text-2xl font-bold text-center">Partner Self-Assessment Tool</h1>

      {selectedQuestion === null ? (
        <div className="relative w-full h-[1200px]">
          {categories.map((category, i) => {
            const [x, y] = gridPositions[i % gridPositions.length];
            const offsetX = 0;
            const offsetY = 0;
            const questionsInCategory = questions.filter((q) => q.category === category).length;
            const size = 300 + questionsInCategory * 40;
            return (
              <div
                key={category}
                className={`transition-transform duration-300 hover:scale-105 hover:z-50 ${categoryColors[i % categoryColors.length]} absolute rounded-full shadow-2xl overflow-hidden`}
                style={{
                  width: size,
                  height: size,
                  left: `${x + offsetX}%`,
                  top: `${y + offsetY}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="w-full h-full p-4 flex flex-col items-center justify-center overflow-hidden">
                  <h2 className="font-semibold text-center text-green-900 text-sm mb-2">
                    {category}
                  </h2>
                  <div className="flex flex-col gap-1 w-full flex-wrap items-center justify-center">
                    {questions.map((q, index) =>
                      q.category === category ? (
                        <Card
                          key={index}
                          onMouseEnter={() => setHoveredQuestionIndex(index)}
                          onMouseLeave={() => setHoveredQuestionIndex(null)}
                          className={`text-xs cursor-pointer ${getColor(answers[index])}`}
                          onClick={() => setSelectedQuestion(index)}
                        >
                          <CardContent className="p-2 text-center">
                            {q.text}
                          </CardContent>
                        </Card>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => handleAnswer(selectedQuestion, "yes")}
            >
              Yes
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleAnswer(selectedQuestion, "no")}
            >
              No
            </Button>
          </div>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setSelectedQuestion(null)}
          >
            Back to Overview
          </Button>
        </motion.div>
      )}
    </div>
  );
}
