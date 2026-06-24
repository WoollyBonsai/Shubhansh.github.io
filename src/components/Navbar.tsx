import { useState, useEffect } from 'react';
import { Github, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4 transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-6 py-3">
        
        {/* Left: Logo/Name */}
        <div className="flex flex-col">
          <span className="font-mono font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-400">
            Shubhansh Patel
          </span>
          <div className="flex gap-3 mt-1 items-center">
            <a href="https://github.com/WoollyBonsai" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Github size={16} />
            </a>
            <a href="https://huggingface.co/TheOnlyWoolly" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 text-xs font-mono">
              <span>🤗 HF</span>
            </a>
          </div>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          <a href="#top" className="hover:text-blue-500 dark:hover:text-sky-400 transition-colors">About Me</a>
          <a href="#experience" className="hover:text-blue-500 dark:hover:text-sky-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-blue-500 dark:hover:text-sky-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-blue-500 dark:hover:text-sky-400 transition-colors">Skills</a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-800" />}
          </button>
          
          <button className="px-5 py-2 font-mono text-sm bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-blue-500/20">
            Contact Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
