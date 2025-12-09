'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Shield, RotateCcw, BarChart3, Palette, Zap, Settings, FileText, Trash2, Download, Github, Terminal, Star, MessageSquare, AlertCircle, Copy, Check, Upload, Heart, Code, Users, BookOpen } from 'lucide-react';
import ImageHandDisintegration from './background-vanish';

type ThemeName = "default" | "dark" | "light" | "cyberpunk" | "minimal" | "ocean" | "forest" | "sunset";

interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  text: string;
  muted: string;
  border: string;
  highlight: string;
  accent: string;
}

const themes: Record<ThemeName, ThemeColors> = {
  default: {
    primary: "#3B82F6",
    secondary: "#6366F1",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    text: "#F9FAFB",
    muted: "#9CA3AF",
    border: "#374151",
    highlight: "#FBBF24",
    accent: "#3B82F6"
  },
  dark: {
    primary: "#8B5CF6",
    secondary: "#7C3AED",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    text: "#F9FAFB",
    muted: "#6B7280",
    border: "#1F2937",
    highlight: "#A78BFA",
    accent: "#8B5CF6"
  },
  light: {
    primary: "#2563EB",
    secondary: "#3B82F6",
    success: "#059669",
    warning: "#D97706",
    error: "#DC2626",
    text: "#111827",
    muted: "#6B7280",
    border: "#D1D5DB",
    highlight: "#F59E0B",
    accent: "#2563EB"
  },
  cyberpunk: {
    primary: "#FF00FF",
    secondary: "#00FFFF",
    success: "#00FF00",
    warning: "#FFFF00",
    error: "#FF0000",
    text: "#00FFFF",
    muted: "#FF00FF",
    border: "#FF00FF",
    highlight: "#FFFF00",
    accent: "#FF00FF"
  },
  minimal: {
    primary: "#000000",
    secondary: "#404040",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    text: "#FFFFFF",
    muted: "#9CA3AF",
    border: "#525252",
    highlight: "#737373",
    accent: "#000000"
  },
  ocean: {
    primary: "#0EA5E9",
    secondary: "#06B6D4",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    text: "#F0F9FF",
    muted: "#67E8F9",
    border: "#0C4A6E",
    highlight: "#38BDF8",
    accent: "#0EA5E9"
  },
  forest: {
    primary: "#10B981",
    secondary: "#059669",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    text: "#F0FDF4",
    muted: "#6EE7B7",
    border: "#065F46",
    highlight: "#34D399",
    accent: "#10B981"
  },
  sunset: {
    primary: "#F97316",
    secondary: "#FB923C",
    success: "#10B981",
    warning: "#FBBF24",
    error: "#EF4444",
    text: "#FFF7ED",
    muted: "#FDBA74",
    border: "#9A3412",
    highlight: "#FCD34D",
    accent: "#F97316"
  }
};

export default function VanishLanding() {
  const [copiedScript, setCopiedScript] = useState('');
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('forest');
  const [currentImage, setCurrentImage] = useState<string>('/Images/hand-of-adam.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [isDemoVisible, setIsDemoVisible] = useState(false);

  const command = 'vx Hecate Kondo';
  const [typedCommand, setTypedCommand] = useState('');
  const [scene, setScene] = useState(1);
  const [progress, setProgress] = useState(0);

  // Intersection Observer for demo section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDemoVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => {
      if (demoRef.current) {
        observer.unobserve(demoRef.current);
      }
    };
  }, []);

  // Typing animation - loops when demo is visible
  useEffect(() => {
    if (!isDemoVisible) return;

    let currentIndex = 0;
    setTypedCommand('');

    const typingInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setTypedCommand(command.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setScene(2), 1500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [isDemoVisible, scene === 1]);

  // Progress animation (Scene 2) - loops back to scene 1
  useEffect(() => {
    if (!isDemoVisible) return;

    if (scene === 2) {
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 1;
        setProgress(progressValue);
        if (progressValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScene(1);
            setProgress(0);
          }, 2000);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [scene, isDemoVisible]);

  const cycleTheme = () => {
    const themeNames: ThemeName[] = ["default", "dark", "light", "cyberpunk", "minimal", "ocean", "forest", "sunset"];
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setCurrentTheme(themeNames[nextIndex]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setCurrentImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, scriptType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(scriptType);
    setTimeout(() => setCopiedScript(''), 2000);
  };

  const installScripts = {
    curl: 'curl -LsSf https://raw.githubusercontent.com/Nurysso/vanish/main/install.sh | sh',
    wget: 'wget -qO- https://raw.githubusercontent.com/Nurysso/vanish/main/install.sh | sh'
  };

  const theme = themes[currentTheme];

  const features = [
    { icon: Shield, title: 'Safe Deletion', desc: 'Files moved to cache, not permanently deleted', color: 'from-blue-500 to-blue-600' },
    { icon: RotateCcw, title: 'Pattern Recovery', desc: 'Restore files using flexible pattern matching', color: 'from-purple-500 to-purple-600' },
    { icon: BarChart3, title: 'Rich Statistics', desc: 'Detailed insights into cache usage and metrics', color: 'from-pink-500 to-pink-600' },
    { icon: Palette, title: 'Beautiful TUI', desc: 'Modern interface with 8 built-in themes', color: 'from-orange-500 to-orange-600' },
    { icon: Zap, title: 'Fast Operations', desc: 'Optimized for large directories and files', color: 'from-yellow-500 to-yellow-600' },
    { icon: Settings, title: 'Configurable', desc: 'Extensive customization via TOML config', color: 'from-green-500 to-green-600' },
    { icon: FileText, title: 'Audit Trails', desc: 'Comprehensive logging of all operations', color: 'from-teal-500 to-teal-600' },
    { icon: Trash2, title: 'Auto Cleanup', desc: 'Configurable retention and purging policies', color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden z-0">
      {/* Action Buttons - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group relative"
          style={{ backgroundColor: theme.accent }}
        >
          <Upload className="w-6 h-6 text-white" />
          <span className="absolute bottom-full right-0 mb-2 w-max px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Upload Image
          </span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          onClick={cycleTheme}
          className="p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group relative"
          style={{ backgroundColor: theme.accent }}
        >
          <Palette className="w-6 h-6 text-white" />
          <span className="absolute bottom-full right-0 mb-2 w-max px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Theme: {currentTheme}
          </span>
        </button>
      </div>

      {/* Animated background patterns */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-20 left-20 w-32 h-32 border-2 rotate-45 animate-pulse"
            style={{ borderColor: theme.accent }}
          ></div>
          <div
            className="absolute top-40 right-32 w-24 h-24 rounded-full animate-bounce"
            style={{ backgroundColor: `${theme.accent}30` }}
          ></div>
          <div
            className="absolute bottom-32 left-16 w-16 h-16 border-2 rounded-full"
            style={{ borderColor: theme.accent }}
          ></div>
          <div
            className="absolute top-60 left-1/3 w-20 h-20 border-2 transform rotate-12"
            style={{ borderColor: theme.accent }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-28 h-28 border-2 rotate-45"
            style={{ borderColor: theme.accent }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-12 h-12 border-2 rotate-45"
            style={{ borderColor: theme.accent }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-18 h-18 rounded-full animate-pulse"
            style={{ backgroundColor: `${theme.accent}20` }}
          ></div>
          <div
            className="absolute top-3/4 left-1/2 w-14 h-14 border-2 rounded-full rotate-12"
            style={{ borderColor: theme.accent }}
          ></div>
          <div
            className="absolute inset-0 bg-[size:40px_40px]"
            style={{
              backgroundImage: `linear-gradient(${theme.accent}1A 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}1A 1px, transparent 1px)`
            }}
          ></div>
          <div
            className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: theme.accent }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-4 h-4 rounded-full animate-pulse"
            style={{ backgroundColor: theme.accent }}
          ></div>
          <div
            className="absolute top-1/2 left-3/4 w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: theme.accent, animationDelay: '1s' }}
          ></div>
        </div>
      </div>

      <ImageHandDisintegration
        imageSrc={currentImage}
        particleDensity="medium"
        disintegrationSpeed={1.2}
        spiralIntensity={0.8}
        showStats={false}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section id="hero" className='w-full min-h-screen flex justify-center items-center py-20'>
          <div className="text-center mt-20">
            <svg
              viewBox="0 0 500 200"
              className="w-full max-w-lg mx-auto -mb-4"
            >
              <path
                id="curve"
                d="M 50 150 Q 250 130 450 150"
                fill="transparent"
              />
              <text className="fill-white font-gloock font-bold text-[72px] tracking-tight">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  V <tspan className="font-inukit">ANISH</tspan>
                </textPath>
              </text>
            </svg>

            <p className="text-xl font-jacques sm:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              A modern, safe file deletion tool with recovery capabilities and beautiful TUI interface.
            </p>

            <p
              className="text-lg font-semibold mb-12"
              style={{ color: theme.accent }}
            >
              Secure • Recoverable • Beautiful
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#download"
                className="text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
                style={{ backgroundColor: theme.accent }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Download className="w-5 h-5" />
                Download Vanish
              </a>
              <a
                href="https://github.com/Nurysso/vanish"
                className="bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 min-w-[200px]"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="https://github.com/Nurysso/vanish/issues"
                className="transition-colors duration-300 flex items-center gap-2 text-sm"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <AlertCircle className="w-4 h-4" />
                Report Issues
              </a>
              <a
                href="https://github.com/Nurysso/vanish/discussions"
                className="transition-colors duration-300 flex items-center gap-2 text-sm"
                style={{ color: '#94a3b8' }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <MessageSquare className="w-4 h-4" />
                Join Discussion
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-300">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" style={{ fill: theme.accent, color: theme.accent }} />
                <span className="font-semibold">Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: theme.accent }} />
                <span className="font-semibold">100% Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: theme.accent }} />
                <span className="font-semibold">Lightning Fast</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="feature" className='w-full min-h-screen flex justify-center items-center py-20'>
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Everything you need for safe, recoverable file management with a beautiful interface
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50 hover:border-slate-600 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.accent}, transparent)` }}></div>
                  <div
                    className={`rounded-xl p-3 w-fit mb-4 bg-gradient-to-br ${feature.color} relative z-10`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 relative z-10">{feature.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed relative z-10">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section ref={demoRef} id="demo" className='w-full min-h-screen flex justify-center items-center py-20'>
          <div className="w-full max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                See It In Action
              </h2>
              <p className="text-slate-300 text-lg">
                Watch how Vanish safely handles file deletion with a beautiful interface
              </p>
            </div>

            {/* Terminal Demo */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/50 hover:border-slate-600/50 transition-colors duration-300">
              <div className="px-6 py-3 border-b border-slate-700/50 flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="ml-4 text-sm font-mono" style={{ color: theme.accent }}>
                  VANISH-demo
                </span>
              </div>

              <div
                className="p-8 font-mono text-sm min-h-[500px] backdrop-blur-md shadow-inner"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                }}
              >
                <div className="mb-6">
                  <span style={{ color: theme.accent }}>$</span>{' '}
                  <span style={{ color: theme.text }}>
                    {typedCommand}
                    {typedCommand.length < command.length && (
                      <span className="animate-pulse">|</span>
                    )}
                  </span>
                </div>

                {scene === 1 && typedCommand === command && (
                  <div className="space-y-4 animate-fade-in" style={{ color: theme.text }}>
                    <div className="mb-4"></div>
                    <div>Are you sure you want to delete the following items?</div>
                    <div className="mb-4"></div>
                    <div className="pl-4">
                      <div>Hecate</div>
                      <div className="flex items-center gap-2">
                        <span style={{ color: theme.error }}>❌</span>
                        <span style={{ color: theme.muted }}>Kondo (does not exist)</span>
                      </div>
                    </div>
                    <div className="mb-4"></div>
                    <div className="flex items-center gap-2" style={{ color: theme.warning }}>
                      <span>⚠</span>
                      <span>Warning: 1 file(s) will be skipped</span>
                    </div>
                    <div style={{ color: theme.muted }}>
                      Total items to delete: 1 | Recoverable for 1 days
                    </div>
                    <div className="mb-4"></div>
                    <div style={{ color: theme.text }}>
                      Press &apos;y&apos; to confirm, &apos;n&apos; to cancel, or &apos;q&apos; to quit
                    </div>
                  </div>
                )}

                {scene === 2 && (
                  <div className="space-y-4 animate-fade-in" style={{ color: theme.text }}>
                    <div
                      className="inline-block px-6 py-3 border-2 rounded-lg"
                      style={{
                        borderColor: theme.success,
                        color: theme.success,
                        backgroundColor: `${theme.success}10`
                      }}
                    >
                      ✅ Successfully processed 1 item(s)!
                    </div>

                    <div className="flex items-start gap-2">
                      <span style={{ color: theme.success }}>•</span>
                      <span style={{ color: theme.muted }}>/home/dawu/Hecate →</span>
                    </div>

                    <div className="pl-4" style={{ color: theme.highlight }}>
                      1760000999735359953-2025-10-09-14-39-59-Hecate
                    </div>

                    <div style={{ color: theme.muted }}>
                      Will be permanently deleted after:{' '}
                      <span style={{ color: theme.warning }}>2025-10-10 14:39:59</span>
                    </div>

                    <div className="w-full h-4 border border-slate-700 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
                      <div
                        className="h-4 rounded-full relative overflow-hidden"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: theme.primary,
                          transition: 'width 0.05s linear'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>

                    <div className="text-right font-semibold" style={{ color: theme.primary }}>
                      {progress}%
                    </div>

                    <div style={{ color: theme.muted }}>Press Enter or &apos;q&apos; to exit</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Current theme: <span className="font-semibold" style={{ color: theme.accent }}>{currentTheme}</span>
                {' • '}
                Animation loops automatically when section is visible
              </p>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className='w-full min-h-screen flex justify-center items-center py-20'>
          <div className="text-center w-full">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-slate-300 text-lg">
                  Install Vanish in seconds with a single command
                </p>
              </div>

              {/* Quick Install */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-700/50 mb-12 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                  <Terminal className="w-7 h-7" style={{ color: theme.accent }} />
                  Quick Install
                </h3>

                <div className="space-y-6">
                  <div className="bg-slate-900/90 rounded-xl p-6 text-left border-2 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5" style={{ color: theme.accent }} />
                        <span className="font-semibold text-white">Using curl:</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(installScripts.curl, 'curl')}
                        className="transition-all p-2.5 rounded-lg hover:bg-slate-700 group-hover:scale-110"
                        style={{ color: theme.accent }}
                      >
                        {copiedScript === 'curl' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <code className="text-slate-300 font-mono text-sm break-all block leading-relaxed">
                      {installScripts.curl}
                    </code>
                  </div>

                  <div className="bg-slate-900/90 rounded-xl p-6 text-left border-2 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5" style={{ color: theme.accent }} />
                        <span className="font-semibold text-white">Using wget:</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(installScripts.wget, 'wget')}
                        className="transition-all p-2.5 rounded-lg hover:bg-slate-700 group-hover:scale-110"
                        style={{ color: theme.accent }}
                      >
                        {copiedScript === 'wget' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <code className="text-slate-300 font-mono text-sm break-all block leading-relaxed">
                      {installScripts.wget}
                    </code>
                  </div>
                </div>

                <div
                  className="mt-8 p-6 rounded-xl border-2"
                  style={{
                    backgroundColor: `${theme.accent}08`,
                    borderColor: `${theme.accent}30`
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div className="text-left">
                      <p className="text-white font-semibold mb-2">Pro Tip</p>
                      <p className="text-slate-300 text-sm">
                        Add a version tag like <code className="bg-slate-700 px-2 py-1 rounded font-mono text-xs" style={{ color: theme.accent }}>v0.9.0</code> to install a specific version
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Links */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-700/50">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                  <Users className="w-6 h-6" style={{ color: theme.accent }} />
                  Join the Community
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href="https://github.com/Nurysso/vanish"
                    className="bg-slate-700/80 hover:bg-slate-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 group border-2 border-slate-600/50 hover:border-slate-500"
                  >
                    <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Source Code</span>
                  </a>
                  <a
                    href="https://github.com/Nurysso/vanish/issues"
                    className="bg-slate-700/80 hover:bg-slate-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 group border-2 border-slate-600/50 hover:border-slate-500"
                  >
                    <AlertCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Report Issues</span>
                  </a>
                  <a
                    href="https://github.com/Nurysso/vanish/discussions"
                    className="bg-slate-700/80 hover:bg-slate-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 group border-2 border-slate-600/50 hover:border-slate-500"
                  >
                    <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Discussions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Trash2 className="w-6 h-6" style={{ color: theme.accent }} />
                Vanish
              </h3>
              <p className="text-slate-400 text-sm mb-4 max-w-md">
                A modern, safe file deletion tool with recovery capabilities. Delete with confidence, restore with ease.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Nurysso/vanish"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Nurysso/vanish/discussions"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Discussions"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Nurysso/vanish/issues"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Issues"
                >
                  <AlertCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/Nurysso/vanish#readme" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Nurysso/vanish/releases" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Releases
                  </a>
                </li>
                {/* <li>
                  <a href="https://github.com/Nurysso/vanish/blob/main/CHANGELOG.md" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Changelog
                  </a>
                </li> */}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/Nurysso/vanish/discussions" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Discussions
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Nurysso/vanish/issues" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Report Bug
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Nurysso/vanish/pulls" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Contribute
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Vanish. Released under the MIT License.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />
               {/* by the open source community */}
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
