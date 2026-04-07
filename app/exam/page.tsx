'use client'
import Header from '@/components/Header'
import useExam from '@/hooks/useExam'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const { fetchQuestions, questions,pageLoading } = useExam()
    const router = useRouter()

    useEffect(() => {
        fetchQuestions
    }, [])

    function goToQuestion() {
        router.push('/exam/question')
    }
    return (
        <div>
            <Header />
            <main className='bg-blue-50 min-h-screen flex justify-center items-center flex-col px-4'>
                <div className='max-w-[682px] w-full'>
                    <h3 className='text-xl md:text-2xl mb-4 text-[#1C3141] font-semibold text-center'>
                        Ancient India History MCQ
                    </h3>
                    <div className='
                bg-[#1C3141] 
                text-white 
                px-6 py-5 
                flex 
                flex-col md:flex-row 
                items-center 
                justify-center 
                gap-6 
                w-full 
                rounded-lg
                '>
                        <div className='text-center'>
                            <p className='text-sm text-gray-300'>Total MCQ's:</p>
                            <h3 className='text-2xl md:text-3xl font-semibold'>
                                {questions.length}
                            </h3>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-gray-400"></div>
                        <div className="block md:hidden w-full h-px bg-gray-400"></div>
                        <div className='text-center'>
                            <p className='text-sm text-gray-300'>Total marks:</p>
                            <h3 className='text-2xl md:text-3xl font-semibold'>
                                {questions.length}
                            </h3>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-gray-400"></div>
                        <div className="block md:hidden w-full h-px bg-gray-400"></div>
                        <div className='text-center'>
                            <p className='text-sm text-gray-300'>Total time:</p>
                            <h3 className='text-2xl md:text-3xl font-semibold'>
                                {questions.length}:00
                            </h3>
                        </div>

                    </div>
                    <div className='mt-5 w-full flex flex-col justify-start text-[#5C5C5C]'>
                        <p className=''>Instructions:</p>
                        <div className='mt-3'>
                            <ol className="list-decimal text-sm pl-5 space-y-2">
                                <li>You have {questions.length} minutes to complete the test.</li>
                                <li>Test consists of {questions.length} multiple-choice questions.</li>
                                <li>You are allowed 2 retest attempts if you do not pass on the first try.</li>
                                <li>Each incorrect answer will incur a negative mark of -1/4.</li>
                                <li>Ensure you are in a quiet environment and have a stable internet connection.</li>
                                <li>Keep an eye on the timer, and try to answer all questions within the given time.</li>
                                <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
                                <li>Complete the test honestly to accurately assess your proficiency level.</li>
                                <li>Check answers before submitting.</li>
                                <li>Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test.</li>
                            </ol>
                        </div>
                    </div>
                    <div className='mt-3 max-w-full flex justify-center items-center'>
                        <button onClick={goToQuestion} className='w-3/5 bg-[#1C3141] text-white rounded-xl font-medium p-2'>Start Test</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page