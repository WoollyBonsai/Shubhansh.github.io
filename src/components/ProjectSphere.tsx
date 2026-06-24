import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, OrbitControls, Icosahedron, TorusKnot, Tetrahedron, Octahedron, Dodecahedron, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// --- Theme Observer Hook ---
const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

// --- Project Data ---
const projects = [
  {
    title: "Autonomous AI Agent",
    tech: ["Python", "AI Agentic Frameworks", "Linux System APIs", "Local LLM Integration"],
    desc: "Developing a serverless AI agent from scratch designed for secure, local-first OS management. Features full system permissions to manage files and processes, self-correction logic (seeking help when stuck), and the ability to collaborate with other agents.",
    shape: 'icosahedron'
  },
  {
    title: "Unified Device Bridge (Woolly Wink)",
    tech: ["Kotlin", "Python", "C", "Android SDK", "Linux System APIs", "TCP/IP Sockets"],
    desc: "Developed a personal ecosystem to integrate Android and Debian Linux devices over Wi-Fi and USB. Features include two-way clipboard sharing, remote input, notification/call sync, audio sinking, and remote shell access.",
    shape: 'torus'
  },
  {
    title: "FingerDraw",
    tech: ["Kotlin", "C++", "Java", "Android NDK", "JNI Layer", "GStreamer", "Python", "Linux Server"],
    desc: "A project architectures as cross-platform native logic linking an Android client with a Linux streaming system. Utilizes native C++ plugins and GStreamer on Android to decode and stream raw drawing matrix coordinates over local networks, enabling fluid hand-tracking and gesture-based sketch interpretation on a server terminal.",
    shape: 'octahedron'
  },
  {
    title: "Android HID Emulator",
    tech: ["Kotlin", "C", "Android NDK", "Bluetooth HID Protocol"],
    desc: "Building an application to emulate a Human Interface Device (HID) using Kotlin and low-level C structs for high performance over Bluetooth HID stacks.",
    shape: 'tetrahedron'
  },
  {
    title: "Linux From Scratch (LFS)",
    tech: ["Linux Kernel", "Bash", "GNU Toolchain"],
    desc: "Compiled a functional Linux operating system from source code, demonstrating mastery of OS architecture, custom compilers, kernel compilation, and cross-distribution dependencies.",
    shape: 'dodecahedron'
  },
  {
    title: "Minecraft Modding Tools",
    tech: ["Java", "Minecraft Bedrock/Forge APIs", "Bytecode Manipulation"],
    desc: "Open-source optimization mods implemented inside Java environments targeting complex entity ticking arrays. Overhauls high-overhead calculation states like TNT rendering and custom in-game shell panels.",
    shape: 'cylinder'
  }
];

// --- Node Component ---
const ShapeSelector = ({ type, args }: { type: string, args?: any }) => {
  switch(type) {
    case 'icosahedron': return <Icosahedron args={args} />;
    case 'torus': return <TorusKnot args={[0.3, 0.1, 64, 16]} />;
    case 'tetrahedron': return <Tetrahedron args={args} />;
    case 'octahedron': return <Octahedron args={args} />;
    case 'dodecahedron': return <Dodecahedron args={args} />;
    case 'cylinder': return <Cylinder args={[0.3, 0.3, 0.6, 16]} />;
    default: return <Icosahedron args={args} />;
  }
};

const Node = ({ project, position, onClick, isDark }: any) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const baseColor = isDark ? "#38bdf8" : "#2563eb"; // Sky-400 dark, Blue-600 light
  const hoverColor = isDark ? "#facc15" : "#f59e0b"; // Yellow dark/light

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }} 
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'none'; }}
        onClick={(e) => { e.stopPropagation(); onClick(project, position); }}
      >
        <ShapeSelector type={project.shape} args={[0.4, 1]} />
        <meshStandardMaterial 
          color={hovered ? hoverColor : baseColor} 
          emissive={hovered ? hoverColor : baseColor} 
          emissiveIntensity={hovered ? 0.8 : 0.2}
          wireframe={!hovered}
        />
      </mesh>
      <Html distanceFactor={15} position={[0, -0.8, 0]} center zIndexRange={[100, 0]} className="pointer-events-none">
        <div className={`transition-all duration-300 font-mono text-sm whitespace-nowrap px-3 py-1.5 ${isDark ? 'bg-black/90 text-sky-300 border-sky-500/50' : 'bg-white/90 text-blue-700 border-blue-500/50'} rounded-md border backdrop-blur-md font-bold shadow-lg ${hovered ? 'opacity-100 scale-110' : 'opacity-0 scale-95'}`}>
          {project.title}
        </div>
      </Html>
    </group>
  );
};

// --- Main Sphere Component ---
export const ProjectSphere = () => {
  const isDark = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const [activeProject, setActiveProject] = useState<any>(null);
  const controlsRef = useRef<any>(null);

  // CAD Control Overrides: hold CTRL to pan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' && controlsRef.current) {
        controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.PAN;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' && controlsRef.current) {
        controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current && !activeProject) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  // Calculate nodes evenly distributed on sphere
  const radius = 4;
  const nodes = useMemo(() => {
    return projects.map((p, i) => {
      const phi = Math.acos(-1 + (2 * i) / projects.length);
      const theta = Math.sqrt(projects.length * Math.PI) * phi;
      return {
        project: p,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ] as [number, number, number]
      };
    });
  }, []);

  const handleNodeClick = (project: any, position: [number, number, number]) => {
    setActiveProject(project);

    if (groupRef.current) {
      // Calculate rotation to bring node to front [0, 0, radius]
      const posVector = new THREE.Vector3(...position).normalize();
      const targetVector = new THREE.Vector3(0, 0, 1);
      
      const quaternion = new THREE.Quaternion().setFromUnitVectors(posVector, targetVector);
      
      // Animate rotation smoothly with GSAP
      gsap.to(groupRef.current.quaternion, {
        x: quaternion.x,
        y: quaternion.y,
        z: quaternion.z,
        w: quaternion.w,
        duration: 1.2,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.4} />
      <directionalLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1.2} color={isDark ? "#ffffff" : "#cbd5e1"} />
      <pointLight position={[-10, -10, -10]} color={isDark ? "#38bdf8" : "#2563eb"} intensity={isDark ? 2 : 1.5} />
      
      <group ref={groupRef}>
        <Sphere args={[radius - 0.2, 32, 32]}>
          <meshStandardMaterial 
            color={isDark ? "#0f172a" : "#475569"} 
            wireframe 
            transparent 
            opacity={isDark ? 0.15 : 0.4} 
          />
        </Sphere>
        
        {/* Core Particle effects */}
        <points>
          <sphereGeometry args={[radius - 0.5, 48, 48]} />
          <pointsMaterial color={isDark ? "#38bdf8" : "#1d4ed8"} size={0.02} transparent opacity={isDark ? 0.3 : 0.6} />
        </points>

        {nodes.map((node, i) => (
          <Node key={i} project={node.project} position={node.position} onClick={handleNodeClick} isDark={isDark} />
        ))}
      </group>

      {/* Advanced CAD Controls */}
      <OrbitControls 
        ref={controlsRef} 
        enableZoom={true} 
        enablePan={true}
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={false}
        minPolarAngle={-Math.PI}
        maxPolarAngle={Math.PI * 2}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        }}
      />

      <Html fullscreen zIndexRange={[100, 0]} className="pointer-events-none">
        <AnimatePresence>
          {activeProject && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/80 pointer-events-auto z-50 p-4"
              onClick={() => setActiveProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-5xl h-[80vh] flex flex-col p-8 md:p-12 rounded-3xl border shadow-2xl overflow-y-auto ${isDark ? 'bg-slate-900/90 border-slate-700 shadow-sky-900/20' : 'bg-white/95 border-gray-200 shadow-blue-900/20'}`}
              >
                <div className="flex-grow">
                  <div className={`inline-block mb-4 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider rounded-full border ${isDark ? 'bg-sky-900/30 text-sky-400 border-sky-800' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                    Project Deep Dive
                  </div>
                  
                  <h3 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {activeProject.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-10">
                    {activeProject.tech.map((t: string) => (
                      <span key={t} className={`px-4 py-2 text-sm font-mono rounded-lg border shadow-sm ${isDark ? 'bg-slate-800 text-sky-300 border-slate-700' : 'bg-slate-100 text-blue-700 border-slate-200'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className={`prose prose-lg max-w-none font-mono leading-relaxed ${isDark ? 'prose-invert text-slate-300' : 'text-slate-700'}`}>
                    <p>{activeProject.desc}</p>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <button 
                    onClick={() => setActiveProject(null)}
                    className={`px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${isDark ? 'bg-white text-black hover:bg-sky-400' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                  >
                    Return to Sphere
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </>
  );
};
