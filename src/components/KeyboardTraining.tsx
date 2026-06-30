import React, { useState, useEffect } from "react";
import { CheckCircle2, Award, RotateCcw, HelpCircle, CornerDownLeft, Space, Delete, ArrowUp } from "lucide-react";
import AudioSpeaker from "./AudioSpeaker";

export default function KeyboardTraining() {
  const wordsToType = ["СЛОВО", "МЫШКА", "БУМАГА", "ПИСЬМО", "ШКОЛА", "ДОКЛАД"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [typedValue, setTypedValue] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const targetWord = wordsToType[currentWordIdx];

  const narrationText =
    "Клавиатура используется для ввода текста в электронный документ. " +
    "Чтобы буквы появились на экране, нужно поочерёдно нажимать на нужные клавиши. " +
    "Освойте клавиши Backspace для удаления ошибок, Enter для новой строки и Space для разделения слов. " +
    "Попробуйте набрать слово, показанное на экране!";

  // Audio key clack sound
  const playClickSound = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {}
  };

  // Success sound
  const playSuccessSound = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      
      o1.type = "sine";
      o1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      o1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      
      o2.type = "sine";
      o2.frequency.setValueAtTime(659.25, ctx.currentTime);
      o2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1); // G5
      
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      
      o1.connect(g);
      o2.connect(g);
      g.connect(ctx.destination);
      
      o1.start();
      o2.start();
      o1.stop(ctx.currentTime + 0.4);
      o2.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  // Listen to physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      
      // Filter out physical key strokes for rendering/typing
      if (key === "BACKSPACE") {
        setActiveKey("BACKSPACE");
        handleKeyInput("BACKSPACE");
        e.preventDefault();
      } else if (key === " ") {
        setActiveKey("SPACE");
        handleKeyInput(" ");
        e.preventDefault();
      } else if (key === "ENTER") {
        setActiveKey("ENTER");
        handleKeyInput("ENTER");
        e.preventDefault();
      } else if (key.length === 1 && /[А-ЯЁ]/.test(key)) {
        setActiveKey(key);
        handleKeyInput(key);
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentWordIdx, typedValue]);

  const handleKeyInput = (key: string) => {
    playClickSound();

    if (key === "BACKSPACE") {
      setTypedValue((prev) => prev.slice(0, -1));
    } else if (key === "SPACE" || key === " ") {
      setTypedValue((prev) => prev + " ");
    } else if (key === "ENTER") {
      // Validate word
      checkTypedWord();
    } else {
      const nextTyped = typedValue + key;
      // If we typed exactly the target word
      if (nextTyped === targetWord) {
        playSuccessSound();
        setTypedValue(nextTyped);
        setTimeout(() => {
          setScore((prev) => prev + 1);
          setTypedValue("");
          setCurrentWordIdx((prev) => (prev + 1) % wordsToType.length);
        }, 300);
      } else if (targetWord.startsWith(nextTyped)) {
        setTypedValue(nextTyped);
      } else {
        // Play slight buzz / mismatch sound or allow typing and showing error
        setTypedValue(nextTyped);
      }
    }
  };

  const checkTypedWord = () => {
    if (typedValue === targetWord) {
      playSuccessSound();
      setScore((prev) => prev + 1);
      setTypedValue("");
      setCurrentWordIdx((prev) => (prev + 1) % wordsToType.length);
    }
  };

  const resetTrainer = () => {
    setScore(0);
    setTypedValue("");
    setCurrentWordIdx(0);
  };

  const keyboardRows = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"]
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Тренажёр ввода
            </span>
            <AudioSpeaker id="keyboard_training_intro" text={narrationText} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Урок 2: Знакомство с компьютерной клавиатурой
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            Клавиатура — главный инструмент писателя, инженера и школьника. С помощью неё мы превращаем мысли в буквы на экране. Потренируйтесь вводить простые слова с клавиатуры ниже!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Play zone */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-xs">
          
          {/* Target display panel */}
          <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Наберите слово на экране:</span>
            <div className="text-4xl font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 mt-2 mb-4">
              {targetWord.split("").map((letter, i) => {
                const isCorrect = typedValue[i] === letter;
                const isTyped = i < typedValue.length;
                return (
                  <span
                    key={i}
                    className={`inline-block border-b-4 mx-1 transition-all ${
                      isTyped 
                        ? isCorrect 
                          ? "text-emerald-500 border-emerald-500" 
                          : "text-red-500 border-red-500" 
                        : "text-slate-300 border-slate-300 dark:text-slate-700 dark:border-slate-700"
                    }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400">
              Ваш ввод: <strong className="font-mono text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">{typedValue || "Ожидание ввода..."}</strong>
            </div>
          </div>

          {/* Virtual On-Screen Russian Keyboard */}
          <div className="bg-slate-900 p-4 rounded-xl shadow-inner border border-slate-800 select-none">
            <div className="flex flex-col gap-2">
              {keyboardRows.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1.5">
                  {row.map((key) => {
                    const isLit = activeKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeyInput(key)}
                        className={`w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center font-semibold font-sans rounded text-sm transition-all border shadow-sm cursor-pointer ${
                          isLit
                            ? "bg-amber-400 border-amber-300 text-slate-950 scale-95"
                            : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100 hover:text-white"
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Special key row */}
              <div className="flex justify-center gap-1.5 mt-1">
                <button
                  onClick={() => handleKeyInput("BACKSPACE")}
                  className={`px-3 h-9 sm:h-11 rounded text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                    activeKey === "BACKSPACE"
                      ? "bg-red-500 border-red-400 text-white"
                      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-red-400"
                  }`}
                  title="Стереть букву слева"
                >
                  <Delete className="w-3.5 h-3.5" />
                  СТЕРЕТЬ
                </button>

                <button
                  onClick={() => handleKeyInput("SPACE")}
                  className={`w-32 sm:w-44 h-9 sm:h-11 rounded flex items-center justify-center border cursor-pointer ${
                    activeKey === "SPACE"
                      ? "bg-amber-400 border-amber-300"
                      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400"
                  }`}
                  aria-label="Пробел"
                >
                  <Space className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleKeyInput("ENTER")}
                  className={`px-3 h-9 sm:h-11 rounded text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                    activeKey === "ENTER"
                      ? "bg-emerald-500 border-emerald-400 text-white"
                      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-emerald-400"
                  }`}
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                  ВВОД
                </button>
              </div>
            </div>
          </div>

          {/* Trainer status metrics */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-900 pt-3">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              Набрано слов: <strong>{score}</strong>
            </span>
            <button
              onClick={resetTrainer}
              className="text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Сбросить очки
            </button>
          </div>

        </div>

        {/* Informational Key Explanations */}
        <div className="lg:col-span-4 bg-slate-100 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              Служебные клавиши
            </h3>

            <div className="flex flex-col gap-4">
              
              <div className="flex gap-3 items-start">
                <span className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                  Space
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Клавиша Пробел</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Самая длинная клавиша внизу. Нужна, чтобы ставить пустые места (пробелы) между словами. Без неё все слова слиплись бы в кашу!
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                  Backspace
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Стереть / Назад</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Клавиша в верхнем правом углу (со стрелочкой влево). Стирает букву, стоящую сразу слева от мигающего текстового курсора.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                  Enter
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Клавиша Ввод</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Большая клавиша ввода. Завершает текущий абзац и переносит мигающий текстовый курсор на новую строчку вниз.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                  Shift
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Клавиша Сдвиг</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Если удерживать Shift и одновременно нажать любую букву, она напечатается заглавной (БОЛЬШОЙ). Используется для написания имён и начала предложений.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg text-[10px] text-blue-700 dark:text-blue-300 leading-normal mt-4">
            💡 <strong>Совет:</strong> Вы можете печатать прямо на своей физической клавиатуре. Не забудьте переключить язык компьютера на <strong>русский</strong>!
          </div>
        </div>

      </div>
    </div>
  );
}
