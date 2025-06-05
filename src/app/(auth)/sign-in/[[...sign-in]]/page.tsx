import React from 'react';
import { SignIn } from '@clerk/nextjs';
const Signin = () => {
  return (
    <SignIn 
          
          signUpUrl="sign-up" />
  );
}

export default Signin;
