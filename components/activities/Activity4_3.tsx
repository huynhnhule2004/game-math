"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

const SortableItem = ({ id }: { id: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border rounded-lg bg-white"
    >
      {id}
    </motion.div>
  );
};

export default function Activity4_3({
  activity,
  setActivity,
  feedback,
  setFeedback,
  dragNumbers,
  setDragNumbers,
  largestEven,
  setLargestEven,
  largestOdd,
  setLargestOdd,
}: Activity4Props) {
  const [showHint, setShowHint] = useState(false);

  // Initialize audio objects
  const correctSound = typeof Audio !== "undefined" ? new Audio("/sounds/correct.mp3") : null;
  const wrongSound = typeof Audio !== "undefined" ? new Audio("/sounds/wrong.mp3") : null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setDragNumbers((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over!.id as number);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkActivity4_3 = () => {
    const number = parseInt(dragNumbers.join(""));
    if (number === 8754 && largestEven === "") {
      // Play correct sound
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setLargestEven("8754");
      setFeedback("Tuyệt vời! Số chẵn lớn nhất là 8754.");
    } else if (number === 8745 && largestEven !== "") {
      // Play correct sound
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setLargestOdd("8745");
      setFeedback("Tuyệt vời! Số lẻ lớn nhất là 8745.");
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

  if (activity !== 4.3) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg relative">
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          🎯 Hoạt động 4.3: Sắp xếp số
        </h2>
        <p className="text-lg text-gray-600 bg-white/80 rounded-full px-6 py-2 inline-block shadow-sm">
          Sắp xếp các số {dragNumbers.join(", ")} để tạo{" "}
          {largestEven === "" ? "số chẵn lớn nhất" : "số lẻ lớn nhất"}.
        </p>
      </motion.div>

      {/* Draggable Numbers */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={dragNumbers}>
          <div className="flex gap-4 my-6 justify-center">
            {dragNumbers.map((num) => (
              <SortableItem key={num} id={num} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Current Number Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 rounded-xl p-4 mb-6 shadow-sm text-center"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Số hiện tại:
        </h3>
        <span className="text-2xl font-bold text-purple-600">
          {dragNumbers.join("")}
        </span>
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="text-center mb-6"
          >
            <div
              className={`${
                feedback.includes("Tuyệt vời")
                  ? "bg-green-100 border-green-300 text-green-700"
                  : "bg-red-100 border-red-300 text-red-700"
              } border-2 px-6 py-3 rounded-full inline-flex items-center space-x-2 text-lg font-semibold shadow-lg`}
            >
              <span>{feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check Button */}
      <div className="text-center">
        <Button
          onClick={checkActivity4_3}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Kiểm tra
        </Button>
      </div>

      {/* Continue Button */}
      {feedback === "Tuyệt vời! Số lẻ lớn nhất là 8745." && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <Button
            onClick={() => setActivity(4.4)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🎉 Tiếp tục hoạt động tiếp theo
          </Button>
        </motion.div>
      )}
    </div>
  );
}