"use client"
import { deleteAllProjects } from '@/actions/projects'
import AlertDialogBox from '@/components/global/projects/alertdialog'
import { Button } from '@/components/ui/button'
import { Project } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    projects:Project[]
}

const DeleteAllButton = ({projects}: Props) => {
    const [loading,setLoading]=useState(false)
    const [open,setOpen]=useState(false)
    const router=useRouter();
    const handleDeleteAllProjects=async()=>{
        setLoading(true)
        if( !projects ||projects.length===0){
            setLoading(false)
            toast.error("Error",{
                description:"No projects to delete"
            })
            setOpen(false)
            return;
        }
        try {
            const res=await deleteAllProjects(projects.map((project)=>project.id));
            if(res.status !==200){
                
                toast.error("Error",{
                    description:"Failed to delete all projects"
                })
                setOpen(false)
                return;
            }
            
            toast.success("Success",{
                description:"All projects deleted successfully"
            })
            router.refresh();
            setOpen(false)

        } catch (error) {
            
        console.log(error);
            toast.error("Error",{
                description:"Something went wrong"
            })
            setOpen(false)
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <AlertDialogBox description='This action cannot be undone. This will permanently delete all the projects.' className='bg-red-600 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700' onClick={handleDeleteAllProjects} loading={loading} handleOpen={()=>setOpen(!open)} open={open}>
<Button size={'lg'} className='bg-background rounded-lg dark:bg-background text-primary font-semibold hover:text-white'>
    <Trash/>
    Delete All
</Button>
    </AlertDialogBox>
  )
}

export default DeleteAllButton