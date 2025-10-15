export default function ProgressBar({
  progress,
  currentTime,
  duration,
  formatTime,
}: {
  progress: number;
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
}) {
  return (
    <div className="mb-6">
      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-green-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-white/80">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
