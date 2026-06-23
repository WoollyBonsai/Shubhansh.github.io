import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = [
  "SYSTEMS", "KERNEL", "LINUX", "AI", "C++", "RUST", "BARE-METAL", "ROBOTICS"
];

const PreLoader = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    if (currentWord < words.length) {
      const timeout = setTimeout(() => {
        setCurrentWord(prev => prev + 1);
      }, 200); // Fast pacing
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowName(true), 200);
    }
  }, [currentWord]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Background flare effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
      
      {!showName ? (
        <motion.h1
          key={currentWord}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="text-white text-5xl md:text-8xl font-black tracking-widest uppercase font-mono"
        >
          {words[currentWord]}
        </motion.h1>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl animate-pulse"></div>
          <h1 className="text-white text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            SHUBHANSH<br/>PATEL
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-4"
          />
        </motion.div>
      )}
    </div>
  );
};

export default PreLoader;
