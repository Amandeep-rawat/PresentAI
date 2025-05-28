import { useSlideStore } from '@/store/useSlideStore'
import {motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MasterRecursiveComponent } from '../editor/MasterRecursiveComponent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Props = {
    onClose:()=>void
}

const PresentationMode = ({onClose}: Props) => {
const [currentSlideIndex,setCurrentSlideIndex]=useState(0)
const {currentTheme,getOrderedSlides}=useSlideStore()
const slides=getOrderedSlides()
const goTopreviousSLide=()=>{
    setCurrentSlideIndex((prev)=> Math.max(prev-1,0))
}
const isLastSlide=currentSlideIndex===slides.length-1
const goToNextSlide=()=>{
    if(currentSlideIndex == slides.length-1){
        onClose()
    }
    else{
        setCurrentSlideIndex((prev)=>Math.min(prev+1,slides.length-1));
    }
}

useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
     if(e.key==='ArrowRight' || e.key ===''){
        if(currentSlideIndex===slides.length-1){
            onClose()
        }
        else{
            setCurrentSlideIndex((prev)=>Math.min(prev+1,slides.length-1));
        }
     } 
     else if (e.key==='ArrowLeft'){
        setCurrentSlideIndex((prev)=> Math.max(prev-1,0))
     }  
     else if (e.key==='Escape'){
        onClose()
     }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
        window.removeEventListener('keydown', handleKeyDown)
    }
},[slides.length,currentSlideIndex])
    return (
    <div className='fixed inset-0 bg-black z-50 flex items-center justify-center'>
        <div className='relative w-full h-full' style={{
            aspectRatio:"16/9",
            maxHeight:"100vh",
            maxWidth:"177.78vh"
        }}>
            <AnimatePresence mode='wait'>
                <motion.div key={currentSlideIndex}
                initial={{opacity:0,scale:0.8}}
                animate={{opacity:1,scale:1}}
                exit={{opacity:0,scale:1.2}}
                transition={{duration:0.5}}
                className={`w-full h-full pointer-events-none ${slides[currentSlideIndex].className}`}
                style={{
                    backgroundColor:currentTheme.slideBackgroundColor,
                    backgroundImage:currentTheme.gradientBackground,
                    color:currentTheme.accentColor,
                    fontFamily:currentTheme.fontFamily

                }}
                >
                    <MasterRecursiveComponent content={slides[currentSlideIndex].content} slideId={slides[currentSlideIndex].id}  onContentChange={()=>{}} isPreview={false} isEditable={false}/>

                </motion.div>
            </AnimatePresence>
            <Button variant={"ghost"} size={"icon"} className='absolute top-4 right-4 text-white' onClick={onClose}>
                <X className='h-6 w-6'/>
            </Button>
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4'>
                <Button onClick={goTopreviousSLide} disabled={currentSlideIndex===0} variant={"outline"} size={"icon"}>
                <ChevronLeft className='h-6 w-6'/>
                </Button>
                
                {
                    !isLastSlide &&(

                <Button onClick={goToNextSlide}  variant={"outline"} size={"icon"}>
              
                        
                        <ChevronRight className='h-6 w-6'/>
                    
                </Button>
                    )
                }

            </div>
        </div>
    </div>
  )
}

export default PresentationMode