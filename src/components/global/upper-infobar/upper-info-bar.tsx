import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User } from '@prisma/client';
import React from 'react';
import SearchBar from './upper-info-searchbar';
import ThemeSwitcher from '../mode-toggle';

import NewProjectButton from './new-project-button';

const UpperInfoBar = ({user }:{user:User;}) => {

  return (
    <header className='sticky  bg-background  top-0 z-[10] flex shrink-0  items-center gap-2  p-4 justify-between'>
  <SidebarTrigger className='-ml-1'/>
  <Separator orientation='vertical' className='mr-2 h-2'/>
  <div className="w-full   flex items-center justify-between gap-2">
    <SearchBar/>
  <ThemeSwitcher/>
  <div className=' flex flex-wrap gap-4 items-center justify-end'>
  
   <NewProjectButton user={user}/>
  </div>
  </div>
    </header>
  );
}

export default UpperInfoBar;
