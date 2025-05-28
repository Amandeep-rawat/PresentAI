'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutSlides, Slide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import {v4 as uuidv4} from 'uuid'
import { MasterRecursiveComponent } from './MasterRecursiveComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { updateSlides } from '@/actions/projects';
interface DropZoneProps{
    index:number;
    onDrop:(
        item:{
            type:string;
            layoutType:string;
            component:LayoutSlides;
            index?:number;
        },
        dropIndex:number
    )=>void
    
    isEditable:boolean;
}
type Props = {
    isEditable:boolean
}


export const DropZone:React.FC<DropZoneProps>=({index,isEditable,onDrop})=>{

    const [{isOver,canDrop},dropRef]=useDrop({
        accept:['SLIDE','layout'],
        drop:(item : {
            type:string
            layoutType:string
            component:LayoutSlides
            index?:number
        })=>{
            onDrop(item,index)},
            canDrop:()=>isEditable,
            collect:(monitor)=>({isOver:!!monitor.isOver(),canDrop:!!monitor.canDrop()})
    })
    if(!isEditable) return null
return <div ref={dropRef as unknown as React.RefObject<HTMLDivElement>} className={cn('h-4 my-2 rounded-md transition-all duration-300 ',isOver && canDrop ? 'border-green-500 bg-green-100' : 'border-gray-300', canDrop ? 'border-blue-300':'')}>

    {
        isOver && canDrop && (
            <div className="h-full flex items-center justify-center text-green-600">
                Drop Here
            </div>
        )
    }
</div>
}

interface DraggableSlideProps{
    slide:Slide
    index:number
    moveSlide:(dragIndex:number,hoverIndex:number)=>void
    handleDelete:(id:string)=>void
    isEditable:boolean
}
export const DraggableSlide:React.FC<DraggableSlideProps>=({handleDelete,index,isEditable,moveSlide,slide})=>{
    const ref=useRef(null);
    const {currentSlide,setCurrentSlide,currentTheme,updateContentItem}=useSlideStore()
    const [{isDragging},drag]=useDrag({
        type:"SLIDE",
        item:{
            index,
            type:'SLIDE'
        },
        collect:(monitor)=>({
            isDragging:monitor.isDragging(),
        }),
        canDrag:isEditable,
    })

    const [,drop]=useDrop({
        accept:['SLIDE','LAYOUT'],
        hover(item:{index:number; type:string}){
            if(!ref.current || !isEditable ){
                return 
            }
            const dragIndex=item.index
            const hoverIndex=index
            if(item.type ==='SLIDE')
            {
                if(dragIndex===hoverIndex){
                return
            }
            moveSlide(dragIndex,hoverIndex)
            item.index=hoverIndex
            }
            
        },
    
    })
    
drag(drop(ref))

    const handleContentChange=(contentId:string,newContent:string | string[] | string[][])=>{
console.log("content changed",contentId,newContent,slide)
if(isEditable){
    updateContentItem(slide.id,contentId,newContent)
}
    }
   
   return <div ref={ref} className={cn('w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px] ','shadow-xl transition-shadow duration-300','flex flex-col ',index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2': '',slide.className, isDragging ? 'opacity-50' : 'opacity-100')}
   style={{
    backgroundImage:currentTheme.gradientBackground
   }}
   onClick={()=>setCurrentSlide(index)}
   >

<div className="h-full w-full flex-grow overflow-hidden">
    <MasterRecursiveComponent content={slide.content} onContentChange={handleContentChange} slideId={slide.id} index={index} isPreview={false} isEditable={isEditable}/>
</div>
{isEditable && (
    <Popover><PopoverTrigger asChild className='absolute top-2 left-2'>
            <Button size={"sm"} variant={"outline"}>
                <EllipsisVertical className='w-5 h-5'/>
                <span className='sr-only'> Slide options</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-fit  p-0'>
            <div className='flex space-x-2'>
                <Button variant={"ghost"} onClick={()=>handleDelete(slide.id)}>
                    <Trash2 className='w-5 h-5 text-red-500'/>
                    <span className='sr-only'>Delete Slide</span>
                </Button>
            </div>
        </PopoverContent>
        </Popover>
)}
    </div>
}

const Editor = ({isEditable}: Props) => {
    const {addSlideIndex,currentSlide,removeSlide,getOrderedSlides,project,reorderedSlides,slides}=useSlideStore()
    const [loading,setLoading]=useState(true)
    const orderedSlides=getOrderedSlides();


    const moveSlide=(dragIndex:number,hoverIndex:number)=>{
        if(isEditable){
reorderedSlides(dragIndex,hoverIndex);
        }
    }
    const handleDrop=(item:{type:string;layoutType:string;component:LayoutSlides;index?:number},dropIndex:number)=>{
        if(!isEditable) return;
        if(item.type==='layout'){
            addSlideIndex({
                ...item.component,
                id:uuidv4(),
                slideOrder:dropIndex
            },dropIndex)
        }
        else if( item.type==='SLIDE' && item.index!==undefined){
            moveSlide(item.index,dropIndex)
        }
    }

    const handleDelete=(id:string)=>{
        if(isEditable){
            console.log('deleting slide',id)
            removeSlide(id)
        }
    }
const slideRefs=useRef<(HTMLDivElement | null)[]>([])
const autosaveTimerRef=useRef<NodeJS.Timeout | null>(null);

    useEffect(()=>{
        if(
            
            slideRefs.current[currentSlide]
        ){
            slideRefs.current[currentSlide]?.scrollIntoView({behavior:'smooth',block:'center'})
        }
    },[currentSlide])

    useEffect(()=>{
        if( typeof window !=="undefined") setLoading(false)
    },[])

    const saveSlides=useCallback(()=>{
        if(isEditable && project){
            ;(async ()=>{
                await updateSlides(project.id,JSON.parse(JSON.stringify(slides)))
            })()
        }
    },[isEditable,project,slides])

    useEffect(()=>{
if(autosaveTimerRef.current){
    clearTimeout(autosaveTimerRef.current)
}
if(isEditable){
    autosaveTimerRef.current=setTimeout(()=>{
        saveSlides()
    },2000)
}
return ()=>{
    if(autosaveTimerRef.current){
        clearTimeout(autosaveTimerRef.current)
    }
}
    },[isEditable,slides,project])
  return (
    <div className='flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20'>

        {
            loading ? <div className='w-full px-4 flex flex-col space-y-6'>
                <Skeleton className='h-52 w-full'/>
                <Skeleton className='h-52 w-full'/>
                <Skeleton className='h-52 w-full'/>
            </div> : (
                <ScrollArea className='flex-1 mt-8'>
                    <div className="px-4  pb-4 space-y-4 pt-2">
                      
                        {orderedSlides.map((slide,index)=>(
                            <React.Fragment  key={slide.id ||index}>
                                <DraggableSlide slide={slide} index={index} moveSlide={moveSlide} handleDelete={handleDelete} isEditable={isEditable}/>
                                  {
                            isEditable && <DropZone index={index+1} onDrop={handleDrop} isEditable={isEditable}/>
                        }
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            )
        }
    </div>
  )
}

export default Editor