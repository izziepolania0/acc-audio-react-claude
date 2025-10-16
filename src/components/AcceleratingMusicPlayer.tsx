import Settings from "./Settings";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import SpeedInfo from "./SpeedInfo";
import TrackInfo from "./TrackInfo";
import React from "react";

export default function AcceleratingMusicPlayer({
  songs,
  handleSelectTrack,
  currentTrack,
  progress,
  currentTime,
  duration,
  formatTime,
  seekBackward,
  togglePlay,
  seekForward,
  isPlaying,
  playbackSpeed,
  startSpeed,
  setStartSpeed,
  maxSpeed,
  setMaxSpeed,
  acceleration,
  setAcceleration,
  audioRef,
  handleLoadedMetadata,
  handleTimeUpdate,
  handleEnded,
}: {
  songs: { name: string; fileName: string; url: string; albumArt: string }[];
  handleSelectTrack: (fileName: string) => void;
  currentTrack: {
    name: string;
    fileName: string;
    url: string;
    albumArt: string;
  } | null;
  progress: number;
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
  seekBackward: () => void;
  togglePlay: () => void;
  seekForward: () => void;
  isPlaying: boolean;
  playbackSpeed: number;
  startSpeed: number;
  setStartSpeed: (speed: number) => void;
  maxSpeed: number;
  setMaxSpeed: (speed: number) => void;
  acceleration: number;
  setAcceleration: (value: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  handleLoadedMetadata: () => void;
  handleTimeUpdate: () => void;
  handleEnded: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          🚀 Accelerating Player
        </h1>

        {/* Track Selector */}
        <div className="mb-6 text-center">
          <select
            className="px-4 py-2 rounded-lg bg-white/20 text-white cursor-pointer"
            onChange={(e) => handleSelectTrack(e.target.value)}
            value={currentTrack?.fileName || ""}
          >
            <option value="">Select a Track</option>
            {songs.map((song) => (
              <option key={song.fileName} value={song.fileName}>
                {song.name}
              </option>
            ))}
          </select>
        </div>

        {/* Track Info (with album art) */}
        <TrackInfo currentTrack={currentTrack} />

        <ProgressBar
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
        />

        <Controls
          seekBackward={seekBackward}
          togglePlay={togglePlay}
          seekForward={seekForward}
          isPlaying={isPlaying}
        />

        <SpeedInfo playbackSpeed={playbackSpeed} />

        <Settings
          startSpeed={startSpeed}
          setStartSpeed={setStartSpeed}
          maxSpeed={maxSpeed}
          setMaxSpeed={setMaxSpeed}
          acceleration={acceleration}
          setAcceleration={setAcceleration}
        />

        <audio
          ref={audioRef}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="auto"
        />
      </div>
    </div>
  );
}
