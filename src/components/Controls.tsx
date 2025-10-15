import { ArrowLeftToLine } from "lucide-react";

export default function Controls({
  seekBackward,
  togglePlay,
  seekForward,
  isPlaying,
}: {
  seekBackward: () => void;
  togglePlay: () => void;
  seekForward: () => void;
  isPlaying: boolean;
}) {
  return (
    <div className="flex justify-center gap-5 mb-8">
      <button
        onClick={seekBackward}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-xl hover:scale-110 transition-transform shadow-lg"
      >
        <ArrowLeftToLine />
      </button>
      <button
        onClick={togglePlay}
        className={`w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-2xl hover:scale-110 transition-transform shadow-lg ${
          isPlaying ? "animate-pulse" : ""
        }`}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button
        onClick={seekForward}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-xl hover:scale-110 transition-transform shadow-lg"
      >
        ⏭
      </button>
    </div>
  );
}
