import { Button } from '@/components/ui/button';
import { LayoutSlides } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
     name:string;
     Icon:React.FC;
     onClick?:()=>void;
     isSelected?:boolean;
     type:string;
     component?:LayoutSlides
}

const LayoutPreviewItem = ({name,Icon,onClick,isSelected}: Props) => {
  
    return (
    <Button onClick={onClick} className={cn(`flex flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary transition-all duration-200`,'text-center w-full h-full hover:scale-105 transform ',isSelected && 'ring-2 ring-blue-500')}>

        <div className='w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-700 p-2 shadow-sm hover:shadow-md transition-shadow duration-200'>
        <Icon/>
        </div>
        <span className='text-sm text-gray-500 font-medium'>{name}</span>
    </Button>
  )
}

export default LayoutPreviewItem