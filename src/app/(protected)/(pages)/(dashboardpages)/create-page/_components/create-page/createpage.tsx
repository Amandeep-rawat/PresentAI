
import React  from 'react';
import { motion } from 'framer-motion';
import { containerVaraints, CreatePageCard, itemVariants } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import RecentPrompts from '../generate-folder/recentprmpts';
import usePromptStore from '@/store/usePromptStore';

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
    const {prompts}=usePromptStore()
    // useEffect(()=>{
    //   setPage('create')
    // },[])
  return (
    <motion.div
      variants={containerVaraints}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-3 overflow-hidden"
    >
      <motion.div
        variants={itemVariants}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold text-primary">
          How would you like to get started ?
        </h1>
        <p className="text-secondary">
          Choose your preferred method to begin
        </p>
      </motion.div>

      <motion.div
        variants={containerVaraints}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 "
      >
        {CreatePageCard.map((option) => {
          return (
            <motion.div
              key={option.type}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.2 },
              }}
              className={`${option.highlight
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600'
                : 'hover:bg-purple-400 border'}
                rounded-xl p-1 transition-all duration-300 ease-in-out`}
            >
              <motion.div
                className="w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
                whileHover={{
                  transition: { duration: 0.2 },
                }}
                style={{
                  transformOrigin: 'center',
                  overflow: 'hidden', // Add overflow hidden inside the card itself
                }}
              >
                <div className="flex flex-col items-start w-full gap-y-3">
                  <div>
                    <p className="text-primary text-lg font-semibold">
                      {option.title}
                    </p>
                    <p
                      className={`text-4xl font-bold ${
                        option.highlight
                          ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent'
                          : 'text-primary'
                      }`}
                    >
                      {option.highlightedText}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm font-normal">
                    {option.description}
                  </p>
                </div>

                <motion.div
                  className="self-end"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={option.highlight ? 'default' : 'outline'}
                    className="w-fit rounded-xl cursor-pointer font-bold"
                    size={'sm'}
                    onClick={() => 
                    {
                      if(option.type==='template'){
                        alert('COMING SOON. YOU CAN SELECT CREATIVE AI🤖')
                      }
                      else{

                        onSelectOption(option.type)
                      }
                    }
                      }
                  >
                    {option.highlight ? 'Generate'  : option.type==='template'?'Coming soon': 'Continue'}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      {
        prompts.length > 0 && 
       <RecentPrompts/> 
      }
    </motion.div>
  );
};

export default CreatePage;
