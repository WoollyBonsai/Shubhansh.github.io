import { useState, useEffect } from 'react';
import PreLoader from './components/PreLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import BackgroundMath from './components/BackgroundMath';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cinematic preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      {loading ? (
        <PreLoader />
      ) : (
        <div className="relative w-full h-full min-h-screen font-sans">
          <BackgroundMath />
          <Navbar />
          
          <main className="relative z-10 w-full flex flex-col items-center">
            <Hero />
            <Experience />
            <Projects />
            <Skills />
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
