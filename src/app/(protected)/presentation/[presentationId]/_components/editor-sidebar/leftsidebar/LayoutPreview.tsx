import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect, useState } from 'react'
import DraggableSlidePreview from './DraggableSlidePreview'



const LayoutPreview = () => {
    const {getOrderedSlides,reorderedSlides}=useSlideStore()
    const [loading,setLoading]=useState(true)
    const slides=getOrderedSlides();
const moveSlide=(dragIndex:number,hoverIndex:number)=>{
    reorderedSlides(dragIndex,hoverIndex);
}

    useEffect(()=>{
        if( typeof window !=="undefined") setLoading(false)
    },[])
  return (
    <div className='w-72 max-[900px]:hidden h-full overflow-hidden fixed top-20 left-0 border-r overflow-y-auto'>
        <ScrollArea className='h-full  w-full' suppressHydrationWarning>
            {
                loading ? (
                    <div className='w-full px-4 flex  flex-col space-y-4'>

                    <Skeleton className='h-20 w-full'/>
                    <Skeleton className='h-20 w-full'/>
                    <Skeleton className='h-20 w-full'/>
                    </div>
                ):(
                    <div className="p-4 pb-32  space-y-6">
                        <div className="flex items-center  justify-between mb-6">
                            <h2 className="text-sm fonotme
                             dark:text-gray-100 text-gray-500">
                                SLIDES
                             </h2>
                             <span suppressHydrationWarning className='text-xs dark:text-gray-200 text-gray-400'>
                                {
                                    slides?.length
                                }slides

                             </span>
                        </div>
                        {
                            slides.map((slide,index)=>{
                                return (<DraggableSlidePreview
                                    
                                    key={slide.id || index} slide={slide} index={index} moveSlide={moveSlide}/>)
                            })
                        }
                    </div>
                )
            }
        </ScrollArea>
    </div>
  )
}

export default LayoutPreview