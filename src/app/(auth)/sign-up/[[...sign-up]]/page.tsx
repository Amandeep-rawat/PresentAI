import React from 'react';
import {SignUp } from '@clerk/nextjs';
const Signup = () => {
  return (
    <SignUp signInUrl="/sign-in"  />
  );
}

export default Signup;
