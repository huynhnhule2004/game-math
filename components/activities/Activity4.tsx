"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DndContext, closestCenter, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lightbulb, X } from "lucide-react";
import Image from "next/image";

interface AnimalNumber {
  id: string;
  type: "number" | "image";
  number: number;
  animal?: string;
  image?: string;
}

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
  animalNumbers: AnimalNumber[];
  setAnimalNumbers: React.Dispatch<React.SetStateAction<AnimalNumber[]>>;
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

const SortableAnimalItem = ({ id, type, number, image, animal }: AnimalNumber) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border rounded-lg bg-white flex items-center justify-center"
    >
      {type === "number" ? (
        <span className="text-lg font-semibold">{number}</span>
      ) : (
        image && (
          <Image
            src={image}
            alt={animal || "animal"}
            width={32}
            height={32}
            className="object-contain"
          />
        )
      )}
    </div>
  );
};

export default function Activity4({
  activity,
  setActivity,
  oddNumbers,
  setOddNumbers,
  feedback,
  setFeedback,
  dragNumbers,
  setDragNumbers,
  largestEven,
  setLargestEven,
  largestOdd,
  setLargestOdd,
  animalNumbers,
  setAnimalNumbers,
}: Activity4Props) {
  const [answers4_2, setAnswers4_2] = useState({
    q1: "",
    q2: "",
    q3: "",
    q3_type: "",
  });
  const [evenAnimals, setEvenAnimals] = useState<AnimalNumber[]>([]);
  const [oddAnimals, setOddAnimals] = useState<AnimalNumber[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [wrongNumbers, setWrongNumbers] = useState<number[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Initialize audio objects
  const correctSound = typeof Audio !== "undefined" ? new Audio("/sounds/correct.mp3") : null;
  const wrongSound = typeof Audio !== "undefined" ? new Audio("/sounds/wrong.mp3") : null;

  // Reset feedback whenever activity changes
  useEffect(() => {
    setFeedback("");
  }, [activity, setFeedback]);

  const handleOddSelect = (num: number) => {
    if (num % 2 !== 0) {
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setOddNumbers([...oddNumbers, num]);
      setWrongNumbers(wrongNumbers.filter((n) => n !== num));
      setFeedback("");
    } else {
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setWrongNumbers([...wrongNumbers, num]);
      setFeedback("❌ Sai rồi! Chọn lại nhé.");
      setTimeout(() => {
        setFeedback("");
        setWrongNumbers(wrongNumbers.filter((n) => n !== num));
      }, 1500);
    }
  };

  const checkActivity4_2 = () => {
    if (
      answers4_2.q1 === "5" &&
      answers4_2.q2 === "2" &&
      answers4_2.q3 === "6" &&
      answers4_2.q3_type === "chẵn"
    ) {
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setFeedback("Đúng rồi!");
    } else {
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setFeedback("Sai rồi! Thử lại nhé.");
    }
  };

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
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setLargestEven("8754");
      setFeedback("Tuyệt vời! Số chẵn lớn nhất là 8754.");
    } else if (number === 8745 && largestEven !== "") {
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setLargestOdd("8745");
      setFeedback("Tuyệt vời! Số lẻ lớn nhất là 8745.");
    } else {
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setFeedback("Sai rồi! Thử lại nhé.");
    }
  };

  const handleAnimalDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setFeedback("Thả vào ô số chẵn hoặc số lẻ!");
      return;
    }
    const item = animalNumbers.find((a) => a.id === active.id);
    if (!item) {
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setFeedback("Không tìm thấy mục!");
      return;
    }

    if (over.id === "even" && item.number % 2 === 0) {
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setEvenAnimals([...evenAnimals, item]);
      setAnimalNumbers(animalNumbers.filter((a) => a.id !== item.id));
    } else if (over.id === "odd" && item.number % 2 !== 0) {
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setOddAnimals([...oddAnimals, item]);
      setAnimalNumbers(animalNumbers.filter((a) => a.id !== item.id));
    } else {
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      setFeedback("Sai rồi! Thử lại nhé.");
      return;
    }

    const totalAnimals = animalNumbers.length + evenAnimals.length + oddAnimals.length;
    const classifiedCount = evenAnimals.length + oddAnimals.length + 1;
    if (classifiedCount === totalAnimals) {
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      setFeedback("Tuyệt vời! Bạn đã phân loại đúng tất cả!");
      setShowCompletionModal(true); // Hiển thị modal thay vì chuyển thẳng sang Activity 5
    }
  };

  // Numbers for activity 4.1
  const numbers = [235, 132, 143, 520, 23021, 10];

  // Hint content
  const hintContent = (
    <div className="space-y-3 text-gray-700">
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="font-semibold text-blue-800 mb-2">📘 Nhớ lại:</p>
        <p>Những số chia hết cho 2 là số chẵn.</p>
        <p>Những số không chia hết cho 2 là số lẻ.</p>
        <p>Các chữ số có tận cùng là <span className="font-bold text-green-500">0, 2, 4, 6, 8</span> là số chẵn.</p>
        <p>Các chữ số có tận cùng là <span className="font-bold text-red-500">1, 3, 5, 7, 9</span> là số lẻ.</p>
      </div>
    </div>
  );

  if (activity === 4) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg relative">
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
            🎯 Hoạt động 4.1: Chọn số lẻ
          </h2>
          <p className="text-lg text-gray-600 bg-white/80 rounded-full px-6 py-2 inline-block shadow-sm">
            Chọn các số lẻ trong các số sau:
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Tiến độ</span>
            <span className="text-sm font-medium text-purple-600">
              {oddNumbers.length}/3 số lẻ
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(oddNumbers.length / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {numbers.map((num) => {
            const isSelected = oddNumbers.includes(num);
            const isWrong = wrongNumbers.includes(num);
            const isOdd = num % 2 !== 0;

            return (
              <motion.div
                key={num}
                className={`
                  relative p-6 rounded-xl text-center cursor-pointer text-2xl font-bold
                  transition-all duration-300 select-none border-2
                  ${isSelected
                    ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg ring-4 ring-green-200 border-green-300"
                    : isWrong
                    ? "bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg border-red-300"
                    : "bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg border-gray-200 hover:border-purple-300"
                  }
                `}
                onClick={() => !isSelected && handleOddSelect(num)}
                whileHover={!isSelected ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.95 }}
                animate={
                  isSelected
                    ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.6, ease: "easeOut" },
                      }
                    : isWrong
                    ? {
                        x: [-5, 5, -5, 5, 0],
                        transition: { duration: 0.4 },
                      }
                    : {}
                }
                layout
              >
                <span className="relative z-10">{num}</span>

                {/* Success checkmark */}
                {isSelected && (
                  <motion.div
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </motion.div>
                )}

                {/* Error X */}
                {isWrong && (
                  <motion.div
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Highlight last digit for hints */}
                <motion.div
                  className="absolute bottom-1 right-1 text-xs opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showHint ? 0.8 : 0 }}
                >
                  <span className={`px-1 py-0.5 rounded ${isOdd ? "bg-orange-200" : "bg-blue-200"}`}>
                    {num.toString().slice(-1)}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Numbers Display */}
        {oddNumbers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 rounded-xl p-4 mb-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Các số lẻ đã chọn:</h3>
            <div className="flex flex-wrap gap-2">
              {oddNumbers.map((num, index) => (
                <motion.span
                  key={num}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
                >
                  {num} ✓
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

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
                  feedback.includes("❌")
                    ? "bg-red-100 border-red-300 text-red-700"
                    : "bg-green-100 border-green-300 text-green-700"
                } border-2 px-6 py-3 rounded-full inline-flex items-center space-x-2 text-lg font-semibold shadow-lg`}
              >
                <span>{feedback}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {oddNumbers.length === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              onClick={() => setActivity(4.2)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              🎉 Tiếp tục hoạt động tiếp theo
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  if (activity === 4.2) {
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
              1. <span className="font-bold text-blue-600">235</span> là số lẻ vì có chữ số tận cùng là...
            </p>
            <Select onValueChange={(value) => setAnswers4_2({ ...answers4_2, q1: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chọn số" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-medium">
              2. <span className="font-bold text-green-600">132</span> là số chẵn vì có chữ số tận cùng là...
            </p>
            <Select onValueChange={(value) => setAnswers4_2({ ...answers4_2, q2: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chọn số" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-medium">
              3. <span className="font-bold text-purple-600">326</span> là số...
            </p>
            <Select onValueChange={(value) => setAnswers4_2({ ...answers4_2, q3_type: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chẵn">Chẵn</SelectItem>
                <SelectItem value="lẻ">Lẻ</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-lg font-medium">vì có chữ số tận cùng là...</p>
            <Select onValueChange={(value) => setAnswers4_2({ ...answers4_2, q3: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Chọn số" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
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

  if (activity === 4.3) {
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
          <h2 className="text-3xl font-bold text-gray-800 mb-3">🎯 Hoạt động 4.3: Sắp xếp số</h2>
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
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Số hiện tại:</h3>
          <span className="text-2xl font-bold text-purple-600">{dragNumbers.join("")}</span>
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

  // Component Droppable để tạo vùng thả
  const Droppable = ({ id, children, title }: { id: string; children: React.ReactNode; title: string }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div
        ref={setNodeRef}
        className={`p-6 border-2 rounded-xl bg-white/80 min-h-[200px] shadow-sm flex flex-col ${
          isOver ? "bg-yellow-100 border-yellow-400" : "border-teal-300"
        }`}
      >
        <h3 className="text-lg font-semibold text-teal-700 mb-4">{title}</h3>
        <div className="flex-1 overflow-y-auto max-h-[300px]">{children}</div>
      </div>
    );
  };

  // Hoạt động 4.4
  if (activity === 4.4) {
    // Tính tổng số mục để hiển thị tiến độ chính xác
    const totalAnimals = animalNumbers.length + evenAnimals.length + oddAnimals.length;
    const classifiedCount = evenAnimals.length + oddAnimals.length;

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-lg relative">
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

        {/* Completion Modal */}
        <AnimatePresence>
          {showCompletionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    🎉 Chúc mừng!
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Bạn đã hoàn thành Hoạt động 4! Sẵn sàng cho thử thách tiếp theo?
                  </p>
                  <Button
                    onClick={() => {
                      setShowCompletionModal(false);
                      setActivity(5);
                    }}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Tiếp tục
                  </Button>
                </div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-3">🎯 Hoạt động 4.4: Phân loại số và hình</h2>
          <p className="text-lg text-gray-600 bg-white/80 rounded-full px-6 py-2 inline-block shadow-sm">
            Kéo thả các số và hình vào nhóm số chẵn hoặc số lẻ.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Tiến độ</span>
            <span className="text-sm font-medium text-teal-600">
              {classifiedCount}/{totalAnimals} mục
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(totalAnimals ? classifiedCount / totalAnimals : 0) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Draggable Animal Items and Drop Zones */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleAnimalDragEnd}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Droppable id="even" title="Số chẵn">
              {evenAnimals.map((item) => (
                <SortableAnimalItem
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  number={item.number}
                  animal={item.animal}
                  image={item.image}
                />
              ))}
            </Droppable>
            <Droppable id="odd" title="Số lẻ">
              {oddAnimals.map((item) => (
                <SortableAnimalItem
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  number={item.number}
                  animal={item.animal}
                  image={item.image}
                />
              ))}
            </Droppable>
          </div>
          <SortableContext items={animalNumbers.map((item) => item.id)}>
            <div className="grid grid-cols-5 gap-4 my-6">
              {animalNumbers.map((item) => (
                <SortableAnimalItem
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  number={item.number}
                  animal={item.animal}
                  image={item.image}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

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
      </div>
    );
  }

  return null;
}