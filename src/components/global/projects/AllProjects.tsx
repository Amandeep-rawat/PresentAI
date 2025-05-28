"use client"
import { motion } from 'framer-motion';
import { Project } from '@prisma/client';
// import React from 'react';
import { containerVaraints } from '@/lib/constants';
import ProjectCard from './ProjectCard';
type Props = {
    projects: Project[]
}
const Projects = ({ projects }: Props) => {
    console.log('projectcard', ProjectCard)
    console.log("containervairnet",containerVaraints)
    return (


        <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            initial="hidden"
            animate="visible"
            variants={containerVaraints}
        >
            {
                projects.map((project) => {
                    return (

                        <ProjectCard

                            key={project.id}

                            projectId={project?.id} title={project?.title} createdAt={project?.createdAt.toString()} isDelete={project.isDeleted}
                            slideData={project.slides}
                            themeName={project.themeName}

                        />
                    )
                })
            }
        </motion.div>
      
    );
}


export default Projects

