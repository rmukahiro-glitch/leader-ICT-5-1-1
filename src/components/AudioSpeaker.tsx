import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { speakText, stopAllSpeech } from "../utils/tts";

interface AudioSpeakerProps {
  id: string; // Unique ID to keep track of active speaker
  text: string;
  voice?: string; // 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr'
}

// Global state to track currently playing speaker ID
let currentPlayingId: string | null = null;
const listeners: Set<(id: string | null) => void> = new Set();

function setCurrentPlaying(id: string | null) {
  currentPlayingId = id;
  listeners.forEach((listener) => listener(id));
}

export default function AudioSpeaker({ id, text, voice = "Kore" }: AudioSpeakerProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "playing">("idle");

  useEffect(() => {
    const handleGlobalChange = (activeId: string | null) => {
      if (activeId !== id) {
        setStatus("idle");
      }
    };
    listeners.add(handleGlobalChange);
    return () => {
      listeners.delete(handleGlobalChange);
    };
  }, [id]);

  const handleSpeak = async () => {
    if (status === "playing" || status === "loading") {
      stopAllSpeech();
      setCurrentPlaying(null);
      setStatus("idle");
      return;
    }

    // Stop anything currently playing before starting this one
    stopAllSpeech();
    setCurrentPlaying(id);
    setStatus("loading");

    try {
      await speakText(
        text,
        voice,
        () => {
          setStatus("playing");
        },
        () => {
          setStatus("idle");
          if (currentPlayingId === id) {
            setCurrentPlaying(null);
          }
        },
        (err) => {
          console.error("TTS speech error:", err);
          setStatus("idle");
          if (currentPlayingId === id) {
            setCurrentPlaying(null);
          }
        }
      );
    } catch (e) {
      console.error(e);
      setStatus("idle");
      setCurrentPlaying(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentPlayingId === id) {
        stopAllSpeech();
        setCurrentPlaying(null);
      }
    };
  }, [id]);

  return (
    <button
      id={`speaker-btn-${id}`}
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
        status === "playing"
          ? "bg-red-100 text-red-600 hover:bg-red-200 ring-2 ring-red-400 animate-pulse"
          : status === "loading"
          ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
          : "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
      }`}
      title={status === "playing" ? "Остановить озвучку" : "Прослушать текст"}
    >
      {status === "loading" ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : status === "playing" ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
      <span className="sr-only">Озвучить</span>
    </button>
  );
}
