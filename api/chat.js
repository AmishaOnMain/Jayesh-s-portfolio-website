export const config = {
  runtime: 'edge',
  maxDuration: 30, // Increase timeout to 30 seconds
};

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

export default async function handler(req) {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: { message: 'Method not allowed' } }), 
      {
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error('API Key missing');
      throw new Error('GROQ_API_KEY not configured');
    }

    // Format messages
    const formattedMessages = [
      {
        role: 'system',
        content: RESUME_CONTEXT
      },
      ...messages.slice(-5)
    ];

    console.log('Sending request to Groq API...');

    // Add timeout to fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 800, // Reduced for faster response
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      
      // Handle specific errors
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check configuration.');
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success! Got response from Groq');

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      }
    );

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Better error messages
    let errorMessage = 'Something went wrong. Please try again.';
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timeout. Please try again.';
    } else if (error.message.includes('Rate limit')) {
      errorMessage = error.message;
    } else if (error.message.includes('API key')) {
      errorMessage = 'Configuration error. Please contact support.';
    }

    return new Response(
      JSON.stringify({
        error: {
          message: errorMessage,
        },
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}