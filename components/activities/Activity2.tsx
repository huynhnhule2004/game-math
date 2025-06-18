"use client";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Activity2Props {
  selectedNumber: string;
  setSelectedNumber: (number: string) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
  showConclusion: boolean;
  setShowConclusion: (show: boolean) => void;
  setActivity: (activity: number) => void;
}

export default function Activity2({
  selectedNumber,
  setSelectedNumber,
  feedback,
  setFeedback,
  showConclusion,
  setShowConclusion,
  setActivity,
}: Activity2Props) {
  // Initialize sound effects
  const correctSound = new Audio("/sounds/correct.mp3");
  const wrongSound = new Audio("/sounds/wrong.mp3");

  const handleNumberInput = (value: string) => {
    setSelectedNumber(value);
    
    if (value === "2") {
      setFeedback("Chính xác! 🎉");
      correctSound.play().catch((error) => console.error("Error playing correct sound:", error));
      setTimeout(() => setShowConclusion(true), 800);
    } else if (value !== "") {
      setFeedback("Thử lại nhé! 🤔");
      wrongSound.play().catch((error) => console.error("Error playing wrong sound:", error));
    } else {
      setFeedback("");
    }
  };

  const handleNextActivity = () => {
    setShowConclusion(false);
    setSelectedNumber("");
    setFeedback("");
    setActivity(3);
  };

  const handleCloseDialog = () => {
    setShowConclusion(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="pb-2 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Hoạt động 2: &quot;Số chia hết&quot;
          </h1>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30"
        >
          {/* Question Section */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-8 shadow-lg border border-amber-200"
            >
              <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                Số cá chia hết cho Do Do và Bu Bu là những số chia hết cho...
              </p>
            </motion.div>

            {/* Number Input */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col items-center mb-8"
            >
              <label className="text-lg font-medium text-gray-700 mb-3">
                Nhập số:
              </label>
              <Input
                type="text"
                value={selectedNumber}
                onChange={(e) => handleNumberInput(e.target.value)}
                placeholder="?"
                className="w-32 h-16 text-3xl font-bold text-center bg-white border-4 border-purple-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-2">Nhập số bạn nghĩ đúng</p>
            </motion.div>

            {/* Feedback */}
            {feedback && (
              <motion.div
                key={feedback}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ type: "spring", duration: 0.6 }}
                className={`inline-flex items-center px-8 py-4 rounded-full font-bold text-xl shadow-2xl ${
                  feedback.includes("Chính xác")
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                }`}
              >
                <span className="mr-2 text-2xl">
                  {feedback.includes("Chính xác") ? "🎉" : "🤔"}
                </span>
                {feedback}
              </motion.div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>
          <div className="absolute bottom-10 right-10 w-6 h-6 bg-purple-200 rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-8 w-4 h-4 bg-pink-200 rounded-full opacity-60"></div>
        </motion.div>
      </motion.div>

      {/* Conclusion Dialog */}
      <Dialog open={showConclusion} onOpenChange={setShowConclusion}>
        <DialogContent className="max-w-xs md:!max-w-xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-300 rounded-3xl shadow-2xl">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl"
            >
              <span className="text-3xl">🎯</span>
            </motion.div>
            <DialogTitle className="text-3xl font-bold text-green-800 mb-4 text-center">
              Tuyệt vời! 🎉
            </DialogTitle>
            <DialogDescription asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/80 rounded-2xl p-6 shadow-lg border-2 border-green-200"
              >
                <div className="space-y-4">
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">
                    Những số chia hết cho 2 còn gọi là số{" "}
                    <span className="font-bold text-blue-700 bg-blue-100 px-3 py-2 rounded-xl shadow-sm">
                      CHẴN
                    </span>
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">
                    Những số không chia hết cho 2 còn gọi là số{" "}
                    <span className="font-bold text-purple-700 bg-purple-100 px-3 py-2 rounded-xl shadow-sm">
                      LẺ
                    </span>
                  </p>
                </div>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mt-8 justify-center"
          >
            <Button
              onClick={handleCloseDialog}
              className="px-6 py-3 text-lg font-bold rounded-2xl bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Đóng
            </Button>
            <Button
              onClick={handleNextActivity}
              className="px-8 py-3 text-lg font-bold rounded-2xl transition-all duration-300 transform bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 hover:from-blue-600 hover:via-purple-700 hover:to-blue-800 text-white hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Hoạt động tiếp theo 🚀
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}