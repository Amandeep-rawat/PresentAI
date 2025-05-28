"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loading'
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  { text: "🚀 Starting AI presentation generation..." },
  { text: "🧠 Improving your prompt for better visuals..." },
  { text: "🎨 Selecting the best design template..." },
  { text: "🌈 Applying color palette and theme..." },
  { text: "🖼️ Generating high-quality slide visuals..." },
  { text: "📤 Uploading images to cloud storage..." },
  { text: "🧩 Structuring slides with generated content..." },
  { text: "📝 Finalizing slide content and layout..." },
  { text: "✅ Preparing download & sharing options..." }
];



 function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

      {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
      <button
        onClick={() => setLoading(true)}
        className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
      >
        Click to load
      </button>

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}

export default MultiStepLoaderDemo