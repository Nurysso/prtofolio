import React, { useEffect, useRef, useState } from 'react';
import { easeInOut, motion } from 'framer-motion';
import MysticalCard from './mysticalCard';

const cards = [
  {
    id: 1,
    title: 'Vanish',
    description: 'Modern alternative to rm, with customizable TUI and restore feature',
    tech: ['GoLang', 'TUI'],
    color: 'from-red-700 via-rose-600 to-pink-500',
    link: 'https://www.dawood.page/projects/vanish',
    status: 'Live',
  },
  {
    id: 2,
    title: 'Venus',
    description: 'Browser extension to change tab UI and have customizable quicklinks',
    tech: ['JavaScript', 'WebExt'],
    color: 'from-orange-600 via-amber-500 to-yellow-400',
    link: 'https://github.com/Nurysso/venus',
    status: 'Beta',
  },
  {
    id: 3,
    title: 'Hecate',
    description: 'Hyprland dotfiles and collection of apps to improve user experience',
    tech: ['GoLang', 'Typescript', 'Shell'],
    color: 'from-purple-700 via-indigo-600 to-blue-500',
    link: 'https://github.com/Nurysso/hecate',
    status: 'Live',
  },
  {
    id: 4,
    title: 'tyr',
    description: 'Template creation tool for multiple types of projects',
    tech: ['Rust', 'CLI', 'ML'],
    color: 'from-green-600 via-emerald-500 to-teal-400',
    link: 'https://github.com/Nurysso/tyr',
    status: 'Live',
  },
  {
    id: 5,
    title: 'Athena',
    description: 'Custom Linux kernel build for fun and learning',
    tech: ['C', 'Kernel'],
    color: 'from-blue-700 via-cyan-600 to-indigo-500',
    link: 'https://github.com/Nurysso/athena',
    status: 'Research',
  },
  {
    id: 6,
    title: 'EULIX',
    description: 'Local code comprehension tool',
    tech: ['Rust', 'GoLang', 'SQL', 'redis', 'llm'],
    color: 'from-indigo-700 via-purple-600 to-pink-500',
    link: 'https://github.com/Nurysso/eulix',
    status: 'Live',
  }
];

const Work = () => {
  const [inView, setInView] = useState(false);
  const [, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden py-12 md:py-0"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header Section */}
      <motion.div
        className="text-center pt-12 md:pt-20 pb-8 md:pb-12 relative z-10 px-4"
        variants={headerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="inline-block relative">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-hand bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            FEATURED PROJECTS
          </motion.h2>

          <motion.div
            className="absolute -top-4 -left-4 w-3 h-3 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </div>

        <motion.p
          className="text-gray-300 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Crafting innovative solutions that push the boundaries of technology
        </motion.p>
      </motion.div>

      <div className="relative">
        {/* DESKTOP - 3D Carousel */}
        <div className="hidden lg:block w-full h-screen [transform-style:preserve-3d] relative">
          <motion.div
            className="absolute w-[320px] h-[220px] top-[20%] left-1/2 -translate-x-1/2 [transform-style:preserve-3d]"
            style={{ '--quantity': String(cards.length) } as React.CSSProperties}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {cards.map((card, index) => {
              const angle = (360 / cards.length) * index;
              const normalizedAngle = ((angle % 360) + 360) % 360;
              const isInFront = normalizedAngle <= 90 || normalizedAngle >= 270;
              const zIndex = isInFront ? 35 : 15;
              const baseTransform = `rotateY(${angle}deg) translateZ(450px)`;

              return (
                <motion.div
                  key={index}
                  className="absolute w-full h-full [transform-style:preserve-3d]"
                  style={{
                    transform: baseTransform,
                    zIndex: zIndex,
                  }}
                  whileHover={{
                    transform: `${baseTransform} scale(1.05)`,
                    transition: { duration: 0.3 },
                  }}
                >
                  <MysticalCard project={card} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Athena Statue */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1400px] px-4 pb-24 flex flex-wrap justify-between items-center z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-full h-[75vh]">
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[35%] h-12 bg-blue-500/10 opacity-40 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-contain filter drop-shadow-2xl"
                style={{ backgroundImage: "url('/Images/Athena-Statue.png')" }}
              />
            </div>
          </motion.div>
        </div>

        {/* TABLET - Grid View */}
        <div className="hidden md:block lg:hidden px-6 py-8">
          <motion.div
            className="grid grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="h-[320px]"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <MysticalCard project={card} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* MOBILE - Vertical Stack */}
        <div className="md:hidden px-4 py-8 space-y-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="h-[280px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <MysticalCard project={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
