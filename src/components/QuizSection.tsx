import React, { useState } from "react";
import { Check, X, Award, Printer, ArrowRight, RotateCcw, ShieldCheck, Heart } from "lucide-react";
import AudioSpeaker from "./AudioSpeaker";
import { QuizQuestion } from "../types";

export default function QuizSection() {
  const [userName, setUserName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Что такое обработка текста?",
      options: [
        "Процесс рисования картинок на экране",
        "Процесс создания электронных документов путём ввода или изменения текста",
        "Процесс отправки электронных писем друзьям",
        "Процесс физического ремонта клавиатур и мышек"
      ],
      correctAnswer: 1,
      explanation: "Обработка текста — это именно процесс создания, редактирования и ввода символов для получения электронных документов."
    },
    {
      id: 2,
      question: "Какая кнопка компьютерной мыши используется чаще всего?",
      options: [
        "Правая кнопка мыши",
        "Левая кнопка мыши",
        "Колёсико прокрутки",
        "Кнопка включения монитора"
      ],
      correctAnswer: 1,
      explanation: "Левая кнопка мыши — это основная кнопка для совершения большинства действий: нажатия кнопок, открытия файлов и выделения текста."
    },
    {
      id: 3,
      question: "Какое главное отличие текстового курсора от курсора мыши?",
      options: [
        "Текстовый курсор умеет двигаться сам по себе",
        "Курсор мыши указывает, куда будет вставлен текст",
        "Курсор мыши показывает положение мыши, а текстовый (мигающий) — указывает место ввода новых букв",
        "Они абсолютно ничем не отличаются друг от друга"
      ],
      correctAnswer: 2,
      explanation: "Разница принципиальна: стрелка мыши показывает, где находится мышь, а мигающая палочка (текстовый курсор) указывает, куда встанет следующая введённая буква."
    },
    {
      id: 4,
      question: "Какая программа чаще всего используется для создания и оформления текстов?",
      options: [
        "Microsoft Word",
        "Калькулятор",
        "Google Chrome",
        "Paint"
      ],
      correctAnswer: 0,
      explanation: "Microsoft Word — это самый популярный и удобный в мире текстовый процессор для работы с электронными документами."
    },
    {
      id: 5,
      question: "Для чего используется клавиша Backspace на клавиатуре?",
      options: [
        "Чтобы сделать буквы огромными (ЗАГЛАВНЫМИ)",
        "Чтобы стереть символ, стоящий слева от мигающего текстового курсора",
        "Чтобы поставить пробел между соседними словами",
        "Чтобы выключить компьютер после работы"
      ],
      correctAnswer: 1,
      explanation: "Клавиша Backspace (со стрелкой влево) служит для быстрого удаления букв или символов перед курсором при исправлении ошибок."
    }
  ];

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (optionIdx === quizQuestions[currentQuestionIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setShowCertificate(false);
    setUserName("");
  };

  const currentQ = quizQuestions[currentQuestionIdx];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm print:p-0 print:border-0 print:shadow-none">
      
      {/* Quiz Screen */}
      {!quizFinished && (
        <div className="print:hidden">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              Проверка знаний
            </span>
            <AudioSpeaker 
              id={`quiz_q_${currentQ.id}`} 
              text={`Вопрос номер ${currentQ.id}: ${currentQ.question}`} 
            />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
            Тест: Проверь свои знания
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Вопрос {currentQuestionIdx + 1} из {quizQuestions.length}
          </p>

          {/* Question card */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="flex flex-col gap-3">
              {currentQ.options.map((option, idx) => {
                let btnStyle = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300";
                
                if (isAnswered) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-700 dark:text-emerald-300";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-red-50 border-red-400 text-red-800 dark:bg-red-950/20 dark:border-red-700 dark:text-red-300";
                  } else {
                    btnStyle = "opacity-50 border-slate-100 dark:border-slate-900 text-slate-400";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition-all duration-200 ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQ.correctAnswer && (
                      <Check className="w-5 h-5 text-emerald-600" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer explanation */}
            {isAnswered && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                <strong>Пояснение:</strong> {currentQ.explanation}
              </div>
            )}
          </div>

          {/* Action button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all"
              >
                <span>{currentQuestionIdx === quizQuestions.length - 1 ? "Завершить тест" : "Следующий вопрос"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Finished Quiz Screen (Score & Name Input) */}
      {quizFinished && !showCertificate && (
        <div className="text-center py-10 max-w-md mx-auto print:hidden">
          <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full mb-4">
            <Award className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Поздравляем! Вы прошли тест!
          </h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Ваш результат: <strong className="text-blue-600 font-mono text-lg">{score}</strong> из <strong className="font-mono text-lg">{quizQuestions.length}</strong> правильных ответов.
          </p>

          {/* Score comments */}
          <div className="my-6 p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {score === 5 && "🥇 Великолепно! Вы усвоили абсолютно каждую деталь этого урока. Настоящий мастер!"}
            {score >= 3 && score < 5 && "🥈 Отличный результат! Вы прекрасно разобрались в работе с клавиатурой и мышью."}
            {score < 3 && "🥉 Хорошая попытка! Вы можете перечитать урок и попробовать пройти тест снова, чтобы набрать 5 из 5."}
          </div>

          {/* Certificate generation input */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Введите ваше Имя и Фамилию для диплома:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Например: Никита Смирнов"
              className="w-full px-4 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
            <button
              onClick={() => userName.trim() && setShowCertificate(true)}
              disabled={!userName.trim()}
              className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg text-xs uppercase tracking-wider transition-all"
            >
              Получить диплом 🎓
            </button>
          </div>

          <button
            onClick={restartQuiz}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs flex items-center gap-1 mx-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Пройти тест заново
          </button>
        </div>
      )}

      {/* Printable Certificate of Completion */}
      {quizFinished && showCertificate && (
        <div className="flex flex-col items-center">
          
          {/* Certificate container */}
          <div 
            id="certificate-print-area"
            className="w-full max-w-2xl aspect-[1.414/1] bg-amber-50/20 text-slate-900 border-12 border-double border-amber-600 p-8 rounded shadow-xl bg-white relative overflow-hidden flex flex-col justify-between print:shadow-none print:border-amber-600 print:w-[100vw] print:h-[70vh] print:m-0"
            style={{ 
              backgroundImage: "radial-gradient(circle, rgba(217,119,6,0.02) 0%, transparent 80%)",
              fontFamily: "'PT Serif', 'Times New Roman', serif"
            }}
          >
            {/* Elegant corner decals */}
            <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-amber-600"></div>
            <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-amber-600"></div>
            <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-amber-600"></div>
            <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-amber-600"></div>

            {/* Header */}
            <div className="text-center mt-4">
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-amber-800">
                ДИПЛОМ ОБ УСПЕШНОМ ОКОНЧАНИИ УРОКА
              </span>
              <h1 className="text-3xl font-bold text-amber-900 mt-2 tracking-wide">
                Сертификат Выпускника
              </h1>
              <div className="h-0.5 w-32 bg-amber-600 mx-auto mt-2"></div>
            </div>

            {/* Body text */}
            <div className="text-center px-8">
              <p className="text-xs text-slate-500 font-sans italic">
                Настоящий документ удостоверяет, что будущий IT-специалист
              </p>
              <h2 className="text-2xl font-bold font-serif text-slate-800 border-b border-slate-300 pb-1 mt-3 mb-1 uppercase tracking-wide inline-block px-12">
                {userName}
              </h2>
              <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-lg mx-auto">
                успешно прошёл интерактивный курс обучения по теме <strong>«Работа с текстовым документом»</strong>, овладел базовыми приёмами печати на пишущих машинках, ввода букв с клавиатуры и точного клика мыши, получив балл <strong>{score} из 5</strong> на квалификационном экзамене.
              </p>
            </div>

            {/* Footer with stamp & signature */}
            <div className="flex justify-between items-end px-8 mb-4 font-sans text-xs">
              
              <div className="text-left w-1/3">
                <div className="border-b border-slate-300 h-6 font-serif italic text-amber-800">Искусственный Интеллект</div>
                <div className="text-[9px] text-slate-400 mt-1">ИНСТРУКТОР</div>
              </div>

              {/* Decorative Stamp Seal */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-amber-600 border-dashed transform rotate-12 bg-white/50">
                <div className="absolute text-[8px] text-center font-bold text-amber-700 leading-none">
                  ОДОБРЕНО<br/>100%<br/>ЗНАНИЯ
                </div>
                <ShieldCheck className="w-8 h-8 text-amber-500 opacity-20 absolute" />
              </div>

              <div className="text-right w-1/3">
                <div className="border-b border-slate-300 h-6 font-mono text-[10px]">{new Date().toLocaleDateString("ru-RU")}</div>
                <div className="text-[9px] text-slate-400 mt-1">ДАТА ВЫДАЧИ</div>
              </div>

            </div>

            {/* Bottom Credit line */}
            <div className="text-center text-[7px] text-slate-400 font-sans pb-1 flex items-center justify-center gap-1">
              <span>Сделано с любовью к обучению</span>
              <Heart className="w-2 h-2 text-red-400 fill-red-400" />
            </div>

          </div>

          {/* Certificate actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              <Printer className="w-4 h-4" />
              Распечатать Диплом
            </button>
            <button
              onClick={restartQuiz}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Пройти заново
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
