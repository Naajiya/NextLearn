import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type { Question, Answer } from '@/store/examSlice';

interface ParagraphModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    currentQuestion?: Question
}


function ViewComprahansive({ open, setOpen, currentQuestion }: ParagraphModalProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="max-w-[700px] w-full">
                <DialogHeader>
                    <DialogTitle>Comprehansive Paragraph</DialogTitle>
                    <DialogDescription>
                      <hr />
                    </DialogDescription>
                </DialogHeader>

                <p className="text-sm text-gray-600 mt-2">
                    {currentQuestion && currentQuestion?.comprehension}
                </p>
              <div className='mt-3 max-w-full flex justify-end items-center'>
                        <button onClick={()=>setOpen(false)} className='w-3/5 bg-[#1C3141] text-white rounded-xl font-medium p-2'>Minimize</button>
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewComprahansive