'use client'

import Header from '@/components/Header'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import textIcon from '../../../public/exam/textIcon.png'
import polygon from '../../../public/exam/Polygon.png'
import container from '../../../public/exam/container.png'
import useExam from '@/hooks/useExam'
import ViewComprahansive from '@/components/ViewComprahansive'
import containerFilled from '../../../public/exam/containerFilled.png'
import QuestionNumberSheet from '@/components/QuestionNumberSheet'

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
        console.log(selectedOptionId, "selected option id")
    }, [currentQuestion, selectedOptionId])

    const [open, setOpen] = useState(false)
    console.log('answers:', answers)
    console.log('currentQuestion?.question_id:', currentQuestion?.question_id)
    console.log('selectedOptionId:', selectedOptionId)

    return (
        <div>
            <Header />
            <main className='bg-blue-50 min-h-screen w-full p-3 md:p-5 flex flex-col lg:flex-row gap-4'>

                {/* Left Section */}
                <div className='w-full lg:w-3/5 text-[#1C3141] h-full'>

                    <div className='flex justify-between items-center'>
                        <p className='font-medium text-xl md:text-base'>
                            Ancient Indian History MCQ
                        </p>
                        <div className='flex font-medium bg-white px-2 py-1 rounded'>
                            <p className='text-sm'>{currentIndex + 1}</p>
                            <p className='text-sm '>/ {questions.length}</p>
                        </div>
                    </div>

                    <div className='w-full p-3 rounded-xl mt-3 bg-white'>

                        {/* Read Paragraph Button */}
                        <div className='w-full md:w-fit h-10'>
                            <div
                                onClick={() => setOpen(true)}
                                className='flex items-center justify-center gap-2 md:gap-3 bg-[#177A9C] px-3 p-2 rounded text-white cursor-pointer'
                            >
                                <Image src={textIcon} className='w-4 md:w-5' alt='nextlearn' priority />
                                <p className='font-medium text-[18px] leading-[100%] tracking-normal md:text-sm'>
                                    Read Comprehensive Paragraph
                                </p>
                                <Image src={polygon} className='h-2 md:h-3' alt='nextlearn' priority />
                            </div>
                        </div>

                        <div className='mt-3'>
                            {currentQuestion?.question && (
                                <div className='mt-3'>
                                    <div className='flex gap-1 items-center text-sm md:text-base'>
                                        <span>{currentQuestion.number}.</span>
                                        <p className='font-medium text-[18px] leading-[100%] tracking-normal'>{currentQuestion.question}</p>
                                    </div>
                                </div>
                            )}

                            {/* Upload */}
                            {/* <label className="relative mt-3 w-32 h-32 md:w-40 md:h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition overflow-hidden">
                    {profileImagePreview ? (
                        <Image
                            src={profileImagePreview}
                            alt="preview"
                            fill
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <>
                            <p className='text-xs md:text-sm'>no image</p>
                        </>
                    )}
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                    />
                </label> */}
                        </div>
                    </div>

                    {/* Options */}
                    <div className='w-full'>
                        <p className='text-sm mt-2 text-[#5C5C5C]'>Choose the answer</p>

                        {currentQuestion?.options.map((option, index) => {
                            // ✅ check per option for easier debugging
                            const isSelected = Number(selectedOptionId) === Number(option.id)

                            console.log(`option ${index}:`, {
                                option_id: option.id,
                                selectedOptionId,
                                isSelected
                            })

                            return (
                                <div
                                    key={option.id} // ✅ use option_id not index
                                    onClick={() => handleSelectAnswer(
                                        currentQuestion.question_id,
                                        option.id
                                    )}
                                    className={`bg-white border text-[#1C3141] relative flex items-center justify-between p-2 rounded-xl cursor-pointer hover:shadow-sm transition mt-2
                ${isSelected
                                            ? 'border-[#1C3141] bg-[#1C3141] text-white'
                                            : 'border-slate-300'
                                        }`}
                                >
                                    <div className='flex gap-2 text-[#1C3141] items-center text-sm md:text-base'>
                                        <p>{String.fromCharCode(65 + index)}.</p>
                                        <p className='text-[14px]'>{option.option}</p>
                                    </div>

                                    <Image
                                        src={isSelected ? containerFilled : container}
                                        alt='nextlearn'
                                        className='h-6 w-6 md:h-8 md:w-8'
                                    />
                                </div>
                            )
                        })}

                        {/* Buttons */}
                        <div className='flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mt-4'>
                            <button className='w-full text-sm p-2 bg-[#800080] text-white rounded'>
                                Mark for review
                            </button>

                            <button onClick={handlePrev} className='w-full text-sm p-2 bg-[#CECECE] text-[#1C3141] rounded'>
                                Preview
                            </button>

                            <button
                                onClick={handleNext}
                                className='w-full p-2 text-sm bg-[#1C3141] text-white rounded'
                            >
                                {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className='w-full h-full lg:w-2/5'>
                    <QuestionNumberSheet />
                </div>
            </main>
            <div>
                <ViewComprahansive
                    open={open}
                    setOpen={setOpen}
                    currentQuestion={currentQuestion}
                />
            </div>

        </div>
    )
}

export default page