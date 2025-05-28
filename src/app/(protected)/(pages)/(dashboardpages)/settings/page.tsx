'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Page = () => {
  const router = useRouter();
 

 
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 2) {
      router.back();
    } else {
      router.push('/dashboard'); // fallback route
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-6 relative px-4 py-6 max-w-4xl mx-auto min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <Button
        onClick={handleBack}
        variant="outline"
        className="flex items-center gap-2 w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Title */}
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
          Settings
        </h1>
        <p className="text-base font-normal dark:text-secondary">
          All your settings.
        </p>
      </div>

      {/* Construction Message */}
      <motion.div
        className="bg-muted/40 border border-border shadow-lg rounded-2xl p-10 text-center w-full mt-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto mb-4">
          <Settings2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-primary">
          Settings Page is Under Construction
        </h2>
        <p className="text-muted-foreground text-lg">
          We are working hard to make your settings better. Coming soon!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Page;
