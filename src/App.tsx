import React, { useState, useEffect, useRef, type ChangeEvent } from "react";
import AcceleratingMusicPlayer from "./components/AcceleratingMusicPlayer";

interface Track {
  name: string;
  fileName: string;
  url: string;
}

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [startSpeed, setStartSpeed] = useState<number>(1.0);
  const [maxSpeed, setMaxSpeed] = useState<number>(2.0);
  const [acceleration, setAcceleration] = useState<number>(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speedIntervalRef = useRef<number | null>(null);

  // Start speed acceleration interval
  useEffect(() => {
    if (isPlaying) {
      if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);

      speedIntervalRef.current = setInterval(() => {
        if (!audioRef.current || !audioRef.current.duration) return;

        const currentProgress =
          audioRef.current.currentTime / audioRef.current.duration;
        const speedRange = maxSpeed - startSpeed;
        const accelerationCurve = Math.pow(currentProgress, 1 / acceleration);
        const newSpeed = startSpeed + speedRange * accelerationCurve;
        const clampedSpeed = Math.min(maxSpeed, Math.max(startSpeed, newSpeed));

        audioRef.current.playbackRate = clampedSpeed;
        setPlaybackSpeed(clampedSpeed);
      }, 500);
    } else if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
    }

    return () => {
      if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    };
  }, [isPlaying, startSpeed, maxSpeed, acceleration]);

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCurrentTrack({
      name: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
      url: url,
    });

    if (audioRef.current) audioRef.current.src = url;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!currentTrack) {
      alert("Please select an audio file first!");
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  // Seek backward/forward
  const seekBackward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
  };

  const seekForward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.playbackRate = startSpeed;
      setPlaybackSpeed(startSpeed);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.playbackRate = startSpeed;
      setPlaybackSpeed(startSpeed);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <AcceleratingMusicPlayer
        handleFileChange={handleFileChange}
        currentTrack={currentTrack}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        formatTime={formatTime}
        seekBackward={seekBackward}
        togglePlay={togglePlay}
        seekForward={seekForward}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        startSpeed={startSpeed}
        setStartSpeed={setStartSpeed}
        maxSpeed={maxSpeed}
        setMaxSpeed={setMaxSpeed}
        acceleration={acceleration}
        setAcceleration={setAcceleration}
        audioRef={audioRef}
        handleLoadedMetadata={handleLoadedMetadata}
        handleTimeUpdate={handleTimeUpdate}
        handleEnded={handleEnded}
      />
    </>
  );
};

export default App;
