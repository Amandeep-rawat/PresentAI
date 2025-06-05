"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import {motion} from "framer-motion"
import { containerVaraints, itemVariants } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useCreativeAiStore from '@/store/useCreativeAiStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CardList from '../Common/CardList';
import usePromptStore from '@/store/usePromptStore';
import RecentPrompts from './recentprmpts';
import { toast } from 'sonner';
import { generateCreativePrompt } from '@/actions/chatgpt';
import { OutlineCard } from '@/lib/types';
import { v4 as uuid } from 'uuid';
import { createProject } from '@/actions/projects';
import { useSlideStore } from '@/store/useSlideStore';
type Props={
    onBack:()=>void;
}
const CreativeAi = ({onBack}:Props) => {
    const router=useRouter();
    const {setProject}=useSlideStore()
    const {currentAiPrompt,resetOutlines,outlines, addMultipleOutlines,addOutline,setCurrentAiPrompt}=useCreativeAiStore()
    const handleBack=()=>{
        onBack();
    }
    const [editingCards,setEditingCards]=React.useState<string | null>(null)
    const [isGenerating,setIsGenerating]=React.useState(false)
    const [selectedCard,setSelectedCard]=React.useState<string | null>(null)
const {addPrompt}=usePromptStore()
    const [numberOfCards,setNumberOfCards]=React.useState(0)
    const [editText,setEditText]=React.useState('')
    const resetCards=()=>{
setEditingCards(null)
setSelectedCard(null)
setEditText('')
setCurrentAiPrompt(''

)
resetOutlines();
}
const generateOutline=async()=>{
 
  if(currentAiPrompt===""){
    toast.error('Error',{
      description:"please enter a prompt to generate"
    })
    return 
  }
  setIsGenerating(true);
  const res=await generateCreativePrompt(currentAiPrompt)
  console.log("data form ai ",res.data)
  if(res.status===200 && res?.data?.outlines
  )
  {
const cardsData:OutlineCard[] =[];
res.data.outlines.map((outline:string,index:number)=>{
  const newCard={
    id:uuid(),
    title:outline,
    order:index+1,

  }
  cardsData.push(newCard)
})
addMultipleOutlines(cardsData)
setNumberOfCards(cardsData.length)
toast.success('Success',{
  description:"Outlines generated successfully"
})

  }
  else{
    toast.error('Error',{
      description:"faild to generate outline"
    })

  }
  setIsGenerating(false)
}

useEffect(()=>{
  setNumberOfCards(outlines.length)
},[outlines.length])
const handleGenerate=async()=>{
  setIsGenerating(true);
  if(outlines.length===0){
    toast.error("Error",{
      description:"Please add atleast one card to generate slides"
    })
    return ;

}
try {
  const res=await createProject(currentAiPrompt,outlines.slice(0,numberOfCards));
  if (res.status !== 200 || !res.data) {
    toast.error("Error", {
      description: res.error || 'Failed to create Project',
    });
    return;
  }
  
  router.push(`/presentation/${res.data.id}/select-theme`)
  setProject(res.data)
  addPrompt({
    id:uuid(),
    title:currentAiPrompt || outlines?.[0]?.title,
    outlines:outlines,
    createdAt:new Date().toISOString(),
  })
  toast.success("Success",{
    description:"Project Created Successfully"
  })
setCurrentAiPrompt("");
resetOutlines();
} catch (error) {
  console.log(error)
  toast.error("Error",{
    description:"Failed to create Project"
  })
} finally{
  setIsGenerating(false);
}
}
const {prompts}=usePromptStore()

  return (
    <motion.div className='space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8' variants={containerVaraints}
    
    initial="hidden"
    animate="visible"

    >
<Button onClick={handleBack}
variant={'outline'}
className='mb-4'
>
<ChevronLeft className='mr-2 w-4'/>
</Button>

<motion.div
 variants={itemVariants}
 className='text-center space-y-2'
>
  <h1 className="text-4xl  font-bold text-primary">

    Generate with <span className="text-purple-300">Creative AI</span>
  </h1>
  <p className="text-secondary ">
What would like to create today?
  </p>


</motion.div>
<motion.div
variants={itemVariants}
className='bg-primary/10 p-4 rounded-xl'

>
<div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
  <Input placeholder='Enter PPT Prompt and add to the cards ...'
  className='text-base sm:text-4xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow' required value={currentAiPrompt} onChange={(e)=>setCurrentAiPrompt(e.target.value)}
  />

  <div className='flex items-center gap-3'>
      <Select
      value={numberOfCards.toString()}
      onValueChange={(value)=>setNumberOfCards(parseInt(value))}
      >
        <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
          <SelectValue placeholder="Select number of cards"/>
        </SelectTrigger>
      <SelectContent className='w-fit '>
    {outlines.length ===0 ? <SelectItem value='0' className='font-semibold'>
      No cards
    </SelectItem>:Array.from({length:outlines.length},(_,index)=>(
      index+1
    )).map((num)=><SelectItem key={num} value={num.toString()} className='font-semibold'>{num}{num===1?' Card':' Cards'}</SelectItem>)}
      </SelectContent>
      <Button variant={"destructive"} onClick={resetCards} 
     
      size={"icon"} aria-label='Reset cards'>
         <RotateCcw className='h-4 w-4'/>
      </Button>
      </Select>
  </div>
</div>
</motion.div>
      <div className="w-full flex justify-center items-center">
        <Button disabled={isGenerating} onClick={generateOutline} className='font-medium items-center text-lg cursor-pointer flex gap-2'>
      {
        isGenerating? (
          <>
          <Loader2 className='animate-spin mr-2'/> Generating ...
          </>
        ):"Generate Outline"
      }
        </Button>
      </div>


      <CardList outlines={outlines} addOutline={addOutline} addMultipleOutlines={addMultipleOutlines} editingCard={editingCards}  selectedCard={selectedCard} editText={editText} onEditChange={setEditText} onCardSelect={setSelectedCard} setEditText={setEditText} setEditingCard={setEditingCards} setSelectedCard={setSelectedCard} onCardDoubleClick={(id,title)=>{setEditingCards(id)
        setEditText(title)
        
      }}/>  
      
      {
        outlines.length>0 && <Button className='w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'   onClick={handleGenerate} disabled={isGenerating}>
          {
            isGenerating ? <>
            <Loader2 className='animate-spin ml-2'/>Generating..
            </> : "Generate PPT"
          }
        </Button>

      }
      {
        prompts?.length >0 && <RecentPrompts/>
      }
        </motion.div>
  );
}

export default CreativeAi;
