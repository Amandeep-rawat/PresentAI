"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {motion} from 'framer-motion'
import { containerVaraints, itemVariants } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import useScratchStore from '@/store/useScrachStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import CardList from '../Common/CardList';
import { OutlineCard } from '@/lib/types';
import { v4} from "uuid"
import { toast } from 'sonner';
import { createProject } from '@/actions/projects';
import { useSlideStore } from '@/store/useSlideStore';
type Props={
    onBack:()=>void;
}
const ScratchPage = ({onBack}:Props) => {
  


    const router =useRouter()
    const {setProject}=useSlideStore()
    const {outlines,addMultipleOutlines,resetOutlines,addOutlines}=useScratchStore()
    const [editText,setEditText]=useState('')
    const [editingCards,setEditingCards]=useState<string | null>(null)
    const [selectedCard,setSelectedCard]=useState<string | null>(null)

    const handleBack=()=>{
      resetOutlines();
      onBack();
    }
    const resetCards=()=>{
      setEditText('');

      resetOutlines();

    }
const handleAddCard=()=>{
  const newCard:OutlineCard={
    id:v4(),
    title:editText ||'New Section',
    order:outlines.length+1,
  }
  setEditText('');
  addOutlines(newCard)
}
const handleGenerate=async()=>{
  if(outlines.length===0){
    toast.error("Error",{
      description:"Please add atleast one card to generate slides"
    })
    return ;
  }

    const res=await createProject(outlines?.[0]?.title,outlines);
    if(res.status!==200){
      toast.error("Error",{
      description:res.error || 'Failed to create Project'
      })
      return;

    }
    if(res.data){
      setProject(res.data);
      resetOutlines()
      toast.success("Success",{
        description:"Project Created Successfully"
      })
      router.push(`/presentation/${res.data.id}/select-theme`)
    }
    else{
      toast.error("Error",{
        description:"Failed to create Project"
      })
    }
}
  return (
    <motion.div
    className='space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
        variants={containerVaraints}
        initial="hidden"
        animate="visible"

    
    >
      <Button onClick={handleBack} variant={"outline"} className='mb-4'>
        <ChevronLeft className='mr-2 h-4 w-4'/>
        Back

      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div className='bg-primary/10 p-4 rounded-xl' variants={itemVariants}
      
      
      >
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
            <Input value={editText} onChange={(e)=>setEditText(e.target.value)} placeholder='Enter PPT Prompt and add the cards' className='text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow '/>
            <div className="flex items-center gap-3">
            <Select value={outlines.length>0 ? outlines.length.toString():'0'}>
              <SelectTrigger className='w-fit gap-2 shadow-xl font-semibold'>
          <SelectValue placeholder="Select number of Cards"/>

              </SelectTrigger>
              <SelectContent className='w-fit'>
          {
            outlines.length===0? <SelectItem value='0' className='font-semibold'>
              No Cards
            </SelectItem>:(Array.from({length:outlines.length},(_,index)=>{
              return index+1;
            }).map((num)=>(
              <SelectItem key={num} value={num.toString()} className='font-semibold'>
                {num}{num===1?'Card':'Cards'}
              </SelectItem>
            )))
          }
              </SelectContent>
            </Select>
            <Button
            className='' variant={"destructive"} size={"icon"}  onClick={resetCards} aria-label='Reset cards' 
            >
              <RotateCcw className='h-4 w-4'/>
               
            </Button>
            </div>
          </div>
      </motion.div>

      <CardList outlines={outlines} addOutline={addOutlines} addMultipleOutlines={addMultipleOutlines} editingCard={editingCards}  selectedCard={selectedCard} editText={editText} onEditChange={setEditText} onCardSelect={setSelectedCard} setEditText={setEditText} setEditingCard={setEditingCards} setSelectedCard={setSelectedCard} onCardDoubleClick={(id,title)=>{setEditingCards(id)
        setEditText(title)
        
      }}/>  
      <Button onClick={handleAddCard} variant={"secondary"} className='w-full bg-primary-10'>
        Add Card
      </Button>
      {
        outlines?.length >0 && (
          <Button onClick={handleGenerate} className='w-full'>
              Generate Ppt
          </Button>
        )
      }
        
    </motion.div>
  );
}

export default ScratchPage;
