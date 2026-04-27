import type { DayData, Task } from './types';

const JP_TYPES = [
  { tag: 'Vocabulary',  desc: 'N5 word lists & flashcards' },
  { tag: 'Grammar',     desc: 'Verb conjugation — godan/ichidan, て-form, negative forms' },
  { tag: 'Listening',   desc: 'Shadowing & simple conversations (30–45 min)' },
  { tag: 'Kanji',       desc: 'Radicals & N5 kanji writing practice' },
];

function jp(day: number): Task {
  const t = JP_TYPES[(day - 1) % 4];
  return {
    id: `d${day}-jp`,
    title: `Japanese — ${t.tag}`,
    desc: t.desc,
    track: 'japanese',
    timeBlock: 'morning',
  };
}

export const DAYS: DayData[] = [
  {
    day: 1, date: '2026-04-28', label: 'Apr 28 · Mon',
    tasks: [
      jp(1),
      {
        id: 'd1-fit', title: 'Bodyweight Session (indoors, AC)',
        desc: 'Push-ups 4×15 · Diamond push-ups · Squats + Lunges 4×15 · Plank 3×45s · Pike push-ups 3×10 · Core circuit 3 rounds',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd1-road', title: 'Life Roadmap S1 — Where Am I Now?',
        desc: 'Write current state: career, finances, relationships, health, location, happiness (1–10). What\'s working / not. Thailand trip reflection. Japan social isolation analysis.',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd1-rest', title: 'Settle in — decompress',
        desc: 'No agenda. Family time. Let the transition land.',
        track: 'reflection', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 2, date: '2026-04-29', label: 'Apr 29 · Tue',
    tasks: [
      jp(2),
      {
        id: 'd2-fit', title: 'Sukhna Lake Run — 3–4km easy (Z2)',
        desc: '5:00–6:00am · ~6:30–7:00/km pace · Beat the heat',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd2-road', title: 'Life Roadmap S1 cont. — Finish assessment',
        desc: 'Complete the honest state-of-life write-up. 1-page summary.',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd2-nonneg', title: 'NRE/NRO Account Research',
        track: 'nonneg', timeBlock: 'afternoon',
        subtasks: [
          { id: 'd2-nonneg-s1', title: 'Research NRE vs NRO differences — which do you need?' },
          { id: 'd2-nonneg-s2', title: 'Compare Axis vs ICICI NRI account features' },
          { id: 'd2-nonneg-s3', title: 'List documents needed for bank visit' },
        ],
      },
    ],
  },
  {
    day: 3, date: '2026-04-30', label: 'Apr 30 · Wed',
    tasks: [
      jp(3),
      {
        id: 'd3-fit', title: 'Bodyweight Session (indoors, AC)',
        desc: 'Push-ups 4×15 · Pull-ups / Australian rows 4×8–12 · Squats + Lunges 4×15 · Plank 3×45s · Core circuit',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd3-nonneg', title: 'Bank Visit — NRE/NRO (morning, before heat)',
        desc: 'Bring: passport, visa, PAN card.',
        track: 'nonneg', timeBlock: 'morning',
        subtasks: [
          { id: 'd3-nonneg-s1', title: 'Visit branch (Axis or ICICI)' },
          { id: 'd3-nonneg-s2', title: 'Complete NRE/NRO paperwork' },
          { id: 'd3-nonneg-s3', title: 'Decision: consolidate to one bank or keep both' },
        ],
      },
      {
        id: 'd3-ai', title: 'AI Research #1 — Landscape 2026',
        desc: 'What\'s actually shipping vs hype? Map real opportunities: AI agents, developer tools, accessibility + AI, vertical SaaS + AI.',
        track: 'ai', timeBlock: 'midday',
      },
      {
        id: 'd3-bro', title: 'Brother Session 1 — Listen & Map',
        desc: 'What does he do? What does he hate? What energizes him? Skills inventory. No advice yet — deep listening only.',
        track: 'brother', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 4, date: '2026-05-01', label: 'May 1 · Thu',
    tasks: [
      jp(4),
      {
        id: 'd4-fit', title: 'Sukhna Lake Run — 3–4km easy (Z2)',
        desc: '5:00–6:00am · Z2 heart rate, consistent pace',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd4-road', title: 'Life Roadmap S2 — What Do I Want?',
        desc: 'Imagine life at 35: where, what work, who\'s around? Family vs freedom tension. Stay in Japan? Write "letter from 35-year-old me".',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd4-nonneg', title: 'International Driving Permit Research',
        track: 'nonneg', timeBlock: 'afternoon',
        subtasks: [
          { id: 'd4-nonneg-s1', title: 'Which IDP does Japan accept? (Geneva vs Vienna convention)' },
          { id: 'd4-nonneg-s2', title: 'Find issuing authority in Chandigarh (RTO or AAI)' },
          { id: 'd4-nonneg-s3', title: 'Compile required documents list' },
        ],
      },
    ],
  },
  {
    day: 5, date: '2026-05-02', label: 'May 2 · Fri',
    tasks: [
      jp(5),
      {
        id: 'd5-fit', title: 'Bodyweight Session (indoors, AC)',
        desc: 'Full circuit: Push-ups · Diamond push-ups · Pull-ups 4×8–12 · Squats + Lunges · Plank · Core',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd5-nonneg', title: 'Apply for IDP in person',
        track: 'nonneg', timeBlock: 'morning',
        subtasks: [
          { id: 'd5-nonneg-s1', title: 'Gather docs: Indian license, passport photos, ID proof' },
          { id: 'd5-nonneg-s2', title: 'Visit issuing authority' },
          { id: 'd5-nonneg-s3', title: 'Submit application / confirm delivery timeline' },
        ],
      },
      {
        id: 'd5-ai', title: 'AI Research #2 — Axible Deep Dive',
        desc: 'Revisit product vision. EAA enforcement timeline. Competitor landscape. Is this still the right bet? What\'s the MVP that validates demand?',
        track: 'ai', timeBlock: 'midday',
      },
      {
        id: 'd5-bro', title: 'Brother Session 2 — Explore Directions',
        desc: 'Show 3–5 career/business paths based on S1. AI-adjacent opportunities from India. Freelancing, product building, upskilling. What would he do if money wasn\'t a factor?',
        track: 'brother', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 6, date: '2026-05-03', label: 'May 3 · Sat',
    tasks: [
      jp(6),
      {
        id: 'd6-fit', title: 'Sukhna Lake Run — Push to 4km',
        desc: '5:00–6:00am · Slightly longer, still Z2. Week 1 peak.',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd6-road', title: 'Life Roadmap S3 — Career & Money',
        desc: '5-year career trajectory: stay at PayPay? startup? different country? Financial targets: savings, investments, home. Entrepreneurship viability — Axible or else? Skills to build in 2 years.',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd6-nonneg', title: 'NRI Home Loan Research',
        track: 'nonneg', timeBlock: 'afternoon',
        subtasks: [
          { id: 'd6-nonneg-s1', title: 'Can NRIs get home loans in India? Which banks?' },
          { id: 'd6-nonneg-s2', title: 'Compare SBI, HDFC, ICICI, Axis — rates & eligibility' },
          { id: 'd6-nonneg-s3', title: 'Understand co-applicant rules (father + NRI son)' },
          { id: 'd6-nonneg-s4', title: 'Research tax implications (India side + Japan side)' },
        ],
      },
      {
        id: 'd6-refl', title: 'Reflection #1 — Thailand Debrief',
        desc: 'What specifically made Thailand feel so alive? People, freedom, novelty? What can you recreate in Tokyo?',
        track: 'reflection', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 7, date: '2026-05-04', label: 'May 4 · Sun',
    tasks: [
      jp(7),
      {
        id: 'd7-fit', title: 'Rest Day — Active Recovery',
        desc: 'Easy walk, stretch. No structured workout.',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd7-nonneg-cebu', title: 'Cebu Trip Planning — Phase 1',
        track: 'nonneg', timeBlock: 'midday',
        subtasks: [
          { id: 'd7-cebu-s1', title: 'Check visa requirements (Indian passport from Japan)' },
          { id: 'd7-cebu-s2', title: 'Search flights (Peach, Cebu Pacific, etc.)' },
        ],
      },
      {
        id: 'd7-nonneg-loan', title: 'NRI Home Loan — Summary Doc',
        desc: 'Create comparison doc for family discussion. Final recommendation.',
        track: 'nonneg', timeBlock: 'afternoon',
        subtasks: [
          { id: 'd7-loan-s1', title: 'Write up findings from Day 6 research' },
          { id: 'd7-loan-s2', title: 'Create summary for family discussion' },
        ],
      },
      {
        id: 'd7-bro', title: 'Brother Session 3 — Entrepreneurship Compatibility',
        desc: 'Could you build something together? Complementary skills? Axible or a new idea? Honest assessment: compatible co-founders or better as independent supporters?',
        track: 'brother', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 8, date: '2026-05-05', label: 'May 5 · Mon',
    tasks: [
      jp(8),
      {
        id: 'd8-fit', title: 'Bodyweight Session (indoors, AC)',
        desc: 'Full circuit · Aim to add 1–2 reps vs last session',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd8-ai', title: 'AI Research #3 — India AI Ecosystem',
        desc: 'What\'s happening in Indian AI startups? Co-building opportunities from Japan. Cross-border product possibilities.',
        track: 'ai', timeBlock: 'midday',
      },
      {
        id: 'd8-nonneg', title: 'Cebu Trip Planning — Phase 2',
        track: 'nonneg', timeBlock: 'afternoon',
        subtasks: [
          { id: 'd8-cebu-s1', title: 'Research accommodation (Mactan vs Cebu City)' },
          { id: 'd8-cebu-s2', title: 'Draft itinerary for must-do activities' },
          { id: 'd8-cebu-s3', title: 'Budget estimate' },
        ],
      },
      {
        id: 'd8-refl', title: 'Reflection #2 — Japan Honest Assessment',
        desc: 'After 6+ years, what\'s the real score? What would need to change for you to feel "home" there? Is that even possible?',
        track: 'reflection', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 9, date: '2026-05-06', label: 'May 6 · Tue',
    tasks: [
      jp(9),
      {
        id: 'd9-fit', title: 'Sukhna Lake Run — Push to 5km',
        desc: '5:00–6:00am · Week 2 begins. Distance push. One tempo effort if feeling good.',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd9-road', title: 'Life Roadmap S4 — Relationships & Lifestyle',
        desc: 'What kind of partner and relationship do you want? Social life design: how to build real connections (in Japan or wherever). Family expectations vs personal desires — write out the honest tension. Travel goals for next 5 years.',
        track: 'roadmap', timeBlock: 'midday',
      },
    ],
  },
  {
    day: 10, date: '2026-05-07', label: 'May 7 · Wed',
    tasks: [
      jp(10),
      {
        id: 'd10-fit', title: 'Bodyweight Session (indoors, AC)',
        desc: 'Full circuit · Peak of week 2',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd10-ai', title: 'AI Research #4 — Entrepreneurship vs Employment',
        desc: 'Honest pros/cons for your situation. Financial runway analysis. What would you need to go independent in 2027?',
        track: 'ai', timeBlock: 'midday',
      },
      {
        id: 'd10-bro', title: 'Brother Session 4 — His Roadmap',
        desc: 'Help him draft his own 1–2 year plan. Identify first concrete step he can take this month.',
        track: 'brother', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 11, date: '2026-05-08', label: 'May 8 · Thu',
    tasks: [
      jp(11),
      {
        id: 'd11-fit', title: 'Sukhna Lake Run — 5km with tempo effort',
        desc: '5:00–6:00am · Warm-up 1km → tempo 3km → cool-down 1km',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd11-road', title: 'Life Roadmap S5 — Synthesis',
        desc: 'Write the actual 5-year roadmap (1–2 pages). Year 1–5 concrete milestones. First 3 actions when back in Tokyo. Prepare to share with brother.',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd11-refl', title: 'Reflection #3 — Turning 30',
        desc: 'What do you want to carry into your 30s? What do you want to leave behind?',
        track: 'reflection', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 12, date: '2026-05-09', label: 'May 9 · Fri',
    tasks: [
      jp(12),
      {
        id: 'd12-fit', title: 'Bodyweight Session (indoors, AC)',
        desc: 'Full circuit · Final hard session',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd12-ai', title: 'AI Research #5 — Brother + You: Joint Venture?',
        desc: 'Based on brother sessions: is there a viable business to build together? What would it be? Go / no-go analysis.',
        track: 'ai', timeBlock: 'midday',
      },
    ],
  },
  {
    day: 13, date: '2026-05-10', label: 'May 10 · Sat',
    tasks: [
      jp(13),
      {
        id: 'd13-fit', title: 'Sukhna Lake Run — 5km strong',
        desc: '5:00–6:00am · One of the last runs here. Make it count.',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd13-road', title: 'Write the 5-Year Roadmap Document',
        desc: 'Polish S5 synthesis into clean prose. Print or share with brother and discuss.',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd13-refl', title: 'Reflection #4 — The Autonomy Question',
        desc: 'You value personal autonomy deeply. How does that play with wanting family, roots, and community?',
        track: 'reflection', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 14, date: '2026-05-11', label: 'May 11 · Sun',
    tasks: [
      jp(14),
      {
        id: 'd14-fit', title: 'Light Movement — Easy Walk & Stretch',
        desc: 'Save energy for travel tomorrow. No hard effort.',
        track: 'fitness', timeBlock: 'morning',
      },
      {
        id: 'd14-road', title: 'Review & Finalize All Docs',
        desc: 'Review roadmap, research notes, brother session outputs. Pack the insights for Tokyo.',
        track: 'roadmap', timeBlock: 'midday',
      },
      {
        id: 'd14-fam', title: 'Family Time — Be present',
        desc: 'Last full day. No agenda.',
        track: 'reflection', timeBlock: 'evening',
      },
    ],
  },
  {
    day: 15, date: '2026-05-12', label: 'May 12 · Mon',
    tasks: [
      {
        id: 'd15-flight', title: '✈️ Pack & Depart — Tokyo',
        desc: 'Flight day. Travel light. Carry the clarity.',
        track: 'reflection', timeBlock: 'morning',
      },
    ],
  },
];
