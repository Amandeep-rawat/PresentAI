import usePromptStore from '@/store/usePromptStore';
import React from 'react';
import { motion } from "framer-motion"
import { containerVaraints, itemVariants } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useCreativeAiStore from '@/store/useCreativeAiStore';
import { toast } from 'sonner';
const RecentPrompts = () => {
    const { prompts, setPage } = usePromptStore()
    const { addMultipleOutlines, currentAiPrompt, setCurrentAiPrompt, outlines } = useCreativeAiStore()
    const handleEdit = (id: string) => {
        const prompt = prompts.find((prompt) => prompt.id === id)
        if (prompt) {
            setPage("creative-ai");
            addMultipleOutlines(prompt.outlines)
            setCurrentAiPrompt(prompt.title)
        }
        else {
            toast.error('Error', {
                description: 'Prompt not found'
            })
        }
    }
    return (
        <motion.div
            variants={containerVaraints}
            className='space-y-4 !mt-20'


        >
            <motion.h2 className='text-2xl font-semibold text-center' variants={itemVariants}>

                Your recent Prompts
            </motion.h2>
            <motion.div className=' space-y-2 w-full lg:max-w-[80%] mx-auto' variants={containerVaraints}>

                {
                    prompts.map((prompt, index) => {
                        return (
                            <motion.div variants={itemVariants} key={index} className='mb-5'>
                                <Card className='p-4 flex dark:bg-black overflow-hidden items-center justify-between hover:bg-accent/50 transition-colors duration-200'>
                                
                                <div className='flex w-full items-center justify-around'>

                                    <div className="max-w-[70%] ">
                                        <h3 className='font-semibold text-xl line-clamp-1'>
                                            {prompt.title.slice(0, 13)}...


                                        </h3>
                                        <p className='font-semibold text-sm  text-muted-foreground '>

                                            {timeAgo(prompt?.createdAt)}


                                        </p>

                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <span className='text-sm text-purple-300'>
                                            Creative Ai
                                        </span>
                                        {/* <Button variant={"default"}
                                            size={"sm"}
                                            className='rounded-xl bg-primary/20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary'


                                            onClick={() => handleEdit(prompt?.id)}
                                        >
                                            Edit
                                        </Button> */}
                                    </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })
                }
            </motion.div>
        </motion.div>
    );
}

export default RecentPrompts;
