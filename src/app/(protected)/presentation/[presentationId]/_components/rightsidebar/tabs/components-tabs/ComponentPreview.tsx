import { Button } from '@/components/ui/button';
import { ContentItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react'
import { useDrag } from 'react-dnd';

type ComponentItemProps = {
    type:string;
    componentType:string;
    name:string;
    component:ContentItem;
    icon:string
}

const ComponentCard = ({item}:{item:ComponentItemProps}) => {

    const [{isDragging},drag]=useDrag({
        type:'CONTENT_ITEM',
        item:item,
        collect:(monitor)=>({isDragging: !!monitor.isDragging()}),
    })
  return (
    <div ref={drag as unknown as React.LegacyRef<HTMLDivElement> } className={cn(` border`,isDragging ? 'opacity-50':'opacity-100')}>

        <Button className={cn(`flex h-full flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary transition-all duration-200`,'text-center w-full','hover:scale-105 transform')}>
            <div className='w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-700 p-2 shadow-sm hover:shadow-md transition-shadow duration-200'>
                <div className='flex items-center flex-col gap-2'>
                    <span className='text-2xl text-primary'>{item.icon}</span>

                </div>
            </div>
        </Button>
    </div>
  )
}

export default ComponentCard