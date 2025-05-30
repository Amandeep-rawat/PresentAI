import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div className=' min-w-[30%] max-sm:hidden relative flex items-center border rounded-full '>
      <Button type='submit' size={"sm"}
       variant={"ghost"} className='absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent'
       
       >
          <Search className="h-4 w-4"/>
          <span className='sr-only'>
            Search
          </span>

      </Button>

      <Input type='text' placeholder='search by title' className=' border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6 '/>


    </div>
  );
}

export default SearchBar;
