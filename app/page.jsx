'use client';

import { animate, AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/*  DATA */
const PROJECTS = [
  {
    id: 'eulix',
    title: 'Eulix',
    tag: 'Rust · Go · Python · LLM',
    desc: 'Turns your codebase into a searchable book. Ask questions about your code, get accurate answers using local or cloud LLMs.',
    year: '2026',
    status: 'BETA',
    site: false,
    link: 'https://github.com/Nurysso/eulix',
    long: 'Offline-first codebase intelligence — indexes your project with AST parsing, stores context in Redis, and answers questions via a local LLM. No data leaves your machine.',
  },
  {
    id: 'tyr',
    title: 'Tyr',
    tag: 'Rust · CLI · ML',
    desc: 'File organizer that uses ML to understand relationships between files and group them intelligently — not just by extension.',
    year: '2025',
    site: false,
    status: 'Live',
    link: 'https://github.com/Nurysso/tyr',
    long: 'Template and scaffolding tool for multi-language projects with ML-assisted suggestions. Fast, opinionated, and stays out of your way.',
  },
  {
    id: 'vanish',
    title: 'Vanish',
    tag: 'Go · TUI · CLI',
    desc: 'Modern safe alternative to rm. Beautiful TUI, pattern restore, themes, and full undo functionality.',
    year: '2025',
    site: true,
    status: 'Live',
    link: 'https://dawood.page/projects/vanish',
    long: 'Never lose files again. Vanish wraps deletion in a recoverable cache with a full TUI for browsing, restoring, and managing deleted files.',
  },
  {
    id: 'hecate',
    title: 'hecate Dots',
    tag: 'Shell · QML · Lua',
    desc: 'Hyprland dotfiles with auto-theming and a clean UI layer built on Quickshell.',
    year: '2025',
    site: true,
    status: 'Live',
    link: 'https://github.com/Nurysso/hecate',
    long: 'A full Linux desktop environment configuration for Hyprland with automated theming, custom widgets, and a cohesive visual system built from scratch.',
  },
  {
    id: 'athena',
    title: 'Athena',
    tag: 'C · Kernel',
    desc: 'Custom Linux kernel build for learning and experimentation.',
    year: '2025',
    site: false,
    status: 'Research',
    link: 'https://github.com/Nurysso/Athena',
    long: 'A custom Linux kernel configuration and patch set built to understand low-level systems internals — scheduler behavior, memory management, and driver development.',
  },
  {
    id: 'Binrex',
    title: 'BinRex',
    tag: 'TypeScript · GoLang · Python · Rust · Shell',
    desc: 'A collection of binaries i build for fun/Learn new languages and do some experimentation',
    year: '2025',
    site: false,
    status: 'Live',
    link: 'https://github.com/Nurysso/Binrex',
    long: 'just a bunch of random stuff i built to learn coding and honestly just mess around. made this package manager thing because typing the same commands over and over in every new VM was getting annoying',
  },
  // {
  //   id: 'Gstrings',
  //   title: 'Gstrings',
  //   tag: ' GoLang',
  //   desc: 'Simple fast string formating lib for go.',
  //   year: '2025',
  //   status: 'Research',
  //   link: 'https://github.com/Nurysso/gstrings',
  //   long: 'A random Go package I build to help me building cli tools and do table creations',
  // },
];

const SKILLS = ['Rust', 'GoLang', 'TypeScript', 'C', 'CI/CD', 'Linux', 'Redis', 'MariaDB'];

const NAV_LINKS = ['work', 'about', 'contact'];

/*  HOOKS  */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedNumber({ value: int }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    // Check that 'int' is a valid number before animating
    if (typeof int !== 'number') return;

    const controls = animate(0, int, {
      duration: 2,
      onUpdate: (latest) => spring.set(latest),
    });
    return () => controls.stop();
  }, [int, spring]); // Dependency on 'int' is correct now

  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());
  return <motion.span>{display}</motion.span>;
}

function useClones() {
  const [clones, setClones] = useState(null);

  useEffect(() => {
    fetch('/api/clones')
      .then((r) => r.json())
      .then((d) => setClones(d.total))
      .catch(() => setClones(0));
  }, []);

  return clones;
}

/*  REVEAL WRAPPER  */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/*  PROJECT PAGE */
function ProjectPage({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 200,
        overflowY: 'auto',
        animation: 'slideIn 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }`}</style>
      <div
        style={{
          padding: '80px clamp(40px,8vw,120px)',
          maxWidth: 720,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-sec)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 0,
            transition: 'color 0.2s',
            width: 'fit-content',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-sec)')}
        >
          ← back
        </button>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {project.tag}
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(40px,6vw,72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: 'var(--text-pri)',
            margin: 0,
          }}
        >
          {project.title}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-sec)', lineHeight: 1.85, margin: 0 }}>
          {project.long}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {project.tag.split(' · ').map((t) => (
            <span
              key={t}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--text-pri)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {project.site ? 'View Website →' : 'View on GitHub →'}
          </a>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-sec)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '6px 14px',
              borderRadius: 'var(--radius)',
            }}
          >
            {project.status}
          </span>
        </div>
        <div style={{ height: 1, background: 'var(--border)', marginTop: 16 }} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--border)' }}>
          {project.year}
        </p>
      </div>
    </div>
  );
}

/*  OVERLAY PAGE (Lab / Writing) */
function OverlayPage({ title, label, body, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 200,
        overflowY: 'auto',
        animation: 'slideIn 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        style={{
          padding: '80px clamp(40px,8vw,120px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-sec)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 0,
            width: 'fit-content',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-sec)')}
        >
          ← back
        </button>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(32px,6vw,64px)',
            fontWeight: 700,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-sec)',
            lineHeight: 1.8,
            maxWidth: 580,
            margin: 0,
          }}
        >
          {body}
        </p>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              height: 320,
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--border)',
            }}
          >
            [ content coming soon ]
          </div>
        ))}
      </div>
    </div>
  );
}

/*  PROJECT CARD */
function ProjectCard({ project, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onClick={() => onClick(project)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          cursor: 'pointer',
          transform: hovered ? 'translateY(-2px)' : 'none',
          transition: 'border-color 0.2s, transform 0.2s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.12em',
          }}
        >
          {project.tag}
        </span>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(20px,2.4vw,28px)',
            fontWeight: 600,
            color: 'var(--text-pri)',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-sec)', lineHeight: 1.7, flex: 1, margin: 0 }}>
          {project.desc}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--border)', fontFamily: 'var(--font-mono)' }}>
            {project.year}
          </span>
          <span
            style={{
              fontSize: 11,
              color: hovered ? 'var(--accent)' : 'var(--text-sec)',
              fontFamily: 'var(--font-mono)',
              transition: 'color 0.2s',
            }}
          >
            {project.status} {hovered ? '↗' : ''}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/*  SKILL PILL */
function SkillPill({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '8px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-pri)',
        transition: 'border-color 0.2s',
        cursor: 'default',
      }}
    >
      {label}
    </div>
  );
}

const words = ['terminal', 'developers', 'power users'];

function TextCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

/*  MAIN APP  */
export default function Portfolio() {
  const [activePage, setActivePage] = useState(null); // "lab" | "writing"
  const [activeProject, setActiveProject] = useState(null);
  const [chipHovered, setChipHovered] = useState(false);
  const heroRef = useRef(null);
  const clones = useClones();

  /* parallax */
  const handleHeroMouse = (e) => {
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 18;
    const y = ((e.clientY - top) / height - 0.5) * 12;
    heroRef.current.style.setProperty('--mx', x + 'px');
    heroRef.current.style.setProperty('--my', y + 'px');
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;600;700&display=swap');
        :root {
          --bg: #0d0d0d; --surface: #161616; --border: #282828;
          --accent: #ffb347; --accent2: #00ff41;
          --text-pri: #f0f0f0; --text-sec: #8c8c8c;
          --radius: 4px;
          --font-mono: 'JetBrains Mono', monospace;
          --font-sans: 'Outfit', sans-serif;
          --pad-h: clamp(40px, 8vw, 120px);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0d0d0d; color: #f0f0f0; font-family: 'JetBrains Mono', monospace; overflow-x: hidden; }
        a { color: inherit; text-decoration: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:none } }
        @keyframes chipIn { from { opacity:0; transform:translateY(12px) rotate(-1deg) } to { opacity:1; transform:none } }
        @keyframes slideIn { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
        @keyframes countUp { from { opacity:0 } to { opacity:1 } }
      `}</style>

      {/*  OVERLAYS  */}
      {activeProject && (
        <ProjectPage project={activeProject} onClose={() => setActiveProject(null)} />
      )}
      {activePage === 'lab' && (
        <OverlayPage
          label="Lab"
          title="Experiments & prototypes"
          onClose={() => setActivePage(null)}
          body="A playground for half-finished ideas — WASM demos, generative visuals, language experiments. Updated whenever something is interesting enough to share."
        />
      )}
      {activePage === 'writing' && (
        <OverlayPage
          label="Writing"
          title="Long-form thoughts"
          onClose={() => setActivePage(null)}
          body="Essays on systems design, low-level performance, and occasionally the absurdities of modern web development."
        />
      )}

      {/*  NAV  */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          padding: '20px clamp(40px,8vw,120px)',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            flex: 1,
            fontFamily: 'var(--font-mono)',
            fontSize: 16,
            color: 'var(--accent)',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Dawood (Nurysso)
        </div>
        <ul style={{ display: 'flex', gap: 40, listStyle: 'none' }}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  color: 'var(--text-sec)',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-pri)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-sec)')}
              >
                {link}
              </button>
            </li>
          ))}
          {['lab', 'writing'].map((p) => (
            <li key={p}>
              <button
                onClick={() => setActivePage(p)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  color: 'var(--text-sec)',
                  padding: '8px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-pri)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-sec)')}
              >
                {p} ↗
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/*  HERO  */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        style={{
          padding: '120px clamp(40px,8vw,120px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          background: 'var(--bg)',
          minHeight: '90vh',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'crosshair',
        }}
      >
        {/* grid bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.35,
            pointerEvents: 'none',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            animation: 'fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.05s both',
            position: 'relative',
          }}
        >
          01 / Hello
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(44px,6vw,72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: 'var(--text-pri)',
              position: 'relative',
              animation: 'fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.15s both',
            }}
          >
            <div>I build things</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              for the{' '}
              <span
                onMouseEnter={() => setChipHovered(true)}
                onMouseLeave={() => setChipHovered(false)}
                style={{
                  display: 'inline-block',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(44px,6vw,72px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  padding: '0.08em 0.28em',
                  borderRadius: 'var(--radius)',
                  // Keep your animation logic here
                  transform: chipHovered ? 'rotate(-1deg) scale(1.02)' : 'none',
                  transition: 'transform 0.2s',
                  cursor: 'default',
                }}
              >
                <TextCycler />
              </span>
            </div>
          </h1>

          {/* live clone counter */}
          <div
            style={{
              animation: 'fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.5s both',
              position: 'relative',
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-sec)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              total clones
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700,
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              {clones !== null ? <AnimatedNumber value={clones} /> : '—'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--border)' }}>
              across all projects
            </span>
          </div>
        </div>

        <p
          style={{
            maxWidth: 560,
            fontSize: 14,
            color: 'var(--text-sec)',
            lineHeight: 1.75,
            position: 'relative',
            animation: 'fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.25s both',
          }}
        >
          Software engineer obsessed with performance, clean APIs, and tools that stay out of your
          way. I build CLI utilities, browser extensions, custom Linux environments, and AI-powered
          developer tooling.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            position: 'relative',
            animation: 'fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.35s both',
          }}
        >
          <button
            onClick={() => scrollTo('work')}
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              fontWeight: 700,
              padding: '14px 32px',
              borderRadius: 'var(--radius)',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.88';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'none';
            }}
          >
            View work →
          </button>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: 'none',
              color: 'var(--text-sec)',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              padding: '14px 32px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--text-pri)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-sec)';
            }}
          >
            Get in touch
          </button>
        </div>
      </section>

      {/*  WORK  */}
      <section
        id="work"
        style={{
          padding: '80px clamp(40px,8vw,120px)',
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            02 / Selected work
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px,3vw,32px)',
              fontWeight: 600,
            }}
          >
            Recent projects
          </h2>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {PROJECTS.slice(0, 6).map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.08} onClick={setActiveProject} />
          ))}
        </div>
      </section>

      {/*  ABOUT  */}
      <section
        id="about"
        style={{
          padding: '80px clamp(40px,8vw,120px)',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 40,
          alignItems: 'start',
        }}
      >
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              03 / About
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(24px,3vw,36px)',
                fontWeight: 600,
              }}
            >
              A bit about me
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-sec)', lineHeight: 1.8, maxWidth: 480 }}>
              I'm a recent AIML graduate who fell headfirst into systems engineering — and never
              looked back. I've built across systems programming, developer tooling, web, and
              product engineering.
              <br />
              <br />
              I care deeply about correctness, latency, and the craft of writing code that other
              humans can actually read.
              <br />
              <br />
              Before switching to systems I was lead frontend developer at a previous job, shipping
              an internal dashboard that handled thousands of daily transactions.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingLeft: 40 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Tools & Languages
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {SKILLS.map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/*  CONTACT  */}
      <section
        id="contact"
        style={{
          padding: '80px clamp(40px,8vw,120px)',
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          textAlign: 'center',
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            04 / Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Let's build something
            <br />
            worth shipping.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 14, color: 'var(--text-sec)' }}>
            Open for freelance contracts and full-time roles.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="mailto:contact.dawood@proton.me"
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-mono)',
              fontSize: 18,
              fontWeight: 700,
              padding: '16px 48px',
              borderRadius: 'var(--radius)',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.88';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'none';
            }}
          >
            contact.dawood@proton.me
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              ['GitHub', 'https://github.com/Nurysso'],
              ['LinkedIn', 'https://www.linkedin.com/in/nurysso/'],
              ['Twitter', 'https://x.com/Nurysso'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 14,
                  color: 'var(--text-sec)',
                  transition: 'color 0.2s',
                  padding: 4,
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-pri)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-sec)')}
              >
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/*  FOOTER  */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px clamp(40px,8vw,120px)',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          fontSize: 12,
          color: 'var(--text-sec)',
        }}
      >
        <div>
          © 2026 Dawood.
          {/* <a href="https://github.com/nicbarker/clay" style={{ color: 'var(--accent)' }}>
            Clay
          </a> */}
          .
        </div>
        <span style={{ color: 'var(--border)' }}>v1.0.0</span>
      </footer>
    </>
  );
}
