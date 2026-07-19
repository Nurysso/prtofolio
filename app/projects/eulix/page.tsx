// app/projects/eulix/page-v2.tsx
'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Layers,
  Lock,
  Server,
  Terminal,
  Zap,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

//  Types

type LineType = 'cmd' | 'out' | 'prompt' | 'answer' | 'meta';
interface TerminalLine {
  type: LineType;
  text: string;
}

//  Data

const TERMINAL_LINES: TerminalLine[] = [
  { type: 'cmd', text: 'eulix analyze' },
  { type: 'out', text: 'parsing 26,412 files · 41.2M LOC' },
  { type: 'out', text: 'symbol index built · call graphs resolved' },
  { type: 'out', text: 'embeddings generated (768-dim, CUDA) · 34m 51s' },
  { type: 'meta', text: '— ready · 14:23:09' },
  { type: 'cmd', text: 'eulix chat' },
  { type: 'prompt', text: 'where is the retry logic for failed embeds?' },
  { type: 'answer', text: 'writer.rs:214  retry_with_backoff()' },
  { type: 'answer', text: 'called from embed_shard() · IOError · max 3 attempts' },
  { type: 'meta', text: '— 47ms · 4 chunks · 1,284 tokens' },
];

const TIMELINE = [
  {
    num: '01',
    title: 'Index',
    cmd: 'eulix analyze',
    desc: 'Rust parser extracts symbols, call graphs, and control flow. Python embedder generates 768-dim semantic vectors with CUDA acceleration.',
    duration: '~5–10 min on a 1M LOC repo',
  },
  {
    num: '02',
    title: 'Query',
    cmd: 'eulix chat',
    desc: 'Four-stage retrieval: exact symbol match, BM25 keyword, semantic vector search, then call graph expansion for deep context.',
    duration: '<50ms warm query',
  },
  {
    num: '03',
    title: 'Answer',
    cmd: '→ your LLM',
    desc: 'MMR re-ranked, budget-allocated context passed to your LLM with a structured CoT prompt. Grounded in your actual code.',
    duration: 'model-dependent · streamed',
  },
];

const STATS = [
  { value: '26M', unit: 'LOC/min', label: 'parse throughput', sub: 'Rust · 12 threads' },
  { value: '<50', unit: 'ms', label: 'warm query latency', sub: 'mmap + IVF index' },
  { value: '768', unit: 'dim', label: 'embedding vector', sub: 'PyTorch · CUDA' },
  { value: '~7.4', unit: 's', label: 'cold start', sub: 'one-time, amortized' },
];

const ARCH = [
  {
    lang: 'Go',
    color: 'text-cyan-300',
    border: 'border-cyan-400/25',
    bg: 'bg-cyan-400/[0.04]',
    name: 'eulix',
    role: 'Orchestrator — CLI, config, retrieval pipeline, LLM integration, TUI.',
    license: 'GPLv3',
  },
  {
    lang: 'Rust',
    color: 'text-rose-300',
    border: 'border-rose-400/25',
    bg: 'bg-rose-400/[0.04]',
    name: 'eulix_parser',
    role: 'Static analyzer — symbols, call graphs, control flow, complexity metrics.',
    license: 'GPLv3',
  },
  {
    lang: 'Python',
    color: 'text-yellow-200',
    border: 'border-yellow-300/25',
    bg: 'bg-yellow-300/[0.04]',
    name: 'eulix_embed',
    role: 'Embedder — transformers via PyTorch, CUDA/ROCm, bucket sharding.',
    license: 'Apache 2.0',
  },
];

const FEATURES = [
  {
    icon: Lock,
    color: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    title: 'Local-first, private by default',
    desc: 'Parse, embed, and reason entirely on your machine. No code is sent anywhere unless you explicitly configure a cloud LLM.',
  },
  {
    icon: Server,
    color: 'text-rose-300',
    bg: 'bg-rose-400/10',
    title: 'Any LLM provider',
    desc: 'OpenAI, Anthropic, Gemini, Ollama, LM Studio, or any OpenAI-compatible endpoint. Switch with one config line.',
  },
  {
    icon: Zap,
    color: 'text-yellow-300',
    bg: 'bg-yellow-300/10',
    title: 'Small models, big results',
    desc: 'Accurate retrieval means a local 7B model answers as well as GPT-4 on code understanding — context is everything.',
  },
  {
    icon: Layers,
    color: 'text-zinc-300',
    bg: 'bg-white/[0.06]',
    title: 'Handles real codebases',
    desc: 'Built for multi-million LOC repos, monorepos, and legacy systems spanning multiple languages and build systems.',
  },
];

const INSTALL_CMDS = {
  unix: 'curl -fsSL https://raw.githubusercontent.com/nurysso/eulix/main/install.sh | bash',
  win: 'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nurysso/eulix/main/install.ps1" -OutFile "$env:TEMP\\install.ps1"; powershell -ExecutionPolicy Bypass -File "$env:TEMP\\install.ps1"',
};

//  Hooks

function useTypedTerminal(lines: TerminalLine[], speed = 16, pause = 600): TerminalLine[] {
  const [rendered, setRendered] = useState<TerminalLine[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const t = setTimeout(() => {
        setRendered([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 3000);
      return () => clearTimeout(t);
    }
    const cur = lines[lineIdx];
    if (charIdx <= cur.text.length) {
      const t = setTimeout(() => {
        setRendered((prev) => {
          const next = [...prev];
          next[lineIdx] = { ...cur, text: cur.text.slice(0, charIdx) };
          return next;
        });
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, pause);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed, pause]);

  return rendered;
}

//  Primitives

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500 mb-5">
      <span className="w-1 h-1 rounded-full bg-cyan-400" />
      {children}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-12 leading-[1.1] max-w-2xl">
      {children}
    </h2>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-zinc-600">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="border-t border-white/[0.06] max-w-6xl mx-auto" />;
}

//  Nav

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-[#08090a]/75">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-1.5 font-mono text-[15px] font-semibold tracking-tight"
        >
          <span className="text-cyan-400">/</span>
          <span>eulix</span>
        </a>

        <div className="flex items-center gap-7">
          <div className="hidden md:flex items-center gap-7 font-mono text-[11px] text-zinc-500 tracking-widest uppercase">
            <a href="#how" className="hover:text-white transition-colors duration-150">
              how
            </a>
            <a href="#performance" className="hover:text-white transition-colors duration-150">
              perf
            </a>
            <a href="#architecture" className="hover:text-white transition-colors duration-150">
              arch
            </a>
          </div>

          <a
            href="https://github.com/nurysso/eulix"
            className="group flex items-center gap-1.5 font-mono text-[11px] text-zinc-300 hover:text-white transition-colors uppercase tracking-widest"
          >
            github
            <ArrowUpRight
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}

//  Hero: product card

function ProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      className="relative"
    >
      {/* Subtle outer glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-rose-500/10 blur-md opacity-60" />

      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0d10] overflow-hidden shadow-2xl shadow-black/60">
        {/* corner highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-transparent pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 font-mono text-[10.5px] text-zinc-500 tracking-widest uppercase">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-60" />
                <span className="relative rounded-full w-1.5 h-1.5 bg-cyan-400" />
              </span>
              query · grounded
            </div>
            <span className="font-mono text-[10.5px] text-zinc-600">47 ms</span>
          </div>

          {/* Question */}
          <div className="px-6 py-5 border-b border-white/[0.04]">
            <Label>you asked</Label>
            <p className="text-[15.5px] text-zinc-100 leading-relaxed mt-2">
              where is the retry logic for failed embeds?
            </p>
          </div>

          {/* Answer */}
          <div className="px-6 py-5 space-y-5">
            <div>
              <Label>reference</Label>
              <p className="font-mono text-[13px] text-rose-300 mt-2">writer.rs:214</p>
              <p className="font-mono text-[13px] text-zinc-200 mt-0.5">retry_with_backoff()</p>
            </div>

            <div className="pt-4 border-t border-white/[0.04]">
              <Label>context</Label>
              <p className="text-[13px] text-zinc-400 mt-2 leading-relaxed">
                called from <span className="font-mono text-cyan-300">embed_shard()</span> on{' '}
                <span className="font-mono text-zinc-300">IOError</span> · max 3 attempts
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.04] font-mono text-[10.5px]">
            <span className="text-zinc-600">4 chunks · 1,284 tokens</span>
            <span className="text-cyan-400 tracking-widest uppercase">grounded</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="min-h-98vh relative max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-28 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-16 items-center"
    >
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.05] blur-[120px] pointer-events-none" />

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="show"
        className="relative"
      >
        <motion.div
          variants={stagger(0)}
          className="inline-flex items-center gap-2 font-mono text-[11px] text-yellow-200 border border-yellow-300/25 bg-yellow-300/[0.04] rounded-full px-3 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
          beta · first stable release summer 2026
        </motion.div>

        <motion.h1
          variants={stagger(0.05)}
          className="font-semibold text-5xl md:text-[3.75rem] leading-[0.96] tracking-[-3px] mb-7"
        >
          Local code
          <br />
          intelligence.
          <br />
          <span className="text-zinc-500">Grounded, not guessed.</span>
        </motion.h1>

        <motion.p
          variants={stagger(0.1)}
          className="text-zinc-400 text-[15px] leading-relaxed mb-9 max-w-[460px]"
        >
          Eulix builds a structured knowledge base from your source — symbols, call graphs,
          embeddings — then answers questions about it in under 50ms. Everything runs on your
          machine.
        </motion.p>

        <motion.div variants={stagger(0.15)} className="flex items-center gap-3 flex-wrap">
          <a
            href="#install"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-[#08090a] font-semibold text-[13px] hover:bg-cyan-300 transition-colors duration-150"
          >
            Install Eulix
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform duration-150"
            />
          </a>

          <a
            href="https://github.com/nurysso/eulix"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-zinc-300 text-[13px] hover:border-white/20 hover:text-white transition-all duration-150"
          >
            <Github size={14} />
            View on GitHub
          </a>
        </motion.div>
      </motion.div>

      <ProductCard />
    </section>
  );
}

//  Trust bar

function TrustBar() {
  const items = [
    'GPLv3 + Apache 2.0',
    'Local-first',
    'No code leaves your machine',
    'Any LLM provider',
    'CUDA · ROCm · Metal',
  ];
  return (
    <div className="border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-[10.5px] text-zinc-600 uppercase tracking-widest">
        {items.map((t, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-white/10">·</span>}
            <span>{t}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

//  How it works: timeline

function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how" ref={ref} className="max-w-6xl mx-auto px-6 py-28">
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <Eyebrow>How it works</Eyebrow>
        <Heading>
          Three stages. <span className="text-zinc-500">One grounded answer.</span>
        </Heading>
      </motion.div>

      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="absolute top-[28px] left-[7%] right-[7%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent hidden md:block" />

        <div className="grid md:grid-cols-3 gap-14 md:gap-10 relative">
          {TIMELINE.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={stagger(i * 0.12)}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="relative w-14 h-14 rounded-full border border-white/10 bg-[#0c0d10] flex items-center justify-center font-mono text-[13px] text-cyan-300 z-10">
                  {step.num}
                </div>
                <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                  stage {step.num}
                </div>
              </div>

              <h3 className="text-[19px] font-semibold tracking-tight mb-2">{step.title}</h3>
              <p className="font-mono text-[12px] text-cyan-300 mb-4">{step.cmd}</p>
              <p className="text-[13.5px] text-zinc-400 leading-relaxed mb-5">{step.desc}</p>
              <p className="font-mono text-[11px] text-zinc-600">{step.duration}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

//  Performance: table-style grid

function Performance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="performance"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <Eyebrow>Performance</Eyebrow>
        <Heading>
          Built for real codebases, <span className="text-zinc-500">not toy repos.</span>
        </Heading>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={stagger(i * 0.08)}
            className="bg-[#08090a] p-7 md:p-8 hover:bg-[#0c0d10] transition-colors duration-200"
          >
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-mono text-[2.25rem] leading-none font-semibold text-cyan-300 tracking-tight">
                {s.value}
              </span>
              <span className="font-mono text-sm text-zinc-500">{s.unit}</span>
            </div>
            <div className="text-[13.5px] font-medium text-zinc-200 mb-1.5">{s.label}</div>
            <div className="font-mono text-[11px] text-zinc-600">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

//  Architecture: flow

function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="architecture"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <Eyebrow>Architecture</Eyebrow>
        <Heading>
          Three binaries. <span className="text-zinc-500">One pipeline.</span>
        </Heading>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3 md:gap-2">
        {ARCH.map((a, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={stagger(i * 0.12)}
              className={`group relative rounded-xl border ${a.border} ${a.bg} p-6 hover:border-opacity-100 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded ${a.color} bg-white/[0.04] tracking-widest uppercase`}
                >
                  {a.lang}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">{a.license}</span>
              </div>
              <h3 className={`font-mono text-[16px] font-semibold mb-3 ${a.color}`}>{a.name}</h3>
              <p className="text-[12.5px] text-zinc-500 leading-relaxed">{a.role}</p>
            </motion.div>
            {i < ARCH.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.3, ease: EASE }}
                className="hidden md:flex items-center justify-center text-cyan-400/50"
              >
                <ArrowRight size={16} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

//  Why Eulix

function WhyEulix() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06]">
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <Eyebrow>Why Eulix</Eyebrow>
        <Heading>
          Built for engineers who <span className="text-zinc-500">care about context.</span>
        </Heading>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={stagger(i * 0.1)}
              className="bg-[#08090a] p-7 md:p-8 hover:bg-[#0c0d10] transition-colors duration-200 group"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${f.bg} mb-5`}
              >
                <Icon size={17} className={f.color} />
              </div>
              <h3 className="text-[15px] font-semibold mb-2.5">{f.title}</h3>
              <p className="text-[13.5px] text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

//  Terminal (trace log)

function TerminalSection() {
  const rendered = useTypedTerminal(TERMINAL_LINES);
  const lineColors: Record<LineType, string> = {
    cmd: 'text-cyan-300',
    out: 'text-zinc-500',
    prompt: 'text-zinc-100',
    answer: 'text-rose-300',
    meta: 'text-zinc-700',
  };
  const linePrefixes: Record<LineType, string> = {
    cmd: '$ ',
    out: '  ',
    prompt: '? ',
    answer: '↳ ',
    meta: '',
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Eyebrow>See it in action</Eyebrow>
        <Heading>
          From <span className="text-zinc-500">clone</span> to answer{' '}
          <span className="text-zinc-500">in minutes.</span>
        </Heading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="relative rounded-2xl border border-white/[0.08] bg-[#0c0d10] overflow-hidden shadow-2xl shadow-black/50"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 font-mono text-[10.5px] text-zinc-500 tracking-widest uppercase">
            <Terminal size={12} className="text-cyan-300" />
            trace.log
          </div>
          <div className="flex items-center gap-2 font-mono text-[10.5px] text-zinc-700 tracking-widest uppercase">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />
              <span className="relative rounded-full w-1.5 h-1.5 bg-cyan-400" />
            </span>
            live
          </div>
        </div>

        <div className="p-6 md:p-8 font-mono text-[13px] leading-[1.85] min-h-[360px]">
          <AnimatePresence>
            {rendered.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={`${lineColors[line.type]} ${line.type === 'meta' ? 'mt-1.5' : ''} ${
                  line.type === 'cmd' ? 'mt-3 first:mt-0' : ''
                }`}
              >
                <span className="text-zinc-700 select-none mr-1">{linePrefixes[line.type]}</span>
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <span className="inline-block w-2 h-[15px] bg-cyan-400 rounded-[1px] align-middle animate-pulse ml-1 mt-3" />
        </div>
      </motion.div>
    </section>
  );
}

//  Install

function Install() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [os, setOs] = useState<'unix' | 'win'>('unix');
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(INSTALL_CMDS[os]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      id="install"
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-28 border-t border-white/[0.06]"
    >
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}>
        <Eyebrow>Install</Eyebrow>
        <Heading>
          Get started in <span className="text-zinc-500">one command.</span>
        </Heading>
      </motion.div>

      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger(0.1)}>
        <p className="font-mono text-[12px] text-zinc-500 mb-5">
          Requires: Go 1.23+ · Rust stable · Python 3.10–3.11
        </p>

        {/* OS tabs */}
        <div className="flex gap-1 mb-4 p-1 rounded-lg border border-white/[0.06] bg-white/[0.02] w-fit">
          {(['unix', 'win'] as const).map((o) => (
            <button
              key={o}
              onClick={() => setOs(o)}
              className={`px-4 py-1.5 rounded-md font-mono text-[11px] transition-all duration-150 tracking-wide ${
                os === o ? 'bg-white/[0.06] text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {o === 'unix' ? 'Linux / macOS' : 'Windows'}
            </button>
          ))}
        </div>

        {/* Command box */}
        <div className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[#0c0d10] p-4 overflow-hidden">
          <Terminal size={15} className="text-cyan-300 shrink-0" />
          <code className="font-mono text-[12.5px] text-zinc-200 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {INSTALL_CMDS[os]}
          </code>
          <button
            onClick={handleCopy}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[11px] transition-all duration-150 ${
              copied ? 'bg-cyan-400/10 text-cyan-300' : 'text-zinc-500 hover:text-white'
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'copied' : 'copy'}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

//  Footer

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-600">
        <div className="flex items-center gap-1.5">
          <span className="text-cyan-400">/</span>
          <span>eulix</span>
          <span className="text-zinc-700 ml-2 hidden sm:inline">local code intelligence</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/nurysso/eulix' },
            { label: 'Docs', href: '#' },
            { label: 'Changelog', href: '#' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="hover:text-white transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
          <span className="text-zinc-700 hidden sm:inline">GPLv3 / Apache 2.0</span>
        </div>
      </div>
    </footer>
  );
}

//  Page

export default function Eulix() {
  return (
    <main className="bg-[#08090a] text-zinc-100 min-h-screen antialiased selection:bg-cyan-400/30 selection:text-white">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-rose-500/[0.04] blur-[120px]" />
      </div>

      <Nav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Performance />
      <Architecture />
      <WhyEulix />
      <TerminalSection />
      <Install />
      <Footer />
    </main>
  );
}
