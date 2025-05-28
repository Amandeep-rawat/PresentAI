"use client"
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React from 'react';

const NewProjectButton = ({user}:{user:User}) => {
    const router=useRouter()
  return (
    
       <Button onClick={()=>router.push("/create-page")} variant={"destructive"} disabled={!user.subscription} className='rounded-lg  font-semibold cursor-pointer' >
    <Plus/>
    New Project
    </Button>
    
  );
}

export default NewProjectButton;
