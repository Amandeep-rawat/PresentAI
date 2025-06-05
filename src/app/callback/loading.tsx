import React from 'react';
import { Loader2 } from 'lucide-react'; // make sure you have lucide-react installed

const AuthLoading = () => {
  return (
    <div className="flex h-screen w-full items-center bg-background justify-center ">
      <Loader2 className="h-10 w-10 animate-spin dark:text-white text-black" />
    </div>
  );
};

export default AuthLoading;
