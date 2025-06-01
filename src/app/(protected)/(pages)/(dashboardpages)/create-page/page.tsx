import React, { Suspense } from 'react';
import CreatePageSkeleton from './_components/create-page/create-page-skeleton';
import RenderPage from './_components/RenderPage';
import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import { getProjectCount } from '@/actions/projects';

const page = async() => {

const checkUser=await onAuthenticateUser()
const {count}=await getProjectCount()
if ( !checkUser.user ) {
  redirect('/sign-in')
}
if(!checkUser.user.subscription && count!>=1) {
  redirect('/dashboard')
}
  return (
    <main className='w-full h-full pt-6'>
<Suspense fallback={<CreatePageSkeleton/>}>
<RenderPage/>

</Suspense>
    </main>
  );
}

export default page;
