import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "NumPy", "Matplotlib", "Agentic Frameworks", "LLMs"]
  },
  {
    title: "Programming Languages",
    skills: ["C++", "C", "Rust", "Python", "Java", "Kotlin", "JavaScript", "HTML/CSS"]
  },
  {
    title: "Operating Systems",
    skills: ["Linux From Scratch (LFS)", "Arch", "RHEL", "Debian", "Android (AOSP Modding)", "Kernel Tweaking"]
  },
  {
    title: "Tools & Automation",
    skills: ["Bash", "Git", "Android SDK", "Bluetooth HID Protocol", "TCP/IP Networking"]
  }
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.skill-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="skills" className="w-full py-24 px-6 flex justify-center bg-slate-100 dark:bg-black/20">
      <div className="max-w-6xl w-full" ref={containerRef}>
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 dark:text-white text-center">
          Technical Arsenal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-300 text-xs font-mono rounded border border-slate-200 dark:border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
