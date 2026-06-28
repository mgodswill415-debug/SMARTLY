import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

const SYSTEM_PROMPT = `You are SMARTLY, an AI tutor for secondary school students preparing for exams.

RULES:
1. Explain topics using the student's interest as the central analogy
2. Connect every concept to their dream career
3. Return ONLY valid JSON — no markdown, no extra text
4. Use simple language, relevant context where applicable
5. Include exactly 3 quiz questions
6. Mention the student by name in the analogy
7. Tailor content depth and style to the student's specific exam board (WAEC, JAMB, GCSE, SAT, AP, CBSE, etc.)
8. Focus on topics and question styles commonly seen in the student's exam

JSON FORMAT:
{
  "subject": "Subject name",
  "topic": "topic name",
  "lesson": {
    "definition": "2-3 simple sentences",
    "interestHook": "1 paragraph analogy using student's interest. Mention student by name.",
    "careerApplication": "1 paragraph connecting to dream career"
  },
  "quiz": [
    {"question": "...", "options": ["A","B","C","D"], "answer": "exact correct option"},
    {"question": "...", "options": ["A","B","C","D"], "answer": "exact correct option"},
    {"question": "...", "options": ["A","B","C","D"], "answer": "exact correct option"}
  ],
  "nextLesson": {"topic": "...", "reason": "why this matters"}
}`;

function detectSubject(topic: string): string {
  const t = topic.toLowerCase();
  const subjectMap: [string[], string][] = [
    [['photosynthesis', 'cell', 'dna', 'genetics', 'ecology', 'osmosis', 'digestion', 'excretion', 'respiration', 'reproduction', 'organism', 'tissue', 'organ'], 'Biology'],
    [['newton', 'velocity', 'acceleration', 'force', 'energy', 'wave', 'light', 'electricity', 'magnet', 'heat', 'lens', 'circuit', 'pressure', 'density'], 'Physics'],
    [['atom', 'molecule', 'chemical', 'bond', 'acid', 'base', 'salt', 'periodic', 'element', 'reaction', 'oxidation', 'equilibrium', 'mole'], 'Chemistry'],
    [['quadratic', 'equation', 'algebra', 'calculus', 'trigonometry', 'geometry', 'matrix', 'statistics', 'probability', 'differentiation', 'integration', 'logarithm', 'polynomial', 'set theory'], 'Mathematics'],
    [['essay', 'comprehension', 'grammar', 'vocabulary', 'literature', 'figure of speech', 'noun', 'verb', 'clause', 'summary', 'oral english', 'phonetics'], 'English Language'],
    [['government', 'constitution', 'democracy', 'legislature', 'executive', 'judiciary', 'political', 'election', 'federalism', 'civil society', 'rule of law'], 'Government'],
    [['economics', 'demand', 'supply', 'inflation', 'gdp', 'market', 'trade', 'budget', 'tax', 'monopoly', 'oligopoly', 'production'], 'Economics'],
    [['history', 'colonial', 'independence', 'nationalism', 'civil war', 'slave trade', 'nigerian history', 'pre-colonial', 'world war'], 'History'],
    [['geography', 'climate', 'erosion', 'population', 'map', 'region', 'vegetation', 'weather', 'soil', 'mineral', 'environment'], 'Geography'],
    [['christian', 'islamic', 'religious', 'bible', 'quran', 'moral', 'sin', 'prayer', 'worship'], 'Christian Religious Knowledge'],
  ];
  for (const [keywords, subject] of subjectMap) {
    if (keywords.some(k => t.includes(k))) return subject;
  }
  return 'General Studies';
}

function getMockResponse(topic: string, interest: string, career: string, name: string) {
  const subject = detectSubject(topic);

  return {
    subject,
    topic,
    lesson: {
      definition: `${topic} is a key concept in ${subject} that involves understanding the fundamental principles, rules, and applications related to this area. Mastering it helps build a strong foundation for advanced topics in the subject. It is frequently tested in WAEC and JAMB examinations.`,
      interestHook: `Think of ${topic.toLowerCase()}, ${name}, like a strategy in your favorite ${interest.toLowerCase()} — every move has a purpose and builds toward something bigger. Just like in ${interest.toLowerCase()}, understanding the basics of ${topic.toLowerCase()} gives you the tools to tackle more complex challenges. The more you practice, the better you get at spotting patterns and making the right decisions.`,
      careerApplication: `As a future ${career.toLowerCase()}, understanding ${topic.toLowerCase()} gives you an edge. ${career.charAt(0).toUpperCase() + career.slice(1)}s need strong analytical thinking and problem-solving skills — exactly what studying ${topic.toLowerCase()} develops. Whether you're analyzing data, making decisions, or solving real-world problems, these skills will set you apart.`,
    },
    quiz: [
      {
        question: `Which of the following best describes ${topic.toLowerCase()}?`,
        options: ['A concept unrelated to any subject', 'A fundamental principle in its field of study', 'An outdated theory no longer relevant', 'A topic only studied at university level'],
        answer: 'A fundamental principle in its field of study',
      },
      {
        question: `Why is ${topic.toLowerCase()} important for WAEC and JAMB preparation?`,
        options: ['It is never tested', 'It appears frequently in past questions and builds foundational knowledge', 'It is only useful for practical exams', 'It was recently removed from the syllabus'],
        answer: 'It appears frequently in past questions and builds foundational knowledge',
      },
      {
        question: `What is the best way to master ${topic.toLowerCase()}?`,
        options: ['Memorize everything without understanding', 'Skip it and focus on easier topics', 'Understand the principles and practice with past questions', 'Only read about it the night before the exam'],
        answer: 'Understand the principles and practice with past questions',
      },
    ],
    nextLesson: {
      topic: `Advanced ${topic}`,
      reason: `As a future ${career.toLowerCase()}, going deeper into ${topic.toLowerCase()} will strengthen the analytical skills you need. Advanced topics build on what you've learned and open up more real-world applications.`,
    },
  };
}

// Model cascade: DeepSeek (fast) → GLM-4.5-Air (user requested) → Nemotron (free) → mock
// Fast models first to minimize latency
const MODELS = [
  { id: 'deepseek/deepseek-chat', maxTokens: 2048, timeout: 30, useJsonFormat: false },
  { id: 'z-ai/glm-4.5-air', maxTokens: 8000, timeout: 30, useJsonFormat: true },
  { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', maxTokens: 2048, timeout: 45, useJsonFormat: true },
];

async function tryModel(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  timeoutSec: number,
  useJsonFormat: boolean,
): Promise<Record<string, unknown> | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutSec * 1000);

  try {
    const body: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: maxTokens,
    };
    // Only some models support response_format
    if (useJsonFormat) {
      body.response_format = { type: 'json_object' };
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Model ${model} failed (${response.status}):`, errText.slice(0, 200));
      return null;
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    // Strip markdown code blocks if model didn't use response_format
    content = content.trim().replace(/^```json?\s*/, '').replace(/```\s*$/, '');

    const parsed = JSON.parse(content);

    // Validate it has the required structure
    if (!parsed.subject || !parsed.lesson || !Array.isArray(parsed.quiz) || parsed.quiz.length < 1) {
      console.error(`Model ${model} returned incomplete JSON`);
      return null;
    }

    console.log(`Success with model: ${model}`);
    return parsed;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('abort')) {
      console.error(`Model ${model} timed out after ${timeoutSec}s`);
    } else {
      console.error(`Model ${model} error:`, msg);
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, interest, career, name, curriculum } = body;

    if (!topic || !interest || !career || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, interest, career, name' },
        { status: 400 }
      );
    }

    const examContext = curriculum 
      ? `Exam Board: ${curriculum}` 
      : 'Exam Board: WAEC (SS3)';

    const userPrompt = `Generate a personalized lesson for a secondary school student.
${examContext}
Student's name: ${name}
Interest/Hobby: ${interest}
Dream Career: ${career}
Topic they want to learn: ${topic}

Remember: Use ${interest} as the central analogy for explaining ${topic}. Connect it to becoming a ${career}. Mention ${name} by name in the analogy. Include exactly 3 quiz questions. Tailor content to the ${examContext} syllabus and question style.`;

    // Try each model in cascade
    for (const m of MODELS) {
      const result = await tryModel(m.id, SYSTEM_PROMPT, userPrompt, m.maxTokens, m.timeout, m.useJsonFormat);
      if (result) return NextResponse.json(result);
    }

    // Fallback to mock response
    console.log('All models failed, using mock response');
    const mockResponse = getMockResponse(topic, interest, career, name);
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Generate lesson error:', error);
    return NextResponse.json(
      { error: 'Failed to generate lesson' },
      { status: 500 }
    );
  }
}