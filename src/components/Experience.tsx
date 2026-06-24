import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    itemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.fromTo(item, 
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 80%",
            scrub: 1, // Smooth scrubbing
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="w-full py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-screen-xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 inline-block">
          Experience & Education
        </h2>
        
        <div className="space-y-12 border-l border-slate-200 dark:border-slate-800 ml-4 pl-8 relative">
          
          {/* Experience Item */}
          <div ref={el => itemsRef.current[0] = el} className="relative">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[41px] top-1 border-4 border-white dark:border-[#0f172a]"></div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-100">Freelance Software Developer</h3>
            <p className="text-blue-600 dark:text-sky-400 font-mono text-sm mt-1 mb-4">Jan 2024 – Present</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-400 font-mono text-sm">
              <li>Developed custom automation scripts and desktop utilities for various clients.</li>
              <li>Built and integrated APIs for music management and system bridge tools.</li>
              <li>Provided technical consultation on Linux-based server setups and Android system modifications.</li>
            </ul>
          </div>

          {/* Education Item */}
          <div ref={el => itemsRef.current[1] = el} className="relative">
            <div className="absolute w-4 h-4 bg-slate-400 rounded-full -left-[41px] top-1 border-4 border-white dark:border-[#0f172a]"></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100">B.Tech, Computer Science & Engineering</h3>
            <p className="text-slate-500 font-mono text-sm mt-1 mb-2">LNCT Bhopal | Expected Graduation: 2028</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
