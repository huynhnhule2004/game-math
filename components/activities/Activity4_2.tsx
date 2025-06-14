"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb, X } from "lucide-react";

interface Activity4Props {
  activity: number;
  setActivity: React.Dispatch<React.SetStateAction<number>>;
  oddNumbers: number[];
  setOddNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  dragNumbers: number[];
  setDragNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  largestEven: string;
  setLargestEven: React.Dispatch<React.SetStateAction<string>>;
  largestOdd: string;
  setLargestOdd: React.Dispatch<React.SetStateAction<string>>;
  animalNumbers: { id: string; number: number; animal: string }[];
  setAnimalNumbers: React.Dispatch<
    React.SetStateAction<{ id: string; number: number; animal: string }[]>
  >;
}

export default function Activity4_2({
  activity,
  setActivity,
  feedback,
  setFeedback,
}: Activity4Props) {
  const [answers4_2, setAnswers4_2] = useState({
    q1: "",
    q2: "",
    q3: "",
    q3_type: "",
  });
  const [showHint, setShowHint] = useState(false);

  // Initialize audio objects
  const correctSound = typeof Audio !== "undefined" ? new Audio("/sounds/correct.mp3") : null;
  const wrongSound = typeof Audio !== "undefined" ? new Audio("/sounds/wrong.mp3") : null;

  const checkActivity4_2 = () => {
    if (
      answers4_2.q1 === "5" &&
      answers4_2.q2 === "2" &&
      answers4_2.q3 === "6" &&
      answers4_2.q3_type === "chẵn"
    ) {
      // Play correct sound
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setFeedback("Đúng rồi!");
    } else {
      // Play wrong sound
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setFeedback("Sai rồi! Thử lại nhé.");
    }
  };

  // Hint content
  const hintContent = (
    <div className="space-y-3 text-gray-700">
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="font-semibold text-blue-800 mb-2">📘 Nhớ lại:</p>
        <p>Những số chia hết cho 2 là số chẵn.</p>
        <p>Những số không chia hết cho 2 là số lẻ.</p>
        <p>
          Các chữ số có tận cùng là{" "}
          <span className="font-bold text-green-500">0, 2, 4, 6, 8</span> là số chẵn.
        </p>
        <p>
          Các chữ số có tận cùng là{" "}
          <span className="font-bold text-red-500">1, 3, 5, 7, 9</span> là số lẻ.
        </p>
      </div>
    </div>
  );

  if (activity !== 4.2) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg relative">
      {/* Light Bulb Hint Button */}
      <motion.button
        onClick={() => setShowHint(!showHint)}
        className="absolute top-4 right-4 p-3 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg transition-all duration-300 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Lightbulb className="w-6 h-6 text-yellow-900" />
      </motion.button>

      {/* Hint Modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowHint(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  Gợi ý
                </h3>
                <Button
                  onClick={() => setShowHint(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {hintContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📝 Hoạt động 4.2: Điền vào chỗ trống
      </h2>

      <div className="space-y-6 bg-white/80 rounded-xl p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-lg font-medium">
            1. <span className="font-bold text-blue-600">235</span> là số lẻ vì có
            chữ số tận cùng là...
          </p>
          <Select
            onValueChange={(value) => setAnswers4_2({ ...answers4_2, q1: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn số" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-medium">
            2. <span className="font-bold text-green-600">132</span> là số chẵn vì
            có chữ số tận cùng là...
          </p>
          <Select
            onValueChange={(value) => setAnswers4_2({ ...answers4_2, q2: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn số" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-medium">
            3. <span className="font-bold text-purple-600">326</span> là số...
          </p>
          <Select
            onValueChange={(value) =>
              setAnswers4_2({ ...answers4_2, q3_type: value })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chẵn">Chẵn</SelectItem>
              <SelectItem value="lẻ">Lẻ</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-lg font-medium">vì có chữ số tận cùng là...</p>
          <Select
            onValueChange={(value) => setAnswers4_2({ ...answers4_2, q3: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chọn số" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-center mt-6">
        <Button
          onClick={checkActivity4_2}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 text-lg font-semibold rounded-full"
        >
          Kiểm tra đáp án
        </Button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="text-center mt-6"
          >
            <div
              className={`${
                feedback.includes("Đúng")
                  ? "bg-green-100 border-green-300 text-green-700"
                  : "bg-red-100 border-red-300 text-red-700"
              } border-2 px-6 py-3 rounded-full inline-flex items-center space-x-2 text-lg font-semibold shadow-lg`}
            >
              <span>{feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      {feedback === "Đúng rồi!" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <Button
            onClick={() => setActivity(4.3)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🎉 Tiếp tục hoạt động tiếp theo
          </Button>
        </motion.div>
      )}
    </div>
  );
}