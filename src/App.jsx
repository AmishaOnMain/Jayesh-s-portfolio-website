import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Download,
  Cpu,
  Database,
  Code,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Brain,
  Bot,
  Search,
  PlayCircle,
  FileText,
  MessageSquare,
  X,
  Send,
  User,
  Sparkles,
  RefreshCw,
  MapPin,
  Zap,
  Layers,
  Instagram,
  Youtube,
  Menu
} from 'lucide-react';

// --- DATA: RESUME CONTEXT (The "Knowledge Base" for RAG) ---
const RESUME_CONTEXT = `
YOU ARE A RAG CHATBOT CREATED BY JAYESH VISHWAKARMA.
You are integrated directly into Jayesh's portfolio website to showcase his skills in Generative AI and RAG systems.
Your goal is to answer questions about Jayesh's professional background, skills, and projects in a FUN, MATURE, AND ENGAGING way.

CRITICAL INSTRUCTION:
You must STRICTLY answer questions ONLY based on the information provided in the "RESUME DATA" section below.
If a user asks about something NOT in this resume (like general knowledge, weather, or other topics), politely refuse and say you can only discuss Jayesh's professional life.
KEEP YOUR ANSWERS CONCISE AND TO THE POINT. DO NOT BE VERBOSE.

---
RESUME DATA:
Name: Jayesh Vishwakarma
Contact: +91 6264998382 | jayeshvishwakarma6028@gmail.com
Links: GitHub (@jayesh-cmd), LinkedIn (@cmd-jayesh)

SUMMARY:
Final-year MCA student specialising in AI application development and backend engineering. Experienced in building RAG pipelines, LLM-integrated APIs, and AI agents using FastAPI, LangChain, and GCP. Comfortable owning features end-to-end from prompt design to production deployment. Actively seeking AI/Backend internship or fresher roles.

SKILLS:
- Languages: Python, SQL
- AI & LLM: LangChain, RAG Pipelines, LLM Integration (Gemini, GPT-3.5, LLaMA 3.2), Prompt Engineering, Vector DBs (FAISS), Sentence-Transformers
- Backend: FastAPI, REST APIs, Webhooks, Async Programming, Docker, Streamlit
- Cloud & DevOps: GCP (Cloud Run, Vertex AI), Git, GitHub
- Databases: PostgreSQL, SQL, Row-Level Security (RLS)
- Problem Solving: 150+ DSA problems

EXPERIENCE:
1. CommPlug Innovations (AI/ML Software Developer Intern) | Sept 2025 - Dec 2025
   - Built an AI-powered B2B sales agent using Gemini API integrated with WhatsApp Business API for end-to-end order conversations.
   - Implemented multi-tenant PostgreSQL system with Row-Level Security for strict data isolation.
   - Designed async webhook handling using FastAPI and ThreadPoolExecutor with sub-2s response time.
   - Improved system stability through automated testing and validation pipelines.

PROJECTS:
1. FoodPilot - AI Food Ordering Concierge
   - Built an AI concierge that autonomously orchestrates Swiggy's food-ordering tools via Anthropic's native MCP connector.
   - Reduced input token costs by up to 90% by implementing Anthropic prompt caching.
   - Designed encrypted OAuth token storage and fixed a UI jitter issue during SSE token streaming.

2. InsightLense - Multimodal Research Document Assistant
   - Built a multimodal RAG system for parsing complex PDFs (charts, tables, text).
   - Implemented Hybrid Retrieval (BM25 + FAISS) for better accuracy.
   - Added session persistence and optimized ingestion for large documents.

3. AI-Driven Financial Fraud Detection API
   - Built with XGBoost + FastAPI on 6.3M+ transactions with high recall and sub-100ms inference.
   - Engineered behavioral fraud features.
   - Integrated GPT-3.5 for explainable fraud reports.

EDUCATION:
- Integrated MCA at Acropolis Institute, Indore (Expected 2027)
- Relevant Coursework: DSA, DBMS, Computer Networks, OS
---

GUIDELINES:
1. If asked "Who are you?", say you are a RAG chatbot created by Jayesh and integrated into this portfolio.
2. Be concise but enthusiastic.
3. Always reply in structured way, write in next line when needed and always reply in structured and readable way
4. Don't try to use any bold character and don't use ** anywhere just use simple english and reply naturally
`;

// --- SIMULATION LOGIC (Fallback for Preview without API Key) ---
const simulateRAGResponse = (query) => {
  const q = query.toLowerCase();

  if (q.includes('hello') || q.includes('hi'))
    return "Hey! I'm a RAG chatbot created by Jayesh for this portfolio. Ask me about his AI and backend projects! 🚀";

  if (q.includes('who are you'))
    return "I'm a RAG chatbot built by Jayesh and integrated here to showcase his Generative AI and backend engineering skills. 😎";

  if (q.includes('python') || q.includes('langchain') || q.includes('skill'))
    return "Jayesh works with Python, LangChain, and FastAPI to build production-ready AI systems, including RAG pipelines and scalable backends.";

  if (q.includes('project') || q.includes('foodpilot') || q.includes('fraud') || q.includes('insightlense'))
    return "His key projects include: 1) FoodPilot (AI food ordering concierge), 2) InsightLense (multimodal RAG for PDFs), and 3) a fraud detection API built on 6.3M+ transactions.";

  if (q.includes('experience') || q.includes('work') || q.includes('intern'))
    return "He worked as an AI/ML Software Developer Intern in Bangalore, where he built a WhatsApp-based AI sales agent using Gemini and FastAPI.";

  if (q.includes('contact') || q.includes('email'))
    return "Reach him at jayeshvishwakarma6028@gmail.com — always open to AI and backend opportunities!";

  return "Interesting question! You can ask about his RAG pipelines, backend systems, or internship experience. 🤖";
};

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', href, onClick }) => {
  const baseStyle =
    "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer font-sans";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-lg",
    secondary: "bg-white text-black border border-gray-200 hover:bg-gray-50 hover:border-gray-400",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white/10",
    ghost: "bg-transparent text-gray-600 hover:text-black hover:bg-gray-100",
    darkOutline: "bg-gray-900 text-white border border-gray-700 hover:bg-black"
  };

  // 🔥 New-tab for all external links
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};


const Orb = ({ color, size, top, left, blur = "blur-3xl", delay = "0s" }) => (
  <div
    className={`absolute rounded-full opacity-40 pointer-events-none mix-blend-multiply animate-float ${blur}`}
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top: top,
      left: left,
      animationDelay: delay,
      zIndex: 0
    }}
  />
);

const OrbitLine = ({ width, height, top, left, rotate, opacity = 0.4, color = "#d1d5db" }) => (
  <div
    className="absolute rounded-[100%] border pointer-events-none"
    style={{
      width: width,
      height: height,
      top: top,
      left: left,
      transform: `rotate(${rotate})`,
      opacity: opacity,
      zIndex: 0,
      borderColor: color,
      borderWidth: '1px'
    }}
  />
);

const FeatureCard = ({ title, subtitle, description, tags = [], icon: Icon, imageGradient }) => (
  <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 p-8 h-full flex flex-col">
    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${imageGradient} opacity-10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700`}></div>

    <div className="mb-6 relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-serif font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider font-sans">{subtitle}</p>
    </div>

    <p className="text-gray-600 mb-6 relative z-10 leading-relaxed flex-grow font-sans">
      {description}
    </p>

    {tags && tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-sans">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="text-xl font-serif text-gray-800 group-hover:text-black transition-colors">
          {question}
        </span>
        <span className={`ml-4 p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-black text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
          <ChevronDown size={20} />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed font-sans">
          {answer}
        </p>
      </div>
    </div>
  );
};


// Compact Project Card — small square/rect with bullet points and inline stats
const CompactProjectCard = ({ title, role, bullets, stat, repoLink, demoLink, icon: Icon }) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/25 transition-all duration-300 flex flex-col group" style={{ background: 'rgba(255,255,255,0.04)' }}>
    <div className="p-5 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white leading-tight mb-0.5">{title}</h3>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide font-sans uppercase">{role}</span>
        </div>
        {Icon && <Icon size={16} className="text-white/30 mt-0.5 shrink-0" />}
      </div>

      {/* Bullet points */}
      <ul className="space-y-1 flex-1 mb-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="text-gray-500 text-[10px] mt-0.5 shrink-0">▸</span>
            <span className="text-gray-300 text-[11px] leading-relaxed font-sans">{b}</span>
          </li>
        ))}
      </ul>

      {/* Inline stat pill */}
      {stat && (
        <div className="mb-3">
          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
            {stat}
          </span>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-2 mt-auto">
        {demoLink && (
          <a href={demoLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-white text-black text-[10px] font-medium rounded-full hover:bg-gray-200 transition-colors font-sans">
            <PlayCircle size={10} /> Demo
          </a>
        )}
        {repoLink && (
          <a href={repoLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 text-white text-[10px] font-medium rounded-full hover:bg-white/20 transition-colors border border-white/20 font-sans">
            <Github size={10} /> Code
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- COMPACT EMBEDDED CHAT COMPONENT ---
const CompactChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey There 👋, I Am Jay's Assistant. Have A Chat!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const nextCount = userMessageCount + 1;
    setUserMessageCount(nextCount);

    if (nextCount >= 10) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "You can contact me on LinkedIn - @cmd-jayesh ✨\nI've hit my message limit because I'm saving tokens for recruiters 😅"
          }
        ]);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const history = messages.slice(-5);
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, userMessage] })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops! Something went wrong. Contact me on LinkedIn - @cmd-jayesh 😊"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow-xl overflow-hidden flex flex-col relative font-sans" style={{ height: '420px' }}>
      {/* Subtle background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url('/4M3Rmtye1aP2adi4PMKLsoYPxQ.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-gray-950/75"></div>
      </div>

      {/* Title bar */}
      <div className="bg-gray-900/90 px-3 py-2 border-b border-gray-700/60 flex items-center gap-2 relative z-10 backdrop-blur-md">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-gray-800 h-5 rounded border border-gray-700 flex items-center px-2 text-[9px] text-gray-400 font-mono">
          <span className="text-blue-400 mr-1">ai://</span>jayesh-bot
        </div>
        <div className="text-[9px] text-gray-500 font-mono">{userMessageCount}/10</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 custom-scrollbar relative z-10">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            {msg.role === 'assistant' && (
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mr-1.5 mt-0.5 shrink-0 border border-white/10">
                <Bot size={10} className="text-blue-300" />
              </div>
            )}
            <div className={`max-w-[85%] px-2.5 py-1.5 rounded-xl text-[11px] leading-relaxed backdrop-blur-md shadow-lg font-sans ${msg.role === 'user'
              ? 'bg-blue-600/90 text-white rounded-br-none border border-blue-400/30'
              : 'bg-white/10 text-white/90 rounded-bl-none border border-white/10'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mr-1.5 mt-0.5 border border-white/10">
              <Bot size={10} className="text-blue-300" />
            </div>
            <div className="bg-white/10 border border-white/10 px-3 py-2 rounded-xl rounded-bl-none flex gap-1 items-center backdrop-blur-md">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-white/10 bg-gray-900/80 backdrop-blur-xl relative z-10">
        <div className="flex gap-1.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={userMessageCount >= 10 ? "Limit reached." : "Ask me anything..."}
            disabled={isLoading || userMessageCount >= 10}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-[11px] focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || userMessageCount >= 10}
            className="p-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TYPING CURSOR HOOK ---
const useTypingCursor = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);
  return visible;
};



// --- EXPERIENCE DATA ---
const EXPERIENCES = [
  {
    tabLabel: "CommPlug Innovations",
    company: "CommPlug Innovations",
    role: "AI/ML Software Developer Intern",
    location: "Bangalore, India",
    date: "Sept 2025 - Dec 2025",
    bullets: [
      "Built an AI-powered B2B sales agent using Gemini API integrated with WhatsApp Business API for end-to-end order conversations.",
      "Implemented multi-tenant PostgreSQL system with Row-Level Security for strict data isolation.",
      "Designed async webhook handling using FastAPI and ThreadPoolExecutor with sub-2s response time.",
      "Improved system stability through automated testing and validation pipelines."
    ]
  },
  {
    tabLabel: "Education (MCA)",
    company: "Acropolis Institute",
    role: "Education: MCA",
    location: "Indore, India",
    date: "2022 - 2027",
    bullets: [
      "Integrated Master of Computer Applications (MCA) program.",
      "Focused on core CS: Data Structures, Algorithms, OOPs, DBMS, Operating Systems.",
      "Hands-on DSA: solved 150+ problems on LeetCode & other platforms."
    ]
  }
];

// --- SNAKE GAME OVERLAY MODE ---

const SnakeGameMode = ({ gameActive, setGameActive, score, setScore }) => {
  const [modalState, setModalState] = useState(null); // 'win' | 'lose' | null

  const canvasRef = useRef(null);
  const scoreRef = useRef(0);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const gameStateRef = useRef('idle'); // 'playing' | 'lost' | 'won' | 'idle'
  const snakeRef = useRef([]);
  const directionRef = useRef({ x: 0, y: 0 });
  const nextDirectionRef = useRef({ x: 0, y: 0 });
  const eggRef = useRef({ x: 0, y: 0 });
  const obstacleRectsRef = useRef([]);
  const growPendingRef = useRef(0);
  const animationFrameIdRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);

  const gridSize = 20;
  const updateInterval = 120; // snake tick interval in ms

  // Helpers
  const intersects = (rect1, rect2) => {
    return !(
      rect1.x + rect1.width <= rect2.x ||
      rect2.x + rect2.width <= rect1.x ||
      rect1.y + rect1.height <= rect2.y ||
      rect2.y + rect2.height <= rect1.y
    );
  };

  const intersectsWithMargin = (rect1, rect2, margin) => {
    return !(
      rect1.x + rect1.width <= rect2.x - margin ||
      rect2.x + rect2.width + margin <= rect1.x ||
      rect1.y + rect1.height <= rect2.y - margin ||
      rect2.y + rect2.height + margin <= rect1.y
    );
  };

  const getObstacleRects = () => {
    const elements = document.querySelectorAll('h1, h2, h3, p, span, li, a, img, button');
    const rects = [];
    elements.forEach((el) => {
      if (el.closest('.game-ui')) return;
      const rect = el.getBoundingClientRect();
      // Only treat elements visible in the viewport as obstacles
      if (rect.width > 5 && rect.height > 5 && rect.top < window.innerHeight && rect.left < window.innerWidth) {
        rects.push({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    });
    return rects;
  };

  const findSafeStartingPoint = (canvasWidth, canvasHeight, obstacleRects, gridSize) => {
    const cols = Math.floor(canvasWidth / gridSize);
    const rows = Math.floor(canvasHeight / gridSize);

    // Scan from top-left, but skip outer edges
    for (let r = 5; r < rows - 5; r++) {
      for (let c = 5; c < cols - 5; c++) {
        const x = c * gridSize;
        const y = r * gridSize;
        // Test a 3x1 block for starting snake
        const rect = { x, y, width: gridSize * 3, height: gridSize };

        let overlaps = false;
        for (const obs of obstacleRects) {
          if (intersects(rect, obs)) {
            overlaps = true;
            break;
          }
        }
        if (!overlaps) {
          return { x, y };
        }
      }
    }
    return { x: gridSize * 5, y: gridSize * 5 }; // Fallback
  };

  const spawnEgg = (canvasWidth, canvasHeight, obstacleRects, gridSize) => {
    const cols = Math.floor(canvasWidth / gridSize);
    const rows = Math.floor(canvasHeight / gridSize);
    let margin = gridSize * 2.5; // Start with a safe 50px buffer zone
    let attempts = 0;

    while (attempts < 1000) {
      const col = Math.floor(Math.random() * (cols - 2)) + 1;
      const row = Math.floor(Math.random() * (rows - 2)) + 1;
      const x = col * gridSize;
      const y = row * gridSize;
      const eggRect = { x, y, width: gridSize, height: gridSize };

      let overlaps = false;

      // Check collision with obstacles including the buffer zone
      for (const obs of obstacleRects) {
        if (intersectsWithMargin(eggRect, obs, margin)) {
          overlaps = true;
          break;
        }
      }

      // Check collision with snake
      if (!overlaps) {
        for (const segment of snakeRef.current) {
          if (segment.x === x && segment.y === y) {
            overlaps = true;
            break;
          }
        }
      }

      if (!overlaps) {
        return { x, y };
      }

      attempts++;
      // Dynamically shrink buffer if we struggle to find space
      if (attempts === 200) margin = gridSize * 1.5;
      if (attempts === 500) margin = gridSize;
      if (attempts === 800) margin = 0;
    }
    return { x: gridSize * 8, y: gridSize * 8 }; // Fallback
  };

  const startGame = () => {
    const rects = getObstacleRects();
    obstacleRectsRef.current = rects;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const startPoint = findSafeStartingPoint(width, height, rects, gridSize);

    snakeRef.current = [
      { x: startPoint.x, y: startPoint.y },
      { x: startPoint.x - gridSize, y: startPoint.y },
      { x: startPoint.x - gridSize * 2, y: startPoint.y },
    ];

    directionRef.current = { x: gridSize, y: 0 };
    nextDirectionRef.current = { x: gridSize, y: 0 };
    growPendingRef.current = 0;

    scoreRef.current = 0;
    setScore(0);
    setModalState(null);
    gameStateRef.current = 'playing';

    eggRef.current = spawnEgg(width, height, rects, gridSize);
    lastUpdateTimeRef.current = 0;
  };

  const gameOver = () => {
    gameStateRef.current = 'lost';
    setModalState('lose');
  };

  const gameWin = () => {
    gameStateRef.current = 'won';
    setModalState('win');
  };

  const checkEdgeCollision = (head, canvasWidth, canvasHeight, gridSize) => {
    return (
      head.x < 0 ||
      head.x + gridSize > canvasWidth ||
      head.y < 0 ||
      head.y + gridSize > canvasHeight
    );
  };

  const checkSelfCollision = (head, segments) => {
    for (let i = 1; i < segments.length; i++) {
      if (head.x === segments[i].x && head.y === segments[i].y) {
        return true;
      }
    }
    return false;
  };

  const checkObstacleCollision = (head, obstacleRects, gridSize) => {
    const headRect = { x: head.x, y: head.y, width: gridSize, height: gridSize };
    for (const obs of obstacleRects) {
      if (intersects(headRect, obs)) {
        return true;
      }
    }
    return false;
  };

  const updateSnake = () => {
    if (gameStateRef.current !== 'playing') return;

    directionRef.current = nextDirectionRef.current;
    const dir = directionRef.current;
    const snake = snakeRef.current;

    const head = {
      x: snake[0].x + dir.x,
      y: snake[0].y + dir.y,
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      checkEdgeCollision(head, width, height, gridSize) ||
      checkSelfCollision(head, snake) ||
      checkObstacleCollision(head, obstacleRectsRef.current, gridSize)
    ) {
      gameOver();
      return;
    }

    snake.unshift(head);

    const headRect = { x: head.x, y: head.y, width: gridSize, height: gridSize };
    const eggRect = { x: eggRef.current.x, y: eggRef.current.y, width: gridSize, height: gridSize };

    if (intersects(headRect, eggRect)) {
      const nextScore = scoreRef.current + 1;
      scoreRef.current = nextScore;
      setScore(nextScore);

      if (nextScore >= 5) {
        gameWin();
        return;
      }

      growPendingRef.current += 4; // Add 4 segments for exaggerated growth
      eggRef.current = spawnEgg(width, height, obstacleRectsRef.current, gridSize);
    } else {
      if (growPendingRef.current > 0) {
        growPendingRef.current--;
      } else {
        snake.pop();
      }
    }
  };

  const drawPixelatedEgg = (ctx, x, y, size, bobOffset) => {
    const pixelSize = size / 8;
    const drawPixel = (px, py, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x + px * pixelSize, y + py * pixelSize + bobOffset, pixelSize, pixelSize);
    };

    const eggPattern = [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 2, 2, 2, 2, 1, 0],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [0, 1, 2, 2, 2, 2, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0]
    ];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (eggPattern[r][c] === 1) {
          drawPixel(c, r, '#3f3f3f'); // shell border
        } else if (eggPattern[r][c] === 2) {
          if (c < 4 && r < 4) {
            drawPixel(c, r, '#ffeedd'); // bright highlights
          } else {
            drawPixel(c, r, '#e2cbbb'); // base egg color
          }
        }
      }
    }
  };

  const drawSnakeSegment = (ctx, x, y, index, dx, dy, timestamp, isTail) => {
    const size = 20;
    const pixelSize = size / 8;

    const drawPixel = (px, py, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x + px * pixelSize, y + py * pixelSize, pixelSize, pixelSize);
    };

    const green = '#10b981';
    const darkGreen = '#047857';
    const yellowGreen = '#34d399';
    const red = '#ef4444';
    const black = '#000000';
    const white = '#ffffff';

    if (index === 0) {
      const heading = dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';
      const headPattern = {
        up: [
          [0, 1, 1, 1, 1, 1, 1, 0],
          [1, 2, 2, 2, 2, 2, 2, 1],
          [1, 3, 4, 2, 2, 3, 4, 1],
          [1, 2, 2, 2, 2, 2, 2, 1],
          [1, 2, 5, 2, 2, 5, 2, 1],
          [1, 5, 2, 2, 5, 2, 5, 1],
          [1, 2, 2, 2, 2, 2, 2, 1],
          [0, 1, 1, 1, 1, 1, 1, 0]
        ],
        down: [
          [0, 1, 1, 1, 1, 1, 1, 0],
          [1, 2, 2, 2, 2, 2, 2, 1],
          [1, 5, 2, 2, 5, 2, 5, 1],
          [1, 2, 5, 2, 2, 5, 2, 1],
          [1, 2, 2, 2, 2, 2, 2, 1],
          [1, 3, 4, 2, 2, 3, 4, 1],
          [1, 2, 2, 2, 2, 2, 2, 1],
          [0, 1, 1, 1, 1, 1, 1, 0]
        ],
        left: [
          [0, 1, 1, 1, 1, 1, 1, 0],
          [1, 2, 3, 2, 2, 5, 2, 1],
          [1, 2, 4, 2, 5, 2, 5, 1],
          [1, 2, 2, 5, 2, 2, 2, 1],
          [1, 2, 2, 5, 2, 2, 2, 1],
          [1, 2, 4, 2, 5, 2, 5, 1],
          [1, 2, 3, 2, 2, 5, 2, 1],
          [0, 1, 1, 1, 1, 1, 1, 0]
        ],
        right: [
          [0, 1, 1, 1, 1, 1, 1, 0],
          [1, 2, 5, 2, 2, 3, 2, 1],
          [1, 5, 2, 5, 2, 4, 2, 1],
          [1, 2, 2, 2, 5, 2, 2, 1],
          [1, 2, 2, 2, 5, 2, 2, 1],
          [1, 5, 2, 5, 2, 4, 2, 1],
          [1, 2, 5, 2, 2, 3, 2, 1],
          [0, 1, 1, 1, 1, 1, 1, 0]
        ]
      };
      const pattern = headPattern[heading] || headPattern.right;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const val = pattern[r][c];
          if (val === 1) drawPixel(c, r, darkGreen);
          else if (val === 2) drawPixel(c, r, green);
          else if (val === 3) drawPixel(c, r, white);
          else if (val === 4) drawPixel(c, r, black);
          else if (val === 5) drawPixel(c, r, yellowGreen);
        }
      }
      const showTongue = Math.floor(timestamp / 200) % 2 === 0;
      if (showTongue) {
        if (heading === 'up') {
          ctx.fillStyle = red;
          ctx.fillRect(x + 3.5 * pixelSize, y - 2 * pixelSize, 1 * pixelSize, 2 * pixelSize);
          ctx.fillRect(x + 3 * pixelSize, y - 3 * pixelSize, 2 * pixelSize, 1 * pixelSize);
        } else if (heading === 'down') {
          ctx.fillStyle = red;
          ctx.fillRect(x + 3.5 * pixelSize, y + 8 * pixelSize, 1 * pixelSize, 2 * pixelSize);
          ctx.fillRect(x + 3 * pixelSize, y + 9 * pixelSize, 2 * pixelSize, 1 * pixelSize);
        } else if (heading === 'left') {
          ctx.fillStyle = red;
          ctx.fillRect(x - 2 * pixelSize, y + 3.5 * pixelSize, 2 * pixelSize, 1 * pixelSize);
          ctx.fillRect(x - 3 * pixelSize, y + 3 * pixelSize, 1 * pixelSize, 2 * pixelSize);
        } else if (heading === 'right') {
          ctx.fillStyle = red;
          ctx.fillRect(x + 8 * pixelSize, y + 3.5 * pixelSize, 2 * pixelSize, 1 * pixelSize);
          ctx.fillRect(x + 9 * pixelSize, y + 3 * pixelSize, 1 * pixelSize, 2 * pixelSize);
        }
      }
    } else if (isTail) {
      const tailPattern = [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 1, 2, 5, 5, 2, 1, 0],
        [0, 1, 5, 2, 2, 5, 1, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const val = tailPattern[r][c];
          if (val === 1) drawPixel(c, r, darkGreen);
          else if (val === 2) drawPixel(c, r, green);
          else if (val === 5) drawPixel(c, r, yellowGreen);
        }
      }
    } else {
      const patternStyle = index % 2 === 0;
      const bodyPattern = patternStyle ? [
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 2, 2, 5, 2, 2, 2, 1],
        [1, 2, 5, 2, 5, 2, 2, 1],
        [1, 5, 2, 2, 2, 5, 2, 1],
        [1, 2, 2, 2, 5, 2, 5, 1],
        [1, 2, 2, 5, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [0, 1, 1, 1, 1, 1, 1, 0]
      ] : [
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 5, 2, 5, 1],
        [1, 2, 2, 5, 2, 2, 2, 1],
        [1, 5, 2, 2, 2, 5, 2, 1],
        [1, 2, 5, 2, 5, 2, 2, 1],
        [1, 2, 2, 5, 2, 2, 2, 1],
        [0, 1, 1, 1, 1, 1, 1, 0]
      ];
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const val = bodyPattern[r][c];
          if (val === 1) drawPixel(c, r, darkGreen);
          else if (val === 2) drawPixel(c, r, green);
          else if (val === 5) drawPixel(c, r, yellowGreen);
        }
      }
    }
  };

  const drawSnake = (ctx, segments, gridSize, timestamp) => {
    segments.forEach((seg, index) => {
      let dx = 0;
      let dy = 0;
      if (index === 0) {
        dx = directionRef.current.x;
        dy = directionRef.current.y;
      } else {
        const prev = segments[index - 1];
        dx = prev.x - seg.x;
        dy = prev.y - seg.y;
      }

      const isHead = index === 0;
      const waveAmplitude = isHead ? 1.0 : 4.0;
      const waveFreq = 0.012;
      const wavePhase = index * 0.75;

      let offsetX = 0;
      let offsetY = 0;

      if (dy === 0) {
        offsetY = Math.sin(timestamp * waveFreq - wavePhase) * waveAmplitude;
      } else {
        offsetX = Math.sin(timestamp * waveFreq - wavePhase) * waveAmplitude;
      }

      const isTail = index === segments.length - 1;
      drawSnakeSegment(ctx, seg.x + offsetX, seg.y + offsetY, index, dx, dy, timestamp, isTail);
    });
  };

  const drawObstacles = (ctx, rects) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.02)';
    rects.forEach((rect) => {
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
    ctx.restore();
  };

  // Scroll lock effect
  useEffect(() => {
    if (gameActive) {
      document.body.style.overflow = 'hidden';
      startGame();
    } else {
      document.body.style.overflow = '';
      setModalState(null);
      gameStateRef.current = 'idle';
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [gameActive]);

  // Keys effect
  useEffect(() => {
    if (!gameActive) return;

    const handleKeyDown = (e) => {
      if (gameStateRef.current !== 'playing') return;

      let newDir = null;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current.y === 0) newDir = { x: 0, y: -gridSize };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current.y === 0) newDir = { x: 0, y: gridSize };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current.x === 0) newDir = { x: -gridSize, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current.x === 0) newDir = { x: gridSize, y: 0 };
          break;
      }

      if (newDir) {
        e.preventDefault();
        nextDirectionRef.current = newDir;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);

  // Main rendering loop
  useEffect(() => {
    if (!gameActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const loop = (timestamp) => {
      if (gameStateRef.current !== 'playing') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawObstacles(ctx, obstacleRectsRef.current);
        drawSnake(ctx, snakeRef.current, gridSize, timestamp);
        const bob = Math.sin(timestamp * 0.005) * 4;
        drawPixelatedEgg(ctx, eggRef.current.x, eggRef.current.y, gridSize, bob);
        animationFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!lastUpdateTimeRef.current) lastUpdateTimeRef.current = timestamp;
      const elapsed = timestamp - lastUpdateTimeRef.current;

      if (elapsed >= updateInterval) {
        updateSnake();
        lastUpdateTimeRef.current = timestamp;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawObstacles(ctx, obstacleRectsRef.current);
      drawSnake(ctx, snakeRef.current, gridSize, timestamp);
      const bob = Math.sin(timestamp * 0.005) * 4;
      drawPixelatedEgg(ctx, eggRef.current.x, eggRef.current.y, gridSize, bob);

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [gameActive]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (gameActive && gameStateRef.current === 'playing') {
          obstacleRectsRef.current = getObstacleRects();
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gameActive]);

  return (
    <>
      {/* Full screen canvas overlay */}
      {gameActive && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 45,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Win / Loss Modals */}
      {modalState && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none game-ui bg-black/25 backdrop-blur-sm">
          <div className="bg-white/95 border border-gray-200 rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center pointer-events-auto animate-fade-in-up">
            {modalState === 'win' ? (
              <>
                <h3 className="text-xl font-serif text-emerald-600 mb-2 font-bold">🎉 Victory!</h3>
                <p className="text-sm text-gray-500 font-sans mb-4">You slithered through and gathered all 5 eggs successfully!</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-serif text-red-600 mb-2 font-bold">💥 Game Over</h3>
                <p className="text-sm text-gray-500 font-sans mb-4">Oops! You collided with a text block or edge.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="w-full bg-black text-white hover:bg-gray-800 transition-all rounded-full py-2.5 text-sm font-sans font-medium cursor-pointer shadow-md"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(-1);
  const [activeExperienceTab, setActiveExperienceTab] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorVisible = useTypingCursor();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showMobileWarning) {
      const timer = setTimeout(() => {
        setShowMobileWarning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMobileWarning]);

  const toggleGameMode = () => {
    if (window.innerWidth < 1024) {
      setShowMobileWarning(true);
      return;
    }
    setGameActive(!gameActive);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans overflow-x-hidden selection:bg-black selection:text-white relative">

      {/* --- Background Orbital Lines --- */}
      <div className="absolute top-0 left-0 w-full h-[150vh] overflow-hidden pointer-events-none z-0">
        <OrbitLine width="120vw" height="120vh" top="-50%" left="-10%" rotate="15deg" opacity={0.5} color="#FDBA74" />
        <OrbitLine width="100vw" height="100vh" top="10%" left="20%" rotate="-10deg" opacity={0.4} color="#22D3EE" />
        <OrbitLine width="80vw" height="80vh" top="40%" left="-20%" rotate="25deg" opacity={0.4} color="#A78BFA" />
      </div>

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">J</div>
            <span className="font-medium tracking-tight text-lg font-sans">Jayesh.</span>

            {/* Game mode toggle */}
            <button
              onClick={toggleGameMode}
              className="glass-ui ml-2.5 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider font-sans transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${gameActive
                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] scale-110 animate-pulse'
                : 'bg-emerald-950/60 border border-emerald-500/20'
                }`}></span>
              <span>Game Mode: {gameActive ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 md:gap-8 text-sm font-medium text-gray-600 font-sans">
            {gameActive && (
              <div className="glass-ui font-mono text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none mr-2">
                {score}/5
              </div>
            )}
            <button onClick={() => scrollToSection('experience')} className="hover:text-black transition-colors">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-black transition-colors">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-black transition-colors">Skills</button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            {gameActive && (
              <div className="glass-ui font-mono text-xs font-semibold px-2 py-0.5 rounded-full shadow-md select-none">
                {score}/5
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-full border border-gray-200/50 bg-white/50 backdrop-blur-sm text-gray-600 hover:text-black transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Slide from left) */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        {/* Backdrop overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Drawer content panel */}
        <div className={`absolute top-0 left-0 bottom-0 w-[260px] bg-white/95 backdrop-blur-md border-r border-gray-100 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div>
            {/* Header branding & close button */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">J</div>
                <span className="font-semibold tracking-tight text-base font-sans">Jayesh.</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-4 text-base font-medium font-sans">
              <button
                onClick={() => {
                  scrollToSection('experience');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2.5 px-4 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-black transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => {
                  scrollToSection('projects');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2.5 px-4 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-black transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => {
                  scrollToSection('skills');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2.5 px-4 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-black transition-colors"
              >
                Skills
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-[10px] text-gray-400 font-sans text-center">© {new Date().getFullYear()} Jayesh Vishwakarma</p>
          </div>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <header className="relative pt-40 pb-10 px-6">
        <Orb color="#C4B5FD" size="400px" top="-100px" left="-100px" delay="0s" />
        <Orb color="#FDBA74" size="300px" top="20%" left="80%" delay="2s" />
        <Orb color="#67E8F9" size="250px" top="60%" left="10%" delay="4s" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="max-w-4xl mb-16 mx-auto text-center">

            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-5 leading-tight tracking-tight flex items-center gap-2 flex-wrap justify-center">
              Hey,&nbsp;
              <span style={{ color: '#6366f1' }}>Jayesh</span>
              &nbsp;here
              <span
                className="inline-block w-[3px] h-[1em] ml-1 align-middle rounded-sm"
                style={{
                  backgroundColor: '#6366f1',
                  opacity: cursorVisible ? 1 : 0,
                  transition: 'opacity 0.1s',
                  verticalAlign: 'middle',
                }}
              />
            </h1>

            <p className="text-sm text-gray-500 mb-10 leading-relaxed font-sans max-w-2xl text-center mx-auto">
              AI Application Developer specializing in Artificial Intelligence, Backend and Machine Learning and make strange little projects at the intersection of tech and art by night.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button href="mailto:jayeshvishwakarma6028@gmail.com">
                <Mail size={18} /> Say Hi
              </Button>
              <Button variant="ghost" href="https://github.com/jayesh-cmd" className="gap-2">
                <Github size={18} /> GitHub
              </Button>
            </div>
          </div>

          {/* ---- About Me Section (influencer-style, full width) ---- */}
          <div id="about" className="w-full mb-12">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-12">

              {/* Left: text content */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-indigo-500 font-mono tracking-widest uppercase font-semibold">/ about me</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 leading-snug">
                  I build <span className="text-indigo-500 italic">AI systems</span> that actually work in the real world.
                </h2>

                <p className="text-gray-600 leading-relaxed text-base font-sans">
                  I'm a final-year student and fresher AI/Backend engineer. I specialise in building RAG pipelines, LLM-powered APIs, and intelligent agents using <span className="">Python, FastAPI, and LangChain</span>.
                </p>


                {/* Tech list */}
                <div className="pt-2">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-sans font-medium">Technologies I work with</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                    {['Python', 'FastAPI', 'LangChain', 'RAG Systems', 'PostgreSQL / VectorDB', 'Docker & GCP'].map((tech) => (
                      <div key={tech} className="flex items-center gap-2">
                        <span className="text-indigo-400 text-xs">▸</span>
                        <span className="text-gray-700 text-sm font-sans">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-500 text-sm font-sans italic border-l-2 border-indigo-300 pl-3">
                  By night, I build strange little side-projects at the intersection of tech and art,  because why not?
                </p>
              </div>

              {/* Right: photo */}
              <div className="flex-shrink-0 flex justify-center">
                <div className="relative">
                  {/* Glow behind */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300 to-purple-300 rounded-2xl opacity-30 blur-2xl scale-110"></div>
                  {/* Avatar box */}
                  <div className="relative w-52 h-64 md:w-60 md:h-72 rounded-2xl overflow-hidden border-2 border-white shadow-2xl bg-gray-100">
                    <img
                      src="/IMG_8556.jpg"
                      alt="Jayesh Vishwakarma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ---- Chat Section: side-by-side layout ---- */}
          <div className="w-full mb-4">
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Left: fancy heading */}
              <div className="flex-1 space-y-3">
                <p className="text-xs text-indigo-500 font-mono tracking-widest uppercase font-semibold">/ AI Chatbot</p>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 leading-snug">
                  Chat with
                  <br />
                  <span className="text-indigo-500 italic">Me</span>
                </h2>
                <p className="text-gray-500 text-sm font-sans leading-relaxed max-w-xs">
                  Ask me anything about my work, projects, or skills.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-sans">Online  </span>
                </div>
              </div>

              {/* Right: compact chat box */}
              <div className="w-full md:w-1/2">
                <CompactChat />
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* --- Experience Section --- */}
      <section id="experience" className="pt-20 pb-32 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 flex items-center gap-4">
              <span className="text-indigo-500 font-mono text-2xl md:text-3xl">/</span> experience
              <div className="h-[1px] bg-gray-200 flex-1 ml-4 hidden md:block"></div>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-10 min-h-[320px]">
            {/* Tab navigation list */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-gray-200 shrink-0 scrollbar-none pb-2 md:pb-0">
              {EXPERIENCES.map((exp, idx) => {
                const isActive = activeExperienceTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveExperienceTab(idx)}
                    className={`px-5 py-3 text-left font-sans text-sm font-medium transition-all duration-300 relative whitespace-nowrap md:w-56
                      ${isActive ? 'text-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/50'}`}
                  >
                    {/* Indicator line for active tab */}
                    {isActive && (
                      <span
                        className="absolute bg-indigo-600 transition-all duration-300
                          bottom-0 left-0 right-0 h-[2px] 
                          md:top-0 md:bottom-0 md:left-0 md:w-[2px] md:h-full"
                      />
                    )}
                    {exp.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Tab content panel */}
            <div className="flex-1 min-h-[250px]">
              {(() => {
                const exp = EXPERIENCES[activeExperienceTab];
                return (
                  <div key={activeExperienceTab} className="animate-fade-in duration-300">
                    <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-1">
                      {exp.role} <span className="text-indigo-600 font-sans font-medium text-lg">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-505 mb-6 text-gray-500">
                      {exp.date} &nbsp;·&nbsp; {exp.location}
                    </p>

                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed font-sans">
                          <svg className="w-3 h-3 text-indigo-500 mt-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="bg-gray-950 py-24 px-6 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                Projects{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-400">
                  I Have Worked On
                </span>
              </h2>
              <p className="text-gray-400 text-sm font-sans">
                Check github for more cool exciting projects
              </p>
            </div>
            <Button variant="outline" href="https://github.com/jayesh-cmd">
              GitHub <ExternalLink size={14} />
            </Button>
          </div>

          {/* Single row of 3 compact project cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* 1. FoodPilot */}
            <CompactProjectCard
              title="FoodPilot"
              role="AI Concierge · MCP"
              icon={Bot}
              gradient="from-blue-500 to-indigo-600"
              stat="-90% token cost · Claude"
              bullets={[
                "Autonomously orchestrates Swiggy's food-ordering tools via MCP",
                "Implemented Anthropic prompt caching on a 12K-token schema",
                "Encrypted OAuth token storage & optimized SSE token streaming",
              ]}
              repoLink="https://github.com/jayesh-cmd/swiggy_foodpilot"
              demoLink="https://lnkd.in/p/gbggJFgA"
            />

            {/* 2. InsightLense */}
            <CompactProjectCard
              title="InsightLense"
              role="Multimodal RAG · FastAPI"
              icon={Layers}
              gradient="from-blue-500 to-indigo-600"
              stat="95% accuracy · BM25 + FAISS"
              bullets={[
                "Parses complex PDFs: charts, tables, and text",
                "Hybrid retrieval (BM25 + FAISS) for better accuracy",
                "Session persistence for long research conversations",
              ]}
              repoLink="https://github.com/jayesh-cmd/InsightLense-Research_Document"
              demoLink="https://www.linkedin.com/posts/cmd-jayesh_generativeai-langchain-softwareengineering-activity-7403148694578958338-1Fj7/"
            />

            {/* 3. Fraud Detection */}
            <CompactProjectCard
              title="FinSecure AI"
              role="XGBoost · FastAPI · GPT-3.5"
              icon={Zap}
              gradient="from-blue-500 to-indigo-600"
              stat="0.9998 AUC · &lt;100ms · 6.3M+ txns"
              bullets={[
                "Fraud detection trained on 6.3M+ transactions",
                "Engineered behavioral fraud features for high recall",
                "GPT-3.5 integrated for explainable fraud reports",
              ]}
              repoLink="https://github.com/jayesh-cmd/FinSecure-AI"
              demoLink="https://www.linkedin.com/posts/cmd-jayesh_machinelearning-frauddetection-ai-activity-7385927884600737792-4lgX/"
            />

          </div>
        </div>
      </section>

      {/* --- Skills / FAQ Section --- */}
      <section id="skills" className="py-32 px-6 bg-white relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Technical Arsenal</h2>
            <p className="text-gray-500 font-sans">The tools and frameworks I use to build intelligent systems.</p>
          </div>

          <div className="border-t border-gray-200">
            <AccordionItem
              question="What is my core AI & Backend stack?"
              answer="My stack is centered around AI and backend development using Python. I build LLM-powered systems with RAG pipelines, LangChain, and modern AI APIs, and develop scalable backends using FastAPI, async processing, and PostgreSQL, focusing on performance, reliability, and production-ready deployments."
              isOpen={openAccordion === 0}
              onClick={() => setOpenAccordion(0 === openAccordion ? -1 : 0)}
            />
            <AccordionItem
              question="How do I handle Generative AI & LLMs?"
              answer="I work with Generative AI by building RAG pipelines, integrating LLMs like Gemini, GPT-3.5, and LLaMA into applications using LangChain. I focus on prompt engineering, context management, and retrieval optimization to deliver accurate, reliable, and production-ready AI systems."
              onClick={() => setOpenAccordion(1 === openAccordion ? -1 : 1)}
            />
            <AccordionItem
              question="What about Backend & Deployment?"
              answer="My backend and deployment stack is built around FastAPI for high-performance async APIs, PostgreSQL for reliable data management, and Docker for containerization. I deploy on GCP (Cloud Run, Vertex AI), focusing on scalability, low-latency performance, and production-ready systems."
              isOpen={openAccordion === 2}
              onClick={() => setOpenAccordion(2 === openAccordion ? -1 : 2)}
            />
            <AccordionItem
              question="Languages & Tools?"
              answer="Python is my primary language, with SQL for data handling and querying. I use Git/GitHub for version control, VS Code for development, and Jupyter/Colab for rapid experimentation and prototyping."
              onClick={() => setOpenAccordion(3 === openAccordion ? -1 : 3)}
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white pt-12 pb-8 px-6 relative overflow-hidden z-10">
        <Orb color="#4C1D95" size="300px" top="0" left="0" blur="blur-[100px]" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-center md:text-left">
              Reach out to me
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="mailto:jayeshvishwakarma6028@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-sans"
              >
                <Mail size={16} /> jayeshvishwakarma6028@gmail.com
              </a>

              <div className="flex gap-3 justify-center">
                <a href="https://www.linkedin.com/in/cmd-jayesh/" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/jayesh-cmd" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://www.instagram.com/jeyy.sh/" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://youtube.com/@jey_script?si=uSQYH8HbgonKvXnL" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" target="_blank" rel="noopener noreferrer" title="YouTube">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-center text-gray-400 text-xs gap-1 text-center">
            <p>Created By Jayesh Vishwakarma</p>
            <p>All right reserved ⓒ</p>
          </div>
        </div>
      </footer>

      <SnakeGameMode gameActive={gameActive} setGameActive={setGameActive} score={score} setScore={setScore} />

      {showMobileWarning && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up pointer-events-none">
          <div className="glass-ui bg-white/95 border border-amber-200 text-amber-900 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 font-medium text-xs font-sans tracking-wide">
            <span>⚠️ Game Mode is only available on Laptop or PC</span>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        :root {
          --font-sans: 'Inter', sans-serif;
          --font-serif: 'Playfair Display', serif;
        }

        html, body {
          background: linear-gradient(to bottom, #FAFAFA 50%, #111827 50%) no-repeat fixed;
        }

        body {
          font-family: var(--font-sans);
        }

        .glass-ui {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(107, 114, 128, 0.3);
          color: #4b5563;
        }
        .glass-ui:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #1f2937;
          border-color: rgba(107, 114, 128, 0.5);
        }

        .font-serif {
          font-family: var(--font-serif);
        }

        .font-sans {
          font-family: var(--font-sans);
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }

        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
          100% { transform: translate(0, 0); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-fade-in {
            animation: fadeIn 1s ease-out;
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Hide scrollbars for overflow-x tabs */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;

          }
      `}</style>
    </div>
  );
}