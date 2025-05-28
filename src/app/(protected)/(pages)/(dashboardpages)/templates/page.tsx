"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { containerVaraints, itemVariants } from "@/lib/constants";

const TemplatePage = () => {
  const router = useRouter();

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6"
      variants={containerVaraints}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="mb-6"
      >
        <ChevronLeft className="mr-2 w-4" />
        Back
      </Button>

      {/* Coming Soon Section */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl border border-dashed border-purple-300  p-10 text-center shadow-md"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-purple-800"
        >
          🚧 Template Page
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg text-purple-600"
        >
          This page is currently under construction. We're working hard to bring
          it to life!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <div className="inline-block rounded-full bg-purple-200 px-5 py-2 text-sm font-semibold text-purple-700 shadow-inner animate-pulse">
            🚀 Coming Soon
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TemplatePage;
