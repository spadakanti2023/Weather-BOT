import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 text-white">
      <motion.div 
        className="relative"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Sun size={60} className="text-warning-400" />
        
        <motion.div 
          className="absolute top-0 left-0"
          animate={{ 
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Cloud size={40} className="text-white/80" />
        </motion.div>
      </motion.div>
      
      <motion.p 
        className="mt-8 text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Fetching weather data...
      </motion.p>
    </div>
  );
};