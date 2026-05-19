{
  "brand": {
    "name": "PMSalad",
    "tagline": "Jira stores tasks. PMSalad stores causal execution reality.",
    "voice": {
      "attributes": ["premium", "direct", "calmly-confident", "systems-thinking", "human"],
      "copy_rules": {
        "keep_it_short": true,
        "max_sentences_per_paragraph": 2,
        "avoid_buzzword_pileups": true,
        "wording_replacements": {
          "node": "task",
          "nodes": "tasks",
          "DAG": "graph",
          "directed acyclic graph": "execution graph"
        }
      }
    }
  },

  "design_personality": {
    "style_fusion": [
      "Light mint enterprise calm (Not dark-tech)",
      "Swiss grid + editorial typography for authority",
      "Bento-grid feature storytelling",
      "Glass-lite panels + subtle grain for tactility",
      "Scroll-reactive 3D/graph motion (GSAP/Three) used as accent"
    ],
    "do_not_do": [
      "No purple-forward palettes",
      "No long explanations",
      "No heavy gradients across reading areas",
      "No centered-page text alignment",
      "No generic SaaS dark hero"
    ]
  },

  "typography": {
    "font_pairing": {
      "headings": {
        "family": "Space Grotesk",
        "google_font_import": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
        "usage": "H1/H2, section titles, nav brand"
      },
      "body": {
        "family": "Work Sans",
        "google_font_import": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap",
        "usage": "Body, captions, UI labels"
      },
      "mono": {
        "family": "Azeret Mono",
        "google_font_import": "https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500;600&display=swap",
        "usage": "Tiny graph labels, code-like chips, metrics"
      }
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-[color:var(--pms-muted)]",
      "section_title": "text-2xl sm:text-3xl font-semibold tracking-tight",
      "card_title": "text-lg font-semibold",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs sm:text-sm text-[color:var(--pms-muted)]"
    },
    "text_rules": {
      "line_length": "max-w-[62ch] for paragraphs",
      "emphasis": "Use bold for 2–4 words only; avoid italics blocks",
      "numbers": "Use tabular-nums for metrics"
    }
  },

  "color_system": {
    "notes": "Use PMSalad light/minty palette. Keep gradients decorative and under 20% viewport. Prefer solid surfaces for reading.",
    "tokens_css": {
      ":root": {
        "--pms-mint-bg": "#E8F5F0",
        "--pms-surface": "#F7FBFA",
        "--pms-card": "#FFFFFF",
        "--pms-card-tint": "#D4DCE4",
        "--pms-steel": "#4A6478",
        "--pms-navy": "#1A2B3C",
        "--pms-muted": "#6B7A8D",
        "--pms-teal": "#3DAA8F",
        "--pms-teal-light": "#5BBFA8",
        "--pms-border": "rgba(26,43,60,0.12)",
        "--pms-ring": "rgba(61,170,143,0.35)",

        "--background": "168 38% 94%",
        "--foreground": "206 39% 17%",
        "--card": "0 0% 100%",
        "--card-foreground": "206 39% 17%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "206 39% 17%",
        "--primary": "166 47% 45%",
        "--primary-foreground": "0 0% 100%",
        "--secondary": "168 28% 92%",
        "--secondary-foreground": "206 39% 17%",
        "--muted": "168 18% 90%",
        "--muted-foreground": "206 16% 42%",
        "--accent": "168 28% 92%",
        "--accent-foreground": "206 39% 17%",
        "--border": "206 20% 86%",
        "--input": "206 20% 86%",
        "--ring": "166 47% 45%",
        "--radius": "14px"
      }
    },
    "semantic_colors": {
      "success": {"bg": "#E7F7F1", "fg": "#0F6B57", "border": "rgba(61,170,143,0.25)"},
      "warning": {"bg": "#FFF6E6", "fg": "#8A5A00", "border": "rgba(255,170,0,0.25)"},
      "danger": {"bg": "#FFECEC", "fg": "#8A1F1F", "border": "rgba(220,38,38,0.22)"},
      "info": {"bg": "#EAF4FF", "fg": "#1E4E7A", "border": "rgba(59,130,246,0.22)"}
    },
    "allowed_gradients": {
      "hero_backdrop": "radial-gradient(1200px 600px at 20% 10%, rgba(61,170,143,0.18), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(91,191,168,0.14), transparent 55%)",
      "section_accent": "linear-gradient(135deg, rgba(61,170,143,0.14), rgba(232,245,240,0.0))"
    },
    "gradient_restriction_rule": {
      "prohibited": [
        "blue-500 to purple-600",
        "purple-500 to pink-500",
        "green-500 to blue-500",
        "red to pink"
      ],
      "limits": [
        "Never let gradients cover more than 20% of the viewport",
        "Never apply gradients to text-heavy content",
        "Never use gradients on small UI elements (<100px width)",
        "Never stack multiple gradient layers in the same viewport"
      ],
      "enforcement": "If gradient area exceeds 20% of viewport OR affects readability, fallback to solid colors."
    }
  },

  "layout": {
    "grid": {
      "container": "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
      "columns": "12-col on desktop; 4-col on mobile",
      "section_spacing": "py-16 sm:py-20 lg:py-24",
      "bento_gap": "gap-4 sm:gap-6",
      "card_padding": "p-5 sm:p-6"
    },
    "page_structure": [
      "Sticky Nav",
      "Hero (video + graph canvas fallback)",
      "Problem (3 cards)",
      "Execution Graph (screenshot + animated graph)",
      "Meetings AI",
      "Role-aware intelligence",
      "AI features bento grid",
      "Workflow templates (Kanban screenshot)",
      "OKR & work scoring (My Tasks screenshot)",
      "Cross-team integration moment",
      "Pricing (simple)",
      "Docs (anchors)",
      "Contact/Demo form",
      "Final CTA",
      "Footer"
    ],
    "copy_density": {
      "hero_subtitle": "<= 22 words",
      "section_intro": "1 sentence",
      "feature_card": "1 sentence + 2 bullets max"
    }
  },

  "components": {
    "component_path": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "label": "/app/frontend/src/components/ui/label.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "carousel": "/app/frontend/src/components/ui/carousel.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx"
    },
    "landing_specific_builds": {
      "sticky_nav": {
        "use": ["navigation-menu", "button", "sheet"],
        "behavior": [
          "Sticky with blur: backdrop-blur-md bg-white/70 border-b border-[color:var(--pms-border)]",
          "On scroll > 12px: add shadow-sm and slightly increase opacity",
          "Mobile: hamburger opens Sheet with anchor links"
        ],
        "ctas": [
          {"label": "Start free", "href": "https://pmsalad-f.vercel.app/signup"},
          {"label": "Sign in", "href": "https://pmsalad-f.vercel.app/login"},
          {"label": "Book a demo", "href": "#contact"}
        ]
      },
      "hero": {
        "structure": [
          "Left: H1 + 1-line subhead + 2 CTAs + 3 proof chips",
          "Right: video in rounded laptop frame; behind it a subtle graph canvas"
        ],
        "video": {
          "treatment": "Rounded-2xl, thin border, soft shadow; autoplay muted loop playsInline; show poster image fallback",
          "overlay": "Add subtle noise overlay via pseudo-element"
        },
        "graph_canvas": {
          "fallback": "If WebGL unsupported or prefers-reduced-motion: show static SVG graph lines",
          "visual": "Thin teal strokes, low opacity, slow parallax"
        }
      },
      "problem_cards": {
        "layout": "3-up on desktop, 1-up on mobile",
        "card_style": "bg-white/80 backdrop-blur border border-[color:var(--pms-border)] rounded-[var(--radius)] shadow-[0_10px_30px_rgba(26,43,60,0.08)]",
        "micro": "Hover: translate-y-[-2px] shadow deepen; icon rotates 6deg"
      },
      "screenshots": {
        "frame_style": "Browser frame with top dots + subtle inner border; optional floating callouts",
        "shadow": "shadow-[0_18px_60px_rgba(26,43,60,0.14)]",
        "tilt": "On desktop only: slight 3D tilt on hover (CSS perspective)"
      },
      "ai_features_bento": {
        "layout": "Bento grid: 2 large + 4 small cards",
        "content": "Each card: title + 1 sentence + 2 bullets max",
        "accent": "Use Badge for labels like 'Meetings', 'Scoring', 'Approvals'"
      },
      "pricing": {
        "approach": "Simple 2-tier cards (Team, Enterprise) + 'Start free' CTA; keep copy minimal",
        "note": "No complex tables; use Accordion for FAQs"
      },
      "contact_form": {
        "fields": ["Name", "Work email", "Company", "Message"],
        "submit": "Send",
        "fallback": "Also show mailto: hello@pmsalad.com (or placeholder) if form not wired",
        "toast": "Use sonner for success/error"
      }
    },
    "button_system": {
      "shape": "Rounded (10–14px), premium",
      "variants": {
        "primary": "bg-[color:var(--pms-teal)] text-white hover:bg-[color:var(--pms-teal-light)] focus-visible:ring-2 focus-visible:ring-[color:var(--pms-ring)]",
        "secondary": "bg-white text-[color:var(--pms-navy)] border border-[color:var(--pms-border)] hover:bg-[color:var(--pms-surface)]",
        "ghost": "bg-transparent text-[color:var(--pms-navy)] hover:bg-black/5"
      },
      "motion": {
        "hover": "transition-colors duration-200; add shadow change only",
        "press": "active:scale-[0.98]"
      }
    }
  },

  "motion": {
    "libraries": {
      "gsap": {
        "use_cases": ["sticky nav state", "section reveals", "pinned graph section", "parallax screenshot panels"],
        "notes": "Respect prefers-reduced-motion; disable ScrollTrigger pinning on small screens"
      },
      "three": {
        "use_cases": ["hero graph particles", "scroll-reactive 3D graph cluster"],
        "fallback": "Static SVG + subtle CSS parallax"
      },
      "framer_motion_optional": {
        "use_cases": ["simple reveals if GSAP not used"],
        "note": "Prefer GSAP for scroll timelines to avoid double systems"
      }
    },
    "principles": {
      "entrance": "Fade + y-translate 12px; stagger 60–90ms",
      "hover": "Cards lift 2px; buttons color shift only",
      "scroll": "One hero parallax + one pinned graph moment; keep rest subtle",
      "reduced_motion": "If prefers-reduced-motion: remove parallax, disable 3D, keep opacity-only transitions"
    },
    "js_scaffold_examples": {
      "gsap_scrolltrigger": "// in a .js component\nimport { useEffect, useRef } from 'react';\nimport gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);\n\nexport default function GraphSection() {\n  const rootRef = useRef(null);\n\n  useEffect(() => {\n    const el = rootRef.current;\n    if (!el) return;\n\n    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n    if (reduce) return;\n\n    const ctx = gsap.context(() => {\n      gsap.fromTo('[data-animate=fade-up]',\n        { opacity: 0, y: 12 },\n        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,\n          scrollTrigger: { trigger: el, start: 'top 70%' }\n        }\n      );\n    }, el);\n\n    return () => ctx.revert();\n  }, []);\n\n  return <section ref={rootRef}>...</section>;\n}\n"
    }
  },

  "visual_effects": {
    "grain": {
      "css": "/* add to a wrapper */\n.hero-grain::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.12\"/></svg>');\n  mix-blend-mode: multiply;\n  opacity: 0.18;\n}\n",
      "usage": "Only on hero/section backdrops; never on text blocks"
    },
    "glass_lite": {
      "class": "bg-white/70 backdrop-blur-md border border-[color:var(--pms-border)]",
      "usage": "Sticky nav, floating callouts, small overlays"
    }
  },

  "accessibility": {
    "contrast": "All text must meet WCAG AA; use --pms-navy for headings on mint backgrounds",
    "focus": "Visible focus ring using --pms-ring; never remove outline",
    "keyboard": "Nav, dialogs, sheets, accordions must be keyboard navigable (shadcn defaults)",
    "reduced_motion": "Honor prefers-reduced-motion; provide non-WebGL fallback"
  },

  "testing": {
    "data_testid_rules": {
      "required_on": ["buttons", "links", "inputs", "menus", "forms", "key info text"],
      "format": "kebab-case describing role",
      "examples": [
        "data-testid=\"nav-start-free-button\"",
        "data-testid=\"nav-sign-in-link\"",
        "data-testid=\"hero-book-demo-button\"",
        "data-testid=\"contact-form-submit-button\"",
        "data-testid=\"pricing-team-start-free-button\""
      ]
    }
  },

  "image_urls": {
    "textures_backgrounds": [
      {
        "category": "subtle-texture",
        "description": "Optional decorative background texture for hero (use very low opacity).",
        "url": "https://images.pexels.com/photos/7130558/pexels-photo-7130558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        "category": "teal-texture",
        "description": "Optional section divider texture (crop + blur).",
        "url": "https://images.unsplash.com/photo-1593016836274-72b5cca2d7cc?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
      }
    ],
    "product_screenshots": [
      {
        "category": "dependency-graph",
        "description": "Use provided execution map screenshot in a browser/laptop frame in the Execution Graph section.",
        "url": "USE_USER_UPLOADED_EXECUTION_MAP_SCREENSHOT_URL"
      },
      {
        "category": "workflow-templates",
        "description": "Use provided Kanban screenshot in Workflow Templates section.",
        "url": "USE_USER_UPLOADED_KANBAN_SCREENSHOT_URL"
      },
      {
        "category": "scoring-ai",
        "description": "Use provided My Tasks/Carrot screenshot in OKR & Work Scoring section.",
        "url": "USE_USER_UPLOADED_MY_TASKS_SCREENSHOT_URL"
      }
    ],
    "hero_video": [
      {
        "category": "hero",
        "description": "Use the uploaded MP4 as the hero demo video (autoplay muted loop).",
        "url": "USE_USER_UPLOADED_MP4_URL"
      }
    ]
  },

  "instructions_to_main_agent": {
    "global_css_updates": [
      "Replace default App.css demo styles; do not center align .App.",
      "In index.css :root, override shadcn tokens to match PMSalad palette (keep light theme).",
      "Add utility classes for grain overlay and glass-lite panels (no transition: all)."
    ],
    "landing_page_implementation": [
      "Build a single-page route with anchored sections (#features, #templates, #pricing, #docs, #contact).",
      "Sticky nav uses shadcn NavigationMenu + Sheet for mobile; include real CTA URLs.",
      "Hero: left copy + CTAs; right video in laptop frame; behind it a subtle graph canvas (Three.js) with reduced-motion fallback.",
      "Use screenshots directly in clean frames; add small callouts as glass-lite chips.",
      "Ensure all interactive elements and key info have data-testid attributes.",
      "Copy must never use the words 'node' or 'DAG' visibly; use 'task/ticket' and 'graph'."
    ],
    "libraries": {
      "required": [
        "gsap (ScrollTrigger)",
        "three (optional for hero/graph)",
        "sonner (toasts)"
      ],
      "install_commands": [
        "npm i gsap three",
        "// sonner already present via shadcn component"
      ]
    }
  },

  "appendix_general_ui_ux_design_guidelines": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
