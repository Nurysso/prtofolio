'use client';

import {
  ArrowRight,
  Download,
  Eye,
  Github,
  Moon,
  Package,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
export { hecateMetadata as metadata } from '@/lib/project-metadata';

export default function HecateClient() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  const installCommand =
    'curl -fsSL https://raw.githubusercontent.com/Nurysso/Hecate/main/install.sh | bash';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: <Palette className="w-7 h-7" />,
      title: 'Dynamic Theming',
      description:
        'Automatically extracts colors from your wallpaper and applies them across your entire system in real-time.',
      gradient: 'from-cyan-400 via-blue-500 to-teal-400',
      emoji: '🎨',
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Smart Installation',
      description:
        'Interactive setup that asks for your preferences upfront - less manual config editing needed.',
      gradient: 'from-blue-400 via-cyan-500 to-blue-600',
      emoji: '⚡',
    },
    {
      icon: <Terminal className="w-7 h-7" />,
      title: 'Multi-Shell Support',
      description: 'Choose your preferred shell during installation: Bash, Zsh, or Fish.',
      gradient: 'from-teal-400 via-cyan-500 to-blue-400',
      emoji: '💻',
    },
    {
      icon: <Package className="w-7 h-7" />,
      title: 'Multiple Terminals',
      description: 'Support for Alacritty, Kitty, Foot, and Ghostty terminal emulators.',
      gradient: 'from-cyan-500 via-blue-400 to-teal-500',
      emoji: '📦',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Safe Backups',
      description: 'Automatically backs up your existing configurations before making any changes.',
      gradient: 'from-blue-500 via-teal-400 to-cyan-500',
      emoji: '🛡️',
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: 'All-in-One Setup',
      description: 'Single command installation with intelligent package management detection.',
      gradient: 'from-cyan-400 via-teal-500 to-blue-500',
      emoji: '✨',
    },
  ];

  const supportedApps = [
    { category: 'Compositors', apps: 'Hyprland', icon: '🪟' },
    { category: 'Terminals', apps: 'Alacritty • Kitty • Foot • Ghostty', icon: '⌨️' },
    { category: 'Shells', apps: 'Bash • Zsh • Fish', icon: '🐚' },
    { category: 'Bars', apps: 'Waybar', icon: '📊' },
    { category: 'Notifications', apps: 'SwayNC', icon: '🔔' },
    { category: 'Launchers', apps: 'Rofi', icon: '🚀' },
    { category: 'Logout', apps: 'Wlogout', icon: '🚪' },
    { category: 'Wallpapers', apps: 'Waypaper • Wallust', icon: '🖼️' },
  ];

  // Extreme particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  //   const stats = [
  //     { value: "100%", label: "Open Source" },
  //     { value: "8+", label: "Supported Apps" },
  //     { value: "3", label: "Shell Options" },
  //     { value: "1", label: "Command Install" }
  //   ];

  return (
    <div className="min-h-screen bg-[#0a0e12] text-[#eaebed] relative overflow-hidden">
      {/* Ultra dynamic background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Multiple gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] bg-[#006989]/30 rounded-full blur-[120px]"
          style={{
            top: '5%',
            left: '5%',
            animation: 'float 20s ease-in-out infinite, pulse 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-[#006989]/40 rounded-full blur-[100px]"
          style={{
            top: '50%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse, pulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-[#006989]/20 rounded-full blur-[80px]"
          style={{
            bottom: '10%',
            left: '50%',
            animation: 'float 18s ease-in-out infinite, pulse 5s ease-in-out infinite',
          }}
        />

        {/* Extreme particle system */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#006989]"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.4,
            }}
          />
        ))}

        {/* Animated grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(#006989_1px,transparent_1px),linear-gradient(90deg,#006989_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"
          style={{ animation: 'gridMove 20s linear infinite' }}
        />

        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#006989] to-transparent"
              style={{
                width: '200%',
                top: `${i * 5}%`,
                left: '-50%',
                transform: `rotate(-45deg)`,
                animation: `slide ${15 + i * 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mega cursor trail effect */}
      <div
        className="fixed w-[600px] h-[600px] pointer-events-none z-40 transition-all duration-200"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background:
            'radial-gradient(circle, rgba(0,105,137,0.25) 0%, rgba(0,105,137,0.1) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 1;
            filter: drop-shadow(0 0 20px rgba(0, 105, 137, 0.8));
          }
          50% {
            opacity: 0.6;
            filter: drop-shadow(0 0 40px rgba(0, 105, 137, 1));
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%) rotate(-45deg);
          }
          100% {
            transform: translateX(100%) rotate(-45deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        @keyframes neon {
          0%,
          100% {
            text-shadow:
              0 0 10px #006989,
              0 0 20px #006989,
              0 0 30px #006989;
          }
          50% {
            text-shadow:
              0 0 20px #006989,
              0 0 40px #006989,
              0 0 60px #006989;
          }
        }
      `}</style>

      {/* Navigation with mega effects */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0e12]/95 backdrop-blur-2xl border-b-2 border-[#006989]/40 shadow-[0_0_30px_rgba(0,105,137,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Moon
                  className="w-10 h-10 text-[#006989] group-hover:rotate-180 transition-all duration-700"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0,105,137,0.8))' }}
                />
                <Star
                  className="w-4 h-4 text-[#eaebed] absolute top-0 right-0"
                  style={{ animation: 'glow 2s ease-in-out infinite' }}
                />
              </div>
              <span
                className="text-3xl font-black tracking-tighter"
                style={{ animation: 'neon 3s ease-in-out infinite' }}
              >
                HECATE
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Demo', 'Install'].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  className="text-[#eaebed]/80 hover:text-[#006989] transition-all duration-300 font-bold relative group text-lg"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#006989] to-transparent group-hover:w-full transition-all duration-300" />
                  <span className="absolute inset-0 bg-[#006989]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
              <a
                href="https://github.com/Nurysso/Hecate"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#006989] to-[#007ba3] text-[#eaebed] rounded-xl transition-all duration-300 font-bold shadow-[0_0_20px_rgba(0,105,137,0.4)] hover:shadow-[0_0_40px_rgba(0,105,137,0.8)] hover:scale-110 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Github className="w-5 h-5 relative z-10" />
                <span className="relative z-10">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* </section> */}
      {/* MEGA Hero Section */}
      <section className="relative pt-10 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Extra visual elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 text-6xl opacity-10"
            style={{ animation: 'float 10s ease-in-out infinite' }}
          >
            🌙
          </div>
          <div
            className="absolute top-40 right-20 text-6xl opacity-10"
            style={{ animation: 'float 12s ease-in-out infinite reverse' }}
          >
            ✨
          </div>
          <div
            className="absolute bottom-40 left-1/4 text-6xl opacity-10"
            style={{ animation: 'float 15s ease-in-out infinite' }}
          >
            ⚡
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-16">
            {/* Mega dramatic heading */}
            <div className="relative">
              <div className="absolute inset-0 blur-[100px] bg-[#006989]/40 animate-pulse" />
              <div className="relative">
                <div className="flex items-center justify-center mb-12">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#006989]/30 rounded-full blur-3xl group-hover:blur-[100px] transition-all duration-500" />
                    <Moon
                      className="relative w-40 h-40 text-[#006989]"
                      style={{
                        animation: 'spin-slow 30s linear infinite',
                        filter: 'drop-shadow(0 0 30px rgba(0,105,137,1))',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star
                        className="w-16 h-16 text-[#eaebed]"
                        style={{
                          animation: 'glow 2s ease-in-out infinite, bounce 3s ease-in-out infinite',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h1 className="text-8xl sm:text-[12rem] font-black mb-8 tracking-tighter leading-none">
                  <span
                    className="inline-block hover:scale-110 transition-transform duration-500 cursor-default"
                    style={{ animation: 'neon 4s ease-in-out infinite' }}
                  >
                    HECATE
                  </span>
                </h1>

                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#006989]/50 via-[#006989]/20 to-[#006989]/50 blur-2xl" />
                  <p className="relative text-2xl sm:text-3xl font-black text-[#006989] tracking-wide">
                    DOTFILES FOR HYPRLAND
                    <br />
                    <span className="text-[#eaebed]">LIKE NEVER BEFORE</span>
                  </p>
                </div>

                {/* Animated underline */}
                <div className="flex justify-center mt-8">
                  <div
                    className="w-96 h-2 bg-gradient-to-r from-transparent via-[#006989] to-transparent rounded-full"
                    style={{ animation: 'pulse 3s ease-in-out infinite' }}
                  />
                </div>
              </div>
            </div>

            {/* Stats row */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#006989]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative p-6 bg-[#006989]/10 backdrop-blur-sm rounded-2xl border border-[#006989]/30 group-hover:border-[#006989] transition-all duration-300 group-hover:scale-110">
                    <div className="text-4xl font-black text-[#006989] mb-2">{stat.value}</div>
                    <div className="text-sm text-[#eaebed]/70 font-bold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div> */}

            <p className="text-md sm:text-sm text-[#eaebed]/90 max-w-5xl mx-auto leading-relaxed font-light">
              Experience Hyprland with{' '}
              <span
                className="font-black text-[#006989]"
                style={{ animation: 'neon 3s ease-in-out infinite' }}
              >
                INTELLIGENT THEMING
              </span>{' '}
              that adapts to your wallpaper. Transform your desktop with{' '}
              <span className="font-black text-[#006989]">DYNAMIC COLORS</span> that flow seamlessly
              across your entire system.
            </p>

            {/* Mega CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
              <a
                href="https://github.com/Nurysso/Hecate"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center space-x-4 px-14 py-7 bg-gradient-to-r from-[#006989] via-[#007ba3] to-[#006989] rounded-2xl text-2xl font-black transition-all duration-500 transform hover:scale-110 overflow-hidden shadow-[0_0_50px_rgba(0,105,137,0.6)] hover:shadow-[0_0_80px_rgba(0,105,137,1)] bg-[length:200%_100%] hover:bg-right"
                style={{ animation: 'shake 5s ease-in-out infinite' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Github className="w-8 h-8 relative z-10" />
                <span className="relative z-10">VIEW ON GITHUB</span>
                <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </a>

              <a
                href="#install"
                className="group relative flex items-center space-x-4 px-14 py-7 bg-transparent backdrop-blur-sm rounded-2xl text-2xl font-black transition-all duration-500 transform hover:scale-110 border-4 border-[#006989] hover:bg-[#006989]/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#006989]/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Download className="w-8 h-8 relative z-10" />
                <span className="relative z-10">GET STARTED</span>
                <Rocket className="w-8 h-8 relative z-10 group-hover:translate-y-[-4px] transition-transform duration-300" />
              </a>
            </div>

            {/* Animated tags */}
            {/* <div className="flex flex-wrap items-center justify-center gap-6 pt-16">
              {['MIT LICENSE', 'HYPRLAND', 'DYNAMIC THEMING'].map((tag, i) => (
                <span
                  key={i}
                  className="px-8 py-3 bg-[#006989]/20 hover:bg-[#006989]/40 rounded-full border-2 border-[#006989]/50 hover:border-[#006989] text-base font-black transition-all duration-300 hover:scale-125 cursor-default backdrop-blur-sm shadow-[0_0_20px_rgba(0,105,137,0.3)] hover:shadow-[0_0_40px_rgba(0,105,137,0.8)]"
                  style={{ animation: `bounce ${3 + i * 0.5}s ease-in-out infinite` }}
                >
                  {tag}
                </span>
              ))}
            </div> */}

            {/* Scroll indicator */}
            <div className="pt-20">
              <div className="inline-flex flex-col items-center space-y-3 cursor-pointer group">
                <span className="text-[#006989] font-bold text-sm tracking-wider">
                  SCROLL TO EXPLORE
                </span>
                <div
                  className="w-6 h-10 border-2 border-[#006989] rounded-full flex justify-center p-1"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                >
                  <div
                    className="w-1 h-3 bg-[#006989] rounded-full"
                    style={{ animation: 'bounce 2s ease-in-out infinite' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXTREME Features Section */}
      <section id="features" className="relative py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-6">
              <div
                className="text-8xl mb-4"
                style={{ animation: 'bounce 3s ease-in-out infinite' }}
              >
                ⚡
              </div>
            </div>
            <h2
              className="text-6xl sm:text-8xl font-black mb-8 tracking-tighter"
              style={{ animation: 'neon 3s ease-in-out infinite' }}
            >
              FEATURES
            </h2>
            <p className="text-3xl text-[#eaebed]/70 font-light">
              Everything you need for a BEAUTIFUL Hyprland setup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-10 bg-gradient-to-br from-[#eaebed]/5 to-[#006989]/10 rounded-[2rem] border-2 transition-all duration-700 hover:transform hover:scale-110 backdrop-blur-sm overflow-hidden cursor-pointer ${
                  activeFeature === index
                    ? 'border-[#006989] shadow-[0_0_60px_rgba(0,105,137,0.8)] scale-105'
                    : 'border-[#006989]/30 hover:border-[#006989] hover:shadow-[0_0_40px_rgba(0,105,137,0.6)]'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#006989]/0 to-[#006989]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-700 shadow-[0_0_30px_rgba(0,105,137,0.5)]`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl" />
                    {feature.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 text-5xl opacity-50 group-hover:scale-150 group-hover:rotate-12 transition-all duration-500">
                    {feature.emoji}
                  </div>
                </div>

                <h3 className="relative text-3xl font-black mb-6 text-[#eaebed] group-hover:text-[#006989] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-[#eaebed]/80 leading-relaxed text-lg">
                  {feature.description}
                </p>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#006989]/30 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#006989]/30 to-transparent rounded-tr-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Applications - EXTREME */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-6">
              <div className="text-8xl mb-4" style={{ animation: 'float 4s ease-in-out infinite' }}>
                📦
              </div>
            </div>
            <h2
              className="text-6xl sm:text-8xl font-black mb-8 tracking-tighter"
              style={{ animation: 'neon 3s ease-in-out infinite' }}
            >
              SUPPORTED APPS
            </h2>
            <p className="text-3xl text-[#eaebed]/70 font-light">
              Beautiful configs for ALL your tools
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-[#eaebed]/5 to-[#006989]/10 rounded-[3rem] border-2 border-[#006989]/40 p-16 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(0,105,137,0.4)]">
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-[#006989]/20 rounded-full blur-[120px]"
              style={{ animation: 'pulse 5s ease-in-out infinite' }}
            />
            <div
              className="absolute bottom-0 left-0 w-96 h-96 bg-[#006989]/20 rounded-full blur-[120px]"
              style={{ animation: 'pulse 6s ease-in-out infinite reverse' }}
            />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10">
              {supportedApps.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-start space-x-6 p-8 rounded-3xl hover:bg-[#006989]/20 transition-all duration-500 hover:scale-105 border border-transparent hover:border-[#006989]/50"
                >
                  <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-[#006989] group-hover:scale-110 transition-transform duration-300 mb-3">
                      {item.category}
                    </h3>
                    <p className="text-[#eaebed]/80 font-light text-lg">{item.apps}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* MEGA Demo Section */}
      <section id="demo" className="relative py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-6">
              <Eye
                className="w-24 h-24 text-[#006989]"
                style={{
                  animation: 'glow 2s ease-in-out infinite, bounce 3s ease-in-out infinite',
                }}
              />
            </div>
            <h2
              className="text-6xl sm:text-8xl font-black mb-8 tracking-tighter"
              style={{ animation: 'neon 3s ease-in-out infinite' }}
            >
              SEE THE MAGIC
            </h2>
            <p className="text-3xl text-[#eaebed]/70 font-light">
              Watch Hecate transform your desktop in REAL-TIME
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'INSTALLATION',
                subtitle: 'Lightning-fast setup',
                src: 'https://raw.githubusercontent.com/Nurysso/Hecate/main/assets/gifs/hecate-install.gif',
                emoji: '⚡',
              },
              {
                title: 'LIVE DEMO',
                subtitle: 'Dynamic theming in action',
                src: 'https://raw.githubusercontent.com/Nurysso/Hecate/main/assets/gifs/hecate-demo.gif',
                emoji: '🎨',
              },
            ].map((demo, index) => (
              <div key={index} className="space-y-8 group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-6xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        {demo.emoji}
                      </span>
                      <h3 className="text-4xl font-black text-[#006989] group-hover:scale-110 transition-transform duration-300">
                        {demo.title}
                      </h3>
                    </div>
                    <p className="text-xl text-[#eaebed]/60 font-light">{demo.subtitle}</p>
                  </div>
                </div>

                <div className="relative group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#006989]/30 to-[#006989]/10 rounded-[3rem] blur-2xl group-hover/card:blur-3xl transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-[#eaebed]/5 to-[#006989]/5 rounded-[3rem] border-2 border-[#006989]/40 group-hover/card:border-[#006989] p-6 aspect-video overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(0,105,137,0.3)] group-hover/card:shadow-[0_0_80px_rgba(0,105,137,0.8)] group-hover/card:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#006989]/0 to-[#006989]/30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <img
                      src={demo.src}
                      alt={demo.title}
                      className="relative rounded-3xl w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                    {/* Play indicator overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="w-24 h-24 bg-[#006989]/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULTRA Installation Section */}
      <section id="install" className="relative py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-6">
              <Rocket
                className="w-24 h-24 text-[#006989]"
                style={{ animation: 'bounce 2s ease-in-out infinite' }}
              />
            </div>
            <h2
              className="text-6xl sm:text-8xl font-black mb-8 tracking-tighter"
              style={{ animation: 'neon 3s ease-in-out infinite' }}
            >
              GET STARTED
            </h2>
            <p className="text-3xl text-[#eaebed]/70 font-light">
              One command. Infinite possibilities.
            </p>
          </div>

          <div className="space-y-12">
            {/* Prerequisites */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#006989]/20 to-transparent rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-[#eaebed]/5 to-[#006989]/10 rounded-[3rem] border-2 border-[#006989]/40 group-hover:border-[#006989] p-12 backdrop-blur-sm overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(0,105,137,0.3)] group-hover:shadow-[0_0_60px_rgba(0,105,137,0.6)]">
                <div
                  className="absolute top-0 left-0 w-64 h-64 bg-[#006989]/20 rounded-full blur-3xl"
                  style={{ animation: 'pulse 4s ease-in-out infinite' }}
                />

                <h3 className="relative text-3xl font-black text-[#006989] mb-8 flex items-center space-x-4">
                  <Sparkles className="w-8 h-8" />
                  <span>PREREQUISITES</span>
                </h3>

                <div className="relative bg-[#0a0e12] rounded-3xl p-8 font-mono text-base border-2 border-[#006989]/30 group-hover:border-[#006989]/60 transition-all duration-300 shadow-inner">
                  <code className="text-[#006989] block mb-2 text-lg">
                    # Ensure you have git and gum installed
                  </code>
                  <code className="text-[#eaebed] text-xl font-bold">sudo pacman -S git gum</code>
                </div>
              </div>
            </div>

            {/* Main Install Command */}
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#006989]/40 to-[#006989]/20 rounded-[3rem] blur-3xl group-hover:blur-[100px] transition-all duration-500"
                style={{ animation: 'pulse 3s ease-in-out infinite' }}
              />

              <div className="relative bg-gradient-to-br from-[#006989]/30 to-[#006989]/10 rounded-[3rem] border-4 border-[#006989] p-12 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(0,105,137,0.8)] hover:shadow-[0_0_100px_rgba(0,105,137,1)] transition-all duration-500 hover:scale-105">
                <div
                  className="absolute bottom-0 right-0 w-96 h-96 bg-[#006989]/30 rounded-full blur-[100px]"
                  style={{ animation: 'pulse 5s ease-in-out infinite reverse' }}
                />

                <div className="relative flex items-center justify-between mb-8">
                  <h3 className="text-4xl font-black text-[#006989] flex items-center space-x-4">
                    <Download
                      className="w-10 h-10"
                      style={{ animation: 'bounce 2s ease-in-out infinite' }}
                    />
                    <span>ONE-LINE INSTALL</span>
                  </h3>
                  <div className="flex space-x-3">
                    {['🚀', '⚡', '✨'].map((emoji, i) => (
                      <span
                        key={i}
                        className="text-4xl"
                        style={{ animation: `bounce ${2 + i * 0.3}s ease-in-out infinite` }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative bg-[#0a0e12] rounded-3xl p-10 font-mono text-lg border-2 border-[#006989]/50 group-hover:border-[#006989] transition-all duration-300 shadow-[0_0_30px_rgba(0,105,137,0.5)] group/code">
                  <code className="text-[#eaebed] block overflow-x-auto pr-24 text-xl">
                    {installCommand}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-6 right-6 px-8 py-4 bg-gradient-to-r from-[#006989] to-[#007ba3] hover:from-[#007ba3] hover:to-[#008fc2] rounded-2xl text-lg font-black transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,105,137,0.6)] hover:shadow-[0_0_40px_rgba(0,105,137,1)] border-2 border-[#006989]"
                  >
                    {copied ? '✓ COPIED!' : 'COPY'}
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/code:translate-x-full transition-transform duration-1000" />
                </div>

                <div className="relative mt-8 flex items-center space-x-3 text-[#eaebed]/80 text-lg">
                  <Zap
                    className="w-8 h-8 text-[#006989]"
                    style={{ animation: 'glow 2s ease-in-out infinite' }}
                  />
                  <p className="font-bold">Auto-detects your package manager (pacman, yay, paru)</p>
                </div>
              </div>
            </div>

            {/* Post-install tip */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#006989]/20 to-[#006989]/10 rounded-[3rem] blur-2xl" />
              <div className="relative text-center p-12 bg-gradient-to-br from-[#006989]/20 to-[#006989]/5 rounded-[3rem] border-2 border-[#006989]/50 group-hover:border-[#006989] backdrop-blur-sm transition-all duration-500 hover:scale-105">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  {['🎨', '🖼️', '✨'].map((emoji, i) => (
                    <span
                      key={i}
                      className="text-6xl"
                      style={{ animation: `float ${3 + i}s ease-in-out infinite` }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                <p className="text-2xl text-[#eaebed] font-light mb-6">
                  After installation, press this magical key combo:
                </p>
                <kbd className="inline-block px-12 py-6 bg-gradient-to-br from-[#006989]/40 to-[#006989]/20 rounded-3xl border-4 border-[#006989] font-mono text-3xl font-black shadow-[0_0_30px_rgba(0,105,137,0.6)] hover:shadow-[0_0_50px_rgba(0,105,137,1)] hover:scale-110 transition-all duration-300 cursor-default">
                  SUPER + CTRL + W
                </kbd>
                <p
                  className="text-2xl text-[#006989] font-black mt-6"
                  style={{ animation: 'glow 2s ease-in-out infinite' }}
                >
                  AND WATCH THE MAGIC HAPPEN! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEGA Call to Action */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative group">
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#006989]/50 to-[#006989]/20 rounded-[4rem] blur-[100px]"
              style={{ animation: 'pulse 4s ease-in-out infinite' }}
            />

            <div className="relative bg-gradient-to-br from-[#006989]/30 to-[#006989]/10 rounded-[4rem] border-4 border-[#006989] p-20 backdrop-blur-sm overflow-hidden shadow-[0_0_80px_rgba(0,105,137,1)]">
              <div className="absolute top-0 left-0 w-full h-full">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-[#006989] rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>

              <div className="relative text-center space-y-12">
                <div className="flex items-center justify-center space-x-6">
                  {[Moon, Star, Sparkles].map((Icon, i) => (
                    <Icon
                      key={i}
                      className="w-20 h-20 text-[#006989]"
                      style={{
                        animation: `${i === 0 ? 'spin-slow' : 'glow'} ${3 + i}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>

                <h2
                  className="text-5xl sm:text-7xl font-black leading-tight"
                  style={{ animation: 'neon 3s ease-in-out infinite' }}
                >
                  READY TO TRANSFORM
                  <br />
                  YOUR DESKTOP?
                </h2>

                <p className="text-3xl text-[#eaebed]/80 font-light max-w-3xl mx-auto">
                  Join the revolution of dynamic theming and experience Hyprland like never before
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                  <a
                    href="https://github.com/Nurysso/Hecate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative flex items-center space-x-4 px-16 py-8 bg-gradient-to-r from-[#006989] via-[#007ba3] to-[#006989] rounded-3xl text-3xl font-black transition-all duration-500 transform hover:scale-110 overflow-hidden shadow-[0_0_60px_rgba(0,105,137,1)] hover:shadow-[0_0_100px_rgba(0,105,137,1)] bg-[length:200%_100%] hover:bg-right"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <Github className="w-10 h-10 relative z-10" />
                    <span className="relative z-10">STAR ON GITHUB</span>
                    <Star className="w-10 h-10 relative z-10 group-hover/btn:rotate-180 transition-transform duration-500" />
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-8 pt-8">
                  {['⭐', '100+ Stars', 'MIT', 'Open Source'].map((text, i) => (
                    <span
                      key={i}
                      className="text-xl text-[#006989] font-bold"
                      style={{ animation: `bounce ${2 + i * 0.3}s ease-in-out infinite` }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEGA Footer */}
      <footer className="relative py-20 px-4 sm:px-6 lg:px-8 border-t-2 border-[#006989]/40 bg-[#0a0e12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-6 group cursor-pointer">
              <Moon
                className="w-16 h-16 text-[#006989] group-hover:rotate-180 transition-all duration-700"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,105,137,1))' }}
              />
              <span
                className="text-6xl font-black tracking-tighter"
                style={{ animation: 'neon 4s ease-in-out infinite' }}
              >
                HECATE
              </span>
              <Star
                className="w-16 h-16 text-[#006989] group-hover:rotate-180 transition-all duration-700"
                style={{ animation: 'glow 2s ease-in-out infinite' }}
              />
            </div>

            <p className="text-3xl text-[#006989] font-black">TRANSFORM YOUR DESKTOP</p>

            <div className="flex items-center justify-center space-x-8 text-lg text-[#eaebed]/60">
              <a
                href="https://github.com/Nurysso/Hecate"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#006989] transition-colors duration-300 font-bold"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="#features"
                className="hover:text-[#006989] transition-colors duration-300 font-bold"
              >
                Features
              </a>
              <span>•</span>
              <a
                href="#demo"
                className="hover:text-[#006989] transition-colors duration-300 font-bold"
              >
                Demo
              </a>
              <span>•</span>
              <a
                href="#install"
                className="hover:text-[#006989] transition-colors duration-300 font-bold"
              >
                Install
              </a>
            </div>

            <div className="pt-8 border-t border-[#006989]/30">
              <p className="text-[#eaebed]/60 text-lg">
                Made with{' '}
                <span
                  className="text-red-500 text-2xl"
                  style={{ animation: 'pulse 1s ease-in-out infinite' }}
                >
                  ♥
                </span>{' '}
                by{' '}
                <a
                  href="https://github.com/Nurysso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#006989] hover:text-[#007ba3] font-black transition-colors duration-300"
                  style={{ animation: 'glow 3s ease-in-out infinite' }}
                >
                  Nurysso
                </a>
              </p>
              <p className="text-sm text-[#eaebed]/40 italic mt-4">
                Hecate - Greek goddess of magic, crossroads, and transformation ✨
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-4">
              {['🌙', '✨', '⚡', '🎨', '🚀'].map((emoji, i) => (
                <span
                  key={i}
                  className="text-4xl cursor-default"
                  style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
//   </nav>
