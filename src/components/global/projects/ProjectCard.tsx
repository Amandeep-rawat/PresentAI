'use client'
import { JsonValue } from '@prisma/client/runtime/library';
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/constants';
import { useSlideStore } from '@/store/useSlideStore';
// import Router from 'next/router';
import { useRouter } from 'next/navigation';
// import ThumbnailPreview from './thumbnail-previrew';
import { themes } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';
import AlertDialogBox from './alertdialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteProject, recoverProject } from '@/actions/projects';
import ThumbnailPreview from './thumbnail-previrew';
type Props = {
  projectId: string;
  title: string;
  createdAt: string;

  isDelete?: boolean;
  themeName: string;
  slideData: JsonValue;
}
const ProjectCard = ({ projectId, title, createdAt, themeName, isDelete, slideData }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = themes.find((theme) => theme.name === themeName) ?? themes[0];
  const { setSlides,project } = useSlideStore();

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error", {
        description: "project not found"
      })
      return
    }
    try {

      const response = await recoverProject(projectId);
      if (response.status !== 200) {
        toast("Error", {
          description: "something went wrong"
        })
        setLoading(false);
        return
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "project recovered successfully"
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "something went wrong"
      })
    }
  }
  const handleDelete = async () => {

    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error", {
        description: "project not found"
      })
      return
    }
    try {

      const response = await deleteProject(projectId);
      if (response.status !== 200) {
        toast("Error", {
          description: 'project deletion failed'
        })
        setLoading(false);
        return
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "project deleted successfully"
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "something went wrong"
      })
    }
  }

  const handleNavigation = () => {
    console.log("project value is ",project,project?.slides)
    if(project?.slides===null){
      router.push(`/presentation/${projectId}/select-theme`)
    }
    else{

      setSlides(JSON.parse(JSON.stringify(slideData)))
      router.push(`/presentation/${projectId}`)
    }
  }
  return (
    <motion.div variants={itemVariants} className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors${!isDelete && 'hover:bg-muted/50'} `}>
      <div className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer '
        onClick={handleNavigation}
      >
        <ThumbnailPreview
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}

          theme={theme} />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className='font-semibold text-base text-primary line-clamp-1'>
            {title} 
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p suppressHydrationWarning className='text-sm text-muted-foreground'>
              {timeAgo(createdAt)}
            </p>
            {
              isDelete ? <AlertDialogBox description='This will recover your project and restore your data.' className='bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 '

                // onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
                loading={loading} open={open}>
                <Button size={"sm"} variant={"ghost"} disabled={loading}>
                  Recover
                </Button>
              </AlertDialogBox> :

                <AlertDialogBox description='This will delete your project and send to trash.' className='bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 '

                  // onClick={handleRecover}
                  handleOpen={() => setOpen(!open)}
                  onClick={handleDelete}
                  loading={loading} open={open}>
                  <Button size={"sm"} variant={"destructive"} disabled={loading}>
                    Delete
                  </Button>
                </AlertDialogBox>
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;

