"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { AnimatePresence, motion } from "framer-motion"
import usePromptStore from '@/store/usePromptStore';
import CreatePage from './create-page/createpage';
import CreativeAi from './generate-folder/creative-ai';
import ScratchPage from './scratch/ScratchPage';

const RenderPage = () => {
  const router = useRouter();
  const handleBack=()=>{
    setPage('create')
  }
  const handleSelectOption = (option: string) => {
    if (option === 'template') {
      router.push('/template')
    }
    else if (option === "create-scratch") {
      setPage('create-scratch')
    }
    else {
      setPage('creative-ai')
    }
  }
  const { page, setPage } = usePromptStore()
  const renderStep = () => {
    switch (page) {
      case 'create':
        return <><CreatePage onSelectOption={handleSelectOption} /></>
        break;
      case 'creative-ai':
        return <><CreativeAi onBack={handleBack}/></>
        break;
      case 'create-scratch':
        return <><ScratchPage onBack={handleBack}/></>
        break;

      default:
        return null;
        break;
    }
  }
  return (
    <AnimatePresence mode='wait'>

      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>


  );
};

export default RenderPage;
