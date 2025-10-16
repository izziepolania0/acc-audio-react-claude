interface Track {
  name: string;
  fileName: string;
  url: string;
  albumArt: string;
}

export default function TrackInfo({
  currentTrack,
}: {
  currentTrack: Track | null;
}) {
  return (
    <div className="mb-8 text-center">
      {currentTrack ? (
        <>
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.name}
            className="w-40 h-40 mx-auto mb-4 rounded-xl shadow-lg object-cover"
          />
          <div className="text-xl font-bold text-white mb-1">
            {currentTrack.name}
          </div>
          <div className="text-sm text-white/80">{currentTrack.fileName}</div>
        </>
      ) : (
        <div className="text-white/80">Select a track to begin</div>
      )}
    </div>
  );
}
