import React, { useState } from "react";
import { CheckCircle2, RotateCcw, AlertCircle, MousePointer, Layers, FileCode } from "lucide-react";
import AudioSpeaker from "./AudioSpeaker";

export default function MouseTraining() {
  const [clickCount, setClickCount] = useState(0);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const narrationText =
    "Мышь используется для выбора места начала ввода текста и для выделения слов, которые вы хотите исправить. " +
    "Обычно у мыши есть две кнопки — левая и правая. " +
    "Левая кнопка используется чаще всего — для нажатия кнопок и выбора текста. " +
    "Выполните три задания внизу, чтобы научиться виртуозно управлять компьютерной мышью!";

  const handleLeftClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleDoubleClickWord = () => {
    setDoubleClicked(true);
  };

  const handleRightClickArea = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop default browser menu
    setRightClicked(true);
    setMenuPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setShowContextMenu(true);
  };

  const handleMenuAction = (action: string) => {
    setSelectedAction(action);
    setShowContextMenu(false);
  };

  const resetAll = () => {
    setClickCount(0);
    setDoubleClicked(false);
    setRightClicked(false);
    setSelectedAction("");
    setShowContextMenu(false);
  };

  const isChallenge1Done = clickCount >= 5;
  const isChallenge2Done = doubleClicked;
  const isChallenge3Done = selectedAction === "delete";
  const allDone = isChallenge1Done && isChallenge2Done && isChallenge3Done;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Практический навык
            </span>
            <AudioSpeaker id="mouse_training_intro" text={narrationText} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Урок 1: Использование компьютерной мыши
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            Мышь помогает нам общаться с компьютером наглядно. С помощью курсора (стрелочки на экране) мы можем «указывать» компьютеру, что делать. Пройдите 3 тренировочные зоны внизу, чтобы закрепить навыки щелчков!
          </p>
        </div>
        {allDone && (
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md animate-bounce self-start">
            <CheckCircle2 className="w-4 h-4" />
            <span>Все задания мыши выполнены!</span>
          </div>
        )}
      </div>

      {/* Grid of Interactive Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Challenge 1: Left Click */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between h-72 transition-all ${isChallenge1Done ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500">Задание 1</span>
              {isChallenge1Done ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Отлично!
                </span>
              ) : (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">В процессе</span>
              )}
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-blue-500" />
              Левая кнопка (Одиночный клик)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Левая кнопка мыши используется чаще всего. Сделайте **5 кликов** по кнопке ниже, чтобы научиться точно выбирать элементы.
            </p>
          </div>

          <div className="my-4 flex flex-col items-center justify-center">
            <button
              onClick={handleLeftClick}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${isChallenge1Done ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {isChallenge1Done ? "Задание выполнено!" : "Кликни по мне!"}
            </button>
            <div className="mt-2 text-xs font-mono text-slate-400">
              Нажатий: {clickCount} из 5
            </div>
          </div>
        </div>

        {/* Challenge 2: Double Click */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between h-72 transition-all ${isChallenge2Done ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500">Задание 2</span>
              {isChallenge2Done ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Выделено!
                </span>
              ) : (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">В процессе</span>
              )}
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              Двойной клик (Выделение)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Двойной быстрый щелчок левой кнопкой мыши автоматически выделяет целое слово в тексте. Попробуйте **дважды кликнуть** по выделенному слову в синей рамочке.
            </p>
          </div>

          <div className="my-4 text-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-850 rounded-lg text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Дважды щёлкните по слову{" "}
              <span
                onDoubleClick={handleDoubleClickWord}
                className={`inline-block px-1.5 py-0.5 border font-semibold font-mono rounded cursor-pointer select-none transition-all ${doubleClicked ? "bg-emerald-100 text-emerald-800 border-emerald-400" : "bg-blue-50 text-blue-800 border-blue-400 animate-pulse"}`}
              >
                КОМПЬЮТЕР
              </span>
              , чтобы выполнить урок.
            </div>
          </div>
        </div>

        {/* Challenge 3: Right Click */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between h-72 transition-all ${isChallenge3Done ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500">Задание 3</span>
              {isChallenge3Done ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Удалено!
                </span>
              ) : (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">В процессе</span>
              )}
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-500" />
              Правая кнопка (Меню)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Правая кнопка мыши вызывает контекстное меню (список дополнительных действий). Нажмите **правой кнопкой** на поле ниже, затем выберите команду **«Удалить»**.
            </p>
          </div>

          <div className="relative my-4 flex-1">
            {/* Click target canvas */}
            <div
              onContextMenu={handleRightClickArea}
              className="w-full h-full min-h-[90px] bg-purple-50/30 dark:bg-purple-950/10 border border-dashed border-purple-300 dark:border-purple-800 rounded-lg flex items-center justify-center text-center p-2 cursor-context-menu"
            >
              {selectedAction === "delete" ? (
                <span className="text-emerald-600 text-[11px] font-medium font-mono">Объект успешно удалён! 👍</span>
              ) : (
                <span className="text-purple-600 dark:text-purple-400 text-[10px] font-mono">Нажмите ПРАВОЙ кнопкой мыши здесь</span>
              )}
            </div>

            {/* Custom context menu simulation */}
            {showContextMenu && (
              <div
                className="absolute z-50 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-md py-1 w-28 text-left text-xs text-slate-700 dark:text-slate-200"
                style={{ top: `${menuPos.y}px`, left: `${menuPos.x}px` }}
              >
                <button
                  onClick={() => handleMenuAction("copy")}
                  className="w-full px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-left block"
                >
                  Копировать
                </button>
                <button
                  onClick={() => handleMenuAction("paste")}
                  className="w-full px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-left block"
                >
                  Вставить
                </button>
                <button
                  onClick={() => handleMenuAction("delete")}
                  className="w-full px-3 py-1 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 text-left block font-medium"
                >
                  Удалить 🗑️
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Reset button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Сбросить все тренировки
        </button>
      </div>

    </div>
  );
}
