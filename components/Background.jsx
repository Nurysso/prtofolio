import React, { useEffect, useState, useRef } from 'react';
import { useSpring,motion } from "motion/react"

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [flowField, setFlowField] = useState([]);
  const containerRef = useRef(null);
  const timeRef = useRef(0);

  // Smooth mouse tracking with spring physics
  const mouseX = useSpring(0, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 30 });

  // Perlin-like noise function (simplified)
  const noise = (x, y, z = 0) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = fade(x);
    const v = fade(y);
    const w = fade(z);

    const hash = (i) => {
      const h = (i * 2654435761) ^ (i >> 16);
      return (h ^ (h >> 13)) & 255;
    };

    return lerp(w,
      lerp(v, lerp(u, hash(X + Y + Z), hash(X + 1 + Y + Z)),
              lerp(u, hash(X + Y + 1 + Z), hash(X + 1 + Y + 1 + Z))),
      lerp(v, lerp(u, hash(X + Y + Z + 1), hash(X + 1 + Y + Z + 1)),
              lerp(u, hash(X + Y + 1 + Z + 1), hash(X + 1 + Y + 1 + Z + 1)))
    ) / 255;
  };

  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t, a, b) => a + t * (b - a);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate particles with physics properties
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1.5,
      hue: 200 + Math.random() * 80,
      phase: Math.random() * Math.PI * 2,
      frequency: 0.5 + Math.random() * 1.5,
    }));
    setParticles(newParticles);

    // Generate flow field
    const field = [];
    const cols = 20;
    const rows = 20;
    for (let i = 0; i < cols; i++) {
      field[i] = [];
      for (let j = 0; j < rows; j++) {
        const angle = noise(i * 0.1, j * 0.1, 0) * Math.PI * 2;
        field[i][j] = angle;
      }
    }
    setFlowField(field);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animate particles with physics
  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += 0.01;
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.vx;
        let newY = p.y + p.vy;

        // Apply flow field influence
        const col = Math.floor((p.x / 100) * 19);
        const row = Math.floor((p.y / 100) * 19);
        if (flowField[col] && flowField[col][row]) {
          const angle = flowField[col][row] + timeRef.current;
          p.vx += Math.cos(angle) * 0.01;
          p.vy += Math.sin(angle) * 0.01;
        }

        // Mouse attraction with inverse square law
        const dx = (mousePosition.x / windowSize.width * 100) - p.x;
        const dy = (mousePosition.y / windowSize.height * 100) - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20 && dist > 0) {
          const force = 50 / (dist * dist);
          p.vx += (dx / dist) * force * 0.01;
          p.vy += (dy / dist) * force * 0.01;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Boundaries with wrap-around
        if (newX < 0) newX = 100;
        if (newX > 100) newX = 0;
        if (newY < 0) newY = 100;
        if (newY > 100) newY = 0;

        return { ...p, x: newX, y: newY };
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [mousePosition, windowSize, flowField]);

  const { width, height } = windowSize;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)'
      }}
    >
      {/* Dynamic gradient overlay */}
      <div
        className="fixed inset-0 z-5 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(99, 102, 241, 0.15) 0%,
            rgba(168, 85, 247, 0.1) 25%,
            transparent 50%)`
        }}
      />

      {/* Enhanced cursor glow with chromatic aberration */}
      <div
        className="fixed z-20 pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent blur-2xl" />
          <div className="absolute inset-0 bg-gradient-radial from-cyan-400/20 to-transparent blur-xl translate-x-1" />
          <div className="absolute inset-0 bg-gradient-radial from-pink-400/20 to-transparent blur-xl -translate-x-1" />
        </div>
      </div>

      {/* Physics-based particles */}
      <div className="absolute inset-0 z-15">
        {particles.map((particle) => {
          const pulseScale = 1 + Math.sin(timeRef.current * particle.frequency + particle.phase) * 0.3;
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(${particle.hue}, 70%, 60%), transparent)`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * pulseScale}px`,
                height: `${particle.size * pulseScale}px`,
                boxShadow: `0 0 ${particle.size * 3}px hsl(${particle.hue}, 70%, 60%),
                            0 0 ${particle.size * 6}px hsl(${particle.hue}, 70%, 50%, 0.3)`,
                filter: 'blur(1px)',
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Geometric shapes with 3D transforms */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(3)].map((_, i) => {
          const size = 300 - i * 80;
          const speed = 1 + i * 0.3;
          return (
            <motion.div
              key={i}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${20 + i * 25}%`,
                left: `${10 + i * 30}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20 / speed, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          );
        })}

        {/* Hexagonal patterns */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              width: '60px',
              height: '60px',
              top: `${15 + i * 20}%`,
              right: `${10 + i * 15}%`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Dynamic grid with perspective */}
      <div
        className="absolute inset-0 z-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: width && height
            ? `perspective(1000px)
               rotateX(${(mousePosition.y / height - 0.5) * 10}deg)
               rotateY(${(mousePosition.x / width - 0.5) * 10}deg)
               translate(${(mousePosition.x / width - 0.5) * 30}px, ${(mousePosition.y / height - 0.5) * 30}px)`
            : 'none',
          opacity: 0.3,
        }}
      />

      {/* Scanline effect */}
      <div className="absolute inset-0 z-25 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 2px, transparent 4px)',
        }} />
      </div>
    </div>
  );
};

export default Background;
