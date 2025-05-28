import React from 'react'
import DeleteAllButton from './_components/DeleteAllButton'
import { getDeletedProjects } from '@/actions/projects'
import Notfound from '@/components/global/not-found'
import Projects from '@/components/global/projects/AllProjects'

// type Props = {}

const page = async() => {
    const deletedProjects=await getDeletedProjects()
    if(!deletedProjects.data) return <Notfound/>
  return (
    <div className='flex flex-col gap-6 relative'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <h1 className='text-2xl font-semibold dark:text-primary backdrop-blur-lg'>
                    Trash
                </h1>
                <p className='text-base font-normal dark:text-secondary'>
                    All your deleted Presentation will be listed here. You can recover Them anytime
                </p>
            </div>
            <DeleteAllButton projects={deletedProjects.data}/>
        </div>
            {
                deletedProjects.data.length > 0 ? (
                    <Projects projects={deletedProjects.data}/>
                ):<Notfound/>
            }
    </div>
  )
}

export default page