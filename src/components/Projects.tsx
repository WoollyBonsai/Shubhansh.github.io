import { Canvas } from '@react-three/fiber';
import { ProjectSphere } from './ProjectSphere';

const Projects = () => {
  return (
    <section id="projects" className="w-full h-screen relative flex flex-col items-center py-20 px-6">
      <div className="z-10 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
        <p className="text-slate-600 dark:text-gray-400 font-mono mt-4 max-w-xl mx-auto">
          Drag to rotate the sphere. Click a node to inspect the tech stack and details.
        </p>
      </div>

      <div className="w-full max-w-5xl flex-grow relative border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-50 dark:bg-black/50 backdrop-blur-sm">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ProjectSphere />
        </Canvas>
      </div>
    </section>
  );
};

export default Projects;
