import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-mono font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-400">
            Shubhansh Patel
          </span>
          <p className="text-slate-500 font-mono text-xs">
            Systems Engineer • Kernel Hacker • AI Developer
          </p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/WoollyBonsai" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 font-mono text-sm">
            <Github size={18} /> GitHub
          </a>
          <a href="https://huggingface.co/TheOnlyWoolly" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 font-mono text-sm">
            <span>🤗</span> Hugging Face
          </a>
          <a href="#" className="text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 font-mono text-sm">
            LinkedIn
          </a>
        </div>

        <div className="text-slate-500 font-mono text-xs text-center md:text-right">
          <p>patelkanha202@gmail.com</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Shubhansh Patel.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
