"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, VolumeX } from "lucide-react";
import Activity1 from "@/components/activities/Activity1";
import Activity2 from "@/components/activities/Activity2";
import Activity3 from "@/components/activities/Activity3";
import Activity4 from "@/components/activities/Activity4";
import Activity5 from "@/components/activities/Activity5";

type AnimalNumber = {
  id: string;
  type: "number" | "image"; // <- literal types, không phải string
  number: number;
  animal?: string;
  image?: string;
};

export default function MathGame() {
  const [activity, setActivity] = useState(1);
  const [unlockedActivities, setUnlockedActivities] = useState([1]); // Theo dõi các hoạt động đã mở khóa
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");
  const [showConclusion, setShowConclusion] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [evenNumbers, setEvenNumbers] = useState<number[]>([]);
  const [oddNumbers, setOddNumbers] = useState<number[]>([]);
  const [dragNumbers, setDragNumbers] = useState([4, 7, 5, 8]);
  const [largestEven, setLargestEven] = useState("");
  const [largestOdd, setLargestOdd] = useState("");
  const [animalNumbers, setAnimalNumbers] = useState<AnimalNumber[]>([
    { id: "51", type: "number", number: 51 },
    { id: "cat-1", type: "image", number: 52, animal: "cat", image: "/imgs/cat.jpg" },
    { id: "53", type: "number", number: 53 },
    { id: "54", type: "number", number: 54 },
    { id: "55", type: "number", number: 55 },
    { id: "fish-1", type: "image", number: 56, animal: "fish", image: "/imgs/fish.webp" },
    { id: "57", type: "number", number: 57 },
    { id: "58", type: "number", number: 58 },
    { id: "59", type: "number", number: 59 },
    { id: "monkey-1", type: "image", number: 60, animal: "monkey", image: "/imgs/monkey.jpg" },
    { id: "tiger-1", type: "image", number: 61, animal: "tiger", image: "/imgs/tiger.jpg" },
    { id: "62", type: "number", number: 62 },
    { id: "63", type: "number", number: 63 },
    { id: "dog-1", type: "image", number: 64, animal: "dog", image: "/imgs/dog.jpg" },
    { id: "65", type: "number", number: 65 },
    { id: "66", type: "number", number: 66 },
    { id: "bear-1", type: "image", number: 67, animal: "bear", image: "/imgs/bear.jpg" },
    { id: "68", type: "number", number: 68 },
    { id: "snake-1", type: "image", number: 69, animal: "snake", image: "/imgs/snake.jpg" },
    { id: "70", type: "number", number: 70 },
    { id: "71", type: "number", number: 71 },
    { id: "72", type: "number", number: 72 },
    { id: "lion-1", type: "image", number: 73, animal: "lion", image: "/imgs/lion.jpg" },
    { id: "74", type: "number", number: 74 },
    { id: "75", type: "number", number: 75 },
    { id: "76", type: "number", number: 76 },
    { id: "77", type: "number", number: 77 },
    { id: "bug-1", type: "image", number: 78, animal: "bug", image: "/imgs/bug.webp" },
    { id: "79", type: "number", number: 79 },
    { id: "80", type: "number", number: 80 },
  ]);
  const [streetNumbers, setStreetNumbers] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle music play/pause based on isMusicPlaying
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isMusicPlaying) {
        audio.play().catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsMusicPlaying(false); // Disable if autoplay fails
        });
      } else {
        audio.pause();
      }
    }
  }, [isMusicPlaying]);

  // Unlock the next activity when the current one is completed
  useEffect(() => {
    if (!unlockedActivities.includes(activity + 1)) {
      setUnlockedActivities((prev) => {
        const nextActivity = activity + 1;
        if (nextActivity <= 5 && !prev.includes(nextActivity)) {
          return [...prev, nextActivity];
        }
        return prev;
      });
    }
  }, [activity, unlockedActivities]);

  // Toggle music play/pause
  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  // Handle navigation button click
  const handleNavClick = (targetActivity: number) => {
    if (unlockedActivities.includes(targetActivity)) {
      setActivity(targetActivity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl relative">
        {/* Music toggle button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
          >
            {isMusicPlaying ? <Music className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>
        <CardHeader>
          <CardTitle className="text-5xl font-bold text-center">
            Số Chẵn & Số Lẻ
          </CardTitle>
          <CardTitle className="text-5xl font-bold text-center underline">
            Lớp 4
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Navigation Bar */}
          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3, 4, 5].map((act) => (
              <Button
                key={act}
                onClick={() => handleNavClick(act)}
                disabled={!unlockedActivities.includes(act)}
                className={`${
                  activity === act
                    ? "bg-blue-600 text-white"
                    : unlockedActivities.includes(act)
                    ? "bg-blue-400 hover:bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } px-6 py-2 text-lg font-semibold rounded-full transition-all`}
              >
                Hoạt động {act}
              </Button>
            ))}
          </div>

          {activity === 1 && (
            <Activity1
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              feedback={feedback}
              setFeedback={setFeedback}
              setActivity={setActivity}
            />
          )}
          {activity === 2 && (
            <Activity2
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
              feedback=""
              setFeedback={setFeedback}
              showConclusion={showConclusion}
              setShowConclusion={setShowConclusion}
              setActivity={setActivity}
            />
          )}
          {activity === 3 && (
            <Activity3
              evenNumbers={evenNumbers}
              setEvenNumbers={setEvenNumbers}
              feedback={feedback}
              setFeedback={setFeedback}
              showConclusion={showConclusion}
              setShowConclusion={setShowConclusion}
              setActivity={setActivity}
            />
          )}
          {(activity === 4 || activity === 4.2 || activity === 4.3 || activity === 4.4) && (
            <Activity4
              activity={activity}
              setActivity={setActivity}
              oddNumbers={oddNumbers}
              setOddNumbers={setOddNumbers}
              feedback={feedback}
              setFeedback={setFeedback}
              dragNumbers={dragNumbers}
              setDragNumbers={setDragNumbers}
              largestEven={largestEven}
              setLargestEven={setLargestEven}
              largestOdd={largestOdd}
              setLargestOdd={setLargestOdd}
              animalNumbers={animalNumbers}
              setAnimalNumbers={setAnimalNumbers}
            />
          )}
          {activity === 5 && (
            <Activity5
              streetNumbers={streetNumbers}
              setStreetNumbers={setStreetNumbers}
              feedback=''
              setFeedback={setFeedback}
            />
          )}
        </CardContent>
      </Card>
      {/* Audio element for background music */}
      <audio ref={audioRef} loop>
        <source src="./sounds/bg.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}