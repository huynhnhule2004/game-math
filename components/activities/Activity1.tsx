"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";

// Ensure tsconfig.json includes:
// {
//   "compilerOptions": {
//     "jsx": "react-jsx",
//     "module": "esnext",
//     "moduleResolution": "node"
//   }
// }
// Also, ensure `framer-motion` is installed: `npm install framer-motion`

interface Activity1Props {
  selectedCards: number[];
  setSelectedCards: (cards: number[]) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
  setActivity: (activity: number) => void;
}

export default function Activity1({
  selectedCards,
  setSelectedCards,
  feedback,
  setFeedback,
  setActivity,
}: Activity1Props) {
  const [showModal, setShowModal] = useState(false);

  // Sound effects function
  const playSound = (type: "correct" | "wrong" | "select") => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      if (type === "correct") {
        oscillator.frequency.setValueAtTime(523.25, context.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, context.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, context.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.5);
      } else if (type === "wrong") {
        oscillator.frequency.setValueAtTime(200, context.currentTime);
        oscillator.frequency.setValueAtTime(150, context.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.4);
      } else if (type === "select") {
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        gainNode.gain.setValueAtTime(0.2, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
      }
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  // Function to play correct.mp3 when modal appears
  const playModalSound = () => {
    try {
      const audio = new Audio("/sounds/correct.mp3");
      audio.play().catch((e) => console.log("Error playing modal sound:", e));
    } catch (e) {
      console.log("Audio not supported for modal sound");
    }
  };

  // Trigger modal sound when showModal changes to true
  useEffect(() => {
    if (showModal) {
      playModalSound();
    }
  }, [showModal]);

  const handleCardSelect = (num: number) => {
    playSound("select");
    let newSelectedCards: number[];

    if (selectedCards.includes(num)) {
      newSelectedCards = selectedCards.filter((n) => n !== num);
      setSelectedCards(newSelectedCards);
      setFeedback(`Đã bỏ chọn giỏ ${num} con cá. Chọn ${5 - newSelectedCards.length} giỏ nữa nhé!`);
    } else if (selectedCards.length < 5) {
      newSelectedCards = [...selectedCards, num];
      setSelectedCards(newSelectedCards);
      const isEven = num % 2 === 0;
      if (isEven) {
        playSound("correct");
        setFeedback(`Tốt lắm! Giỏ ${num} con cá có thể chia đều cho 2 bé mèo. Các bé mèo rất hạnh phúc!`);
        if (newSelectedCards.length === 5 && newSelectedCards.every((n) => n % 2 === 0)) {
          setFeedback("Tuyệt vời! Tất cả giỏ cá đều chia được cho 2 bé mèo!");
          setTimeout(() => setShowModal(true), 1000);
        }
      } else {
        playSound("wrong");
        setFeedback(`Ôi không! ${num} con cá không thể chia đều cho 2 bé mèo. Các bé giành nhau mất rồi!`);
        setTimeout(() => setSelectedCards(newSelectedCards.filter((n) => n !== num)), 2000);
      }
    } else {
      return;
    }

    if (newSelectedCards.length > 0 && newSelectedCards.length < 5 && !newSelectedCards.includes(num)) {
      setFeedback(`Đã chọn ${newSelectedCards.length}/5 giỏ cá. Chọn ${5 - newSelectedCards.length} giỏ nữa nhé!`);
    } else if (newSelectedCards.length === 0) {
      setFeedback("Hãy chọn 5 giỏ cá để chia đều cho 2 bé mèo!");
    }
  };

  const handleNextActivity = () => {
    playSound("correct");
    setShowModal(false);
    setActivity(2);
  };

  const BasketCard = ({ num }: { num: number }) => {
    const isSelected = selectedCards.includes(num);

    return (
      <motion.div
        whileHover={{ scale: 1.08, y: -8 }}
        whileTap={{ scale: 0.92 }}
        className={`relative cursor-pointer transition-all duration-300 ${isSelected ? "z-10" : ""}`}
        onClick={() => handleCardSelect(num)}
      >
        <div
          className={`
          relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-3xl border-4 transition-all duration-300 shadow-xl
          ${isSelected
              ? "border-yellow-400 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 shadow-yellow-400/60 shadow-2xl transform rotate-2 scale-105"
              : "border-amber-600 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 hover:shadow-2xl hover:border-amber-500 hover:scale-102"
            }
        `}
        >
          <div className="absolute inset-2 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl opacity-25"></div>
          <div className="absolute inset-1 border-2 border-amber-800 rounded-2xl opacity-35"></div>
          <div className="absolute inset-3 border-2 border-amber-600 rounded-xl opacity-25"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg opacity-40"></div>

          <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-1 p-3 overflow-hidden">
            {Array.from({ length: Math.min(num, 6) }, (_, i) => (
              <motion.div
                key={i}
                className="text-sm sm:text-base"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
              >
                🐟
              </motion.div>
            ))}
            {num > 6 && (
              <div className="text-xs sm:text-sm font-bold text-amber-800 bg-white/80 rounded-full px-2 py-1">
                +{num - 6}
              </div>
            )}
          </div>

          <div className="absolute -bottom-3 -right-3 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-xl border-3 border-white">
            {num}
          </div>

          {isSelected && (
            <motion.div
              className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl border-3 border-white"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 20 }}
            >
              <span className="text-white text-lg font-bold">✓</span>
            </motion.div>
          )}

          {num % 2 === 0 && (
            <motion.div
              className="absolute top-2 right-2 text-yellow-400 text-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // Determine which images to show in the bottom-right corner
  const getCatImages = () => {
    if (feedback.includes("Tuyệt vời") || feedback.includes("Tốt lắm")) {
      return [{ src: "/imgs/happy.png", alt: "Happy Cats", name: "Happy Cats" }];
    } else if (feedback.includes("Ôi không")) {
      return [{ src: "/imgs/fighting.png", alt: "Fighting Cats", name: "Fighting Cats" }];
    } else {
      return [
        { src: "/imgs/DoDo.png", alt: "Do Do Cat", name: "Do Do" },
        { src: "/imgs/BuBu.png", alt: "Bu Bu Cat", name: "Bu Bu" },
      ];
    }
  };

  const catImages = getCatImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-yellow-50 p-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🐟</div>
      <div className="absolute top-20 right-20 text-4xl opacity-20 animate-pulse">✨</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🐾</div>

      <div className="mx-auto relative">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="pb-2 text-4xl sm:text-5xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6 drop-shadow-lg"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐱 Hoạt động 1: "Chia cá cho mèo" 🐟
            
          </motion.h2>
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl border border-purple-200 mx-auto max-w-6xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
              🎯 <strong className="text-purple-700">Thể lệ:</strong> Hai bé mèo phải được ăn cùng loại cá và số lượng giống nhau.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed60 leading-relaxed mb-6">
              Các bạn hãy chọn <strong className="text-pink-600">5 giỏ cá</strong> có số lượng chia đều được cho 2 bé.
              Nếu số lượng cá chia không đều thì 2 bé mèo sẽ dành nhau.
            </p>
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 shadow-lg border border-purple-200"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold text-purple-700">Đã chọn: {selectedCards.length}/5</span>
              <span className="text-2xl">🛒</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-5 gap-4 sm:gap-6 md:gap-10 lg:gap-12 mb-12 justify-items-center max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 100, rotate: -180 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                delay: num * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <BasketCard num={num} />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className={`
                text-center p-8 rounded-3xl shadow-2xl mb-8 border-4 transition-all duration-500 mx-auto
                ${feedback.includes("Tuyệt vời") || feedback.includes("Tốt lắm")
                  ? "bg-gradient-to-r from-green-100 via-green-200 to-green-300 border-green-400 shadow-green-300/60"
                  : "bg-gradient-to-r from-red-100 via-red-200 to-red-300 border-red-400 shadow-red-300/60"
                }
              `}
            >
              <p className="text-lg md:text-xl font-semibold text-gray-800 mb-andoli6 mb-6">{feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <motion.div
          className="mt-12 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200 rounded-3 the-3xl p-6 border-2 border-yellow-300 shadow-xl mx-auto max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-center text-lg md:text-xl text-gray-700">
            💡 <strong className="text-orange-600">Gợi ý:</strong> Tìm những giỏ có số cá chẵn (2, 4, 6, 8, 10) để chia đều cho 2 bé mèo nhé!
            <motion.span
              className="inline-block ml-2 text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </p>
        </motion.div> */}
      </div>

      <motion.div
        className="fixed bottom-4 right-4 z-20"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex space-x-4">
          {catImages.map((cat) => (
            <motion.div
              key={cat.name}
              className="text-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="text-sm font-bold text-purple-700 mb-1">{cat.name} 🐱</div>
              <div className="relative">
                <Image
                  src={cat.src}
                  alt={cat.alt}
                  width={catImages.length === 1 ? 250 : 100}
                  height={catImages.length === 1 ? 250 : 100}
                  className="rounded-xl shadow-lg border-2 border-purple-200"
                />
                {(feedback.includes("Tuyệt vời") || feedback.includes("Tốt lắm")) && (
                  <motion.div
                    className="absolute -top-1 -right-1 text-lg"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    😸
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-blue-400"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
                  Bạn đã hoàn thành xuất sắc hoạt động 1!
                  Hai bé mèo đã có thể chia đều cá rồi! 🐱💕🐱
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-lg font-bold rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-300"
                  >
                    Đóng
                  </Button>
                  <Button
                    onClick={handleNextActivity}
                    className="px-8 py-3 text-lg font-bold rounded-2xl transition-all duration-300 transform bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 text-white hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    Hoạt động tiếp theo 🚀
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}