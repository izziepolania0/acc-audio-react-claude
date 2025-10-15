import Settings from "./Settings";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import SpeedInfo from "./SpeedInfo";
import TrackInfo from "./TrackInfo";
import FileInput from "./FileInput";
import React from "react";

export default function AcceleratingMusicPlayer({
  handleFileChange,
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
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTrack: { name: string; fileName: string; url: string } | null;
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

        {/* File Input */}
        <FileInput handleFileChange={handleFileChange} />

        {/* Track Info */}
        <TrackInfo currentTrack={currentTrack} />

        {/* Progress Bar */}
        <ProgressBar
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
        />

        {/* Controls */}
        <Controls
          seekBackward={seekBackward}
          togglePlay={togglePlay}
          seekForward={seekForward}
          isPlaying={isPlaying}
        />

        {/* Speed Info */}
        <SpeedInfo playbackSpeed={playbackSpeed} />

        {/* Settings */}
        <Settings
          startSpeed={startSpeed}
          setStartSpeed={setStartSpeed}
          maxSpeed={maxSpeed}
          setMaxSpeed={setMaxSpeed}
          acceleration={acceleration}
          setAcceleration={setAcceleration}
        />

        {/* Hidden Audio Element */}
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
