'use client';

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Bug,
  Check,
  Copy,
  GitBranch,
  Github,
  Layers,
  Lock,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// ──────────────────────────────────────────
// Utils
// ──────────────────────────────────────────

function cn(...cls) {
  return cls.filter(Boolean).join(' ');
}

const SPRING = { type: 'spring', stiffness: 260, damping: 26 };
const EASE = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ──────────────────────────────────────────
// Primitives
// ──────────────────────────────────────────

function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-zinc-500 mb-5">
      <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse" />
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title }) {
  return (
    <div className="mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[2.4rem] md:text-[3rem] font-semibold tracking-[-0.04em] leading-[1.05] max-w-2xl">
        {title}
      </h2>
    </div>
  );
}

// ──────────────────────────────────────────
// Background: Noise + mesh gradient orbs
// ──────────────────────────────────────────

function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Primary orb */}
      <motion.div
        className="absolute rounded-full blur-[140px]"
        style={{
          width: 700,
          height: 700,
          top: -200,
          right: -200,
          background:
            'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(139,92,246,0.06) 60%, transparent 80%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary orb */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 500,
          height: 500,
          bottom: 0,
          left: -100,
          background:
            'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 60%, transparent 80%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
    </div>
  );
}

// ──────────────────────────────────────────
// Scroll progress bar
// ──────────────────────────────────────────

function ScrollBar() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setProg(el.scrollTop / (el.scrollHeight - el.clientHeight) || 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[80]">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX: prog, background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #06b6d4)' }}
      />
    </div>
  );
}

// ──────────────────────────────────────────
// Nav
// ──────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/[0.07] bg-[#060608]/85 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-1.5 font-mono text-[15px] font-bold tracking-tight group"
        >
          <span className="text-violet-400 group-hover:text-violet-300 transition-colors">/</span>
          <span className="text-zinc-100">eulix</span>
        </a>
        <div className="flex items-center gap-7">
          <div className="hidden md:flex items-center gap-7 font-mono text-[10.5px] text-zinc-500 tracking-[0.15em] uppercase">
            {['how', 'use cases', 'demo', 'arch', 'install'].map((link) => (
              <a
                key={link}
                href={`#${link.replace(' ', '-')}`}
                className="hover:text-violet-300 transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href="https://github.com/nurysso/eulix"
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] hover:border-violet-400/40 hover:bg-violet-400/[0.06] transition-all duration-200 font-mono text-[10.5px] text-zinc-300 uppercase tracking-widest"
          >
            <Github size={12} className="group-hover:text-violet-300 transition-colors" />
            github
          </a>
        </div>
      </div>
    </nav>
  );
}

// ──────────────────────────────────────────
// Hero — 3D tilt card + magnetic button
// ──────────────────────────────────────────

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rx.set(((e.clientY - cy) / rect.height) * -12);
      ry.set(((e.clientX - cx) / rect.width) * 12);
    },
    [rx, ry]
  );

  const handleLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function GlowCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <TiltCard className="w-full max-w-[400px] mx-auto md:mx-0">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-2xl border border-white/[0.09] bg-[#0d0e12] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.18), transparent 50%)`,
          }}
        />
        {/* Animated conic border */}
        {/* <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, rgba(139,92,246,0.8) 8%, transparent 18%)',
              mixBlendMode: 'screen',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
        </div> */}

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-60" />
              <span className="relative rounded-full w-1.5 h-1.5 bg-violet-400" />
            </span>
            grounded · 47ms
          </div>
          <div className="flex gap-1.5">
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Query */}
        <div className="px-6 py-5 border-b border-white/[0.05]">
          <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-zinc-600 mb-2">
            query
          </p>
          <p className="text-[14px] text-zinc-100 leading-relaxed">
            where is the retry logic for failed embeds?
          </p>
        </div>

        {/* Answer */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-zinc-600 mb-2">
              location
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[13px] text-violet-300">writer.rs</span>
              <span className="font-mono text-[11px] text-zinc-600">:</span>
              <span className="font-mono text-[13px] text-cyan-300">214</span>
            </div>
            <p className="font-mono text-[13px] text-zinc-200 mt-1">retry_with_backoff()</p>
          </div>

          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-4 py-3">
            <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-zinc-600 mb-2">
              context
            </p>
            <p className="text-[12.5px] text-zinc-400 leading-relaxed">
              called from <span className="font-mono text-cyan-300">embed_shard()</span> on{' '}
              <span className="font-mono text-zinc-300">IOError</span> · max 3 attempts · exp
              backoff
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05] font-mono text-[10px]">
          <span className="text-zinc-600">4 chunks · 1,284 tokens</span>
          <span className="text-violet-400 tracking-widest uppercase">grounded</span>
        </div>
      </div>
    </TiltCard>
  );
}

function Hero() {
  return (
    <section id="top" className="relative max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-24">
      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.07) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%,black 40%,transparent 90%)',
        }}
      />

      <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-amber-200 border border-amber-300/25 bg-amber-300/[0.05] rounded-full px-3.5 py-1.5 mb-8 tracking-widest uppercase"
          >
            <Sparkles size={10} className="text-amber-300" />
            beta · stable release summer 2026
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="font-semibold text-[3.6rem] md:text-[4.4rem] leading-[0.93] tracking-[-0.05em] mb-7"
          >
            <span className="block">Your codebase.</span>
            <span className="block">
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Understood.
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="text-zinc-400 text-[15px] leading-[1.75] mb-9 max-w-[440px]"
          >
            Eulix builds a structured knowledge base from your source code — symbols, call graphs,
            semantic embeddings — then answers any question about it in under 50ms. Entirely on your
            machine.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            className="flex items-center gap-3 flex-wrap"
          >
            <MagneticButton
              href="#install"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[13px] text-white overflow-hidden cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
              />
              <span className="relative flex items-center gap-2">
                Install Eulix
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            </MagneticButton>

            <a
              href="https://github.com/nurysso/eulix"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] text-zinc-300 text-[13px] hover:border-white/20 hover:text-white transition-all duration-150 cursor-pointer"
            >
              <Github size={14} />
              View on GitHub
            </a>
          </motion.div>

          {/* Mini stats row */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
            }}
            className="flex items-center gap-7 mt-10 pt-8 border-t border-white/[0.07]"
          >
            {[
              { val: '26M', label: 'LOC/min parse', color: 'text-violet-300' },
              { val: '<50ms', label: 'query latency', color: 'text-cyan-300' },
              { val: '100%', label: 'local, private', color: 'text-emerald-300' },
            ].map((s) => (
              <div key={s.label}>
                <p className={`font-mono text-[17px] font-bold ${s.color} tracking-tight`}>
                  {s.val}
                </p>
                <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <GlowCard />
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// Trust bar
// ──────────────────────────────────────────

function TrustBar() {
  const items = [
    'GPLv3',
    'Apache 2.0',
    'Local-first',
    'No telemetry',
    'CUDA · ROCm · Metal',
    'Python',
    'Go',
    'C',
    'C++',
    'Rust',
    'TypeScript',
    'Any LLM provider',
    'Call-graph aware',
    'Semantic search',
  ];
  const loop = [...items, ...items];
  return (
    <div className="border-y border-white/[0.07] relative">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: 'linear-gradient(to right, #060608, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: 'linear-gradient(to left, #060608, transparent)' }}
      />
      <div className="max-w-full overflow-hidden py-3.5">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {loop.map((item, i) => (
            <span
              key={i}
              className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-zinc-600 whitespace-nowrap shrink-0"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// How it works — timeline with animated connector
// ──────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    title: 'Index',
    cmd: 'eulix analyze',
    color: 'text-violet-300',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    desc: 'Rust parser walks your repo, extracts every symbol, builds call graphs and control-flow. Python embedder generates 768-dim semantic vectors on GPU.',
    stat: '~5 min on 1M LOC',
  },
  {
    num: '02',
    title: 'Retrieve',
    cmd: 'eulix chat',
    color: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    desc: 'Four-stage pipeline: exact symbol match → BM25 keyword → semantic vector → call-graph expansion. MMR re-ranking for diversity.',
    stat: '<50ms warm query',
  },
  {
    num: '03',
    title: 'Answer',
    cmd: '→ your LLM',
    color: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    desc: 'Budget-allocated, re-ranked context is passed to your LLM with a structured chain-of-thought prompt. Grounded in your actual code.',
    stat: 'model-dependent',
  },
];

function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="how"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              Three stages.
              <br />
              <span className="text-zinc-600">One grounded answer.</span>
            </>
          }
        />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.13, ease: EASE }}
            whileHover={{ y: -4, transition: SPRING }}
            className={`relative rounded-2xl border ${s.border} bg-[#0b0c10] p-7 overflow-hidden group`}
          >
            {/* Background glow on hover */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${s.bg} blur-3xl`}
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className={`font-mono text-[11px] tracking-[0.2em] uppercase ${s.color}`}>
                  {s.num}
                </span>
                <span className="font-mono text-[10px] text-zinc-700">{s.stat}</span>
              </div>
              <h3 className="text-[22px] font-semibold tracking-tight mb-1">{s.title}</h3>
              <p className={`font-mono text-[12px] ${s.color} mb-4`}>{s.cmd}</p>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// Interactive query playground
// ──────────────────────────────────────────

const SAMPLE_QUERIES = [
  {
    q: 'Where is the retry logic for failed embeds?',
    file: 'writer.rs',
    line: 214,
    fn: 'retry_with_backoff()',
    ctx: 'Called from embed_shard() on IOError · max 3 attempts · exponential backoff with jitter',
    chunks: 4,
    tokens: 1284,
    ms: 47,
  },
  {
    q: 'What calls the authentication middleware?',
    file: 'middleware.go',
    line: 88,
    fn: 'AuthMiddleware()',
    ctx: 'Called by router.Use() in cmd/server.go:42 and api/handler.go:19 · wraps JWT validation',
    chunks: 6,
    tokens: 1891,
    ms: 38,
  },
  {
    q: 'Show me the blast radius of changing User.ID field',
    file: 'models/user.go',
    line: 31,
    fn: 'type User struct',
    ctx: '14 direct callers across 7 files · impacts UserService, AuthHandler, BillingModule · DB schema migration required',
    chunks: 11,
    tokens: 3122,
    ms: 61,
  },
  {
    q: 'Where does connection pooling happen?',
    file: 'db/pool.rs',
    line: 156,
    fn: 'ConnectionPool::new()',
    ctx: 'Initialized once in main.rs:89 · shared via Arc<Mutex<>> · default size 10, max 100 · idle timeout 30s',
    chunks: 5,
    tokens: 1643,
    ms: 43,
  },
];

function QueryPlayground() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState(null);
  const [inputVal, setInputVal] = useState(SAMPLE_QUERIES[0].q);

  const runQuery = useCallback((idx) => {
    setIsTyping(true);
    setDisplayedAnswer(null);
    setTimeout(() => {
      setDisplayedAnswer(SAMPLE_QUERIES[idx]);
      setIsTyping(false);
    }, 900);
  }, []);

  useEffect(() => {
    if (inView) {
      setDisplayedAnswer(SAMPLE_QUERIES[0]);
    }
  }, [inView]);

  const handleSelect = (idx) => {
    setActiveIdx(idx);
    setInputVal(SAMPLE_QUERIES[idx].q);
    runQuery(idx);
  };

  const handleRun = () => runQuery(activeIdx);

  return (
    <section
      id="demo"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Live playground"
          title={
            <>
              Ask anything.
              <br />
              <span className="text-zinc-600">Get a grounded answer.</span>
            </>
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="rounded-2xl border border-white/[0.09] bg-[#0a0b0e] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.07] bg-[#0d0e12]">
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase ml-2">
            eulix playground
          </span>
        </div>

        <div className="grid md:grid-cols-[260px_1fr]">
          {/* Sidebar — sample queries */}
          <div className="border-b md:border-b-0 md:border-r border-white/[0.07] p-4 space-y-1.5">
            <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-zinc-600 px-2 mb-3">
              example queries
            </p>
            {SAMPLE_QUERIES.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-lg text-[11.5px] leading-relaxed transition-all duration-150 relative',
                  activeIdx === i
                    ? 'bg-violet-500/15 text-violet-200 border border-violet-400/25'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                )}
              >
                {activeIdx === i && (
                  <motion.span
                    layoutId="query-active"
                    className="absolute inset-0 rounded-lg bg-violet-400/10"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative">{q.q}</span>
              </button>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex flex-col">
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07]">
              <span className="font-mono text-[11px] text-violet-400">$</span>
              <input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRun()}
                className="flex-1 bg-transparent font-mono text-[13px] text-zinc-100 outline-none placeholder:text-zinc-700"
                placeholder="Ask about your code..."
              />
              <motion.button
                onClick={handleRun}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-[10.5px] uppercase tracking-wider text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
              >
                <Zap size={11} />
                run
              </motion.button>
            </div>

            {/* Answer panel */}
            <div className="flex-1 p-6 min-h-[260px] flex items-center">
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-zinc-600 font-mono text-[12px]"
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      searching index
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity, delay: 0.3 }}
                    >
                      .
                    </motion.span>
                  </motion.div>
                ) : displayedAnswer ? (
                  <motion.div
                    key={`answer-${activeIdx}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="w-full space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-2">
                          file
                        </p>
                        <p className="font-mono text-[14px] text-violet-300">
                          {displayedAnswer.file}
                        </p>
                        <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                          line {displayedAnswer.line}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-2">
                          symbol
                        </p>
                        <p className="font-mono text-[14px] text-cyan-300">{displayedAnswer.fn}</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-2">
                        context
                      </p>
                      <p className="text-[13px] text-zinc-300 leading-relaxed">
                        {displayedAnswer.ctx}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-[10px] text-zinc-600">
                      <span className="text-violet-400">{displayedAnswer.ms}ms</span>
                      <span>{displayedAnswer.chunks} chunks</span>
                      <span>{displayedAnswer.tokens.toLocaleString()} tokens</span>
                      <span className="ml-auto text-emerald-400 flex items-center gap-1.5">
                        <Check size={10} /> grounded
                      </span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────
// Architecture — animated data flow
// ──────────────────────────────────────────

const ARCH_NODES = [
  { id: 'src', label: 'Source Code', sub: 'your repo', color: '#a78bfa', x: 80, y: 50 },
  {
    id: 'parser',
    label: 'eulix_parser',
    sub: 'Rust · symbols + graphs',
    color: '#f87171',
    x: 280,
    y: 50,
  },
  {
    id: 'embed',
    label: 'eulix_embed',
    sub: 'Python · PyTorch · CUDA',
    color: '#fbbf24',
    x: 480,
    y: 50,
  },
  {
    id: 'index',
    label: 'Knowledge Base',
    sub: 'vectors + call graph',
    color: '#34d399',
    x: 380,
    y: 200,
  },
  { id: 'eulix', label: 'eulix', sub: 'Go · retrieval + LLM', color: '#60a5fa', x: 180, y: 200 },
  { id: 'llm', label: 'Your LLM', sub: 'any provider', color: '#c084fc', x: 80, y: 350 },
];

function ArchFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, [inView]);

  const ARCH = [
    {
      lang: 'Go',
      color: 'text-cyan-300',
      border: 'border-cyan-400/25',
      bg: 'bg-cyan-400/[0.05]',
      name: 'eulix',
      role: 'Orchestrator — CLI, config, retrieval pipeline, LLM integration, TUI.',
      license: 'GPLv3',
    },
    {
      lang: 'Rust',
      color: 'text-rose-300',
      border: 'border-rose-400/25',
      bg: 'bg-rose-400/[0.05]',
      name: 'eulix_parser',
      role: 'Static analyzer — symbols, call graphs, control flow, complexity metrics.',
      license: 'GPLv3',
    },
    {
      lang: 'Python',
      color: 'text-amber-200',
      border: 'border-amber-300/25',
      bg: 'bg-amber-300/[0.04]',
      name: 'eulix_embed',
      role: 'Embedder — transformers via PyTorch, CUDA/ROCm, bucket sharding.',
      license: 'Apache 2.0',
    },
  ];

  return (
    <section
      id="arch"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Architecture"
          title={
            <>
              Three binaries.
              <br />
              <span className="text-zinc-600">One pipeline.</span>
            </>
          }
        />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {ARCH.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            whileHover={{ y: -4, transition: SPRING }}
            className={`relative rounded-2xl border ${a.border} ${a.bg} p-6 overflow-hidden group`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`font-mono text-[10px] font-bold tracking-widest uppercase ${a.color} border border-current/20 rounded-full px-2.5 py-1 bg-current/5`}
              >
                {a.lang}
              </span>
              <span className="font-mono text-[9.5px] text-zinc-700">{a.license}</span>
            </div>
            <h3 className={`font-mono text-[15px] font-semibold ${a.color} mb-2`}>{a.name}</h3>
            <p className="text-[12.5px] text-zinc-500 leading-relaxed">{a.role}</p>

            {/* Animated corner ornament */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${a.color.replace('text-', '').includes('cyan') ? '#06b6d4' : a.color.includes('rose') ? '#f87171' : '#fbbf24'} 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Flow arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-center gap-4 font-mono text-[11px] text-zinc-600"
      >
        {['eulix_parser', '→', 'eulix_embed', '→', 'knowledge base', '→', 'eulix', '→', 'LLM'].map(
          (t, i) => (
            <span key={i} className={t === '→' ? 'text-violet-500' : 'text-zinc-600'}>
              {t}
            </span>
          )
        )}
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────
// Performance bento
// ──────────────────────────────────────────

function AnimCount({ to, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.5,
      ease: EASE,
      onUpdate(v) {
        setVal(v.toFixed(decimals));
      },
    });
    return () => c.stop();
  }, [inView, to, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

const PERF = [
  {
    val: 26,
    suffix: 'M',
    unit: 'LOC/min',
    label: 'Parse throughput',
    sub: 'Rust · 12 threads',
    color: 'text-violet-300',
    bg: 'from-violet-500/10',
  },
  {
    val: 50,
    prefix: '<',
    unit: 'ms',
    label: 'Warm query',
    sub: 'mmap + IVF index',
    color: 'text-cyan-300',
    bg: 'from-cyan-500/10',
  },
  {
    val: 768,
    unit: 'dim',
    label: 'Embedding vector',
    sub: 'PyTorch · CUDA',
    color: 'text-emerald-300',
    bg: 'from-emerald-500/10',
  },
  {
    val: 7.4,
    decimals: 1,
    suffix: 's',
    unit: 'cold start',
    label: 'One-time',
    sub: 'amortized per session',
    color: 'text-amber-300',
    bg: 'from-amber-500/10',
  },
];

function Performance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="performance"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Performance"
          title={
            <>
              Built for real codebases.
              <br />
              <span className="text-zinc-600">Not toy repos.</span>
            </>
          }
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PERF.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            whileHover={{ y: -3, transition: SPRING }}
            className={`relative rounded-2xl border border-white/[0.08] bg-gradient-to-b ${p.bg} to-transparent bg-[#0b0c10] p-6 overflow-hidden group`}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: `radial-gradient(circle at 50% 100%, ${p.color.replace('text-', '').includes('violet') ? 'rgba(124,58,237,0.12)' : p.color.includes('cyan') ? 'rgba(6,182,212,0.1)' : p.color.includes('emerald') ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)'} 0%, transparent 70%)`,
              }}
            />
            <div
              className={`font-mono text-[2.4rem] font-bold ${p.color} tracking-tight leading-none mb-2`}
            >
              <AnimCount to={p.val} decimals={p.decimals} prefix={p.prefix} suffix={p.suffix} />
              <span className="text-[1rem] text-zinc-500 ml-1">{p.unit}</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-200 mb-1">{p.label}</p>
            <p className="font-mono text-[10.5px] text-zinc-600">{p.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// Features — spotlight bento
// ──────────────────────────────────────────

const FEATURES = [
  {
    icon: Lock,
    color: 'text-violet-300',
    bg: 'bg-violet-400/10',
    title: 'Private by default',
    desc: 'Parse, embed, and reason entirely on your machine. Nothing leaves unless you configure a cloud LLM.',
    wide: true,
  },
  {
    icon: Server,
    color: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    title: 'Any LLM',
    desc: 'OpenAI, Anthropic, Gemini, Ollama, LM Studio, or any OpenAI-compatible endpoint.',
  },
  {
    icon: Zap,
    color: 'text-amber-300',
    bg: 'bg-amber-400/10',
    title: 'Small model, big results',
    desc: 'Accurate retrieval means a local 7B model rivals hosted alternatives.',
  },
  {
    icon: Layers,
    color: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
    title: 'Scales to monorepos',
    desc: 'Millions of LOC, multi-language, legacy systems — Eulix was built for them.',
    wide: true,
  },
];

function SpotCard({ children, className }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn('relative overflow-hidden', className)}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}

function WhyEulix() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]">
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Why eulix"
          title={
            <>
              Built for engineers
              <br />
              <span className="text-zinc-600">who care about context.</span>
            </>
          }
        />
      </motion.div>
      <div className="grid sm:grid-cols-3 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn('group', f.wide && 'sm:col-span-2')}
            >
              <SpotCard className="h-full bg-[#09090d] hover:bg-[#0d0e12] transition-colors duration-200 p-7 md:p-8">
                <div
                  className={cn(
                    'inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110',
                    f.bg
                  )}
                >
                  <Icon size={17} className={f.color} />
                </div>
                <h3 className="text-[15px] font-semibold mb-2.5">{f.title}</h3>
                <p className="text-[13.5px] text-zinc-500 leading-relaxed">{f.desc}</p>
              </SpotCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// Use cases — tab panel
// ──────────────────────────────────────────

const USE_CASES = [
  {
    icon: BookOpen,
    title: 'Onboarding',
    desc: 'Understand what a module does without reading every file.',
    query: 'Trace the request end-to-end through the payments module.',
  },
  {
    icon: Bug,
    title: 'Debugging',
    desc: 'Trace execution flow and caller/callee chains through unfamiliar code.',
    query: 'What calls this function, and what breaks if I change its signature?',
  },
  {
    icon: GitBranch,
    title: 'Refactoring',
    desc: 'See the blast radius of a change before you make it.',
    query: 'Show me the blast radius of modifying this base class method.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    desc: 'Find every caller of a sensitive function.',
    query: 'Find every caller of this sensitive authentication method.',
  },
  {
    icon: Network,
    title: 'Architecture',
    desc: 'Map how components actually interact at the call graph level.',
    query: 'How do the auth and billing modules actually interact?',
  },
];

function UseCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const cur = USE_CASES[active];
  const Icon = cur.icon;

  return (
    <section
      id="use-cases"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Use cases"
          title={
            <>
              One tool.
              <br />
              <span className="text-zinc-600">Five very different jobs.</span>
            </>
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="rounded-2xl border border-white/[0.09] overflow-hidden"
      >
        <div className="grid md:grid-cols-[240px_1fr]">
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible bg-[#0d0e12] border-b md:border-b-0 md:border-r border-white/[0.07]">
            {USE_CASES.map((uc, i) => {
              const TabIcon = uc.icon;
              const isActive = i === active;
              return (
                <button
                  key={uc.title}
                  onClick={() => setActive(i)}
                  className={cn(
                    'relative flex items-center gap-3 px-5 py-3.5 text-left shrink-0 md:shrink transition-colors duration-150 w-full',
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="uc-bg"
                      className="absolute inset-0 bg-white/[0.05] md:border-l-2 md:border-l-violet-400"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <TabIcon
                    size={14}
                    className={cn('relative shrink-0', isActive && 'text-violet-300')}
                  />
                  <span className="relative font-medium text-[13px] whitespace-nowrap">
                    {uc.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative bg-[#09090d] p-8 md:p-10 min-h-[240px] flex flex-col justify-center overflow-hidden">
            <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-violet-400/[0.06] blur-3xl pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-400/10 mb-5">
                  <Icon size={18} className="text-violet-300" />
                </div>
                <h3 className="text-[20px] font-semibold tracking-tight mb-2">{cur.title}</h3>
                <p className="text-[13.5px] text-zinc-400 leading-relaxed mb-5 max-w-md">
                  {cur.desc}
                </p>
                <div className="rounded-xl border border-white/[0.08] bg-[#0d0e12] px-4 py-3.5 max-w-lg">
                  <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-zinc-600 mb-1.5">
                    example query
                  </p>
                  <p className="font-mono text-[12.5px] text-violet-300">"{cur.query}"</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────
// Install
// ──────────────────────────────────────────

const CMDS = {
  unix: 'curl -fsSL https://raw.githubusercontent.com/nurysso/eulix/main/install.sh | bash',
  win: 'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nurysso/eulix/main/install.ps1" -OutFile "$env:TEMP\\install.ps1"; powershell -ExecutionPolicy Bypass -File "$env:TEMP\\install.ps1"',
};

function Install() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [os, setOs] = useState('unix');
  const [copied, setCopied] = useState(false);

  return (
    <section
      id="install"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Install"
          title={
            <>
              One command.
              <br />
              <span className="text-zinc-600">You're running.</span>
            </>
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="font-mono text-[11.5px] text-zinc-600 mb-5">
          Requires: Go 1.23+ · Rust stable · Python 3.10–3.11
        </p>

        {/* OS toggle */}
        <div className="flex gap-1 mb-5 p-1 rounded-lg border border-white/[0.07] bg-white/[0.02] w-fit">
          {['unix', 'win'].map((o) => (
            <button
              key={o}
              onClick={() => setOs(o)}
              className="relative px-4 py-1.5 rounded-md font-mono text-[11px] tracking-wide"
            >
              {os === o && (
                <motion.span
                  layoutId="os"
                  className="absolute inset-0 bg-white/[0.08] rounded-md"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className={cn('relative', os === o ? 'text-white' : 'text-zinc-500')}>
                {o === 'unix' ? 'Linux / macOS' : 'Windows'}
              </span>
            </button>
          ))}
        </div>

        <div className="relative group rounded-2xl border border-violet-500/20 bg-[#0d0e12] p-5 flex items-center gap-4 shadow-[0_0_40px_rgba(124,58,237,0.08)]">
          <Terminal size={14} className="text-violet-400 shrink-0" />
          <code className="font-mono text-[12.5px] text-zinc-200 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {CMDS[os]}
          </code>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(CMDS[os]);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className={cn(
              'shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10.5px] transition-all',
              copied ? 'bg-violet-400/10 text-violet-300' : 'text-zinc-600 hover:text-white'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="c"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={11} /> copied
                </motion.span>
              ) : (
                <motion.span
                  key="d"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy size={11} /> copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────
// Roadmap
// ──────────────────────────────────────────

const ROADMAP = [
  'MCP server — plug Eulix into any editor or agent via Model Context Protocol',
  'Interactive call graph visualization',
  'Architecture-aware documentation generation, grounded in call flow',
  'Code navigation — symbol jump, reference finder, caller/callee explorer',
  'JavaScript and Java support',
];

function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.07]">
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <SectionHead
          eyebrow="Roadmap"
          title={
            <>
              What's
              <br />
              <span className="text-zinc-600">next.</span>
            </>
          }
        />
      </motion.div>
      <div className="max-w-2xl divide-y divide-white/[0.07] rounded-2xl border border-white/[0.08] overflow-hidden">
        {ROADMAP.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
            className="flex items-start gap-4 px-6 py-4 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-150 group"
          >
            <span className="mt-0.5 w-4 h-4 rounded-full border border-zinc-700 group-hover:border-violet-500 transition-colors shrink-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <p className="text-[13.5px] text-zinc-400 leading-relaxed">{item}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// CTA
// ──────────────────────────────────────────

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.07]">
      <div
        className="relative rounded-3xl overflow-hidden border border-violet-500/20 p-12 md:p-16 text-center"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%), #09090d',
        }}
      >
        {/* <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(139,92,246,0.4) 8%, transparent 18%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        /> */}
        <div className="relative">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-violet-400 mb-4">
            get started
          </p>
          <h2 className="text-[2.6rem] font-semibold tracking-[-0.04em] mb-4 leading-[1.05]">
            Your codebase has answers.
          </h2>
          <p className="text-zinc-500 text-[14.5px] mb-8 max-w-md mx-auto leading-relaxed">
            Eulix surfaces them in milliseconds — locally, privately, and grounded in your actual
            code.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="#install"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[13px] text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              Install Eulix <ArrowRight size={14} />
            </a>
            <a
              href="https://github.com/nurysso/eulix"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-zinc-300 text-[13px] hover:border-white/20 cursor-pointer"
            >
              <Github size={14} /> View source
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// Footer
// ──────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10.5px] text-zinc-600">
        <div className="flex items-center gap-1.5">
          <span className="text-violet-400">/</span>eulix
          <span className="text-zinc-800 ml-2 hidden sm:inline">local code intelligence</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { l: 'GitHub', h: 'https://github.com/nurysso/eulix' },
            { l: 'Docs', h: '#' },
            { l: 'Changelog', h: '#' },
          ].map(({ l, h }) => (
            <a key={l} href={h} className="hover:text-white transition-colors">
              {l}
            </a>
          ))}
          <span className="text-zinc-800 hidden sm:inline">GPLv3 / Apache 2.0</span>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────
// Page root
// ──────────────────────────────────────────

export default function Eulix() {
  return (
    <main
      className="bg-[#060608] text-zinc-100 min-h-screen antialiased selection:bg-violet-400/30 selection:text-white"
      style={{ position: 'relative' }}
    >
      <MeshGradient />
      <ScrollBar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <TrustBar />
        <HowItWorks />
        <QueryPlayground />
        <Performance />
        <ArchFlow />
        <WhyEulix />
        <UseCases />
        <Roadmap />
        <Install />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
