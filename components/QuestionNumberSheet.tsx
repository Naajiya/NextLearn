import useExam from '@/hooks/useExam'
import React, { useEffect } from 'react'

function QuestionNumberSheet() {
    const {
        questions,
        fetchQuestions
    } = useExam()
    useEffect(() => {
        fetchQuestions()
    }, [])
    useEffect(() => {
        console.log(questions.length, "questions")
    }, [questions])

    return (
        <div className=''>
            <div className='flex justify-between items-center px-5'>
                <p className='text-sm'>Question No. Sheet:</p>
                <div className='flex items-center justify-center gap-2'>
                    <p> Remaining Time</p>
                    <div className='bg-[#1C3141] px-2 text-white rounded'>
                        87:13
                    </div>
                </div>

            </div>
            <div className=''>
                 <div className='px-5 mt-3 flex gap-2'>
                {
                    questions.map((item,index )=> (
                       
                            <div key={item.question_id} className='h-10 w-20 flex items-center justify-center rounded border  border-slate-200 p-1 bg-white'>
                                {index+1}
                            </div>
                       
                    ))
                }
                 </div >
            </div>


        </div>
    )
}

export default QuestionNumberSheet