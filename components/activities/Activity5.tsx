"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, X } from "lucide-react";

interface Activity5Props {
  streetNumbers: string;
  setStreetNumbers: (numbers: string) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
}

export default function Activity5({
  feedback,
  setFeedback,
}: Activity5Props) {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      <div className="bg-yellow-50 p-3 rounded-lg">
        <p className="font-semibold text-yellow-800 mb-2">💡 Gợi ý:</p>
        <p>Quan sát kỹ hình ảnh và đếm xem có bao nhiêu ngôi nhà.</p>
        <p>Nhớ rằng mỗi bên đường sẽ có số nhà riêng!</p>
      </div>
    </div>
  );

  const playSound = (soundFile: string) => {
    try {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.play();
    } catch (error) {
      console.log("Không thể phát âm thanh:", error);
    }
  };

  const checkActivity5 = () => {
    const answer = userAnswer.trim();
    if (answer === "50") {
      setFeedback("Chính xác! Chúc mừng bạn đã hoàn thành trò chơi! 🎉");
      setShowModal(true);
      playSound("correct.mp3");
    } else {
      setFeedback("Sai rồi! Thử lại nhé. 😅");
      playSound("wrong.mp3");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 relative"
      >
        <h2 className="text-3xl font-bold mb-3 text-gray-800">
          🎯 Hoạt động 5: Đánh số nhà
        </h2>
        <p className="text-lg text-gray-700 bg-white/80 rounded-xl px-6 py-3 shadow-md">
          Quan sát hình ảnh đường phố bên dưới và trả lời câu hỏi!
        </p>

        {/* Light Bulb Hint Button */}
        <motion.button
          onClick={() => setShowHint(!showHint)}
          className="absolute top-0 right-0 p-3 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb className="w-6 h-6 text-yellow-900" />
        </motion.button>
      </motion.div>

      {/* Street Image Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 relative"
      >
        <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="relative overflow-hidden rounded-xl">
            <img
              src="/imgs/street.jpg"
              alt="Đường phố với các ngôi nhà"
              className="w-full h-64 md:h-[500px] object-fill"
            />

            {/* Overlay labels để chỉ rõ bên trái và bên phải */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-full font-bold shadow-lg">
              ← BÊN TRÁI: SỐ LẺ
            </div>
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-full font-bold shadow-lg">
              BÊN PHẢI: SỐ CHẴN →
            </div>

            {/* Mũi tên chỉ hướng */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
              ↑ HƯỚNG ĐI TỪ BÉ ĐẾN LỚN ↑
            </div>
          </div>

          <p className="text-center mt-3 text-gray-600 font-medium">
            Quan sát hình ảnh trên và trả lời câu hỏi bên dưới!
          </p>
        </div>
      </motion.div>

      {/* Question Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            ❓ Câu hỏi
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-lg text-gray-700 text-center">
              Điền vào chỗ ... trên hình là số bao nhiêu?
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className=" ml-2 w-20 p-3 text-xl font-bold text-center border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                placeholder="?"
              />
            </p>
          </div>

        </div>
      </motion.div>

      {/* Check Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center mb-6"
      >
        <Button
          onClick={checkActivity5}
          disabled={!userAnswer.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔍 Kiểm tra đáp án
        </Button>
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-6"
          >
            <div
              className={`${feedback.includes("Chính xác")
                ? "bg-green-100 border-green-300 text-green-700"
                : "bg-red-100 border-red-300 text-red-700"
                } border-2 px-6 py-4 rounded-xl inline-flex items-center space-x-2 text-lg font-semibold shadow-lg`}
            >
              <span>{feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              onClick={e => e.stopPropagation()}
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

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-blue-400"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Nút đóng modal */}
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                  Chúc mừng!
                </h3>
                <p className="text-xl text-gray-700 mb-6">
                  Bạn đã hoàn thành xuất sắc bài học hôm nay
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}