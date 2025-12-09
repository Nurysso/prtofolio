'use client';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// import { Mail, Linkedin, Github, Twitter, MessageCircle, Globe } from 'lucide-react';

const ContactSection = () => {
  const [activeCard, setActiveCard] = useState<string |null>(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const contactLinks = [
    {
      id: 'github',
      icon: FaGithub,
     href: 'https://github.com/Nurysso',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'from-gray-500 to-gray-700',
      description: 'Github',
      accent: '#6b7280'
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/nurysso',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'from-blue-500 to-blue-700',
      description: 'Linkedin',
      accent: '#3b82f6'
    },
    {
      id: 'email',
      icon: MdEmail,
      href: 'mailto:contact.dawood@proton.me',
      color: 'from-green-600 to-green-800',
      hoverColor: 'from-green-500 to-green-700',
      description: 'Direct Message',
      accent: '#10b981'
    }
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-white px-4 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]  rounded-full blur-3xl" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-2 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Header Background Glow */}
          <div className="absolute -inset-8 bg-gradient-to-b from-white/5 via-transparent to-white/5 rounded-3xl blur-2xl" />

          <motion.h2
            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="block bg-gradient-to-r from-rose-400 via-amber-300 to-blue-400 bg-clip-text text-transparent font-inukit"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Let&apos;s
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-white via-amber-200 to-white font-roboto bg-clip-text text-transparent mt-2"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Connect
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Choose your preferred way to reach out
          </motion.p>

          {/* Animated Divider */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: "auto", opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent w-24 sm:w-32 md:w-40" />
            <motion.div
              className="mx-3 sm:mx-4 text-amber-400 text-xl sm:text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24 sm:w-32 md:w-40" />
          </motion.div>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="min-w-[600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
          {contactLinks.map((contact, index) => {
            const IconComponent = contact.icon;
            const isActive = activeCard === contact.id;

            return (
              <motion.a
                key={contact.id}
                href={contact.href}
                target={contact.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveCard(contact.id)}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative block"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Container */}
                <div className="relative p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-500 h-full min-h-[180px] sm:min-h-[200px]">
                  {/* Background Layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl md:rounded-3xl backdrop-blur-xl border border-white/10 group-hover:border-white/30 transition-all duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl md:rounded-3xl" />

                  {/* Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 rounded-2xl md:rounded-3xl overflow-hidden transition-opacity duration-500">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>

                  {/* Animated Glow Effect */}
                  <div
                    className={`absolute -inset-1 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700`}
                    style={{
                      background: `linear-gradient(135deg, ${contact.accent}60, ${contact.accent}30)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4 md:space-y-5">
                    {/* Icon Container */}
                    <div className="relative">
                      <motion.div
                        className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-2xl transition-all duration-500`}
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
                      </motion.div>

                      {/* Icon Glow */}
                      <div className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500`} />

                      {/* Floating Particles */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 rounded-full"
                          style={{
                            top: i === 0 ? '-10px' : i === 1 ? '50%' : i === 2 ? 'calc(100% + 10px)' : '50%',
                            left: i === 1 ? '-10px' : i === 3 ? 'calc(100% + 10px)' : '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={isActive ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>

                    {/* Text Content */}
                    {/* <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                        {contact.description}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 break-words px-2">
                        {contact.label}
                      </p>
                    </div> */}

                    {/* Hover Arrow Indicator */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center shadow-lg`}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner Accents */}
                  {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, idx) => (
                    <motion.div
                      key={idx}
                      className={`absolute ${pos} w-2 h-2 border-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300`}
                      style={{
                        borderColor: contact.accent,
                        transitionDelay: `${idx * 50}ms`
                      }}
                      animate={isActive ? {
                        scale: [1, 1.3, 1],
                      } : {}}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: idx * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 text-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md mx-auto">
            Available for collaborations and new opportunities
          </p>
          <motion.div
            className="mt-4 flex justify-center gap-2"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-2xl">👋</span>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default ContactSection;
