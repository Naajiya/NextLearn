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
            <DialogContent  style={{ maxWidth: '900px', width: '100%' }}>
                <DialogHeader>
                    <DialogTitle className='mb-2'>Comprehansive Paragraph</DialogTitle>
                    <div>
                      <hr />
                    </div>
                </DialogHeader>

                <p className="text-sm text-gray-600 mt-2">
                    {currentQuestion && currentQuestion?.comprehension}
                </p>
              <div className='mt-3 max-w-full flex justify-end items-center'>
                        <button onClick={()=>setOpen(false)} className='w-50 bg-[#1C3141] text-white rounded font-medium p-2'>Minimize</button>
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewComprahansive