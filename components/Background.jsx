import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSpring, motion } from 'motion/react';

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth mouse tracking with spring physics (disabled on mobile)
  const mouseX = useSpring(0, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 30 });

  // Simplified noise function
  const noise = useMemo(
    () =>
      (x, y, z = 0) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);

        const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
        const lerp = (t, a, b) => a + t * (b - a);

        const u = fade(x);
        const v = fade(y);

        const hash = (i) => {
          const h = (i * 2654435761) ^ (i >> 16);
          return (h ^ (h >> 13)) & 255;
        };

        return (
          lerp(
            v,
            lerp(u, hash(X + Y), hash(X + 1 + Y)),
            lerp(u, hash(X + Y + 1), hash(X + 1 + Y + 1))
          ) / 255
        );
      },
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate particles - fewer for mobile
  useEffect(() => {
    const particleCount = isMobile ? 15 : 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      hue: 200 + Math.random() * 80,
      phase: Math.random() * Math.PI * 2,
      frequency: 0.5 + Math.random() * 1,
    }));
    setParticles(newParticles);
  }, [isMobile]);

  // Mouse tracking - throttled and disabled on mobile
  useEffect(() => {
    if (isMobile) return;

    let throttleTimeout;
    const handleMouseMove = (e) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          throttleTimeout = null;
        }, 50); // Throttle to 20fps
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [mouseX, mouseY, isMobile]);

  // Optimized particle animation using RAF
  useEffect(() => {
    const updateInterval = isMobile ? 100 : 50; // Lower framerate on mobile

    const animate = (timestamp) => {
      if (timestamp - lastUpdateRef.current >= updateInterval) {
        timeRef.current += 0.01;

        setParticles((prev) =>
          prev.map((p) => {
            let newX = p.x + p.vx;
            let newY = p.y + p.vy;

            // Simplified physics for mobile
            if (!isMobile) {
              // Mouse attraction (desktop only)
              const dx = (mousePosition.x / windowSize.width) * 100 - p.x;
              const dy = (mousePosition.y / windowSize.height) * 100 - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 20 && dist > 0) {
                const force = 30 / (dist * dist);
                p.vx += (dx / dist) * force * 0.01;
                p.vy += (dy / dist) * force * 0.01;
              }
            }

            // Damping
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Boundaries
            if (newX < 0) newX = 100;
            if (newX > 100) newX = 0;
            if (newY < 0) newY = 100;
            if (newY > 100) newY = 0;

            return { ...p, x: newX, y: newY };
          })
        );

        lastUpdateRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, windowSize, isMobile]);

  const { width, height } = windowSize;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)',
      }}
    >
      {/* Dynamic gradient overlay - simplified on mobile */}
      {!isMobile && (
        <div
          className="fixed inset-0 z-5 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(99, 102, 241, 0.15) 0%,
              rgba(168, 85, 247, 0.1) 25%,
              transparent 50%)`,
            willChange: 'background',
          }}
        />
      )}

      {/* Cursor glow - desktop only */}
      {!isMobile && (
        <div
          className="fixed z-20 pointer-events-none transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent blur-2xl" />
          </div>
        </div>
      )}

      {/* Optimized particles */}
      <div className="absolute inset-0 z-15">
        {particles.map((particle) => {
          const pulseScale = isMobile
            ? 1
            : 1 + Math.sin(timeRef.current * particle.frequency + particle.phase) * 0.2;
          return (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                background: `hsl(${particle.hue}, 70%, 60%)`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * pulseScale}px`,
                height: `${particle.size * pulseScale}px`,
                boxShadow: isMobile
                  ? `0 0 ${particle.size * 2}px hsl(${particle.hue}, 70%, 60%)`
                  : `0 0 ${particle.size * 3}px hsl(${particle.hue}, 70%, 60%)`,
                opacity: isMobile ? 0.6 : 0.5,
                willChange: 'transform',
              }}
            />
          );
        })}
      </div>

      {/* Geometric shapes - reduced count on mobile */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(isMobile ? 2 : 3)].map((_, i) => {
          const size = isMobile ? 200 - i * 60 : 300 - i * 80;
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
              }}
              transition={{
                rotate: { duration: 30 / speed, repeat: Infinity, ease: 'linear' },
              }}
            />
          );
        })}

        {/* Hexagons - desktop only or reduced on mobile */}
        {!isMobile &&
          [...Array(3)].map((_, i) => (
            <motion.div
              key={`hex-${i}`}
              className="absolute"
              style={{
                width: '50px',
                height: '50px',
                top: `${15 + i * 25}%`,
                right: `${10 + i * 20}%`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
      </div>

      {/* Grid - simplified on mobile */}
      <div
        className="absolute inset-0 z-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, ${isMobile ? 0.08 : 0.12}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, ${isMobile ? 0.08 : 0.12}) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '80px 80px' : '60px 60px',
          transform:
            !isMobile && width && height
              ? `perspective(1000px)
               rotateX(${(mousePosition.y / height - 0.5) * 5}deg)
               rotateY(${(mousePosition.x / width - 0.5) * 5}deg)`
              : 'none',
          opacity: isMobile ? 0.2 : 0.3,
        }}
      />

      {/* Scanline - desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-25 pointer-events-none opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 2px, transparent 4px)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Background;
