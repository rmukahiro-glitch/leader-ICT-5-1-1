// Text-To-Speech utility supporting Gemini 3.1 TTS server endpoint and Web Speech fallback.

let activeAudioSource: AudioBufferSourceNode | null = null;
let activeAudioCtx: AudioContext | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Stop any currently playing audio (both PCM and Web Speech)
 */
export function stopAllSpeech(): void {
  // Stop PCM
  try {
    if (activeAudioSource) {
      activeAudioSource.stop();
      activeAudioSource.disconnect();
      activeAudioSource = null;
    }
    if (activeAudioCtx && activeAudioCtx.state !== "closed") {
      activeAudioCtx.close();
      activeAudioCtx = null;
    }
  } catch (e) {
    console.warn("Error stopping PCM speech:", e);
  }

  // Stop Web Speech Synthesis
  try {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    }
  } catch (e) {
    console.warn("Error cancelling speech synthesis:", e);
  }
}

/**
 * Plays raw little-endian 16-bit PCM audio base64 string at 24000 Hz.
 */
function playPcmAudio(base64Data: string, onEnded: () => void): void {
  stopAllSpeech();

  try {
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const int16Array = new Int16Array(bytes.buffer);
    const sampleRate = 24000;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextClass({ sampleRate });
    activeAudioCtx = audioCtx;

    const audioBuffer = audioCtx.createBuffer(1, int16Array.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < int16Array.length; i++) {
      // Scale 16-bit signed integer [-32768, 32767] to float [-1.0, 1.0]
      channelData[i] = int16Array[i] / 32768.0;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    
    source.onended = () => {
      if (activeAudioSource === source) {
        activeAudioSource = null;
        onEnded();
      }
    };

    activeAudioSource = source;
    source.start(0);
  } catch (err) {
    console.error("Error playing PCM audio:", err);
    onEnded();
  }
}

/**
 * Speaks text using the server-side Gemini TTS API.
 * Falls back to local SpeechSynthesis if server-side TTS fails (e.g. missing API key).
 */
export async function speakText(
  text: string,
  voice: string = "Kore", // puck, charon, kore, fenrir, zephyr
  onStart: () => void,
  onEnd: () => void,
  onError: (err: any) => void
): Promise<void> {
  stopAllSpeech();
  onStart();

  try {
    // Attempt backend Gemini TTS call
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${response.status} from TTS service`);
    }

    const data = await response.json();
    if (data.audio) {
      playPcmAudio(data.audio, onEnd);
      return;
    } else {
      throw new Error("No audio returned from server");
    }
  } catch (err: any) {
    console.warn("Gemini TTS failed or API Key is missing. Falling back to native browser speech synthesis. Error:", err.message);
    
    // Web Speech synthesis fallback
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ru-RU"; // Text is Russian, so use Russian voice
        
        // Find a Russian voice if possible
        const voices = window.speechSynthesis.getVoices();
        const ruVoice = voices.find((v) => v.lang.startsWith("ru")) || null;
        if (ruVoice) {
          utterance.voice = ruVoice;
        }

        utterance.onend = () => {
          if (activeUtterance === utterance) {
            activeUtterance = null;
            onEnd();
          }
        };

        utterance.onerror = (e) => {
          if (activeUtterance === utterance) {
            activeUtterance = null;
            onError(e);
          }
        };

        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (synthErr) {
        console.error("Local SpeechSynthesis failed:", synthErr);
        onError(synthErr);
      }
    } else {
      onError(err);
    }
  }
}
