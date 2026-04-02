'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import textIcon from '../../../public/exam/textIcon.png'
import polygon from '../../../public/exam/Polygon.png'
import container from '../../../public/exam/container.png'
import useExam from '@/hooks/useExam'

function page() {
    const {
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
    } = useExam()

    const [profileImagePreview, setProfileImagePreview] = useState<string>('')

    useEffect(() => {
        fetchQuestions()
    }, [])

    useEffect(() => {
        console.log(currentQuestion, "currect question")
    }, [currentQuestion])

    return (
        <div>
            <Header />
            <main className='bg-blue-50 min-h-screen w-full p-5'>
                <div className='w-3/5 text-[#1C3141]'>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>
                            Ancient Indian History MCQ
                        </p>
                        <div className='flex font-medium bg-white px-2'>
                            <p>01</p>
                            <p>/100</p>
                        </div>
                    </div>
                    <div className='w-full p-3 rounded-xl mt-3 bg-white'>
                        <div className='w-75 h-10'>
                            <div className='flex items-center justify-center gap-3 bg-[#177A9C] px-3 p-2 rounded text-white'>
                                <Image src={textIcon} className='w-5' alt='nextlearn' priority />
                                <p>Read Comprehensive Paragraph</p>
                                <Image src={polygon} className='h-3' alt='nextlearn' priority />
                            </div>
                        </div>
                        <div className='mt-3'>
                            {currentQuestion?.question && (
                                <div className='mt-3'>
                                    <div className='flex gap-1'>
                                        <span>{currentQuestion.number}</span>
                                        <p>{currentQuestion.question}</p> 
                                    </div>
                                </div>
                            )}
                            <label className="relative mt-3 w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition overflow-hidden">
                                {profileImagePreview ? (
                                    <Image
                                        src={profileImagePreview}
                                        alt="preview"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <>
                                        <p>no image</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm mt-2'>Choose the answer</p>

                        {currentQuestion?.options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectAnswer(
                                    currentQuestion.question_id,
                                    option.option_id
                                )}
                                className={`bg-white border border-slate-300 text-[#1C3141] relative flex items-center justify-between p-2 rounded-xl cursor-pointer hover:shadow-sm transition mt-2
                                    ${selectedOptionId === option.option_id
                                        ? 'border-[#1C3141] bg-[#1C3141] text-white'
                                        : 'border-slate-300'
                                    }`}>
                                <div className='flex gap-2 items-center'>
                                    <p className='font-semibold'>
                                        {String.fromCharCode(65 + index)}.
                                    </p>
                                    <p>{option.option}</p>
                                </div>
                                <Image
                                    src={container}
                                    alt='nextlearn'
                                    className='h-8 w-8'
                                />
                            </div>
                        ))}

                        <div className='flex justify-center items-center gap-3 mt-4'>
                            <button className='w-full text-sm p-2 bg-[#800080] text-white'>Mark for review</button>
                            <button className='w-full text-sm p-2 bg-[#CECECE] text-[#1C3141]'>Preview</button>
                            <button
                                onClick={handleNext}
                                className='w-full p-2 text-sm bg-[#1C3141] text-white'>
                                {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page