"use client"
import { Button } from '@/components/ui/button';
import { useSlideStore } from '@/store/useSlideStore';
import { Home, Play, Share } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';
import PresentationMode from './PresentationMode';
type Props={
    presentationId:string;
}
const Navbar = ({presentationId}:Props) => {
    const {currentTheme}=useSlideStore()
    const [isPresentationMode,setIsPresentationMode]=useState(false)



    const handleCopy=()=>{
        navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`);
        toast.success("Link Copied",{
            description:"Link copied to clipboard"
        })
    }
  return (
    <nav style={{
        backgroundColor:currentTheme.navbarColor || currentTheme.backgroundColor
        , color:currentTheme.accentColor
    }} className='fixed top-0  right-0 left-0 z-50 w-full h-20 flex justify-between items-center py-4 border-b'>
      <Link href={`/dashboard`} passHref>
        <Button variant={"outline"} className='flex cursor-pointer items-center gap-2' style={{
            backgroundColor:currentTheme.backgroundColor
        }}><Home />
        <span className='hidden sm:inline'>Return Home</span>
        
        </Button>
      </Link>
      <Link className='text-lg font-semibold hidden sm:block' href={`/presentation/template-market`}>
      Presentation Editor
      </Link>
      <div className="flex items-center gap-4">
        <Button style={{
            backgroundColor:currentTheme.backgroundColor
        }} variant={"outline"} onClick={handleCopy}><Share/></Button>

        {/* <SellTemplate/> */}
        <Button onClick={()=>setIsPresentationMode(true)} variant={"default"} className='flex items-center gap-2'>
        <Play/>
        <span className='hidden sm:inline'>Present</span>

        </Button>
      </div>

      {
        isPresentationMode && <PresentationMode onClose={()=>setIsPresentationMode(false)}/>
      }
    </nav>
  );
}

export default Navbar;
