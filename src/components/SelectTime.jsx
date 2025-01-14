"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Categories = [
  { name: "yaya", pathname: "/quiz/yaya" },
  { name: "adults", pathname: "/quiz/adults" },
  { name: "teenagers", pathname: "/quiz/teenagers" },
];

export default function SelectTime() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTime, setSelectedTime] = useState(10);
  const [time, setTime] = useState(10);
  const [selectedQuestions, setSelectedQuestions] = useState(5); // Default number of questions

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setTime(time);
  };

  const handleQuestionsSelection = (num) => {
    setSelectedQuestions(num);
  };

  const handleStartQuiz = () => {
    const selectedCategory = Categories.find(
      (category) => pathname === category.pathname
    );

    if (selectedCategory && selectedCategory.pathname) {
      const resultsPath = `${selectedCategory.pathname}/quiz`;
      router.push(
        `${resultsPath}?time=${selectedTime}&questions=${selectedQuestions}`
      );
    } else {
      console.error(
        "No matching category found for the current pathname:",
        pathname
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-4xl"
      >
        <div className="flex flex-col items-center justify-center gap-6 mb-6">
          <div className="w-full md:w-1/2">
            <h3 className="text-lg md:text-xl mb-2">Select Time</h3>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[10, 20, 30, 40, 50, 60].map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTimeSelection(time)}
                  className={`${
                    selectedTime === time ? "bg-yellow-500" : "bg-blue-500"
                  } hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base md:text-lg`}
                >
                  {time} min
                </motion.button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-lg md:text-xl mb-2">Number of Questions</h3>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[5, 10, 15, 20].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuestionsSelection(num)}
                  className={`${
                    selectedQuestions === num ? "bg-yellow-500" : "bg-blue-500"
                  } hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base md:text-lg`}
                >
                  {num} Questions
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartQuiz}
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base md:text-lg"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}
