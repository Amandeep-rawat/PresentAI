"use client"
// import { buySubscription } from '@/actions/lemonSqueezy';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NavFooter = ({prismaUser}:{prismaUser:User}) => {
    const {isLoaded,isSignedIn,user}=useUser();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    if(!isLoaded || !isSignedIn){
        return null
    }

    // const handleUpgrading=async()=>{

    // setLoading(true);
    // try {
    //     const res=await buySubscription(prismaUser.id);
    //     if(res.status!==200){
    //         toast.error('Error',{
    //             description:'Failed to Upgrade subscription'
    //         })
    //         return;
    //     }
    //     router.push(res.url);
    // } catch (error) {
    //      toast.error('Error',{
    //         description:'Something went wrong'
    //      })
    // }
    // finally{
    //     setLoading(false);
    // }
    // }
  return (
    <SidebarMenu>
<SidebarMenuItem>
    <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
        {
            !prismaUser.subscription &&(
                <div className='flex flex-col items-baseline p-2 pb-3 gap-4 bg-background'>
                    <div className='flex flex-col items-start gap-1 '>
                        <p className="text-base font-bold">
                            Get <span className='text-orange-400'> Creative Ai 🤖</span>
                        </p>
                            <span className='text-sm dark:text-gray-400'>
                                Unlock all features including AI and more
                            </span>
                    </div>
                    <div className='w-full bg-transparent  bg-gradient-to-br from-purple-600 to-pink-600 p-[1px] rounded-full'>
                        <Button  variant={"default"}
                        
                        // onClick={handleUpgrading}
                         size={"lg"} className='w-full dark:bg-black dark:text-white rounded-full'>

{
    loading? "Upgrading" : "Upgrade"
}
                        </Button>
                    </div>
                </div>
            )
        }

        <SignedIn>
            <SidebarMenuButton size={"lg"} className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground' >
                <UserButton/>
                <div className='grid flex-1 text-left text-sm  loading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate font-semibold text-purple-400'>
        {
            user?.firstName + " " + user?.lastName
        }
            </span>
            <span className='truncate font-semibold text-secondary'>
        {
            user?.emailAddresses[0].emailAddress
        }
            </span>
                </div>
            </SidebarMenuButton>
        </SignedIn>
    </div>
</SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavFooter;
