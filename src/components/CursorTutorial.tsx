import React, { useState } from "react";
import { ArrowUpRight, Heading, MousePointer, Info, TextCursor } from "lucide-react";
import AudioSpeaker from "./AudioSpeaker";

export default function CursorTutorial() {
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  const narrationText =
    "Текстовый курсор — это мигающая вертикальная чёрточка в верхнем левом углу страницы. " +
    "Он показывает, откуда появится текст, который вы начнёте вводить на клавиатуре. " +
    "Курсор мыши — это значок на экране, который показывает, где находится мышь в данный момент. " +
    "Если вы переместите курсор мыши в центр страницы и кликните, мигающий текстовый курсор сразу переместится туда же. " +
    "Попробуйте понажимать на разные слова в синем блоке ниже, чтобы переместить мигающий курсор!";

  const paragraphWords = [
    "В", "верхнем", "левом", "углу", "документа", "мигает", "чёрточка.", 
    "Это", "текстовый", "курсор.", "Когда", "вы", "нажимаете", "на", "клавиши,", 
    "новые", "буквы", "появляются", "в", "этом", "месте.", 
    "Кликните", "по", "любому", "слову,", "чтобы", "переместить", "его", "туда!"
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Важное отличие
            </span>
            <AudioSpeaker id="cursor_tutorial_intro" text={narrationText} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Мышка против Клавиатуры: Два Курсора
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            Начинающие пользователи часто путают два важнейших элемента экрана: стрелку мыши и вертикальную мигающую линию. Давайте навсегда разберёмся в разнице!
          </p>
        </div>
      </div>

      {/* Visual comparison blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Pointer block */}
        <div className="p-5 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-blue-500 text-white rounded-lg">
            <MousePointer className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-blue-950 dark:text-blue-300">
              1. Курсор мыши (Pointer / Указатель)
            </h3>
            <p className="text-xs text-blue-800/80 dark:text-blue-400/80 mt-1 leading-relaxed">
              Это графическая стрелка (или ладошка), которая передвигается по всему экрану, когда вы шевелите мышь на столе. Она используется для выбора кнопок, меню и мест ввода.
            </p>
          </div>
        </div>

        {/* Blinking Caret block */}
        <div className="p-5 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-amber-500 text-white rounded-lg">
            <TextCursor className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-amber-950 dark:text-amber-300">
              2. Текстовый курсор (Caret / Каретка)
            </h3>
            <p className="text-xs text-amber-800/80 dark:text-amber-400/80 mt-1 leading-relaxed">
              Это **мигающая вертикальная палочка**. Она находится только внутри полей ввода текста и показывает точное место, откуда будут печататься новые буквы.
            </p>
          </div>
        </div>

      </div>

      {/* Interactive sandbox */}
      <div className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-slate-500">
          <Info className="w-4 h-4 text-blue-500" />
          <span>Интерактивный симулятор «Поймай мигающий курсор»</span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          В блоке ниже вы можете кликнуть в любое слово, и текстовый курсор сразу «прыгнет» на это место. Это демонстрирует, как мышь указывает клавиатуре, где начать печатать:
        </p>

        {/* Clickable paragraph */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-lg leading-relaxed select-none">
          <div className="flex flex-wrap gap-x-2 gap-y-3 items-center">
            {paragraphWords.map((word, index) => (
              <span
                key={index}
                onClick={() => setActiveWordIdx(index)}
                className={`relative px-1.5 py-0.5 rounded cursor-pointer transition-all duration-200 hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-amber-900 dark:hover:text-amber-100 ${index === activeWordIdx ? "bg-amber-50 text-amber-950 font-medium" : "text-slate-700 dark:text-slate-300"}`}
              >
                {word}
                {index === activeWordIdx && (
                  <span className="absolute -right-1.5 top-0 bottom-0 w-0.5 bg-red-500 dark:bg-amber-400 animate-cursor-blink" style={{ height: "1.4em", marginTop: "0.15em" }} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback info bar */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-slate-900/60 text-blue-900 dark:text-blue-300 rounded-lg text-xs flex items-center gap-3">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 font-bold">i</span>
          <p>
            Вы переместили мигающий курсор на слово <strong>«{paragraphWords[activeWordIdx]}»</strong>. Если вы начнёте печатать текст, он появится прямо после этого слова!
          </p>
        </div>

      </div>

    </div>
  );
}
