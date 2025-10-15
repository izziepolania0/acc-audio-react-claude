interface Track {
  name: string;
  fileName: string;
  url: string;
}

export default function TrackInfo({
  currentTrack,
}: {
  currentTrack: Track | null;
}) {
  return (
    <div className="mb-8 min-h-[60px] text-center">
      <div className="text-xl font-bold text-white mb-1">
        {currentTrack ? currentTrack.name : "No track selected"}
      </div>
      <div className="text-sm text-white/80">
        {currentTrack
          ? `File: ${currentTrack.fileName}`
          : "Select an audio file to begin"}
      </div>
    </div>
  );
}
