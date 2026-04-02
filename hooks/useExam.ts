import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
    setQuestions,
    setAnswer,
    nextQuestion,
    prevQuestion,
    setResult
} from "@/store/examSlice";
import { listQuestions, submitAnswers } from "@/services/api";
import type { Question, Answer } from '@/store/examSlice';

export default function useExam() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const questions = useAppSelector((state) => state.exam.questions) as Question[];
    const answers = useAppSelector((state) => state.exam.answers) as Answer[];
    const currentIndex = useAppSelector((state) => state.exam.currentIndex) as number;
    const timePerQuestion = useAppSelector((state) => state.exam.timePerQuestion) as number;
    const instruction = useAppSelector((state) => state.exam.instruction) as string;
    const totalMarks = useAppSelector((state) => state.exam.totalMarks) as number;
    const isSubmitted = useAppSelector((state) => state.exam.isSubmitted) as boolean;

    const [pageLoading, setPageLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const timeUpHandled = useRef(false);

    useEffect(() => {
        if (questions.length === 0) return;

        setTimer(timePerQuestion);
        timeUpHandled.current = false;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentIndex, questions]);

    const fetchQuestions = async () => {
        setPageLoading(true);
        try {
            const res = await listQuestions();
            console.log(res, 'response from fetch')
            if (res.data.success) {
                dispatch(setQuestions({
                    questions: res.data.questions,
                    total_marks: res.data.total_marks,
                    total_time: res.data.total_time,
                    time_for_each_question: res.data.time_for_each_question,
                    mark_per_each_answer: res.data.mark_per_each_answer,
                    instruction: res.data.instruction,
                }));
            } else {
                toast.error('Failed to load questions');
            }
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMessage = error.response?.data?.message || 'Network error.';
            toast.error(errorMessage);
        } finally {
            setPageLoading(false);
        }
    };

    const handleSelectAnswer = (questionId: number, optionId: number) => {
        dispatch(setAnswer({
            question_id: questionId,
            selected_option_id: optionId,
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            dispatch(nextQuestion());
        } else {
            handleSubmit();
        }
    };

    const handlePrev = () => {
        dispatch(prevQuestion());
    };

    const handleSubmit = async () => {
        setSubmitLoading(true);
        try {
            const res = await submitAnswers(answers);
              console.log(res, "response from s")
            if (res.data.success) {
              
                dispatch(setResult({
                    exam_history_id: res.data.exam_history_id,
                    score: res.data.score,
                    correct: res.data.correct,
                    wrong: res.data.wrong,
                    not_attended: res.data.not_attended,
                    submitted_at: res.data.submitted_at,
                    details: res.data.details,
                }));
                toast.success('Exam submitted successfully!');
                router.push('/result');
            } else {
                toast.error(res.data.message || 'Failed to submit exam');
            }
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMessage = error.response?.data?.message || 'Network error.';
            toast.error(errorMessage);
        } finally {
            setSubmitLoading(false);
        }
    };

    const currentQuestion = questions[currentIndex];

    const selectedOptionId = answers.find(
        (a) => a.question_id === currentQuestion?.question_id
    )?.selected_option_id ?? null;

    const formattedTimer = `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`;

    return {
        questions,
        answers,
        currentIndex,
        currentQuestion,
        selectedOptionId,
        timePerQuestion,
        instruction,
        totalMarks,
        isSubmitted,
        pageLoading,
        submitLoading,
        timer,
        formattedTimer,
        handleSelectAnswer,
        handleNext,
        handlePrev,
        handleSubmit,
        fetchQuestions
    };
}