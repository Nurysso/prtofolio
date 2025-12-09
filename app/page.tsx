'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Transition, AnimatePresence, motion, easeInOut } from 'framer-motion';
import Navbar from '@/components/ui/Navbar/navbar';
import Hero from '@/components/ui/Hero/hero';
import AboutSection from '@/components/ui/about/about';
import Work from '@/components/ui/work/work';
import Contact from '@/components/ui/Connect/connect';
import Background from '@/components/Background';
import WelcomeAnimation from '@/components/Text/welcome';
import Footer from '@/components/ui/footer/Footer';
export default function Home() {
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ];

  // Handle loading state
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

  // Prevent scrolling until welcome is done
  useEffect(() => {
    if (!welcomeDone) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.scrollBehavior = 'auto';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [welcomeDone]);

  // Track current section
  useEffect(() => {
    if (!welcomeDone) return;

    const handleScroll = () => {
      const sectionElements = sections.map(section =>
        document.getElementById(section.id)
      );

      const currentSectionIndex = sectionElements.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSectionIndex !== -1) {
        setCurrentSection(currentSectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [welcomeDone, sections]);
  // Page variants for animations
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };
// const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        // ease: [0.25, 0.46, 0.45, 0.94],
        ease: easeInOut,
        staggerChildren: 0.1
      }
    }
  };

  const footerButtons = [
    {
      text: 'Privacy',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      text: 'Terms',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      text: 'Credits',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  return (
    <>
      {/* Progress Bar */}
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fb7185] via-[#caa56e] to-[#60a5fa] origin-left z-50"
        style={{ scaleX }}
      /> */}

      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Background />

        {/* Additional Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Particles */}
          {/* {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))} */}
        </div>
      </div>

      {/* Welcome Screen */}
      <AnimatePresence>
        {!welcomeDone && (
          <WelcomeAnimation
            welcomeDone={welcomeDone}
            setWelcomeDone={setWelcomeDone}
          />
        )}
      </AnimatePresence>

      {/* Section Navigation Dots */}
      <AnimatePresence>
        {welcomeDone && (
          <motion.div
            className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    currentSection === index
                      ? 'bg-[#caa56e] border-[#caa56e] shadow-lg shadow-[#caa56e]/50'
                      : 'bg-transparent border-white/40 hover:border-white/80'
                  }`}
                />

                {/* Tooltip */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg border border-white/20 whitespace-nowrap">
                    {section.name}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {welcomeDone && (
          <motion.main
            ref={containerRef}
            className="relative z-10"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <motion.section
              id="hero"
              className="relative min-h-screen flex items-center justify-center"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-full">
                <Hero />
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center space-y-2"
                >
                  {/* <span className="text-xs font-light tracking-wider">SCROLL</span> */}
                  <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
                </motion.div>
              </motion.div>
            </motion.section>

            {/* About Section */}
            <motion.section
              id="about"
              className="relative min-h-screen flex items-center justify-center py-20"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Section Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />

              <div className="relative w-full">
                <AboutSection
                  heading="Hi, I'm Dawood"
                  description="I build tools that bridge design and engineering — from sleek browser extensions to command-line utilities and custom Linux setups. My projects focus on speed, usability, and aesthetics, making everyday tech feel intuitive and personal."
                  imageSrc="/Images/me-anime.png"
                />
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              id="experience"
              className="relative min-h-screen flex items-center justify-center py-20"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Section Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />

              <div className="relative w-full">
                <Work />
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              id="contact"
              className="relative min-h-screen flex items-center justify-center py-20"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Section Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="relative w-full">
                <Contact />
              </div>
            </motion.section>
            <Footer buttons={footerButtons}/>

            {/* Back to Top Button */}
            <motion.button
              className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#caa56e] to-[#fb7185] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-40"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: currentSection > 0 ? 1 : 0,
                scale: currentSection > 0 ? 1 : 0
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </motion.main>
        )}

      </AnimatePresence>
    </>
  );
}
