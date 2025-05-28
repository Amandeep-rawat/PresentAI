
"use client"
import { Project, User } from '@prisma/client';
import React from 'react';
import { Sidebar, SidebarMenuButton } from '../../ui/sidebar';
import {
   
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import NavMain from './nav-main';
import { data } from '@/lib/constants';
import RecentOpen from './recent-open';
import NavFooter from './nav-footer';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AppSideBar = ({recentProjects,user,...props}:{
    recentProjects:Project[]
} & {user:User} & React.ComponentProps<typeof Sidebar>
) => {
  const router=useRouter()
  return (
    <Sidebar collapsible='icon' {...props} className='max-w-[212px] bg-background'>
    <SidebarHeader className='pt-6 px-2 pb-0'>
        <SidebarMenuButton size={"lg"} onClick={() => { router.push("/") }} className='data-[state=open]:text-sidebar-accent-foreground cursor-pointer'>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5  text-white" />
            </div>
          </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">PresentAI</span>
            {/* <span className='truncate text-primary text-3xl text-bold'>AiPpt</span> */}
        </SidebarMenuButton>
    </SidebarHeader>
    <SidebarContent className='px-2 mt-10 gap-y-6'>
        <NavMain items={data.navMain}/>
        <RecentOpen recentProjects={recentProjects}/>
      
    </SidebarContent>
    <SidebarFooter>

        <NavFooter prismaUser={user}/>
    </SidebarFooter>
  </Sidebar>
  );
}

export default AppSideBar;
