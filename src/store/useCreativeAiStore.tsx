import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import {persist} from "zustand/middleware"

type CreativeAiStore={
    outlines:OutlineCard[] | [];
    setCurrentAiPrompt:(prompt:string)=>void;
    addMultipleOutlines:(outlines:OutlineCard[])=>void;
    currentAiPrompt:string;
    resetOutlines:()=>void;
    addOutline:(outline:OutlineCard)=>void
    

}
const useCreativeAiStore=create<CreativeAiStore>()(

    persist(
        (set)=>({
            outlines:[],
            resetOutlines:()=>{
                set({outlines:[]})
            },

            currentAiPrompt:'',
            setCurrentAiPrompt:(prompt:string)=>{
                set({currentAiPrompt:prompt})
            },
            addMultipleOutlines:(outlines:OutlineCard[])=> {
                set(()=>({
                    outlines:[...outlines]
                }))
            },
            addOutline:(outline:OutlineCard)=>{
                set((state)=>({
                    outlines:[outline,...state.outlines],
                }))
            }
        })
      ,  
      {
        name:"creative-ai"
    }
    )
    
);


export default useCreativeAiStore