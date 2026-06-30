export enum LessonStep {
  INTRO = "intro",
  TYPEWRITER = "typewriter",
  WORD_PROCESSOR = "word_processor",
  MOUSE_TRAINING = "mouse_training",
  CURSOR_TUTORIAL = "cursor_tutorial",
  KEYBOARD_TRAINING = "keyboard_training",
  QUIZ = "quiz"
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface TypewriterState {
  text: string;
  paperLines: string[];
  caretPos: number;
}

export interface DocumentFormatting {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontFamily: string;
  fontSize: string; // e.g., '14px', '18px'
  textAlign: "left" | "center" | "right" | "justify";
  textColor: string;
}

export interface MouseChallenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: "click" | "double_click" | "right_click" | "drag_select";
}

export interface KeyboardChallenge {
  id: string;
  targetWord: string;
  userTyped: string;
  completed: boolean;
}
