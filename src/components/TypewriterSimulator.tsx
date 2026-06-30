import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, Play, Volume2 } from "lucide-react";
import AudioSpeaker from "./AudioSpeaker";

// Synth-based retro typewriter click sound
function playClackSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    
    // Keystroke sound (hollow wood/plastic mechanical strike)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
    
    // High-pitched metallic click
    const metalOsc = audioCtx.createOscillator();
    const metalGain = audioCtx.createGain();
    metalOsc.type = "sine";
    metalOsc.frequency.setValueAtTime(1800, audioCtx.currentTime);
    metalOsc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.015);
    
    metalGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    metalGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);
    
    metalOsc.connect(metalGain);
    metalGain.connect(audioCtx.destination);
    metalOsc.start();
    metalOsc.stop(audioCtx.currentTime + 0.02);
  } catch (e) {
    console.warn("Web Audio sound failed", e);
  }
}

// Synth-based retro carriage return ding sound
function playDingSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    // Pure crystal bell sound (880Hz, high A note)
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.55);
  } catch (e) {}
}

export default function TypewriterSimulator() {
  const [typedText, setTypedText] = useState("");
  const paperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const narrationText = 
    "До изобретения компьютеров люди печатали тексты на пишущих машинках. " +
    "На пишущей машинке тоже нажимали клавиши: клавиша ударяла по окрашенной ленте, и буква отпечатывалась на странице. " +
    "Здесь вы можете попробовать напечатать несколько слов, чтобы почувствовать, как это было раньше!";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      playDingSound();
    } else if (e.key.length === 1 || e.key === "Backspace") {
      playClackSound();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTypedText(e.target.value.toUpperCase()); // Vintage typewriters typed mostly capitals or fixed font
  };

  const resetPaper = () => {
    setTypedText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [typedText]);

  const vintageKeys = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"]
  ];

  const handleVirtualKeyClick = (key: string) => {
    playClackSound();
    setTypedText((prev) => prev + key);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSpaceClick = () => {
    playClackSound();
    setTypedText((prev) => prev + " ");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEnterClick = () => {
    playDingSound();
    setTypedText((prev) => prev + "\n");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspaceClick = () => {
    playClackSound();
    setTypedText((prev) => prev.slice(0, -1));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Экскурс в историю
            </span>
            <AudioSpeaker id="typewriter_intro" text={narrationText} />
          </div>
          <h2 className="text-2xl font-serif text-slate-800 dark:text-slate-100 font-bold">
            Пишущая машинка (Докомпьютерная эра)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            До появления компьютеров люди пользовались пишущими машинками. Каждое нажатие клавиши вызывало удар металлического рычажка по красящей ленте, мгновенно оставляя след на бумаге. Ошибку нельзя было просто стереть клавишей «Backspace» — приходилось пользоваться замазкой или перепечатывать весь лист заново!
          </p>
        </div>
      </div>

      {/* Typewriter Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Virtual Paper Area */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between text-xs text-slate-300 border-b border-slate-700">
            <span className="font-mono">КАРЕТКА С БУМАГОЙ (VINTAGE PAPER)</span>
            <button
              onClick={resetPaper}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors bg-slate-700 px-2 py-1 rounded"
              title="Вставить новый лист"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Очистить лист
            </button>
          </div>

          {/* Retro Styled Paper Sheet Container */}
          <div className="bg-amber-50/15 p-4 rounded-b-xl border border-slate-300 dark:border-slate-700 flex-1 flex flex-col">
            <div className="relative w-full aspect-[4/3] bg-amber-50 text-slate-800 p-6 shadow-inner rounded border border-amber-100 flex flex-col overflow-hidden">
              {/* Paper Lines background simulation */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent 95%, rgba(0,0,0,0.03) 95% bg-[size:100%_1.5rem] pointer-events-none opacity-40"></div>
              
              {/* Typing area */}
              <div 
                ref={paperRef}
                className="relative z-10 w-full h-full font-serif text-base tracking-widest leading-[1.5rem] overflow-y-auto whitespace-pre-wrap select-text break-words focus:outline-hidden"
                style={{ filter: "drop-shadow(0px 1px 0px rgba(0,0,0,0.15))" }}
              >
                {typedText ? (
                  typedText
                ) : (
                  <span className="text-slate-400 italic pointer-events-none">
                    Начните печатать с помощью вашей клавиатуры или нажимайте на круглые клавиши внизу...
                  </span>
                )}
                <span className="inline-block w-2.5 h-4 bg-slate-800 dark:bg-slate-200 ml-0.5 animate-cursor-blink"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Vintage Keyboard Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-700">
          <div className="mb-4">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-1">
              Клавиатурный ввод
            </span>
            <p className="text-xs text-slate-400 leading-normal">
              Кликните по полю ввода ниже, чтобы печатать на своей физической клавиатуре, или нажимайте на ретро-клавиши. Каждое нажатие воспроизведёт механический звук пишущей машинки!
            </p>
          </div>

          {/* Hidden input to capture physical keyboard event smoothly */}
          <textarea
            ref={inputRef}
            value={typedText}
            onChange={handleTextChange}
            onKeyDown={handleKeyPress}
            placeholder="Кликните здесь и начните вводить текст..."
            className="w-full h-16 px-3 py-2 text-xs bg-slate-800 text-amber-200 border border-slate-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500 mb-4 placeholder-slate-500 resize-none font-mono"
          />

          {/* Vintage Keyboard Visualizer */}
          <div className="flex flex-col gap-1.5 p-2 bg-slate-950 rounded-lg border border-slate-800">
            {vintageKeys.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleVirtualKeyClick(key)}
                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs font-serif rounded-full bg-slate-800 hover:bg-slate-700 text-amber-100 border border-slate-600 shadow-md active:translate-y-0.5 transition-all active:shadow-inner"
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
            
            {/* Control keys row */}
            <div className="flex justify-center gap-2 mt-1">
              <button
                onClick={handleBackspaceClick}
                className="px-3 h-7 md:h-8 text-[10px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 active:translate-y-0.5"
              >
                СТЕРЕТЬ
              </button>
              <button
                onClick={handleSpaceClick}
                className="w-24 md:w-32 h-7 md:h-8 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 active:translate-y-0.5"
                aria-label="Пробел"
              >
              </button>
              <button
                onClick={handleEnterClick}
                className="px-3 h-7 md:h-8 text-[10px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 active:translate-y-0.5"
              >
                НОВАЯ СТРОКА 🔔
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
