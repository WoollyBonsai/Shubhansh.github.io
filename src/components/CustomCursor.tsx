import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth trailing effect
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor (immediate) */}
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-transparent pointer-events-none z-[9999]"
        style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
      >
      </div>
      
      {/* Trailing Coffee Mug with Flames */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] flex items-center justify-center text-2xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative">
          {/* Coffee Mug */}
          <span>☕</span>
          
          {/* CSS Flames */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 pointer-events-none">
            <div className="w-2 h-4 bg-orange-500 rounded-full blur-[2px] animate-pulse absolute bottom-0 left-1 transform origin-bottom scale-y-[1.5]"></div>
            <div className="w-1.5 h-3 bg-yellow-300 rounded-full blur-[1px] animate-[pulse_0.5s_infinite] absolute bottom-0 left-1.5 transform origin-bottom scale-y-[2]"></div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
