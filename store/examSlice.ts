import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Option {
  id: number;
  option: string;
}

export interface Question {
  question_id: number;
  number: number;
  question: string;
  comprehension: string | null;
  image: string | null;
  options: Option[];
}

export interface Answer {
  question_id: number;
  selected_option_id: number | null;
}

export interface Result {
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
  details: object[];
}

interface ExamState {
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  totalMarks: number;
  totalTime: number;
  timePerQuestion: number;
  markPerAnswer: number;
  instruction: string;
  result: Result | null;
  isSubmitted: boolean;
}

const initialState: ExamState = {
  questions: [],
  answers: [],
  currentIndex: 0,
  totalMarks: 0,
  totalTime: 0,
  timePerQuestion: 0,
  markPerAnswer: 0,
  instruction: '',
  result: null,
  isSubmitted: false,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setQuestions(
      state,
      action: PayloadAction<{
        questions: Question[];
        total_marks: number;
        total_time: number;
        time_for_each_question: number;
        mark_per_each_answer: number;
        instruction: string;
      }>
    ) {
      state.questions = action.payload.questions;
      state.totalMarks = action.payload.total_marks;
      state.totalTime = action.payload.total_time;
      state.timePerQuestion = action.payload.time_for_each_question;
      state.markPerAnswer = action.payload.mark_per_each_answer;
      state.instruction = action.payload.instruction;
      state.answers = action.payload.questions.map((q) => ({
        question_id: q.question_id,
        selected_option_id: null,
      }));
    },

    setAnswer(
      state,
      action: PayloadAction<{
        question_id: number;
        selected_option_id: number | null;
      }>
    ) {
      const index = state.answers.findIndex(
        (a) => a.question_id === action.payload.question_id
      );
      if (index !== -1) {
        state.answers[index].selected_option_id =
          action.payload.selected_option_id;
      }
    },

    nextQuestion(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }
    },

    prevQuestion(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },

    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },

    setResult(state, action: PayloadAction<Result>) {
      state.result = action.payload;
      state.isSubmitted = true;
    },

    resetExam(state) {
      state.questions = [];
      state.answers = [];
      state.currentIndex = 0;
      state.result = null;
      state.isSubmitted = false;
    },
  },
});

export const {
  setQuestions,
  setAnswer,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  setResult,
  resetExam,
} = examSlice.actions;

export default examSlice.reducer;