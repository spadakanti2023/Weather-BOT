import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center py-20 text-center px-4"
    >
      <div className="bg-error-100/20 text-error-500 rounded-full p-4 mb-4">
        <AlertTriangle size={32} />
      </div>
      
      <h2 className="text-2xl font-semibold text-white mb-2">Unable to load weather data</h2>
      <p className="text-white/70 mb-6 max-w-md">{message}</p>
      
      <button
        onClick={onRetry}
        className="bg-white text-primary-700 hover:bg-primary-50 font-medium py-2 px-6 rounded-full transition-colors shadow-md"
      >
        Try Again
      </button>
    </motion.div>
  );
};