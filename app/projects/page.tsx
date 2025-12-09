'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SearchX, Download, Users, Star, Sparkles, TrendingUp, Zap, Code2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: string;
  link: string;
  category: string;
  featured?: boolean;
}

interface StatsData {
  totalClones: number;
  uniqueClones: number;
  totalStars: number;
  loading: boolean;
}

const allProjects = [
  {
    id: 1,
    title: 'Vanish',
    description: 'Modern alternative to rm command with customizable TUI and restore feature. Built with Rust for performance and safety.',
    tech: ['GoLang', 'TUI'],
    status: 'Live',
    link: '/projects/vanish',
    category: 'System Tools',
    featured: true
  },
  {
    id: 2,
    title: 'Venus',
    description: 'Browser extension to customize tab UI and manage quicklinks. Enhances browsing experience with personalized interfaces.',
    tech: ['JavaScript', 'WebExt', 'CSS'],
    status: 'Beta',
    link: 'https://github.com/Nurysso/venus',
    category: 'Web Extensions',
    featured: true
  },
  {
    id: 3,
    title: 'Hecate',
    description: 'Hyprland dotfiles and collection of apps to improve user experience',
    tech: ['GoLang', 'Typescript', 'Shell', 'CSS', 'Hyprland'],
    status: 'Live',
    link: 'https://github.com/Nurysso/hecate',
    category: 'Desktop Environment',
    featured: true
  },
  {
    id: 4,
    title: 'Tyr',
    description: 'File Organizer powered by ML and simple algo\'s',
    tech: ['Rust', 'CLI', 'ML'],
    status: 'Live',
    link: 'https://github.com/Nurysso/tyr',
    category: 'System Tools',
    featured: true
  },
  {
    id: 5,
    title: 'Athena',
    description: 'Custom Linux kernel build for fun and learning. Exploring kernel development and system-level programming.',
    tech: ['C', 'Kernel'],
    status: 'Research',
    link: 'https://github.com/Nurysso/athena',
    category: 'System Programming',
    featured: true
  },
  {
    id: 6,
    title: 'Eulix',
    description: 'Local code comprehension tool',
    tech: ['Rust', 'GoLang', 'SQL', 'redis', 'llm'],
    status: 'Live',
    link: 'https://github.com/Nurysso/eulix',
    category: 'Developer Tools',
    featured: true
  }
];

const categories = ['All', 'System Tools', 'Developer Tools', 'Web Extensions', 'Desktop Environment', 'System Programming'];
const statuses = ['All', 'Live', 'Beta', 'Research'];

// Animated background with mathematical patterns
const MathBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const particles: Array<{x: number; y: number; vx: number; vy: number; life: number}> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random()
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw mathematical curves
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.01 + time) * 50 * Math.cos(x * 0.005);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Parametric equations
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.beginPath();
      for (let t = 0; t < Math.PI * 2; t += 0.01) {
        const x = canvas.width / 2 + Math.cos(t * 3 + time) * 200 * Math.cos(t);
        const y = canvas.height / 2 + Math.sin(t * 3 + time) * 200 * Math.sin(t);
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Particles with connections
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.005;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = `rgba(59, 130, 246, ${0.3 * Math.sin(p.life)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const statusColors = {
    Live: 'from-emerald-500/20 to-green-500/20 border-emerald-400/40 text-emerald-300',
    Beta: 'from-amber-500/20 to-yellow-500/20 border-amber-400/40 text-amber-300',
    Research: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-400/40 text-fuchsia-300',
  };

  const categoryIcons = {
    'System Tools': '⚡',
    'Developer Tools': '🛠️',
    'Web Extensions': '🌐',
    'Desktop Environment': '🖥️',
    'System Programming': '⚙️'
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0
      }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />

      {/* Glass morphism card */}
      <div className="relative h-full p-6 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
        {/* Holographic borders */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-blue-500/50 rounded-tl-lg" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 rounded-br-lg" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
              {categoryIcons[project.category as keyof typeof categoryIcons] || '📦'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              <span className="text-xs text-slate-400">{project.category}</span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-4 min-h-[4rem]">
          {project.description}
        </p>

        {/* Status Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r ${statusColors[project.status as keyof typeof statusColors] || statusColors.Live} border backdrop-blur-sm`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-600/50 text-slate-200 hover:border-blue-500/50 transition-colors duration-300"
              style={{
                transform: `translateY(${Math.sin(i) * 2}px)`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <span>Explore</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
};

const StatsCard = ({ icon: Icon, label, value, loading, gradient }: any) => {
  return (
    <div className={`relative group p-6 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-slate-600`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          {loading ? (
            <div className="h-8 w-20 bg-slate-700/50 animate-pulse rounded" />
          ) : (
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {value}
            </p>
          )}
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
    </div>
  );
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState<StatsData>({
    totalClones: 0,
    uniqueClones: 0,
    totalStars: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const clonesResponse = await fetch(
          'https://raw.githubusercontent.com/Nurysso/Nurysso/main/data/clones_summary.json'
        );
        const clonesData = await clonesResponse.json();

        const starsResponse = await fetch(
          'https://raw.githubusercontent.com/Nurysso/Nurysso/main/data/stars_summary.json'
        );
        const starsData = await starsResponse.json();

        setStats({
          totalClones: clonesData.cumulative_stats?.total_clones || 0,
          uniqueClones: clonesData.cumulative_stats?.total_unique_clones || 0,
          totalStars: starsData.total_stars || 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const matchesSearch = searchTerm === '' ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MathBackground />

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-300">Open Source Portfolio</span>
            </div>
            <h1 className="font-inukit text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              My Projects
            </h1>
            <p className="font-jacques text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Crafted with passion, powered by innovation. A collection of tools that push boundaries.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
              icon={Download}
              label="Total Downloads"
              value={formatNumber(stats.totalClones)}
              loading={stats.loading}
              gradient="from-blue-500/10 to-cyan-500/10"
            />
            <StatsCard
              icon={Users}
              label="Unique Users"
              value={formatNumber(stats.uniqueClones)}
              loading={stats.loading}
              gradient="from-purple-500/10 to-fuchsia-500/10"
            />
            <StatsCard
              icon={Star}
              label="GitHub Stars"
              value={formatNumber(stats.totalStars)}
              loading={stats.loading}
              gradient="from-amber-500/10 to-orange-500/10"
            />
          </div>

          {/* Filters */}
          <div className="mb-12 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
              <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-3">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedStatus === status
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <SearchX className="w-20 h-20 text-slate-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No projects found</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms</p>
            </div>
          )}

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Projects', value: allProjects.length, color: 'from-blue-500 to-cyan-500' },
              { label: 'Live', value: allProjects.filter(p => p.status === 'Live').length, color: 'from-emerald-500 to-green-500' },
              { label: 'Beta', value: allProjects.filter(p => p.status === 'Beta').length, color: 'from-amber-500 to-yellow-500' },
              { label: 'Research', value: allProjects.filter(p => p.status === 'Research').length, color: 'from-fuchsia-500 to-pink-500' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 text-center group hover:border-slate-600 transition-all duration-300">
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
