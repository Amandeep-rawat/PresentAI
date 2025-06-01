"use client";
import { Button } from '@/components/ui/button';
import { useProjectCountStore } from '@/store/useProjectsCount';
import { User } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect} from 'react';
import { toast } from 'sonner';

const NewProjectButton = ({
  user,
  projectsLength,
}: {
  user: User;
  projectsLength: number;
}) => {
  const router = useRouter();
  const { setCount } = useProjectCountStore();

  useEffect(() => {
    setCount(projectsLength);
  }, [projectsLength, setCount]);

  const hasUsedFreeTrial = projectsLength >= 1;

  const handleClick = () => {
    if (!user.subscription && hasUsedFreeTrial) {
       toast.error(" Free credit used",{
        description:"Upgrade to premium to create more projects"
      })
    } else {
      router.push('/create-page');
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        variant="destructive"
        disabled={false}
        className="rounded-lg font-semibold cursor-pointer"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </Button>

     
    </div>
  );
};

export default NewProjectButton;
