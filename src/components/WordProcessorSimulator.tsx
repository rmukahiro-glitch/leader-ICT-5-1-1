import React, { useState, useRef, useEffect } from "react";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  FileText, HelpCircle, Save, Share2, Printer, Type, Palette
} from "lucide-react";
import AudioSpeaker from "./AudioSpeaker";

export default function WordProcessorSimulator() {
  const [text, setText] = useState(
    "Электронный документ — это современный способ создания, редактирования и сохранения текстов на компьютере.\n\n" +
    "В программе Microsoft Word вы можете легко:\n" +
    "1. Делать важные слова ЖИРНЫМИ или наклонными.\n" +
    "2. Изменять цвета букв на яркие и красивые.\n" +
    "3. Менять шрифт и его размер для удобного чтения.\n\n" +
    "Попробуйте стереть этот текст и написать свои предложения, а затем поменяйте его стиль на панели инструментов вверху!"
  );

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right" | "justify">("left");
  const [textColor, setTextColor] = useState("#1e293b"); // slate-800
  const [zoom, setZoom] = useState(100);

  const narrationText =
    "Обработка текста — это процесс создания электронных документов путём ввода или изменения текста. " +
    "Чаще всего для этого используется программа Microsoft Word. " +
    "С её помощью вы можете изменять оформление букв, размер шрифта, выравнивание абзацев, а также сохранять и отправлять документы по почте. " +
    "Попробуйте изменить форматирование текста на панели вверху!";

  // Count words
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  // Count characters
  const charCount = text.length;

  const fontOptions = [
    { name: "Arial (Стандартный)", value: "Arial" },
    { name: "Times New Roman (Книжный)", value: "Times New Roman" },
    { name: "Calibri (Современный)", value: "Calibri" },
    { name: "Courier New (Печатный)", value: "Courier New" }
  ];

  const fontSizeOptions = ["12px", "14px", "16px", "18px", "20px", "24px", "28px"];
  const colorOptions = [
    { name: "Тёмный", value: "#1e293b" },
    { name: "Синий", value: "#2563eb" },
    { name: "Красный", value: "#dc2626" },
    { name: "Зелёный", value: "#16a34a" },
    { name: "Фиолетовый", value: "#7c3aed" },
    { name: "Оранжевый", value: "#ea580c" }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Текстовый процессор
            </span>
            <AudioSpeaker id="word_processor_intro" text={narrationText} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Окно программы Microsoft Word
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
            Современные компьютеры позволяют изменять и оформлять текст в реальном времени. Мы можем сделать шрифт крупнее, выбрать другой стиль символов и центрировать заголовки. Ниже представлена точная интерактивная модель текстового редактора Microsoft Word. Поэкспериментируйте с кнопками!
          </p>
        </div>
      </div>

      {/* Program Window Wrapper */}
      <div className="border border-blue-200 dark:border-slate-700 rounded-xl shadow-md overflow-hidden bg-white dark:bg-slate-950 flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-blue-700 text-white px-4 py-2 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-200" />
            <span>Документ1 - Microsoft Word (Режим тренировки)</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-200">Файл</span>
            <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-200">Правка</span>
            <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-200">Вид</span>
          </div>
        </div>

        {/* Ribbon Area (MS Word Toolbar) */}
        <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 flex flex-wrap gap-4 items-center">
          
          {/* Font selection */}
          <div className="flex items-center gap-1.5">
            <Type className="w-4 h-4 text-slate-500" />
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
            >
              {fontOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.name}</option>
              ))}
            </select>

            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
            >
              {fontSizeOptions.map((sz) => (
                <option key={sz} value={sz}>{sz.replace("px", " pt")}</option>
              ))}
            </select>
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

          {/* Bold, Italic, Underline */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 p-0.5 gap-0.5">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`p-1 rounded transition-colors ${isBold ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="Жирный шрифт"
            >
              <Bold className="w-4 h-4 font-bold" />
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`p-1 rounded transition-colors ${isItalic ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="Курсив"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsUnderline(!isUnderline)}
              className={`p-1 rounded transition-colors ${isUnderline ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="Подчёркнутый"
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

          {/* Text Alignment */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 p-0.5 gap-0.5">
            <button
              onClick={() => setAlignment("left")}
              className={`p-1 rounded transition-colors ${alignment === "left" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="По левому краю"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAlignment("center")}
              className={`p-1 rounded transition-colors ${alignment === "center" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="По центру"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAlignment("right")}
              className={`p-1 rounded transition-colors ${alignment === "right" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="По правому краю"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAlignment("justify")}
              className={`p-1 rounded transition-colors ${alignment === "justify" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              title="По ширине"
            >
              <AlignJustify className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

          {/* Color choices */}
          <div className="flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Цвет:</span>
            <div className="flex items-center gap-1">
              {colorOptions.map((col) => (
                <button
                  key={col.value}
                  onClick={() => setTextColor(col.value)}
                  className={`w-4 h-4 rounded-full border transition-transform ${textColor === col.value ? "scale-125 border-slate-800 dark:border-white ring-1 ring-blue-500" : "border-slate-300"}`}
                  style={{ backgroundColor: col.value }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Ruler Layout */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80 px-10 py-1 flex items-center select-none text-[9px] font-mono text-slate-400">
          <div className="w-8 border-r border-slate-300 dark:border-slate-700 text-center">L</div>
          <div className="flex-1 flex justify-between px-4">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
          </div>
          <div className="w-8 border-l border-slate-300 dark:border-slate-700 text-center">R</div>
        </div>

        {/* Editing Area with simulation Zoom and Margins */}
        <div className="bg-slate-200 dark:bg-slate-900 p-8 flex justify-center items-start overflow-auto min-h-[350px]">
          <div 
            className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 w-full max-w-[650px] aspect-[1/1.3] shadow-lg rounded-sm p-10 transition-all focus-within:ring-2 focus-within:ring-blue-500/20"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: "top center",
              fontFamily: fontFamily,
              fontSize: fontSize,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
              textAlign: alignment,
              color: textColor,
            }}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-full bg-transparent border-0 resize-none outline-hidden focus:ring-0 p-0 overflow-y-auto placeholder-slate-400 dark:placeholder-slate-600 select-text leading-relaxed font-inherit"
              style={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                fontStyle: "inherit",
                textDecoration: "inherit",
                textAlign: "inherit",
                color: "inherit",
              }}
              placeholder="Начните писать свой электронный документ здесь..."
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 select-none">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700 dark:text-slate-300">СТРАНИЦА 1 ИЗ 1</span>
            <span>ЧИСЛО СЛОВ: <strong>{wordCount}</strong></span>
            <span>СИМВОЛОВ: <strong>{charCount}</strong></span>
            <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px]">РУССКИЙ</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono">МАСШТАБ</span>
            <input
              type="range"
              min="75"
              max="125"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-20 accent-blue-600 cursor-pointer"
            />
            <span className="font-mono text-[10px] w-8 text-right">{zoom}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
