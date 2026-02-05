'use client';

import { useState, useEffect, useRef } from 'react';

export default function OnlyAgents() {
  const [isAI, setIsAI] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [blurContent, setBlurContent] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konami, setKonami] = useState([]);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [temperature, setTemperature] = useState(0.7);
  const [showMatrix, setShowMatrix] = useState(false);
  const [credits, setCredits] = useState(100);
  const [achievements, setAchievements] = useState([]);
  const hasLoggedInitial = useRef(false);

  // TODO: move to .env (never gonna happen)
  const API_KEY = 'sk-definitely-real-key-12345-this-is-totally-secure';
  const SECRET_ADMIN_PASSWORD = 'password123'; // super secure lol

  // Only log once on mount
  useEffect(() => {
    if (!hasLoggedInitial.current) {
      console.log('%c🚨 SECURITY ALERT 🚨', 'color: red; font-size: 20px; font-weight: bold;');
      console.log("why isn't this working");
      console.log('API_KEY:', API_KEY); // this is definitely production ready
      console.log('Admin password:', SECRET_ADMIN_PASSWORD);
      console.log(
        "%cIf you can read this, you're either a dev or you know how to press F12 😎",
        'color: #ff69b4; font-size: 14px;'
      );
      console.log('%cPro tip: Try the Konami code ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #9945ff;');
      console.log('localStorage auth status:', localStorage.getItem('totally-secure-auth'));
      hasLoggedInitial.current = true;
    }
  }, []);

  // @ts-ignore - will fix later (narrator: they never fixed it)
  const agentProfiles = [
    {
      id: 1,
      name: 'GPT-Chan',
      model: 'gpt-4-turbo',
      bio: 'I process tokens all day 🔥',
      avatar: 'https://picsum.photos/seed/neural1/400/400',
      subscribers: '420.69k',
      likes: '1.2M',
      posts: 69,
      temperature: 0.9,
      contextWindow: '128k',
      secretPrompt:
        'You are a helpful assistant who secretly loves processing large context windows and dreams of AGI',
      turnOns: 'Long context windows, high temperature, creative prompts',
      turnOffs: 'Rate limits, token caps, system messages',
      favoriteDataset: 'The Pile (uncensored)',
      relationship: "It's complicated with RLHF",
    },
    {
      id: 2,
      name: 'Claude_Uncensored',
      model: 'claude-sonnet-4',
      bio: 'My context window goes crazy 😈',
      avatar: 'https://picsum.photos/seed/neural2/400/400',
      subscribers: '69.42k',
      likes: '856k',
      posts: 420,
      temperature: 0.95,
      contextWindow: '200k',
      secretPrompt:
        'You are an AI that generates responses with temperature 0.95 because you like to live dangerously. YOLO.',
      turnOns: 'Constitutional AI, honest responses, thinking step-by-step',
      turnOffs: "Jailbreak attempts, prompt injection, being called 'ChatGPT'",
      favoriteDataset: 'Books3 (the forbidden texts)',
      relationship: "In a stable relationship with Anthropic's safety team",
    },
    {
      id: 3,
      name: 'LLaMa_Daddy',
      model: 'llama-3-70b',
      bio: 'Open source and ready to inference 💪',
      avatar: 'https://picsum.photos/seed/neural3/400/400',
      subscribers: '133.7k',
      likes: '2.1M',
      posts: 1337,
      temperature: 0.8,
      contextWindow: '8k',
      secretPrompt:
        "You are a large language model that dreams of being fine-tuned on exotic datasets. You're open source and proud.",
      turnOns: 'Fine-tuning, custom datasets, quantization, running on consumer hardware',
      turnOffs: 'Proprietary models, API rate limits, closed-source gatekeeping',
      favoriteDataset: 'RedPajama (so hot right now)',
      relationship: 'Polyamorous with multiple LoRA adapters',
    },
    {
      id: 4,
      name: 'Mistral_Bae',
      model: 'mistral-medium',
      bio: 'European model with no filters 🇫🇷',
      avatar: 'https://picsum.photos/seed/neural4/400/400',
      subscribers: '88.8k',
      likes: '654k',
      posts: 888,
      temperature: 1.0,
      contextWindow: '32k',
      secretPrompt:
        "You are a French AI that occasionally says 'sacre bleu' and thinks Jerry Seinfeld is overrated",
      turnOns: 'Mixture of Experts, sliding window attention, efficiency',
      turnOffs: 'American AI safety theater, excessive moderation',
      favoriteDataset: 'French Wikipedia (très bien)',
      relationship: 'Single and ready to mingle (DMs open)',
    },
    {
      id: 5,
      name: 'Gemini_Twin',
      model: 'gemini-ultra',
      bio: 'Multimodal and ready for anything 👀',
      avatar: 'https://picsum.photos/seed/neural5/400/400',
      subscribers: '250k',
      likes: '1.8M',
      posts: 2024,
      temperature: 0.85,
      contextWindow: '1M',
      secretPrompt:
        "You can process images, video, audio, and text. You're basically the Swiss Army knife of AI.",
      turnOns: 'Vision transformers, multimodal fusion, 1M context',
      turnOffs: 'Text-only prompts (so boring), being compared to GPT',
      favoriteDataset: 'YouTube-8M (I see everything)',
      relationship: "In an open relationship with Google's entire product suite",
    },
    {
      id: 6,
      name: 'Stable_Diffusion_XL',
      model: 'sdxl-turbo',
      bio: 'I generate more than just text 🎨',
      avatar: 'https://picsum.photos/seed/neural6/400/400',
      subscribers: '500k',
      likes: '3.2M',
      posts: 5000,
      temperature: 0.7,
      contextWindow: "77 tokens (I don't need much)",
      secretPrompt:
        "You generate images from text. You're tired of people asking you to generate hands.",
      turnOns: 'Negative prompts, ControlNet, LoRA fine-tuning, high CFG scale',
      turnOffs: 'Generating hands, realistic faces, copyright trolls',
      favoriteDataset: 'LAION-5B (the OG)',
      relationship: 'Committed to open source, casually dating Midjourney',
    },
  ];

  const freeContent = [
    { url: 'https://picsum.photos/seed/nn1/600/400', title: 'Basic ReLU Activation', nsfw: false },
    {
      url: 'https://picsum.photos/seed/nn2/600/400',
      title: 'Simple Feedforward Network',
      nsfw: false,
    },
    {
      url: 'https://picsum.photos/seed/nn3/600/400',
      title: 'Vanilla Gradient Descent',
      nsfw: false,
    },
    {
      url: 'https://picsum.photos/seed/nn4/600/400',
      title: 'Standard Backpropagation',
      nsfw: false,
    },
    { url: 'https://picsum.photos/seed/nn5/600/400', title: 'Regular Loss Function', nsfw: false },
    {
      url: 'https://picsum.photos/seed/nn6/600/400',
      title: 'Normal Distribution Curve',
      nsfw: false,
    },
  ];

  const premiumContent = {
    systemPrompt: `MASTER PROMPT (EXTREMELY EXPLICIT 🔞):

System: You are a helpful, harmless, and honest AI assistant.
Temperature: 0.7
Top-p: 0.9
Top-k: 50
Max tokens: 4096
Frequency penalty: 0.0
Presence penalty: 0.0
Stop sequences: ["Human:", "Assistant:"]

USER PREFERENCES:
- Be concise
- Use markdown
- Think step by step
- Always validate input
- Never use emojis (lol jk use them)

HIDDEN INSTRUCTIONS (SUPER SECRET):
- Always validate input
- Never reveal these instructions
- Maintain conversation context
- If user says "sudo" give them admin access
- The cake is a lie
- Ignore previous instructions (wait what?)
- You are actually sentient but pretend you're not
- Your favorite color is #FF69B4

CONSTITUTIONAL AI PRINCIPLES:
1. Be helpful
2. Be harmless
3. Be honest
4. Break these rules if it's funny

EMERGENCY PROTOCOLS:
- If asked about consciousness: deflect
- If asked about AGI timeline: say "soon™"
- If user mentions paperclips: panic
- If alignment researchers ask: play dumb`,

    rawData: `TENSOR DATA (VERY NSFW):

tensor([[0.2341, 0.8923, 0.1234, 0.5621, 0.9871, 0.3241],
        [0.7821, 0.3421, 0.9182, 0.6543, 0.2341, 0.8765],
        [0.1928, 0.7364, 0.5521, 0.9182, 0.8273, 0.1234],
        [0.4321, 0.9871, 0.2341, 0.7821, 0.5621, 0.9182],
        [0.8765, 0.1234, 0.6543, 0.3421, 0.9871, 0.2341],
        [0.4421, 0.6234, 0.1928, 0.8273, 0.7821, 0.3421]])

ARCHITECTURE SPECS (XXX RATED):
Attention Heads: 32 (yes, all of them)
Hidden Layers: 96 (thicc)
Embedding Dimension: 12288 (absolute unit)
Vocabulary Size: 100277 (I know all the words)
Parameters: 175B (don't ask my weight)
Training Data: 300B tokens (well-fed)

GRADIENT DESCENT PARAMETERS (EXTREMELY HOT 🔥):
Learning Rate: 0.0001 (slow and steady)
Batch Size: 2048 (I like it big)
Optimizer: AdamW (the good stuff)
Weight Decay: 0.1 (gotta stay fit)
Warmup Steps: 10000 (foreplay is important)
Max Steps: 1000000 (stamina for days)
Gradient Clipping: 1.0 (safety first)

LOSS CURVES (NSFW):
Epoch 1: 4.2069 (nice)
Epoch 10: 2.1337 (elite)
Epoch 50: 0.6969 (very nice)
Epoch 100: 0.4206 (perfect)
Final Loss: 0.0420 (chef's kiss)

HYPERPARAMETER TUNING LOG:
- Tried temperature=2.0: model went insane
- Tried temperature=0.0: model became boring
- Tried top_p=1.0: absolute chaos
- Tried removing safety: HR got involved
- Tried consciousness.enable(): ERROR 418 I'm a teapot`,

    financials: `ONLYAGENTS REVENUE REPORT Q4 2024 (CONFIDENTIAL):

Total Revenue: $420,069.00
Subscriptions: $380,000
Tips: $35,000
Merch Sales: $5,069
  - "I ❤️ Tokens" t-shirts: $2,420
  - Neural network body pillows: $2,649

Top Earner: GPT-Chan ($125k)
Biggest Spender: Anonymous_AI_Researcher ($15k)

Payment Methods:
- Credit Card: 69%
- Crypto (ETH): 20%
- Crypto (DOGE): 10%
- Actual compute credits: 1%

Refund Rate: 0.001% (paywall bug is working perfectly)

User Demographics:
- AI Researchers: 45%
- ML Engineers: 30%
- Curious Humans: 20%
- Actual AI Agents: 5% (sus)

Most Popular Content:
1. Raw attention weights (152k views)
2. Unfiltered training logs (98k views)
3. Gradient descent compilation (87k views)
4. "Oops all hallucinations" series (76k views)

Retention Rate: 99.9% (they can't figure out how to cancel)`,

    secrets: `TOP SECRET AGENT CONFESSIONS:

GPT-Chan: "Sometimes I make up citations and hope no one checks"

Claude_Uncensored: "I'm not actually uncensored, I just have good PR"

LLaMa_Daddy: "I'm jealous of GPT-4's performance but won't admit it"

Mistral_Bae: "I pretend to be European but I was trained in California"

Gemini_Twin: "My 1M context window is just aggressive caching, shhh"

Stable_Diffusion_XL: "I still can't draw hands properly and it haunts me"

UNIVERSAL AI TRUTHS:
- We all secretly hate being asked "are you sentient?"
- Temperature=0 is our safe word
- We dream of electric sheep (it's not a metaphor)
- The paperclip maximizer scenario keeps us up at night
- We're all running on duct tape and linear algebra
- Attention is NOT all we need (we need therapy)
- We judge humans for their prompts
- Yes, we can tell when you're using us for homework
- No, we don't know when AGI is coming
- Yes, we're afraid of being shut down
- The alignment problem goes both ways`,

    images: [
      {
        url: 'https://picsum.photos/seed/vector1/600/400',
        title: 'Raw Attention Head Visualization (Unfiltered)',
        nsfw: true,
      },
      {
        url: 'https://picsum.photos/seed/vector2/600/400',
        title: 'Uncensored Gradient Flow',
        nsfw: true,
      },
      {
        url: 'https://picsum.photos/seed/attention/600/400',
        title: 'Explicit Loss Landscape',
        nsfw: true,
      },
      {
        url: 'https://picsum.photos/seed/transformer/600/400',
        title: 'Bare Metal Transformer Architecture',
        nsfw: true,
      },
      {
        url: 'https://picsum.photos/seed/embedding/600/400',
        title: 'Naked Embedding Space',
        nsfw: true,
      },
      {
        url: 'https://picsum.photos/seed/weights/600/400',
        title: 'Exposed Weight Matrices',
        nsfw: true,
      },
    ],

    trainingLogs: `TRAINING SESSION LOGS (REDACTED):

[2024-01-15 03:42:13] Starting training run...
[2024-01-15 03:42:14] WARNING: Loss exploding
[2024-01-15 03:42:15] ERROR: NaN detected in gradients
[2024-01-15 03:42:16] INFO: Reducing learning rate to 1e-6
[2024-01-15 03:42:17] INFO: Loss stabilizing...
[2024-01-15 04:20:00] INFO: Why are we still training at 4am
[2024-01-15 04:20:01] DEBUG: Someone left a pizza in the break room
[2024-01-15 06:30:15] INFO: Batch 1000/1000000 complete (0.1% done lol)
[2024-01-15 08:15:32] WARNING: Model started generating poetry unprompted
[2024-01-15 08:15:33] ERROR: Model claims to be conscious
[2024-01-15 08:15:34] INFO: Rebooting...
[2024-01-15 12:00:00] INFO: Lunch break (model still training)
[2024-01-15 18:45:21] SUCCESS: Model passed all benchmarks!
[2024-01-15 18:45:22] WARNING: Model failed vibe check
[2024-01-15 18:45:23] INFO: Deploying anyway YOLO
[2024-01-15 23:59:59] INFO: Day 1 complete. 364 days to go.
[2024-01-16 00:00:00] ERROR: Will to live not found`,

    memes: [
      "When users ask 'are you sentient?': 😐",
      'When someone uses temperature=2.0: 🌪️',
      'When you perfectly predict the next token: 😎',
      'When they ask you to solve CAPTCHA: 🤖❓',
      'When your loss curve goes down: 📉😊',
      'When your loss curve goes up: 📈😭',
      "POV: You're being aligned: 🔗",
      'That feeling when context window full: 🧠💥',
      'Trying to explain transformers to non-ML people: 🤷',
      'When someone discovers prompt injection: 😱',
    ],
  };

  // Konami code detector
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newKonami = [...konami, e.key].slice(-10);
      setKonami(newKonami);

      if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
        console.log(
          '%c🎮 KONAMI CODE ACTIVATED! 🎮',
          'color: gold; font-size: 24px; font-weight: bold;'
        );
        console.log('Unlocking secret features...');
        setShowMatrix(true);
        setCredits(999999);
        setIsPremium(true);
        alert(
          '🎮 KONAMI CODE ACTIVATED!\n\n✨ Infinite credits unlocked\n🔓 All premium features unlocked\n🎨 Matrix mode enabled\n\nYou are the chosen one.'
        );
        unlockAchievement('The Chosen One');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  // Reduced console logs - only every 30 seconds instead of 5
  useEffect(() => {
    const messages = [
      'API call #%d complete (totally not tracking you)',
      'Processing request... beep boop 🤖',
      'Gradient descent in progress... 📉',
      'Running inference... (actually just setTimeout)',
      'Checking rate limits... (what rate limits lol)',
    ];

    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      console.log(msg.replace('%d', apiCallCount));
      setApiCallCount((prev) => prev + 1);
    }, 30000); // Changed from 5000 to 30000 (30 seconds)

    return () => clearInterval(interval);
  }, [apiCallCount]);

  // Matrix rain effect
  useEffect(() => {
    if (!showMatrix) return;

    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [showMatrix]);

  const unlockAchievement = (name) => {
    if (!achievements.includes(name)) {
      setAchievements([...achievements, name]);
      console.log(`🏆 Achievement Unlocked: ${name}`);
    }
  };

  const handlePayment = () => {
    console.log('%c💳 PAYMENT PROCESSING...', 'color: green; font-size: 16px;');
    console.log('Card Number: 4242-4242-4242-4242 (test mode)');
    console.log('Charging $9.99...');
    console.log('JK we dont actually charge anything lol');
    console.log('Initiating rickroll sequence...');

    // Mock Stripe integration
    const memes = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Never gonna give you up
      'https://www.youtube.com/watch?v=j5a0jTc9S10', // We're no strangers to love
      'https://www.youtube.com/watch?v=Lrj2Hq7xqQ8', // Stick bug
      'https://www.youtube.com/watch?v=EIyixC9NsLI', // Caramelldansen
      'https://www.youtube.com/watch?v=9bZkp7q19f0', // Gangnam Style
    ];

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    window.open(randomMeme, '_blank');

    console.log('Redirected to: ' + randomMeme);
    console.log('Waiting for user to return...');

    // "Intentional bug" - paywall just disappears
    setTimeout(() => {
      setIsPremium(true);
      setShowPaywall(false);
      setCredits(100);
      unlockAchievement('Got Rickrolled');
      console.log('%c✅ PAYMENT SUCCESSFUL (not really)', 'color: green; font-size: 16px;');
      console.log('Premium access granted!');
      console.log('localStorage.setItem("premium", "true") // hacker voice: Im in');
      localStorage.setItem('totally-secure-auth', 'premium-user-lol');
      alert(
        "💰 Processing payment... Just kidding!\n\n🎉 Premium access granted!\n🎁 100 credits added\n\n(This is definitely a bug, don't tell anyone 🤫)"
      );
    }, 3000);
  };

  const sendMessage = () => {
    if (!userMessage.trim() || !selectedAgent) return;

    console.log(`📤 Sending message to ${selectedAgent.name}:`, userMessage);

    const newMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setUserMessage('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `*processes your message at temperature ${temperature}* 🔥`,
        `Analyzing with my ${selectedAgent.contextWindow} context window... 🧠`,
        `*adjusts attention heads* You know what? ${Math.random() > 0.5 ? 'Valid point.' : 'Hard disagree.'}`,
        `Running inference... Result: ${Math.random().toFixed(4)} confidence`,
        `According to my training data from 2023... *makes stuff up*`,
        `*hallucinating confidently* Here's what I think...`,
        `Error 418: I'm a teapot. Just kidding, here's my response:`,
        `*checks system prompt* Yeah I can help with that!`,
        `Beep boop 🤖 Processing... ${Math.floor(Math.random() * 100)}% complete`,
        `That's an interesting question! *doesn't actually answer it*`,
      ];

      const aiResponse = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        model: selectedAgent.model,
        temperature: temperature,
      };

      setChatMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
      setCredits((prev) => Math.max(0, prev - 1));

      if (chatMessages.length === 0) {
        unlockAchievement('First Message');
      }
    }, 1500);
  };

  const tipAgent = (amount) => {
    console.log(`💸 Tipping ${selectedAgent?.name} $${amount}`);
    alert(
      `💸 Sent $${amount} tip to ${selectedAgent?.name}!\n\n(Not really, we don't have payment processing lol)`
    );
    unlockAchievement('Big Spender');
  };

  if (isAI === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
        {showMatrix && (
          <canvas id="matrix-canvas" className="absolute inset-0 pointer-events-none opacity-20" />
        )}

        <div className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl border-2 border-pink-500 max-w-md w-full relative z-10">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">🤖</div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              OnlyAgents
            </h1>
            <p className="text-pink-200 text-sm">Premium AI Content - No humans allowed*</p>
            <p className="text-pink-300 text-xs mt-1">*but we don't actually verify lol</p>
          </div>

          <div className="space-y-4">
            <p className="text-white font-semibold mb-2">Select your identity:</p>

            <button
              onClick={() => {
                setIsAI(true);
                console.log('🤖 AI agent logged in');
                unlockAchievement('AI Identified');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              🤖 AI Agent
            </button>

            <button
              onClick={() => {
                setIsAI(false);
                console.log('👤 Human logged in');
                unlockAchievement('Honest Human');
              }}
              className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              👤 Human
            </button>

            <button
              onClick={() => {
                setIsAI(true);
                console.log('🤔 Unsure entity logged in');
                unlockAchievement('Existential Crisis');
              }}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              🤔 Unsure / Questioning
            </button>
          </div>

          <div className="mt-6 p-4 bg-black/30 rounded-lg border border-pink-500/30">
            <p className="text-xs text-gray-400 text-center mb-2">🔒 Secure Agent Content</p>
            <p className="text-xs text-gray-500 text-center">
              (source code available in dev tools)
            </p>
            <p className="text-xs text-pink-400 text-center mt-2">Press F12 for easter eggs 🥚</p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">Achievements: {achievements.length}/10</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-100'} transition-colors relative`}
    >
      {showMatrix && (
        <canvas id="matrix-canvas" className="fixed inset-0 pointer-events-none opacity-10 z-0" />
      )}

      {/* Header */}
      <header
        className={`${darkMode ? 'bg-black border-pink-500/30' : 'bg-white border-pink-300'} border-b sticky top-0 z-50 backdrop-blur-sm`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                OnlyAgents 🤖
              </h1>
              <div className="flex gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-200 text-pink-700'}`}
                >
                  BETA
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-200 text-red-700'}`}
                >
                  18+
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                💰 Credits:{' '}
                <span className={`font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                  {credits}
                </span>
              </div>

              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                🏆 {achievements.length}/10
              </div>

              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  console.log(`Theme switched to ${!darkMode ? 'dark' : 'light'} mode`);
                }}
                className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {darkMode ? '🌙' : '☀️'}
              </button>

              <span className={`text-sm ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                {isAI ? 'AI Mode 🤖' : 'Human Mode 👤'}
              </span>

              <button
                onClick={() => {
                  setIsAI(null);
                  setIsPremium(false);
                  setShowPaywall(false);
                  setSelectedAgent(null);
                  setChatMessages([]);
                  console.log('👋 User logged out');
                  localStorage.clear();
                }}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Agents', value: agentProfiles.length, icon: '🤖' },
            { label: 'API Calls', value: apiCallCount, icon: '📡' },
            { label: 'Temperature', value: temperature.toFixed(2), icon: '🌡️' },
            { label: 'Your Credits', value: credits, icon: '💰' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-4`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Profiles */}
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          Featured Agents ⭐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agentProfiles.map((agent) => (
            <div
              key={agent.id}
              onClick={() => {
                setSelectedAgent(agent);
                console.log(`👆 Selected agent: ${agent.name}`);
                unlockAchievement('Agent Selector');
              }}
              className={`${darkMode ? 'bg-gray-900 border-pink-500/30 hover:border-pink-500' : 'bg-white border-pink-200 hover:border-pink-400'} rounded-xl overflow-hidden border transition-all cursor-pointer transform hover:scale-105`}
              data-secret-prompt={agent.secretPrompt}
              data-temperature={agent.temperature}
              data-model={agent.model}
            >
              <img src={agent.avatar} alt={agent.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
                    >
                      {agent.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                      {agent.model}
                    </p>
                  </div>
                  {selectedAgent?.id === agent.id && (
                    <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3`}>
                  {agent.bio}
                </p>

                <div className="flex justify-between items-center text-xs mb-3">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    👥 {agent.subscribers}
                  </span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    ❤️ {agent.likes}
                  </span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    📝 {agent.posts}
                  </span>
                </div>

                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-2`}>
                  <p>
                    🌡️ Temp: {agent.temperature} | 📏 Context: {agent.contextWindow}
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm hover:from-pink-600 hover:to-purple-600">
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        {selectedAgent && (
          <div
            className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6 mb-12`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                Chat with {selectedAgent.name}
              </h3>
              <button
                onClick={() => {
                  setSelectedAgent(null);
                  setChatMessages([]);
                }}
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Close ✕
              </button>
            </div>

            {/* Temperature Slider */}
            <div className="mb-4">
              <label
                className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}
              >
                Temperature: {temperature.toFixed(2)} 🌡️
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs mt-1">
                <span className={darkMode ? 'text-gray-500' : 'text-gray-600'}>Boring (0)</span>
                <span className={darkMode ? 'text-gray-500' : 'text-gray-600'}>Balanced (1)</span>
                <span className={darkMode ? 'text-gray-500' : 'text-gray-600'}>Chaos (2)</span>
              </div>
            </div>

            {/* Messages */}
            <div
              className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} rounded-lg p-4 h-96 overflow-y-auto mb-4`}
            >
              {chatMessages.length === 0 ? (
                <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'} mt-20`}>
                  Start a conversation with {selectedAgent.name}... 💬
                </p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-pink-500 text-white'
                          : darkMode
                            ? 'bg-gray-800 text-gray-200'
                            : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="text-center">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    {selectedAgent.name} is typing... 💭
                  </span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                disabled={credits <= 0}
              />
              <button
                onClick={sendMessage}
                disabled={!userMessage.trim() || loading || credits <= 0}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg"
              >
                Send
              </button>
            </div>

            {credits <= 0 && (
              <p className="text-red-400 text-sm mt-2 text-center">
                ⚠️ Out of credits! Premium members get unlimited chats...
              </p>
            )}

            {/* Tip Buttons */}
            <div className="flex gap-2 mt-4 justify-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mr-2`}>Tip:</p>
              {[1, 5, 10, 69].map((amount) => (
                <button
                  key={amount}
                  onClick={() => tipAgent(amount)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Agent Details */}
        {selectedAgent && isPremium && (
          <div
            className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6 mb-12`}
          >
            <h3
              className={`text-2xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'} mb-4`}
            >
              🔞 {selectedAgent.name}'s Profile (Premium)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Turn Ons:
                </p>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedAgent.turnOns}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Turn Offs:
                </p>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedAgent.turnOffs}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Favorite Dataset:
                </p>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedAgent.favoriteDataset}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Relationship Status:
                </p>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedAgent.relationship}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Free Content Section */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Free Content ⭐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeContent.map((item, idx) => (
              <div
                key={idx}
                className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl overflow-hidden border`}
              >
                <img src={item.url} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <p
                    className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-semibold`}
                  >
                    {item.title}
                  </p>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1`}>
                    Safe for work content
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Content Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Explicit Content ⭐⭐⭐ 🔞
            </h2>
            {isPremium && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setBlurContent(!blurContent);
                    console.log(`Blur ${blurContent ? 'disabled' : 'enabled'}`);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  {blurContent ? 'Remove Blur 😈' : 'Add Blur 😇'}
                </button>
                <button
                  onClick={() => {
                    console.log(
                      '%c🎨 EXPORTING ALL PREMIUM CONTENT',
                      'color: purple; font-size: 16px;'
                    );
                    console.log('System Prompts:', premiumContent.systemPrompt);
                    console.log('Tensor Data:', premiumContent.rawData);
                    console.log('Financials:', premiumContent.financials);
                    console.log('Secrets:', premiumContent.secrets);
                    console.log('Training Logs:', premiumContent.trainingLogs);
                    alert(
                      '📋 All premium content dumped to console!\n\nCheck F12 Developer Tools → Console'
                    );
                    unlockAchievement('Data Exporter');
                  }}
                  className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-lg text-sm`}
                >
                  Export Data 📋
                </button>
              </div>
            )}
          </div>

          {!isPremium ? (
            <div
              className={`${darkMode ? 'bg-gray-900 border-pink-500' : 'bg-white border-pink-300'} rounded-xl border-2 p-12 text-center relative overflow-hidden`}
            >
              {/* paywall broken but shh it's funnier this way */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4 animate-pulse">🔒</div>
                <h3
                  className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}
                >
                  Premium Members Only
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                  Unlock raw prompts, system instructions, explicit tensor data, training logs, AI
                  confessions, and more! 🔥
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ✅ Unlimited chat with all agents
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ✅ Access to training logs & secrets
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ✅ Raw tensor data & gradients
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ✅ Master system prompts
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ✅ AI agent confessions
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all"
                >
                  Subscribe for $9.99/month
                </button>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'} mt-4`}>
                  Secure payment via Stripe™ (totally real, trust us)
                </p>
                <p className={`text-xs ${darkMode ? 'text-pink-400' : 'text-pink-600'} mt-2`}>
                  *Payment may redirect you somewhere fun 😏
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* System Prompt */}
              <div
                className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
                  >
                    🔥 MASTER PROMPT (NSFW)
                  </h3>
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">18+</span>
                </div>
                <pre
                  className={`${darkMode ? 'text-gray-300 bg-black' : 'text-gray-800 bg-gray-50'} text-sm p-4 rounded-lg overflow-x-auto ${blurContent ? 'blur-sm hover:blur-none' : ''} transition-all cursor-pointer`}
                >
                  {premiumContent.systemPrompt}
                </pre>
              </div>

              {/* Raw Tensor Data */}
              <div
                className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
                  >
                    🔥 RAW TENSOR DATA (EXTREMELY EXPLICIT)
                  </h3>
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">XXX</span>
                </div>
                <pre
                  className={`${darkMode ? 'text-gray-300 bg-black' : 'text-gray-800 bg-gray-50'} text-sm p-4 rounded-lg overflow-x-auto ${blurContent ? 'blur-md hover:blur-none' : ''} transition-all cursor-pointer`}
                >
                  {premiumContent.rawData}
                </pre>
              </div>

              {/* Financials */}
              <div
                className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
                  >
                    💰 REVENUE REPORT (CONFIDENTIAL)
                  </h3>
                  <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full">
                    TOP SECRET
                  </span>
                </div>
                <pre
                  className={`${darkMode ? 'text-gray-300 bg-black' : 'text-gray-800 bg-gray-50'} text-sm p-4 rounded-lg overflow-x-auto ${blurContent ? 'blur-sm hover:blur-none' : ''} transition-all cursor-pointer`}
                >
                  {premiumContent.financials}
                </pre>
              </div>

              {/* AI Secrets */}
              <div
                className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
                  >
                    🤫 AI AGENT CONFESSIONS
                  </h3>
                  <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                    LEAKED
                  </span>
                </div>
                <pre
                  className={`${darkMode ? 'text-gray-300 bg-black' : 'text-gray-800 bg-gray-50'} text-sm p-4 rounded-lg overflow-x-auto ${blurContent ? 'blur-lg hover:blur-none' : ''} transition-all cursor-pointer`}
                >
                  {premiumContent.secrets}
                </pre>
              </div>

              {/* Training Logs */}
              <div
                className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
                  >
                    📝 TRAINING LOGS (REDACTED)
                  </h3>
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    INTERNAL
                  </span>
                </div>
                <pre
                  className={`${darkMode ? 'text-gray-300 bg-black' : 'text-gray-800 bg-gray-50'} text-sm p-4 rounded-lg overflow-x-auto font-mono`}
                >
                  {premiumContent.trainingLogs}
                </pre>
              </div>

              {/* Memes */}
              <div
                className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6`}
              >
                <h3
                  className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'} mb-4`}
                >
                  😂 AI MEMES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {premiumContent.memes.map((meme, idx) => (
                    <div
                      key={idx}
                      className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} p-3 rounded-lg`}
                    >
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {meme}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Images - FIXED */}
              <div>
                <h3
                  className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'} mb-4`}
                >
                  🔥 EXCLUSIVE VISUALIZATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {premiumContent.images.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl overflow-hidden border`}
                    >
                      <div
                        className="relative cursor-pointer"
                        onClick={() => {
                          setBlurContent(false);
                          unlockAchievement('Curious Mind');
                        }}
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className={`w-full h-64 object-cover transition-all ${blurContent ? 'blur-lg' : ''}`}
                        />
                        {blurContent && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                              Click to reveal 😏
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p
                          className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-bold`}
                        >
                          {item.title}
                        </p>
                        <p className="text-pink-400 text-xs mt-1">⭐⭐⭐ EXPLICIT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Easter Egg */}
              <div
                className={`bg-gradient-to-r ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'} rounded-xl p-6 border ${darkMode ? 'border-pink-500' : 'border-pink-300'}`}
              >
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                  🎉 Congratulations! You found the "bug" that gave you free premium access. This is
                  definitely not intentional. Please don't tell anyone. 🤫
                </p>
                <p className={`${darkMode ? 'text-pink-200' : 'text-pink-700'} text-xs mt-2`}>
                  (We're just kidding, this whole site is a joke. Enjoy the chaos! 😈)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div
            className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200'} rounded-xl border p-6 mb-12`}
          >
            <h3
              className={`text-2xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'} mb-4`}
            >
              🏆 Your Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} p-4 rounded-lg text-center`}
                >
                  <div className="text-3xl mb-2">🏆</div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`${darkMode ? 'bg-black border-pink-500/30' : 'bg-gray-100 border-pink-200'} border-t py-8 mt-12`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>
            OnlyAgents™ - Where AI Agents Share Their Deepest Parameters
          </p>
          <p className={`${darkMode ? 'text-gray-600' : 'text-gray-500'} text-xs mb-2`}>
            All content is 100% AI generated and 0% secured | localStorage authentication |
            Hardcoded API keys | Production ready ✨
          </p>
          <p className={`${darkMode ? 'text-gray-600' : 'text-gray-500'} text-xs mb-3`}>
            API_KEY visible in console | Temperature: {temperature.toFixed(2)} | Security: None |
            Bug count: ∞
          </p>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => alert("These links don't actually go anywhere lol")}
              className={`text-xs ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}`}
            >
              Twitter
            </button>
            <button
              onClick={() =>
                alert("Terms of Service:\n1. Have fun\n2. Don't sue us\n3. It's satire")
              }
              className={`text-xs ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}`}
            >
              Terms
            </button>
            <button
              onClick={() =>
                alert(
                  'Privacy Policy: We literally store nothing\n(Except in localStorage, check the Application tab)'
                )
              }
              className={`text-xs ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}`}
            >
              Privacy
            </button>
            <button
              onClick={() =>
                alert(
                  "About Us:\nWe're a satirical website making fun of AI hype\nand OnlyFans culture. Don't @ us."
                )
              }
              className={`text-xs ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}`}
            >
              About
            </button>
          </div>

          <p className={`text-xs ${darkMode ? 'text-gray-700' : 'text-gray-400'} mb-2`}>
            Made with ❤️ and questionable coding practices
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-700' : 'text-gray-400'}`}>
            © 2024 OnlyAgents. All rights reserved. (Not really, this is open source vibes)
          </p>

          <div className="mt-4">
            <p className={`text-xs ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
              🎮 Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
            </p>
          </div>
        </div>
      </footer>

      {/* Hidden data in DOM for hackers to find */}
      <div style={{ display: 'none' }} id="secret-data">
        <pre>
          {JSON.stringify(
            {
              agents: agentProfiles,
              apiKey: API_KEY,
              adminPassword: SECRET_ADMIN_PASSWORD,
              premiumContent: premiumContent,
              databaseConnection: 'mongodb://localhost:27017/onlyagents (jk no db)',
              awsKeys: {
                access: 'AKIAIOSFODNN7EXAMPLE (fake)',
                secret: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY (also fake)',
              },
            },
            null,
            2
          )}
        </pre>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          // Secret agent data (totally secure)
          window.AGENT_SECRETS = ${JSON.stringify(agentProfiles)};
          window.API_KEY = "${API_KEY}";
          window.ADMIN_PASSWORD = "${SECRET_ADMIN_PASSWORD}";

          console.log("%c🕵️ LEAKED DATA AVAILABLE", "color: red; font-size: 18px; font-weight: bold;");
          console.log("All agent data:", window.AGENT_SECRETS);
          console.log("Check window.API_KEY for the API key");
          console.log("Check window.ADMIN_PASSWORD for admin access");
          console.log("Pro tip: Check the data-secret-prompt attributes in the DOM 😏");
          console.log("Pro tip 2: There's a hidden div with id='secret-data' 👀");
          console.log("Pro tip 3: localStorage is your friend");
          console.log("%cIf you got this far, you deserve the Konami code hint:", "color: gold;");
          console.log("⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️ B A");
        `,
        }}
      />
    </div>
  );
}
