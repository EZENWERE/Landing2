import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bell,
  Building,
  Calendar,
  Check,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  LineChart,
  Mail,
  Menu,
  MessageSquare,
  Mic,
  Network,
  Search,
  Send,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const START_FREE_URL = "https://pmsalad-f.vercel.app/";
const SIGN_IN_URL = "https://pmsalad-f.vercel.app/";
const MAILTO_DEMO = "mailto:hello@pmsalad.com?subject=Book%20a%20PMSalad%20demo";

const ASSETS = {
  video: "/video.mp4",
  meeting: "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/71gccsq9_Screenshot%202026-04-26%20at%2016.23.51.png",
  tasks: "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/rmek14xo_Screenshot%202026-04-26%20at%2016.24.06.png",
  graph: "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/epo3vn2m_Screenshot%202026-04-26%20at%2016.24.21.png",
  kanban: "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/46pcbf67_Screenshot%202026-04-26%20at%2016.24.45.png",
};

const navLinks = [
  { label: "Features", href: "#features", testid: "nav-features-link" },
  { label: "Templates", href: "#templates", testid: "nav-templates-link" },
  { label: "Pricing", href: "#pricing", testid: "nav-pricing-link" },
  { label: "Docs", href: "#docs", testid: "nav-docs-link" },
];

const problemCards = [
  {
    icon: Network,
    eyebrow: "Blockers",
    title: "Nobody sees what is stuck.",
    body: "Work hides across tools. PMSalad shows the chain before momentum disappears.",
  },
  {
    icon: MessageSquare,
    eyebrow: "Meetings",
    title: "Decisions vanish after calls.",
    body: "AI turns meeting notes into owned tasks, approvals, and follow-ups.",
  },
  {
    icon: Gauge,
    eyebrow: "Signal",
    title: "Green dashboards can still lie.",
    body: "PMSalad reveals the real execution state behind every status update.",
  },
];

const aiFeatures = [
  [Mic, "Meetings AI", "Turns transcripts into tasks, owners, approvals, and blockers."],
  [Target, "OKR Scoring", "Scores work against goals without manual linking."],
  [Bell, "Escalation Intelligence", "Finds the right manager and drafts the message."],
  [FileText, "Standup Generation", "Writes crisp updates from real task movement."],
  [GitBranch, "Graph Suggestions", "Suggests which existing work your new task depends on."],
  [MessageSquare, "Org AI Chat", "Ask about work with permissions already respected."],
  [LineChart, "Impact Scoring", "Shows what matters and how well it is moving."],
  [Check, "Status Inference", "AI spots completed work and asks you to confirm."],
  [Search, "Duplicate Detection", "Flags duplicate work before it splits attention."],
];

const templates = [
  ["Engineering", "Sprint planning, PR reviews, infrastructure dependencies", ["Backlog", "In Dev", "Review", "Done"]],
  ["Sales", "Pipeline stages, contract approvals, revenue tracking", ["Prospect", "Proposal", "Negotiate", "Won"]],
  ["Support", "SLA tracking, ticket routing, engineering escalation", ["New", "Triage", "Active", "Resolved"]],
  ["Product", "Roadmap, specs, releases, feedback loops", ["Discovery", "Spec", "Build", "Shipped"]],
  ["Data / ML", "Experiments, model reviews, deployment approvals", ["Explore", "Train", "Review", "Deploy"]],
  ["Ops", "Internal requests, approvals, vendor work", ["Intake", "Approve", "Execute", "Close"]],
];

const pricingPlans = [
  {
    name: "Team",
    price: "Free to start",
    body: "For teams that need shared execution visibility today.",
    bullets: ["Unlimited tasks", "Meetings AI queue", "Team graph", "Workflow templates"],
    cta: "Start free",
  },
  {
    name: "Scale",
    price: "Custom",
    body: "For companies running work across departments.",
    bullets: ["Org-wide graph", "Executive scoring", "SSO controls", "Dedicated onboarding"],
    cta: "Book a demo",
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const listener = () => setReduced(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return reduced;
}

function scrollToSection(event, href, closeMenu) {
  if (!href.startsWith("#")) return;
  event.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  }
  if (closeMenu) closeMenu();
}

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" role="img">
        <path d="M8 9c7 0 7 18 20 18" />
        <path d="M28 9C19 9 19 27 8 27" />
        <circle cx="8" cy="9" r="3" />
        <circle cx="28" cy="9" r="3" />
        <circle cx="8" cy="27" r="3" />
        <circle cx="28" cy="27" r="3" />
      </svg>
    </span>
  );
}

function ButtonLink({ href, children, variant = "primary", className = "", testid, onClick, target }) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      className={`btn btn-${variant} ${className}`}
      href={href}
      onClick={onClick}
      target={target || (isExternal ? "_blank" : undefined)}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-testid={testid}
    >
      {children}
    </a>
  );
}

function StickyNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`top-nav ${scrolled ? "top-nav-scrolled" : ""}`}>
      <a
        href="#hero"
        className="brand-link"
        data-testid="nav-logo-link"
        onClick={(event) => scrollToSection(event, "#hero", closeMenu)}
        aria-label="PMSalad home"
      >
        <LogoMark />
        <span>PMSalad</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} data-testid={link.testid} onClick={(event) => scrollToSection(event, link.href)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <ButtonLink href={SIGN_IN_URL} variant="ghost" testid="nav-sign-in-link">
          Sign in
        </ButtonLink>
        <ButtonLink href={START_FREE_URL} testid="nav-start-free-button">
          Start free
        </ButtonLink>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          data-testid="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mobile-panel" data-testid="mobile-nav-panel">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-testid={`mobile-${link.testid}`} onClick={(event) => scrollToSection(event, link.href, closeMenu)}>
              {link.label}
            </a>
          ))}
          <ButtonLink href={SIGN_IN_URL} variant="secondary" testid="mobile-sign-in-link">
            Sign in
          </ButtonLink>
          <ButtonLink href={START_FREE_URL} testid="mobile-start-free-button">
            Start free
          </ButtonLink>
        </div>
      )}
    </header>
  );
}

function ThreeGraphStage({ className = "" }) {
  const mountRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reduced) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const materials = {
      teal: new THREE.MeshBasicMaterial({ color: 0x3daa8f, transparent: true, opacity: 0.95 }),
      steel: new THREE.MeshBasicMaterial({ color: 0x4a6478, transparent: true, opacity: 0.78 }),
      amber: new THREE.MeshBasicMaterial({ color: 0xf0a83a, transparent: true, opacity: 0.92 }),
    };

    const positions = [
      [-3.6, 1.3, 0.2], [-2.5, 0.1, -0.5], [-1.4, 1.0, 0.4], [-1.0, -1.0, 0.1],
      [0.3, 0.6, -0.2], [0.9, -0.8, 0.5], [2.0, 1.1, -0.1], [2.6, -0.1, 0.4], [3.4, -1.0, -0.4],
    ];
    const links = [[0, 2], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [4, 7], [5, 7], [7, 8]];
    const tasks = [];

    positions.forEach((position, index) => {
      const geometry = new THREE.SphereGeometry(index === 4 ? 0.13 : 0.105, 20, 20);
      const material = index === 7 || index === 8 ? materials.amber : index === 3 ? materials.steel : materials.teal;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);
      group.add(mesh);
      tasks.push(mesh);
    });

    links.forEach(([from, to]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...positions[from]),
        new THREE.Vector3(...positions[to]),
      ]);
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x3daa8f, transparent: true, opacity: to >= 7 ? 0.48 : 0.3 })
      );
      group.add(line);
    });

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height || 1;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      group.rotation.y = Math.sin(time * 0.28) * 0.28;
      group.rotation.x = Math.cos(time * 0.22) * 0.08;
      tasks.forEach((task, index) => {
        const pulse = 1 + Math.sin(time * 1.8 + index) * 0.08;
        task.scale.setScalar(pulse);
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      Object.values(materials).forEach((material) => material.dispose());
      group.children.forEach((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return (
    <div className={`three-stage ${className}`} ref={mountRef} aria-hidden="true">
      <div className="static-graph-fallback" />
    </div>
  );
}

function MockBrowserFrame({ title, image, alt, variant = "browser", testid, children, flip = true }) {
  return (
    <figure className={`laptop-reveal laptop-${variant}`} data-testid={testid} {...(flip ? { "data-laptop-image": true } : {})}>
      <div className={`mock-frame mock-${variant} laptop-lid`}>
        <div className="mock-topbar">
          <span /><span /><span />
          <p>{title}</p>
        </div>
        <div className="mock-content">
          {image ? <img src={image} alt={alt} loading="lazy" /> : children}
        </div>
      </div>
      <div className="laptop-base" aria-hidden="true">
        <i />
      </div>
    </figure>
  );
}

function SectionHeader({ eyebrow, title, body, align = "left" }) {
  return (
    <div className={`section-header section-header-${align}`} data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function Hero() {
  const headline = ["Your", "team", "is", "working.", "But", "is", "the", "right", "work", "moving", "forward?"];

  return (
    <section id="hero" className="hero-section hero-video-hero hero-grain" data-testid="hero-section">
      <video
        className="hero-bg-video"
        src={ASSETS.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-veil" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="container hero-grid hero-full-grid">
        <div className="hero-copy hero-copy-glass">
          <h1 data-testid="hero-headline">
            {headline.map((word, index) => (
              <span key={`${word}-${index}`} className={`hero-word ${word === "right" ? "accent-word" : ""}`}>
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            PMSalad maps tasks, dependencies, and approvals into one living execution map — with built-in intelligence keeping every team aligned.
          </p>
          <div className="hero-buttons">
            <ButtonLink href={START_FREE_URL} className="btn-large" testid="hero-start-free-button">
              Start free <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink
              href="#scroll-story"
              variant="secondary"
              className="btn-large"
              testid="hero-see-how-button"
              onClick={(event) => scrollToSection(event, "#scroll-story")}
            >
              See how it moves
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span /> Scroll</div>
    </section>
  );
}

function ProblemStrip() {
  return (
    <section className="section problem-section" data-testid="problem-section">
      <div className="container">
        <SectionHeader eyebrow="THE PROBLEM" title="Teams do a lot. Leaders still miss the truth." body="PMSalad connects the work behind the work." />
        <div className="problem-grid">
          {problemCards.map(({ icon: Icon, eyebrow, title, body }) => (
            <article className="pain-card" key={title} data-reveal>
              <div className="pain-icon"><Icon size={22} /></div>
              <span>{eyebrow}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollStorySection() {
  const storyCards = [
    {
      icon: Mic,
      step: "01",
      title: "Meetings become owned work.",
      body: "AI lifts decisions from transcripts and turns them into reviewed tickets.",
      meta: "Transcript → task drafts",
    },
    {
      icon: GitBranch,
      step: "02",
      title: "Dependencies connect automatically.",
      body: "PMSalad shows how one team’s work affects the next team’s plan.",
      meta: "Edges appear across teams",
    },
    {
      icon: Bell,
      step: "03",
      title: "Blocked work lights up fast.",
      body: "When one task stalls, downstream work pulses before the deadline slips.",
      meta: "Risk spreads in seconds",
    },
    {
      icon: ShieldCheck,
      step: "04",
      title: "Approvals stay in the flow.",
              body: "Approvals, owners, and status changes sit inside the same execution reality.",
      meta: "Approval → owner → decision",
    },
    {
      icon: LineChart,
      step: "05",
      title: "Leaders get real signal.",
      body: "Impact and contribution scores roll up without another status meeting.",
      meta: "Work impact: 82",
    },
  ];

  return (
    <section id="scroll-story" className="scroll-story-section" data-testid="scroll-story-section">
      <div className="container scroll-story-head" data-reveal>
        <span className="eyebrow">EXECUTION IN MOTION</span>
        <h2>Scroll through the reality behind the roadmap.</h2>
        <p>How PMSalad turns scattered work into a living graph.</p>
      </div>
      <div className="container scroll-story-grid">
        <div className="scroll-story-cards">
          {storyCards.map(({ icon: Icon, step, title, body, meta }) => (
            <article className="story-card" key={step} data-testid={`story-card-${step}`}>
              <div className="story-icon"><Icon size={22} /></div>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <b>{meta}</b>
            </article>
          ))}
        </div>
        <div className="scroll-story-visual" data-testid="pinned-scroll-visual">
          <div className="story-progress" aria-hidden="true"><i /></div>
          <div className="story-visual-inner">
            <ThreeGraphStage className="story-three" />
            <div className="story-core" aria-hidden="true">
              <span className="core-ring ring-one" />
              <span className="core-ring ring-two" />
              <span className="core-ring ring-three" />
              <strong>Execution map</strong>
            </div>
            <div className="story-tile story-tile-one">Meeting extract</div>
            <div className="story-tile story-tile-two">Dependencies</div>
            <div className="story-tile story-tile-three">Approvals needed</div>
            <div className="story-tile story-tile-four">Impact score</div>
            <div className="story-connection connection-one" />
            <div className="story-connection connection-two" />
          </div>
        </div>
      </div>
    </section>
  );
}


function CoreGraphSection() {
  return (
    <section id="graph" className="section graph-section" data-testid="graph-section">
      <div className="container graph-grid">
        <div className="graph-copy">
          <SectionHeader
            eyebrow="THE FOUNDATION"
            title="Every task has cause and effect. PMSalad tracks both."
            body="See ownership, approvals needed, and downstream risk before anyone has to ask."
          />
          <div className="feature-list">
            <div data-reveal><Check size={18} /> Automatic cycle prevention keeps planning clean.</div>
            <div data-reveal><Check size={18} /> Cross-team edges show who is waiting on whom.</div>
            <div data-reveal><Check size={18} /> Blocked work cascades instantly across boards.</div>
          </div>
          <ButtonLink href="#templates" variant="text" testid="graph-see-templates-link" onClick={(event) => scrollToSection(event, "#templates")}>
            See connected workflows <ArrowRight size={16} />
          </ButtonLink>
        </div>
        <div className="graph-stage-wrap">
          <ThreeGraphStage className="section-graph" />
          <MockBrowserFrame
            title="Execution Map"
            image={ASSETS.graph}
            alt="PMSalad execution map showing connected task cards"
            testid="execution-map-screenshot"
          />
          <div className="floating-chip chip-top" data-reveal>3 downstream tasks affected</div>
          <div className="floating-chip chip-bottom" data-reveal>Blocked edge detected</div>
        </div>
      </div>
    </section>
  );
}

function MeetingsAISection() {
  return (
    <section className="section meetings-section" data-testid="meetings-ai-section">
      <div className="container meetings-grid">
        <div>
          <SectionHeader
            eyebrow="MEETINGS AI"
            title="Your meetings already contain the plan."
            body="Paste a transcript. PMSalad extracts work, owners, dependencies, and approvals."
          />
          <div className="flow-cards">
            {[
              ["01", "Raw transcript", "“Tunde handles Kafka before Ebuka starts ingestion.”"],
              ["02", "AI extraction", "Task, dependency, owner, and approval are detected."],
              ["03", "Pushed to people", "Each person gets the right ticket with context."],
            ].map(([step, title, text]) => (
              <article className="flow-card" key={step} data-reveal>
                <strong>{step}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
        <MockBrowserFrame
          title="Carrot meeting prep"
          image={ASSETS.meeting}
          alt="PMSalad Carrot meeting AI briefing interface"
          testid="meeting-ai-screenshot"
        />
      </div>
    </section>
  );
}

function RolesSection() {
  const cards = [
    [Users, "Contributor", "My work, blockers, and impact.", ["5 tasks", "2 teams depend on me", "AI standup ready"]],
    [Network, "Team Lead", "Flow, ownership, and meeting queue.", ["Team health", "Graph view", "Escalations"]],
    [Building, "Executive", "Org health, risk, and alignment.", ["23 blocked", "4 critical", "OKR signal"]],
  ];

  return (
    <section className="section roles-section" data-testid="roles-section">
      <div className="container">
        <SectionHeader eyebrow="ROLE-AWARE INTELLIGENCE" title="One system. Every perspective." body="Each person sees the signal they need, not the noise." align="center" />
        <div className="role-grid">
          {cards.map(([Icon, title, body, rows], index) => (
            <article className={`role-card role-${index}`} key={title}>
              <div className="role-front">
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="mini-ui">
                  {rows.map((row) => <span key={row}>{row}</span>)}
                </div>
              </div>
              <div className="role-back">
                <h3>{title} view</h3>
                <p>Built from the same execution map, filtered by role and permission.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIFeaturesGrid() {
  return (
    <section id="features" className="section ai-section" data-testid="features-section">
      <div className="container">
        <SectionHeader eyebrow="AI EVERYWHERE" title="AI assists across every workflow." body="From meetings to escalations, PMSalad helps at the exact moment work moves." />
        <div className="ai-scroll-shell" data-testid="ai-card-scroll-shuffle">
          <div className="ai-grid ai-scroll-track">
            {aiFeatures.map(([Icon, title, text], index) => (
              <article className={`ai-card ${index === 0 || index === 4 ? "ai-card-large" : ""}`} key={title} data-reveal>
                <div className="ai-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplatesSection() {
  return (
    <section id="templates" className="section templates-section" data-testid="templates-section">
      <div className="container">
        <div className="templates-head">
          <SectionHeader eyebrow="WORKFLOW TEMPLATES" title="Built for every team. One connected system." body="Every department gets its workflow. PMSalad connects them all." />
          <div className="theme-card" data-reveal>
            <span>Theme-aware</span>
            <p>Companies can choose their workspace colors. PMSalad stays consistent underneath.</p>
            <div className="theme-swatches" aria-hidden="true"><i /><i /><i /></div>
          </div>
        </div>
        <div className="template-track" data-testid="template-card-track">
          {templates.map(([title, body, columns]) => (
            <article className="template-card" key={title} data-reveal>
              <Layers size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
              <div className="template-columns">
                {columns.map((column) => <span key={column}>{column}</span>)}
              </div>
            </article>
          ))}
        </div>
        <div className="laptop-wrap">
          <MockBrowserFrame
            title="Workspace board"
            image={ASSETS.kanban}
            alt="PMSalad Kanban board displayed in a workspace"
            variant="laptop"
            testid="kanban-board-screenshot"
            flip={false}
          />
        </div>
      </div>
    </section>
  );
}

function ScoringSection() {
  const factors = [
    ["Dependency influence", "35%"],
    ["Urgency", "20%"],
    ["Cross-team leverage", "20%"],
    ["Business priority", "15%"],
    ["Strategic alignment", "10%"],
  ];

  return (
    <section className="section scoring-section" data-testid="scoring-section">
      <div className="container scoring-grid">
        <div className="score-panel" data-reveal>
          <div className="score-block">
            <span>WORK IMPACT</span>
            <strong>82</strong>
            <div className="score-bar"><i style={{ width: "82%" }} /></div>
          </div>
          <div className="score-block contribution">
            <span>CONTRIBUTION</span>
            <strong>74</strong>
            <div className="score-bar"><i style={{ width: "74%" }} /></div>
          </div>
          <div className="factor-list">
            {factors.map(([label, value]) => (
              <div className="factor-row" key={label}>
                <p>{label}</p><b>{value}</b>
              </div>
            ))}
          </div>
          <p className="score-why">Why: 3 downstream tasks depend on this work.</p>
        </div>
        <div>
          <SectionHeader
            eyebrow="TWO-SCORE MODEL"
            title="Not just done. How important is the work?"
            body="PMSalad scores impact and contribution, then rolls signal up to teams and leaders."
          />
          <MockBrowserFrame
            title="Personal task signal"
            image={ASSETS.tasks}
            alt="PMSalad personal task inbox interface"
            testid="tasks-screenshot"
          />
        </div>
      </div>
    </section>
  );
}

const SCENARIOS = [
  {
    eyebrow: "If your company is facing this",
    problem: "Engineering fixed it. Support never saw it. A merchant waited three days.",
    solution: "PMSalad connects the ticket, the fix, and the customer update in one flow.",
    flow: ["Support ticket", "Engineering fix", "Customer notified"],
  },
  {
    eyebrow: "If your engineers keep losing momentum waiting on other teams",
    problem: "You finished your half on Tuesday. The dependency you handed off sat unowned for eight days. The sprint closed without it.",
    solution: "PMSalad maps every dependency to an owner the moment it's created — and surfaces the block before the sprint ends.",
    flow: ["Dependency created", "Owner assigned", "Block cleared early"],
  },
  {
    eyebrow: "If you manage a team and you're still running on gut feel",
    problem: "Your dashboard shows green across the board. Two tasks have been quietly stalled for a week. You find out the morning the deadline lands.",
    solution: "PMSalad shows the execution reality behind every status update — so risk surfaces before it becomes a miss.",
    flow: ["Blockers detected", "Risk scored", "Manager sees it first"],
  },
  {
    eyebrow: "If your quarterly goals never connect to the actual work",
    problem: "Q3 objectives were set in a slide deck. The work happened across four tools. Nobody linked them until the board review.",
    solution: "PMSalad ties every task to a team or company objective and scores live progress — no manual tracking, no guessing.",
    flow: ["Work logged", "OKR linked automatically", "Progress scored live"],
  },
  {
    eyebrow: "If closing a deal still creates delivery chaos",
    problem: "A contract signed on Friday. Onboarding needed four approvals to kick off. Nobody triggered the process. The customer went quiet for two weeks.",
    solution: "PMSalad turns every closed deal into a structured handoff — with named owners, clear approval steps, and live status your whole team can see.",
    flow: ["Deal signed", "Handoff flow triggered", "Approvals tracked"],
  },
  {
    eyebrow: "If your team meetings never turn into clear ownership",
    problem: "The call ran ninety minutes. Everyone nodded. Nobody recorded who owned what. Three weeks later, half of it still hadn't happened.",
    solution: "PMSalad turns every meeting recording into owned tasks, flagged decisions, and named accountabilities — before the call even ends.",
    flow: ["Meeting recorded", "Tasks extracted by AI", "Owners notified instantly"],
  },
];

function IntegrationMoment() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + SCENARIOS.length) % SCENARIOS.length);
  const next = () => setActive((a) => (a + 1) % SCENARIOS.length);
  const s = SCENARIOS[active];

  return (
    <section className="section integration-section" data-testid="integration-section">
      <div className="container integration-card" data-reveal>
        <div key={active} className="integration-content">
          <span className="eyebrow">{s.eyebrow}</span>
          <blockquote>{s.problem}</blockquote>
          <p>{s.solution}</p>
          <div className="integration-flow" aria-label="Scenario flow">
            {s.flow.flatMap((step, i) =>
              i < s.flow.length - 1
                ? [<span key={step}>{step}</span>, <ArrowRight key={`a${i}`} size={18} />]
                : [<span key={step}>{step}</span>]
            )}
          </div>
          <p className="integration-cta-line">you need <strong className="pmsalad-bold">PMSalad</strong></p>
        </div>
        <div className="integration-nav">
          <button className="integration-btn" onClick={prev} aria-label="Previous scenario">
            <ArrowRight size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
          <div className="integration-dots" role="tablist" aria-label="Scenarios">
            {SCENARIOS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                className={`integration-dot${i === active ? " integration-dot-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Scenario ${i + 1}`}
              />
            ))}
          </div>
          <button className="integration-btn" onClick={next} aria-label="Next scenario">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="section pricing-section" data-testid="pricing-section">
      <div className="container">
        <SectionHeader eyebrow="PRICING" title="Start with your team. Scale to the whole company." body="Simple plans for teams that want execution visibility fast." align="center" />
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <article className={`pricing-card ${index === 1 ? "pricing-featured" : ""}`} key={plan.name} data-reveal>
              <span>{plan.name}</span>
              <h3>{plan.price}</h3>
              <p>{plan.body}</p>
              <ul>
                {plan.bullets.map((bullet) => <li key={bullet}><Check size={15} /> {bullet}</li>)}
              </ul>
              <ButtonLink
                href={index === 0 ? START_FREE_URL : "#contact"}
                testid={index === 0 ? "pricing-team-start-free-button" : "pricing-scale-book-demo-button"}
                onClick={index === 1 ? (event) => scrollToSection(event, "#contact") : undefined}
              >
                {plan.cta} <ArrowRight size={16} />
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocsSection() {
  return (
    <section id="docs" className="section docs-section" data-testid="docs-section">
      <div className="container docs-grid">
        <SectionHeader eyebrow="DOCS" title="Designed for rollout, not guesswork." body="Use templates, imports, and permissions to make execution visible without chaos." />
        <div className="docs-links" data-reveal>
          {[
            ["Quickstart", "Invite a team and build your first workspace."],
            ["Meeting import", "Turn transcripts into reviewed task drafts."],
            ["Theme controls", "Match PMSalad to each company workspace."],
          ].map(([title, text]) => (
            <a href="#contact" key={title} onClick={(event) => scrollToSection(event, "#contact")} data-testid={`docs-${title.toLowerCase().replaceAll(" ", "-")}-link`}>
              <FileText size={18} />
              <span><strong>{title}</strong>{text}</span>
              <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("");

  const submitDemo = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = encodeURIComponent(form.get("name") || "");
    const email = encodeURIComponent(form.get("email") || "");
    const company = encodeURIComponent(form.get("company") || "");
    const message = encodeURIComponent(form.get("message") || "I'd like a PMSalad demo.");
    const href = `${MAILTO_DEMO}&body=Name:%20${name}%0AEmail:%20${email}%0ACompany:%20${company}%0A%0A${message}`;
    setStatus("Opening your email client with the demo request.");
    window.location.href = href;
  };

  return (
    <section id="contact" className="section contact-section" data-testid="contact-section">
      <div className="container contact-grid">
        <div>
          <SectionHeader eyebrow="BOOK A DEMO" title="See your execution reality in PMSalad." body="Tell us where work gets stuck. We will show how PMSalad connects it." />
          <div className="contact-proof" data-reveal>
            <Calendar size={18} />
            <span>Prefer email? <a href={MAILTO_DEMO} data-testid="contact-mailto-link">hello@pmsalad.com</a></span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitDemo} data-testid="contact-form" data-reveal>
          <label>Name<input name="name" type="text" placeholder="Your name" required data-testid="contact-name-input" /></label>
          <label>Work email<input name="email" type="email" placeholder="you@company.com" required data-testid="contact-email-input" /></label>
          <label>Company<input name="company" type="text" placeholder="Company name" required data-testid="contact-company-input" /></label>
          <label>Message<textarea name="message" rows="4" placeholder="What should PMSalad help you see?" data-testid="contact-message-input" /></label>
          <button type="submit" className="btn btn-primary" data-testid="contact-form-submit-button">
            Send request <Send size={16} />
          </button>
          {status && <p className="form-status" data-testid="contact-form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section final-section" data-testid="final-cta-section">
      <ThreeGraphStage className="final-graph" />
      <div className="container final-card hero-grain" data-reveal>
        <span className="eyebrow">GET STARTED</span>
        <h2>Your team’s execution reality. Visible. Finally.</h2>
        <p>Set up in 15 minutes. Import your team. The execution map builds itself.</p>
        <div className="final-actions">
          <ButtonLink href={START_FREE_URL} className="btn-large" testid="final-start-free-button">
            Start free <ArrowRight size={17} />
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary" className="btn-large" testid="final-book-demo-button" onClick={(event) => scrollToSection(event, "#contact")}>
            Book a demo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-testid="footer-section">
      <div className="container footer-grid">
        <div>
          <a href="#hero" className="brand-link" data-testid="footer-logo-link" onClick={(event) => scrollToSection(event, "#hero")}>
            <LogoMark /> PMSalad
          </a>
          <p>Causal execution reality for teams that ship.</p>
        </div>
        <div><h4>Product</h4><a href="#features">Features</a><a href="#templates">Templates</a><a href="#pricing">Pricing</a></div>
        <div><h4>Company</h4><a href="#contact">About</a><a href="#docs">Docs</a><a href="#contact">Contact</a></div>
        <div><h4>Legal</h4><a href="#contact">Privacy</a><a href="#contact">Terms</a></div>
      </div>
      <div className="container footer-bottom">Built for teams that ship. © 2026 PMSalad.</div>
    </footer>
  );
}

function LandingPage() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return undefined;
    const context = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 981px)").matches;

      gsap.fromTo(
        ".hero-word",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.78, stagger: 0.055, ease: "power3.out", delay: 0.18 }
      );

      gsap.to(".hero-video-veil", {
        opacity: 0.62,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        if (element.closest(".ai-section")) {
          gsap.set(element, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          element,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 84%" },
          }
        );
      });

      if (isDesktop) {
        gsap.utils.toArray("[data-laptop-image]").forEach((laptop) => {
          const lid = laptop.querySelector(".laptop-lid");
          const base = laptop.querySelector(".laptop-base");
          if (!lid || !base) return;

          gsap.set(lid, {
            rotationX: -68,
            y: 58,
            opacity: 0.92,
            transformPerspective: 1200,
            transformOrigin: "50% 100%",
          });
          gsap.set(base, { scaleX: 0.82, opacity: 0.78, transformOrigin: "50% 0" });

          gsap.to(lid, {
            rotationX: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: laptop,
              start: "top 88%",
              end: "top 48%",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });
          gsap.to(base, {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: laptop,
              start: "top 88%",
              end: "top 48%",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });
        });

        rootRef.current.querySelectorAll("[data-laptop-image] img").forEach((image) => {
          if (image.complete) return;
          image.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
        });
      }


      if (isDesktop && document.querySelector(".scroll-story-section")) {
        ScrollTrigger.create({
          trigger: ".scroll-story-section",
          start: "top top",
          end: "bottom bottom",
          pin: ".scroll-story-visual",
          pinSpacing: false,
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: ".scroll-story-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })
          .to(".story-visual-inner", { rotationY: 18, rotationX: -5, scale: 1.04, ease: "none" }, 0)
          .to(".story-tile-one", { x: -38, y: -34, rotation: -4, ease: "none" }, 0)
          .to(".story-tile-two", { x: 42, y: -24, rotation: 5, ease: "none" }, 0.16)
          .to(".story-tile-three", { x: -26, y: 46, rotation: 4, ease: "none" }, 0.32)
          .to(".story-tile-four", { x: 34, y: 44, rotation: -5, ease: "none" }, 0.48)
          .to(".story-progress i", { height: "100%", ease: "none" }, 0);
      }

      gsap.utils.toArray(".story-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.42, scale: 0.94, y: 42 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            scrollTrigger: { trigger: card, start: "top 72%", end: "bottom 42%", scrub: 0.7 },
          }
        );
      });

      gsap.fromTo(
        ".role-card",
        {
          opacity: 0,
          y: (index) => [80, 120, 70][index] || 80,
          x: (index) => [-160, 30, 160][index] || 0,
          rotationZ: (index) => [-14, 10, 16][index] || 0,
          scale: 0.86,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotationZ: (index) => [-4, 0, 4][index] || 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.16,
          ease: "elastic.out(1, 0.65)",
          scrollTrigger: { trigger: ".roles-section", start: "top 70%" },
        }
      );

      gsap.to(".role-card", {
        y: (index) => [8, -10, 7][index] || 0,
        rotationZ: (index) => [-2, 1.5, 3][index] || 0,
        duration: 2.8,
        stagger: 0.18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: { trigger: ".roles-section", start: "top 75%", end: "bottom top", toggleActions: "play pause resume pause" },
      });

      if (isDesktop && document.querySelector(".ai-scroll-track")) {
        const aiTrack = document.querySelector(".ai-scroll-track");
        const aiShell = document.querySelector(".ai-scroll-shell");
        const travel = () => Math.max(0, aiTrack.scrollWidth - aiShell.clientWidth);
        gsap.to(aiTrack, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: ".ai-section",
            start: "top top",
            end: () => `+=${travel() + window.innerHeight * 0.9}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, rootRef);
    return () => context.revert();
  }, [reduced]);

  const sections = useMemo(() => [
    Hero,
    ProblemStrip,
    ScrollStorySection,
    CoreGraphSection,
    MeetingsAISection,
    RolesSection,
    AIFeaturesGrid,
    TemplatesSection,
    ScoringSection,
    IntegrationMoment,
    PricingSection,
    DocsSection,
    ContactSection,
    FinalCTA,
  ], []);

  return (
    <div className="landing-page" ref={rootRef}>
      <StickyNav />
      <main>
        {sections.map((Section, index) => <Section key={index} />)}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return <LandingPage />;
}

export default App;
 App;
