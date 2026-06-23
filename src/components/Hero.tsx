import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Apple Mac Studio-style scroll scrubbing
    gsap.to(textRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12" ref={textRef}>
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-800">
            SYSTEMS ENGINEER & AI DEV
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Architecting local-first <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">AI agents</span> and low-level <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-gray-300 dark:to-gray-500">Linux utilities.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl font-mono leading-relaxed">
            I build high-performance systems from the ground up—from compiling Linux From Scratch to developing autonomous serverless AI agents and Android kernel mods.
          </p>
        </div>

        {/* Profile Image Placeholder */}
        <div className="w-64 h-64 md:w-96 md:h-96 shrink-0 relative rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
          <span className="text-slate-400 dark:text-slate-600 font-mono text-sm">[Profile Image Placeholder]</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;
