export default function SpeedInfo({
  playbackSpeed,
}: {
  playbackSpeed: number;
}) {
  return (
    <div className="bg-white/10 rounded-2xl p-6 mb-6">
      <div className="text-3xl font-bold text-teal-300 mb-2 text-center">
        {playbackSpeed.toFixed(2)}x
      </div>
      <div className="text-sm text-white/50 text-center leading-relaxed">
        <p>Speed increases as the song progresses.</p>
        <p>The longer you listen, the faster it gets!</p>
      </div>
    </div>
  );
}
