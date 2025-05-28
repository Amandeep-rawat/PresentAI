import { getRecentProjects } from '@/actions/projects';
import { onAuthenticateUser } from '@/actions/user';
import AppSideBar from '@/components/global/app-sidebar/app-sidebar';
import UpperInfoBar from '@/components/global/upper-infobar/upper-info-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react';

const layout = async({children}:{children:React.ReactNode}) => {
    const RecentProjects=await getRecentProjects();
    const checkUser=await onAuthenticateUser()
    if(!checkUser.user){
        redirect("sign-in")
    }
  return (
    <SidebarProvider>
        <AppSideBar user={checkUser.user} recentProjects={RecentProjects.data || []}/>
    <SidebarInset>
      <UpperInfoBar user={checkUser.user}/>
      <div className="p-">

      {children}
      </div>
    </SidebarInset>
        
    </SidebarProvider>
  );
}

export default layout;
