import React, { useState } from "react";
import { 
  ChevronRight, ChevronLeft, BookOpen, MousePointer, Keyboard, 
  HelpCircle, Sparkles, Volume2, Info, Monitor, GraduationCap
} from "lucide-react";
import { LessonStep } from "./types";
import AudioSpeaker from "./components/AudioSpeaker";
import TypewriterSimulator from "./components/TypewriterSimulator";
import WordProcessorSimulator from "./components/WordProcessorSimulator";
import MouseTraining from "./components/MouseTraining";
import CursorTutorial from "./components/CursorTutorial";
import KeyboardTraining from "./components/KeyboardTraining";
import QuizSection from "./components/QuizSection";

export default function App() {
  const [currentStep, setCurrentStep] = useState<LessonStep>(LessonStep.INTRO);
  const [teacherVoice, setTeacherVoice] = useState("Kore"); // Puck, Kore, Fenrir, Zephyr

  // Full original lesson narrative pieces for text-to-speech triggers
  const introText = 
    "Здравствуйте! Сегодня у нас тема: «Работа с текстовым документом». " +
    "Скажите, вы знали, что до изобретения компьютеров люди печатали тексты на пишущих машинках? " +
    "На пишущей машинке тоже нажимали клавиши: клавиша ударяла по окрашенной ленте, и буква отпечатывалась на странице. " +
    "Сегодня всё гораздо проще и быстрее — у нас есть компьютер, клавиатура и мышь. " +
    "В этом уроке мы научимся вводить простые слова с клавиатуры, выбирать нужные значки с помощью мыши, " +
    "а также узнаем, как правильно и безопасно работать за компьютером. " +
    "Этот навык пригодится вам не только на уроках, но и в будущем — когда вы будете писать школьные доклады, " +
    "письма или даже статьи для школьной стенгазеты.";

  const safetyGuidelinesText =
    "Безопасная работа за компьютером: " +
    "1. Держите спину прямо, обопритесь на спинку стула. " +
    "2. Глаза должны находиться на расстоянии пятидесяти-семидесяти сантиметров от экрана монитора. " +
    "3. Делайте перерывы каждые двадцать минут, чтобы глаза могли отдохнуть.";

  const conclusionText =
    "Итак, сегодня мы узнали, что такое обработка текста и для чего нужна программа Microsoft Word. " +
    "Мы вспомнили правила техники безопасности при работе с компьютером, " +
    "познакомились с мышью и текстовым курсором, и сделали первые шаги к работе с клавиатурой. " +
    "Теперь, садясь за компьютер, вы будете точно знать, для чего нужны мышь и клавиатура, " +
    "и сможете безопасно и уверенно начать работу с текстовым документом. Спасибо за внимание!";

  // Course outline for side menu or navigation index
  const courseSteps = [
    { id: LessonStep.INTRO, label: "Введение & История", icon: BookOpen },
    { id: LessonStep.TYPEWRITER, label: "Пишущая машинка", icon: Sparkles },
    { id: LessonStep.WORD_PROCESSOR, label: "Текстовый процессор", icon: Monitor },
    { id: LessonStep.MOUSE_TRAINING, label: "Тренажёр мыши", icon: MousePointer },
    { id: LessonStep.CURSOR_TUTORIAL, label: "Управление курсором", icon: Info },
    { id: LessonStep.KEYBOARD_TRAINING, label: "Тренажёр клавиатуры", icon: Keyboard },
    { id: LessonStep.QUIZ, label: "Викторина & Диплом", icon: GraduationCap }
  ];

  const currentIdx = courseSteps.findIndex((s) => s.id === currentStep);
  const progressPercent = Math.round(((currentIdx + 1) / courseSteps.length) * 100);

  const handleNext = () => {
    if (currentIdx < courseSteps.length - 1) {
      setCurrentStep(courseSteps[currentIdx + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentStep(courseSteps[currentIdx - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderActiveStepContent = () => {
    switch (currentStep) {
      case LessonStep.INTRO:
        return (
          <div className="space-y-6">
            {/* Main Content Panel styled perfectly as requested */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              {/* Content Title Area */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Раздел 01: Понятия
                  </span>
                  <AudioSpeaker id="lesson_intro" text={introText} voice={teacherVoice} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-4 font-serif">Что такое обработка текста?</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-lg">
                  Раньше люди использовали громоздкие пишущие машинки. Сегодня всё гораздо проще — у нас есть компьютер и специальные программы.
                </p>
              </div>

              {/* Split Visualization Area */}
              <div className="px-8 pb-8 flex flex-col lg:flex-row gap-8">
                {/* Visual Mockup: Word Interface */}
                <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col shadow-inner">
                  <div className="bg-white dark:bg-slate-900 flex-1 rounded shadow-xs flex flex-col overflow-hidden border border-slate-300 dark:border-slate-700 min-h-[250px]">
                    <div className="bg-blue-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-3 py-2 flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="bg-white dark:bg-slate-950 px-4 py-1 text-[10px] rounded border border-slate-200 dark:border-slate-800 text-slate-400 ml-4 font-mono select-none">
                        Document1.docx - Microsoft Word
                      </div>
                    </div>
                    <div className="flex-1 p-8 relative min-h-[160px]">
                      {/* Text Cursor Mockup */}
                      <div className="absolute left-10 top-10 flex items-center">
                        <span className="h-6 w-0.5 bg-slate-900 dark:bg-slate-100 animate-pulse"></span>
                        <span className="ml-4 text-slate-400 dark:text-slate-500 text-xs font-mono select-none">Начните вводить текст здесь...</span>
                      </div>
                      {/* Mouse Pointer Mockup */}
                      <div className="absolute right-12 bottom-12">
                        <svg className="w-6 h-6 text-slate-900 dark:text-slate-100 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.5 3L17.5 13L12.5 13.5L16 20.5L13.5 21.5L10 14.5L5 18L4.5 3Z" />
                        </svg>
                        <div className="absolute -top-12 -left-12 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl text-[10px] whitespace-nowrap text-slate-800 dark:text-slate-200">
                          <span className="font-bold text-blue-600 dark:text-blue-400">Курсор мыши</span>: перемещается вами
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer links mapping */}
                  <div className="mt-4 flex justify-around text-center select-none">
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Мышь</div>
                      <div className="text-[10px] text-slate-400">Выбор и отметка</div>
                    </div>
                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-700"></div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Клавиатура</div>
                      <div className="text-[10px] text-slate-400">Ввод символов</div>
                    </div>
                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-700"></div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Microsoft Word</div>
                      <div className="text-[10px] text-slate-400">Ваша программа</div>
                    </div>
                  </div>
                </div>

                {/* Explanatory Panel */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                  <div className="p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      <span className="font-bold text-sm">Курсор мыши</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Значок на экране, который в точности повторяет движения вашей руки с мышкой. Позволяет выбирать элементы одним или двумя щелчками кнопки.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3 mb-2 text-indigo-600 dark:text-indigo-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="font-bold text-sm">Текстовый курсор</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Мигающая вертикальная чёрточка. Она словно «шепчет» вам на экране: «Печатай здесь!». Показывает текущую точку вставки новых букв.
                    </p>
                  </div>

                  <div className="p-5 bg-slate-900 dark:bg-slate-950 rounded-xl text-white mt-auto">
                    <div className="text-xs font-bold text-blue-400 mb-2 tracking-widest uppercase">Контрольный вопрос</div>
                    <p className="text-sm italic">«Где появится введённый текст, если вы нажмете на букву на клавиатуре?»</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Guidelines Section styled beautifully */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                  Правила здоровья
                </span>
                <AudioSpeaker id="safety_intro" text={safetyGuidelinesText} voice={teacherVoice} />
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                Правила техники безопасности при работе за компьютером
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Прежде чем начать практиковаться, вспомним три правила, чтобы сохранить отличное зрение, здоровую спину и бодрость:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850">
                  <span className="text-2xl mb-1 block">🧍</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Ровная спина</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Держите спину прямо, опирайтесь на удобную спинку стула. Не горбитесь и не наклоняйте шею.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850">
                  <span className="text-2xl mb-1 block">👁️</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Безопасное расстояние</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Глаза должны находиться на расстоянии пятидесяти-семидесяти сантиметров от экрана монитора.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850">
                  <span className="text-2xl mb-1 block">⏲️</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Перерывы на отдых</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Каждые двадцать минут переводите взгляд вдаль на окно на двадцать секунд, чтобы расслабить глаза.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case LessonStep.TYPEWRITER:
        return <TypewriterSimulator />;
      case LessonStep.WORD_PROCESSOR:
        return <WordProcessorSimulator />;
      case LessonStep.MOUSE_TRAINING:
        return <MouseTraining />;
      case LessonStep.CURSOR_TUTORIAL:
        return <CursorTutorial />;
      case LessonStep.KEYBOARD_TRAINING:
        return <KeyboardTraining />;
      case LessonStep.QUIZ:
        return (
          <div className="space-y-6">
            <QuizSection />
            
            {/* Summary Block */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                  Итоги урока
                </span>
                <AudioSpeaker id="conclusion_narr" text={conclusionText} voice={teacherVoice} />
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Заключение курса
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Итак, сегодня мы совершили увлекательное путешествие! Мы узнали, как устроен набор текста, научились редактировать и настраивать абзацы, вспомнили технику безопасности, а также закрепили навыки управления мышью и клавиатурой на практике. 
                <br /><br />
                Вы проделали отличную работу. Теперь, садясь за компьютер, вы будете точно знать предназначение кнопок и сможете смело создавать свои первые красивые электронные документы!
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex flex-col justify-between antialiased selection:bg-blue-500/20 text-slate-800 dark:text-slate-200">
      
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 px-4 md:px-8 py-4 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Работа с текстовым документом
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Модуль 1: Основы обработки текста</p>
            </div>
          </div>

          {/* Quick Stats & Progress Bar */}
          <div className="flex items-center gap-6 self-end sm:self-auto">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Прогресс урока</span>
              <div className="w-48 h-2 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                <div className="bg-blue-500 h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            {currentStep === LessonStep.QUIZ && (
              <button 
                onClick={() => {
                  setCurrentStep(LessonStep.INTRO);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="px-3.5 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Начать заново
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-8 py-8 items-start">
        
        {/* Navigation Sidebar (Menu) */}
        <aside className="lg:col-span-3 space-y-6 print:hidden">
          
          {/* Teacher Selection Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <Volume2 className="w-3.5 h-3.5 text-blue-500" />
              Голос Инструктора
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-normal">
              Выберите голос виртуального преподавателя для прослушивания лекции:
            </p>
            <select
              value={teacherVoice}
              onChange={(e) => setTeacherVoice(e.target.value)}
              className="w-full text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 dark:text-slate-100 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Kore">Алина (Kore - Мягкий)</option>
              <option value="Puck">Кирилл (Puck - Бодрый)</option>
              <option value="Zephyr">Максим (Zephyr - Спокойный)</option>
              <option value="Charon">Дмитрий (Charon - Серьёзный)</option>
            </select>
          </div>

          {/* Curriculum Index */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-3">
              Содержание
            </span>
            <div className="flex flex-col gap-2">
              {courseSteps.map((step, idx) => {
                const isCurrent = step.id === currentStep;
                const isPassed = idx < currentIdx;
                const stepNum = String(idx + 1).padStart(2, '0');
                
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStep(step.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full p-3 rounded-lg text-left text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/50 dark:text-blue-300"
                        : isPassed
                        ? "bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 border border-emerald-100/50 dark:bg-emerald-950/10 dark:text-emerald-300 dark:border-emerald-900/20"
                        : "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold flex-shrink-0 ${
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : isPassed
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                      {stepNum}
                    </span>
                    <span className="flex-1 truncate">{step.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Bottom Notice: Important panel */}
            <div className="mt-5 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase mb-1">Важное замечание</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                Обработка текста — это создание электронных документов путём ввода или изменения текста.
              </p>
            </div>
          </div>

        </aside>

        {/* Primary Stage Area */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Active Content Stage */}
          <div className="transition-all duration-300">
            {renderActiveStepContent()}
          </div>

          {/* Bottom Step-by-Step Controller */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
            <button
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </button>

            <span className="text-xs font-mono text-slate-400">
              Шаг {currentIdx + 1} из {courseSteps.length}
            </span>

            <button
              disabled={currentIdx === courseSteps.length - 1}
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
            >
              Вперёд
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </section>

      </main>

      {/* Aesthetic Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 md:px-8 text-center text-xs text-slate-400 select-none print:hidden animate-fade-in">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Интерактивная Информатика — Обработка Текстовых Документов</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>ГОСТ 19.701-90</span>
            <span>•</span>
            <span>СанПиН 2.2.2/2.4.1340-03</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
