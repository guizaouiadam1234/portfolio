/**
 * All portfolio content lives here.
 * Sources: CV (professional history, dates, skills) and the public GitHub
 * repositories (project details). Nothing below should be added without a source.
 */

export const profile = {
  name: 'Adam Guizaoui',
  role: 'Software Engineer — QA Automation',
  email: 'guizaouiadam@gmail.com',
  github: 'https://github.com/guizaouiadam1234',
  githubHandle: 'guizaouiadam1234',
  // Not present in the CV. Add the full URL here and every LinkedIn link on the site appears.
  linkedin: '',
  cv: {
    href: '/Adam_Guizaoui_CV.pdf',
    filename: 'Adam_Guizaoui_CV.pdf',
  },
  location: 'France',
}

export const hero = {
  eyebrow: 'Software engineer · Test automation · Full-stack',
  lede:
    'I build end-to-end test suites, the tooling that runs them, and full-stack applications. QA Automation Engineer at Wiiisdom since October 2024. Engineering student at IMT Nord Europe, graduating in 2027.',
  glance: [
    { label: 'Current role', value: 'QA Automation Engineer, Wiiisdom' },
    { label: 'Focus', value: 'E2E automation, test infrastructure, LLM-based QA tooling' },
    { label: 'Also builds', value: 'Full-stack apps: Vue.js, FastAPI, PostgreSQL, AWS' },
    { label: 'Education', value: 'IMT Nord Europe — Software Engineering & Cloud Architecture' },
    { label: 'Languages', value: 'Arabic, French (native) · English C1 · German B2' },
  ],
  metrics: [
    { value: '200+', label: 'automated E2E scenarios written and maintained', detail: 'Playwright · CodeceptJS · POM' },
    { value: '45 → 20', unit: 'min', label: 'test pipeline duration after a parallel execution engine', detail: '−56 %' },
    { value: '3', label: 'engineering roles: QA automation, full-stack, internal tooling', detail: 'France · Senegal · Morocco' },
  ],
}

export const about = {
  paragraphs: [
    'Engineering student at IMT Nord Europe, specialising in software engineering and cloud architecture.',
    'Most of my professional work sits where testing meets engineering: keeping a large end-to-end suite reliable, making it run faster, and making failures easier to diagnose. I am currently building an LLM-based agent that generates and maintains E2E tests.',
    'Outside QA, I designed and deployed a custom ERP during an internship in Dakar, and I keep side projects going in Python, C#, Java and C.',
  ],
}

export const experience = [
  {
    id: 'wiiisdom',
    company: 'Wiiisdom',
    role: 'QA Automation Engineer',
    period: 'Oct 2024 — Present',
    start: '2024-10',
    location: 'France',
    featured: true,
    summary:
      'Works on end-to-end test automation: writing and maintaining scenarios, and building the tooling that runs and analyses them.',
    highlights: [
      {
        title: 'Parallel execution engine',
        text: 'Designed and built a parallelised execution engine for the E2E suite. Pipeline duration went from 45 to 20 minutes.',
        metric: '−56 %',
      },
      {
        title: '200+ E2E scenarios',
        text: 'Wrote and maintain more than 200 automated end-to-end scenarios with Playwright and CodeceptJS, structured with the Page Object Model.',
        metric: '200+',
      },
      {
        title: 'Test dependency graph',
        text: 'Built a tool that renders dependencies between tests as a directed acyclic graph (DAG), used to analyse runs and debug failures.',
        metric: 'DAG',
      },
      {
        title: 'LLM-based QA agent',
        text: 'In progress: an autonomous agent built on large language models, aimed at generating and maintaining E2E tests.',
        metric: 'WIP',
      },
    ],
    pipeline: { before: 45, after: 20, unit: 'min' },
    stack: ['Playwright', 'CodeceptJS', 'JavaScript / TypeScript', 'Page Object Model', 'Parallel execution', 'DAG', 'LLMs'],
  },
  {
    id: 'coselec',
    company: 'COSELEC',
    role: 'Full-Stack Software Engineer — Intern',
    period: 'Jul 2026 — Sep 2026',
    start: '2026-07',
    location: 'Dakar, Senegal',
    summary: 'Took a custom ERP from requirements to a deployed application.',
    bullets: [
      'Analysed operational processes and wrote the functional and technical specification for the ERP.',
      'Designed and built the application: Vue.js front end, FastAPI back end, PostgreSQL database.',
      'Containerised it with Docker and deployed the infrastructure on AWS (EC2, S3, RDS).',
    ],
    stack: ['Vue.js', 'FastAPI', 'Python', 'PostgreSQL', 'Docker', 'AWS EC2', 'AWS S3', 'AWS RDS'],
  },
  {
    id: 'sews',
    company: 'SEWS Cabind Maroc',
    role: 'IT Intern',
    period: 'Jun 2023 — Aug 2023',
    start: '2023-06',
    location: 'Morocco',
    summary: 'Internal tooling and database work.',
    bullets: [
      'Designed a MySQL database to classify the company’s products.',
      'Built internal automation tools in C# with .NET WinForms.',
      'Took part in maintaining the IT infrastructure.',
    ],
    stack: ['C#', '.NET WinForms', 'MySQL', 'SQL'],
  },
]

/**
 * Projects selected after reading each repository's code.
 * `diagram` drives the small architecture / flow breakdowns.
 */
export const projects = [
  {
    id: 'nexus',
    name: 'NexusAnalytics',
    kind: 'Full-stack · Personal project',
    status: 'In progress',
    repo: 'https://github.com/guizaouiadam1234/NexusAnalytics',
    demo: null,
    summary:
      'Looks up a League of Legends player by Riot ID and turns their recent games into compact match summaries.',
    problem:
      'The Riot Games API returns large, deeply nested payloads, one request per match, under strict rate limits. A usable match history needs many calls and heavy reshaping.',
    contribution: 'Solo project. Designed and wrote the FastAPI back end and the Vue 3 front end.',
    details: [
      'Async FastAPI service; all Riot calls go through a dedicated client built on httpx, configured from environment variables.',
      'Cache layer that uses Redis when REDIS_URL is set and falls back to an in-memory TTL cache otherwise. A force_refresh flag bypasses it.',
      'A /match-cards endpoint aggregates match history and match details into one response: KDA, CS per minute, champion icons, allies and enemies — and reports per match whether data came from the cache or from Riot.',
      'Riot HTTP errors are mapped to explicit messages (expired key, rate limit, not found) instead of leaking raw upstream responses.',
      'Versioned /api/v1 router, with the original routes kept for compatibility.',
    ],
    stack: ['Python', 'FastAPI', 'httpx', 'Redis', 'Vue 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite'],
    diagram: {
      title: 'Request path for /api/v1/match-cards',
      nodes: [
        { label: 'Vue 3 SPA', sub: 'Pinia · Vue Router' },
        { label: 'FastAPI', sub: 'versioned /api/v1 router' },
        { label: 'Cache', sub: 'Redis, or in-memory TTL fallback' },
        { label: 'Riot client', sub: 'httpx · error mapping' },
        { label: 'Riot Games API', sub: 'account-v1 · match-v5', external: true },
      ],
    },
  },
  {
    id: 'fintrack',
    name: 'FinTrack',
    kind: 'Full-stack · Personal project',
    repo: 'https://github.com/guizaouiadam1234/FinTrack',
    demo: null,
    summary: 'Personal finance tracker: users record income and expenses and get a dashboard summary.',
    problem:
      'A small multi-user app where correctness matters — each user must only ever see their own transactions, and totals must be right.',
    contribution: 'Solo project. API, authentication, front end and both test suites.',
    details: [
      'JWT authentication with the OAuth2 password flow and bcrypt-hashed passwords. Every transaction query is scoped to the authenticated user.',
      'Dashboard totals are computed in SQL with conditional aggregation (SUM over CASE, COALESCE) rather than in Python.',
      'SQLite by default, PostgreSQL through DATABASE_URL; Postgres URLs are normalised to the psycopg 3 driver.',
      'Separate unit and integration suites on both sides: pytest for the API, Vitest with Testing Library and MSW for the Vue front end, with coverage reports.',
    ],
    stack: ['Vue 3', 'Vite', 'Tailwind CSS', 'Axios', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'pytest', 'Vitest', 'MSW'],
    tests: [
      { layer: 'API', unit: 'pytest — models, auth service', integration: 'pytest — auth, CRUD, dashboard routes' },
      { layer: 'Front end', unit: 'Vitest — router guards, API client', integration: 'Vitest + MSW — login, register, dashboard views' },
    ],
  },
  {
    id: 'rental',
    name: 'Car Rental Management API',
    kind: 'Back end · Academic project',
    repo: 'https://github.com/guizaouiadam1234/Gestion_Location_Voitures',
    demo: null,
    summary: 'REST API for managing clients, vehicles and rental contracts, built around explicit business rules.',
    problem:
      'Rental rules cascade: a broken-down vehicle cannot be rented, its pending contracts must be cancelled, and contracts that never started must be flagged as late.',
    contribution: 'Main contributor (16 of 18 commits): architecture, business rules, tests, Docker setup.',
    details: [
      'Vehicle state changes publish a Spring application event; a listener runs contract state-transition strategies. New rules plug in without touching the services.',
      'A facade orchestrates multi-step scenarios such as creating a client and a contract in one call.',
      'A scheduled job marks overdue contracts as late.',
      'DTOs validated with Jakarta Validation and a central REST exception handler.',
      'Unit tests with JUnit 5 and Mockito for services, controllers and the event listener, plus an integration test on embedded MongoDB. Docker Compose runs the API with MongoDB.',
    ],
    stack: ['Java', 'Spring Boot 3', 'Spring Data MongoDB', 'Maven', 'JUnit 5', 'Mockito', 'Docker Compose'],
    diagram: {
      title: 'What happens when a vehicle breaks down',
      nodes: [
        { label: 'PUT /api/vehicules/{id}', sub: 'state → EN_PANNE' },
        { label: 'VehicleService', sub: 'publishes event' },
        { label: 'VehicleStateChangedEvent', sub: 'Spring event' },
        { label: 'ContractEventListener', sub: 'runs strategies' },
        { label: 'CancelOnVehiclePanne', sub: 'pending → ANNULE' },
      ],
    },
  },
  {
    id: 'platformer',
    name: 'Platformer Engine',
    kind: 'Game engine · C# · Personal project',
    repo: 'https://github.com/guizaouiadam1234/Platformer_Engine',
    demo: null,
    summary: '2D platformer on MonoGame and .NET 9, with its own in-game editor panels built on Dear ImGui.',
    problem:
      'Platformer controls feel wrong without forgiving input timing, and tuning physics by recompiling is slow.',
    contribution: 'Solo project.',
    details: [
      'Player controller with gravity, jump buffering and coyote time (150 ms windows), plus a dash with mana cost and cooldown.',
      'Levels authored in LDtk and loaded from JSON: the Collisions IntGrid layer becomes collision rectangles, the Visuals layer becomes tiles.',
      'The scene renders to an off-screen target shown inside an ImGui “Scene View”, next to a hierarchy panel and an inspector that tunes speed, jump force and gravity live.',
      'Follow camera with zoom, parallax layers, sprite animation, patrolling enemies with contact damage and invincibility frames.',
    ],
    stack: ['C#', '.NET 9', 'MonoGame', 'ImGui.NET', 'LDtk'],
    specs: [
      { k: 'Coyote time', v: '0.15 s' },
      { k: 'Jump buffer', v: '0.15 s' },
      { k: 'Dash', v: '0.15 s · 35 mana' },
      { k: 'Scene target', v: '1280 × 720' },
    ],
  },
  {
    id: 'grapher',
    name: 'Graphing Calculator',
    kind: 'Systems · C · Team of four',
    repo: 'https://github.com/guizaouiadam1234/Alj',
    demo: null,
    summary: 'Plots user-typed functions of x, with the lexer, parser and evaluator written from scratch in C.',
    problem: 'Turn a string like “sin(x) * 2 + x^2” into something a program can evaluate thousands of times per frame.',
    contribution: 'School project built by a team of four contributors.',
    details: [
      'Lexer converts input into typed tokens — numbers, operators, functions (sin, cos, tan, log, exp, sqrt, abs), the variable x and parentheses — with explicit error codes.',
      'Recursive parser builds a binary expression tree that respects operator precedence and strips enclosing parentheses.',
      'Evaluator walks the tree for each x value; the curve is drawn with OpenGL / GLUT.',
    ],
    stack: ['C', 'OpenGL', 'GLUT'],
    diagram: {
      title: 'Expression pipeline',
      nodes: [
        { label: '"sin(x)*2"', sub: 'user input' },
        { label: 'Lexer', sub: 'typed tokens' },
        { label: 'Parser', sub: 'binary expression tree' },
        { label: 'Evaluator', sub: 'f(x) per sample' },
        { label: 'OpenGL', sub: 'plotted curve' },
      ],
    },
  },
]

export const smallProjects = [
  {
    name: 'Spinning Alj',
    repo: 'https://github.com/guizaouiadam1234/SpinningAlj',
    text: 'Wireframe cube on an HTML canvas: 3×3 rotation matrices per axis and a perspective projection, no 3D library. A browser rewrite of an earlier C# version built on quaternions.',
    stack: ['JavaScript', 'Canvas 2D', 'Linear algebra'],
    live: true,
  },
  {
    name: 'Wordle',
    repo: 'https://github.com/guizaouiadam1234/Wordle',
    demo: 'https://wordle-zeta-roan.vercel.app',
    text: 'Wordle rebuilt from scratch, with configurable word length and number of guesses. The word list is fetched at runtime.',
    stack: ['Vue 3', 'TypeScript', 'Pinia'],
  },
  {
    name: 'KeepTyping',
    repo: 'https://github.com/guizaouiadam1234/KeepTyping',
    text: 'A small typing-speed test.',
    stack: ['Vue 3', 'TypeScript'],
  },
]

export const skills = [
  {
    group: 'QA & Test Automation',
    items: ['Playwright', 'CodeceptJS', 'E2E testing', 'Page Object Model', 'pytest', 'Vitest', 'MSW', 'JUnit 5', 'Mockito'],
    where: 'Wiiisdom · FinTrack · Car Rental API',
  },
  {
    group: 'AI & LLM',
    items: ['LLM integration', 'AI agents'],
    where: 'Wiiisdom — QA agent in progress',
  },
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'C#', 'Java', 'C', 'SQL'],
    where: 'Professional and personal projects',
  },
  {
    group: 'Front end',
    items: ['Vue.js 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite'],
    where: 'COSELEC · NexusAnalytics · FinTrack',
  },
  {
    group: 'Back end',
    items: ['FastAPI', 'SQLAlchemy', 'Spring Boot', '.NET WinForms', 'REST APIs'],
    where: 'COSELEC · SEWS · personal projects',
  },
  {
    group: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    where: 'COSELEC · SEWS · personal projects',
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS EC2', 'AWS S3', 'AWS RDS', 'Docker', 'Docker Compose', 'GitLab CI/CD', 'Bitbucket Pipelines', 'GitHub Actions'],
    where: 'COSELEC · CI pipelines',
  },
  {
    group: 'Architecture & practices',
    items: ['Parallel test execution', 'Directed acyclic graphs', 'Event-driven design', 'Strategy & Facade patterns'],
    where: 'Wiiisdom · Car Rental API',
  },
]

export const education = [
  {
    school: 'IMT Nord Europe',
    degree: 'Engineering degree (Cycle Ingénieur)',
    detail: 'Specialisation: Software Engineering and Cloud Architecture',
    period: '2021 — 2027 (expected)',
    location: 'France',
  },
  {
    school: 'Lycée Lyautey',
    degree: 'French Baccalauréat — highest honours (Mention Très Bien)',
    detail: 'Majors: Mathematics, Physics-Chemistry',
    period: '2018 — 2021',
    location: 'Casablanca, Morocco',
  },
]

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'Native' },
  { name: 'English', level: 'C1 · TOEIC 975' },
  { name: 'German', level: 'B2' },
]
