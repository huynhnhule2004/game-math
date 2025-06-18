"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Activity3Props {
  evenNumbers: number[];
  setEvenNumbers: (numbers: number[]) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
  showConclusion: boolean;
  setShowConclusion: (show: boolean) => void;
  setActivity: (activity: number) => void;
}

export default function Activity3({
  evenNumbers,
  setEvenNumbers,
  feedback,
  setFeedback,
  showConclusion,
  setShowConclusion,
  setActivity,
}: Activity3Props) {
  const [clickedNumber, setClickedNumber] = useState<number | null>(null);
  
  // Initialize audio objects
  const correctSound = typeof Audio !== "undefined" ? new Audio("/sounds/correct.mp3") : null;
  const wrongSound = typeof Audio !== "undefined" ? new Audio("/sounds/wrong.mp3") : null;

  const handleEvenSelect = (num: number) => {
    setClickedNumber(num);
    
    if (num % 2 === 0) {
      // Play correct sound
      if (correctSound) {
        correctSound.play().catch((e) => console.log("Error playing correct sound:", e));
      }
      // Số chẵn - thêm vào danh sách
      setTimeout(() => {
        setEvenNumbers([...evenNumbers, num]);
        setClickedNumber(null);
      }, 300);
      
      // Kiểm tra hoàn thành
      if (evenNumbers.length + 1 === 10) {
        setTimeout(() => {
          setShowConclusion(true);
        }, 800);
      }
    } else {
      // Play wrong sound
      if (wrongSound) {
        wrongSound.play().catch((e) => console.log("Error playing wrong sound:", e));
      }
      // Số lẻ - hiện feedback lỗi
      setFeedback("❌ Chọn lại!");
      setTimeout(() => {
        setFeedback("");
        setClickedNumber(null);
      }, 1200);
    }
  };

  const handleNextActivity = () => {
    setShowConclusion(false);
    setActivity(4);
  };

  const isSelected = (num: number) => evenNumbers.includes(num);
  const isEven = (num: number) => num % 2 === 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          🎯 Hoạt động 3: Chọn số chẵn
        </h2>
        <p className="text-lg text-gray-600 bg-white/80 rounded-full px-6 py-2 inline-block shadow-sm">
          Chọn các số chẵn trong dãy số sau:
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Tiến độ</span>
          <span className="text-sm font-medium text-blue-600">
            {evenNumbers.length}/10
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(evenNumbers.length / 10) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Numbers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[...Array(20).keys()].map((i) => i + 1).map((num) => (
          <motion.div
            key={num}
            className={`
              relative p-4 rounded-xl text-center cursor-pointer text-xl font-bold
              transition-all duration-300 select-none
              ${isSelected(num)
                ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg ring-4 ring-green-200"
                : "bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg border-2 border-transparent hover:border-blue-200"
              }
              ${clickedNumber === num && !isEven(num) ? "animate-pulse bg-red-100 border-red-300" : ""}
            `}
            onClick={() => !isSelected(num) && handleEvenSelect(num)}
            whileHover={!isSelected(num) ? { scale: 1.05, y: -2 } : {}}
            whileTap={{ scale: 0.95 }}
            animate={
              isSelected(num)
                ? {
                    scale: [1, 1.2, 1.1],
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                : clickedNumber === num && !isEven(num)
                ? {
                    x: [-3, 3, -3, 3, 0],
                    transition: { duration: 0.4 }
                  }
                : {}
            }
            layout
          >
            <span className="relative z-10">{num}</span>
            {isSelected(num) && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-xl"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              />
            )}
            {isSelected(num) && (
              <motion.span
                className="absolute top-1 right-1 text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                ✓
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="text-center mb-4"
          >
            <div className="bg-red-100 border-2 border-red-300 text-red-700 px-6 py-3 rounded-full inline-flex items-center space-x-2 text-lg font-semibold shadow-lg">
              <span>{feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Numbers Display */}
      {evenNumbers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 rounded-xl p-4 mb-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Các số chẵn đã chọn:
          </h3>
          <div className="flex flex-wrap gap-2">
            {evenNumbers.map((num, index) => (
              <motion.span
                key={num}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
              >
                {num}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      {evenNumbers.length === 10 && !showConclusion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Button
            onClick={handleNextActivity}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-xs md:text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🎉 Tiếp tục hoạt động tiếp theo
          </Button>
        </motion.div>
      )}

      {/* Conclusion Dialog */}
      <AnimatePresence>
        {showConclusion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-6 text-center shadow-lg max-w-xs md:max-w-lg w-full mx-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-4xl mb-3"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Chúc mừng! Bạn đã hoàn thành!
              </h3>
              <div className="bg-white/90 rounded-xl p-4 text-left mb-6">
                <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                  <span className="text-green-600">📝 Kết luận:</span><br/>
                  • Các số có tận cùng là <span className="bg-green-200 px-2 py-1 rounded font-bold">0, 2, 4, 6, 8</span> là <span className="text-green-600 font-bold">số chẵn</span><br/>
                  • Các số có tận cùng là <span className="bg-blue-200 px-2 py-1 rounded font-bold">1, 3, 5, 7, 9</span> là <span className="text-blue-600 font-bold">số lẻ</span>
                </p>
              </div>
              <div className="flex space-x-2 md:space-x-4 justify-center">
                <Button
                  onClick={() => setShowConclusion(false)}
                  className="px-6 py-3 text-xs md:text-lg font-bold rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-300"
                >
                  Đóng
                </Button>
                <Button
                  onClick={handleNextActivity}
                  className="px-8 py-3 text-xs md:text-lg font-bold rounded-2xl transition-all duration-300 transform bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 text-white hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Hoạt động tiếp theo 🚀
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}