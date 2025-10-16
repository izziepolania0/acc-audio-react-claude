import React, { useState, useEffect, useRef } from "react";
import AcceleratingMusicPlayer from "./components/AcceleratingMusicPlayer";

interface Track {
  name: string;
  fileName: string;
  url: string;
  albumArt: string;
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

  const songs: Track[] = [
    {
      name: "Aidan",
      fileName: "Aidan.mp3",
      url: "/songs/Aidan.mp3",
      albumArt: "public/albumArt/Aidan.jpg",
    },
    {
      name: "Autumn Sun",
      fileName: "autumn_sun.mp3",
      url: "/songs/autumn_sun.mp3",
      albumArt: "public/albumArt/autumn_sun.png",
    },
    {
      name: "Best Part of Me",
      fileName: "best_part_of_me.mp3",
      url: "/songs/best_part_of_me.mp3",
      albumArt: "public/albumArt/BestPart.jpg",
    },
    {
      name: "Better Days",
      fileName: "Better Days - LAKEY INSPIRED.mp3",
      url: "/songs/Better Days - LAKEY INSPIRED.mp3",
      albumArt: "public/albumArt/Better Days.jpg",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);

      speedIntervalRef.current = window.setInterval(() => {
        if (!audioRef.current || !audioRef.current.duration) return;

        const progress =
          audioRef.current.currentTime / audioRef.current.duration;
        const speedRange = maxSpeed - startSpeed;
        const accelerationCurve = Math.pow(progress, 1 / acceleration);
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

  const togglePlay = () => {
    if (!currentTrack) {
      alert("Please select a track!");
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

  const seekBackward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
  };

  const seekForward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${minutes}:${remaining.toString().padStart(2, "0")}`;
  };

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

  const handleSelectTrack = (fileName: string) => {
    const track = songs.find((t) => t.fileName === fileName);
    if (track && audioRef.current) {
      setCurrentTrack(track);
      audioRef.current.src = track.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <AcceleratingMusicPlayer
        songs={songs}
        handleSelectTrack={handleSelectTrack}
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
