'use client';

import { motion } from 'framer-motion';

export function LoadingDots() {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="h-2 w-2 bg-primary rounded-full"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4'
  };
  
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-t-transparent border-primary animate-spin`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="large" />
        <p className="text-muted-foreground text-sm mt-2">Loading...</p>
      </div>
    </div>
  );
}