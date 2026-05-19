# plan.md — PMSalad Premium Landing Page (Immersive Scroll Upgrade)

## 1) Objectives
- Ship a **premium, immersive, mint/light** PMSalad landing page (React) with **Elementor-style scroll storytelling** (pinned sequences, cinematic transitions) that stays **concise** and easy to understand.
- Use PMSalad’s true brand palette consistently:
  - `--pms-mint-bg #E8F5F0`, `--pms-steel #4A6478`, `--pms-teal #3DAA8F`, `--pms-teal-light #5BBFA8`, `--pms-card #D4DCE4`, `--pms-navy #1A2B3C`, `--pms-muted #6B7A8D`
- Enforce wording rules everywhere visible:
  - Replace **“node” → “task/ticket”**
  - Replace **“DAG” → “graph”**
- Wire CTAs to real destinations (**current state — verified**):
  - **Start free →** https://pmsalad-f.vercel.app/
  - **Sign in →** https://pmsalad-f.vercel.app/
  - **Book a demo →** `#contact` (on-page contact form) + **mailto fallback** `mailto:hello@pmsalad.com?subject=Book%20a%20PMSalad%20demo`
- Showcase real product UI by embedding the uploaded screenshots in premium mockups (**current state — verified**):
  - Execution Map screenshot
  - Kanban screenshot
  - My Tasks screenshot
  - Carrot/Meetings AI screenshot
- **Hero goal (current state — verified):** make the uploaded MP4 feel visible and cinematic:
  - Full-bleed background video (plus a “focus” crop on the right side)
  - Headline/subtitle/CTAs directly over video (no blocking card)
  - Smooth “flow” motion between text + background
  - **Hero trust indicators removed** (“Works without Jira”, “Setup in 15 minutes”, “AI-native from day one”).
  - Fix hero section copy/visual issue:
    - **No bullet-like dot artifact** on the hero eyebrow
    - Subheadline avoids “AI” being misread as “Al” by using **built-in intelligence** wording
- **Immersion goal (current state — verified):** increase “wow” factor without heavy copy:
  - Pinned scroll sequences
  - Purposeful GSAP transitions + card motion
  - Role cards use a shuffle/deck feel
  - AI section uses a **side-by-side card shuffle/scroll** interaction (no per-icon animations)
- **New (latest) requirement (current state — verified):**
  - Product screenshot mockups **flip open** as users scroll (imitating opening a laptop), and **remain stable**.
- Pass `testing_agent_v3`, ensure accessibility, responsive behavior, `prefers-reduced-motion`, and `data-testid` on interactive elements (**current state — verified**).

---

## 2) Implementation Steps

### Phase 1 — Core POC (Landing animation + asset pipeline) ✅ COMPLETED
User stories
1. As a visitor, I see the hero video load fast and look crisp on desktop and mobile.
2. As a visitor, scrolling triggers smooth section transitions without jank.
3. As a visitor with reduced-motion enabled, I still get a clean experience without heavy animations.
4. As a visitor, screenshots appear in premium mockups and remain readable.
5. As a visitor, CTAs always navigate correctly.

What we did (completed)
- Installed and verified dependencies: `gsap`, `three`.
- Created and ran `/app/tests/test_core_pmsalad_landing.py`:
  - Verified MP4 + 4 screenshots reachable and correct content types.
  - Verified CTA destinations (signup/login/#contact/mailto) at the time.

Exit criteria (met)
- Assets reachable and render-ready.
- Animation foundation ready.

---

### Phase 2 — V1 Landing Page Build (MVP, premium) ✅ COMPLETED
User stories
1. Sticky nav smooth-scrolls to Features/Templates/Pricing/Docs.
2. Visitor understands PMSalad quickly.
3. Visitor sees real product UI on page.
4. CTAs navigate correctly.

What we built (completed)
- Full landing page with sections, embedded screenshots, contact form (mailto fallback), and basic GSAP/Three.

Testing checkpoint (passed)
- `testing_agent_v3` passed.

---

### Phase 3 — Immersive Scroll + 3D Upgrade (Elementor-inspired) ✅ COMPLETED
Context / requirement update
- User feedback: page needed more immersive motion.

What we built (completed)
- Added a pinned scroll storytelling section (`#scroll-story`) with GSAP ScrollTrigger and Three.js accents.
- Enhanced hover transitions and visual depth.

Testing checkpoint (passed)
- `testing_agent_v3` passed after upgrade.

---

### Phase 4 — Requested Refinements ✅ COMPLETED
Context
- User requested deeper polish: hero visibility, approvals wording, execution map wording, role shuffle feel, AI wording, and tighter explanations.

What we implemented (completed)
- Copy sweep:
  - “execution graph” → “execution map”
  - “approval gate(s)” → “approvals needed”
  - “Semantic Dedup” → “Duplicate Detection”
- Role section: shuffled/deck-like feel.
- Laptops: implemented laptop mockups for all screenshots.
- AI: updated heading for clarity.

Testing checkpoint (passed)
- `testing_agent_v3` passed.

---

### Phase 5 — Corrections / Rework ✅ COMPLETED
Context
- User corrections: route CTAs to the PMSalad root, remove hero trust pills, remove per-icon AI animations, revert cross-team section to single example, stabilize laptops.

What we implemented (completed)
- Routing update (critical):
  - **Sign in →** https://pmsalad-f.vercel.app/
  - **Start free →** https://pmsalad-f.vercel.app/
- Hero trust indicators removed.
- AI section reworked:
  - Removed per-icon/per-card `.ai-animation`.
  - Implemented **side-by-side scroll shuffle** via pinned horizontal track (desktop) and stacked grid (mobile).
- Cross-team section reverted to earlier **single-example** layout.
- Copy tweak:
  - “dependency edge” → “dependencies”.

Testing checkpoint
- `yarn build` passed.
- `testing_agent_v3` passed after follow-up adjustments.

---

### Phase 6 — Final Polish ✅ COMPLETED
Final requested items
1) **Laptop flip-open animation (controlled, non-glitchy)**
- Implemented GSAP ScrollTrigger flip-open animation for each laptop:
  - Lid rotates from closed → open while scrolling into view.
  - Uses short scrub window and `invalidateOnRefresh`.
  - Adds image-load listeners that call `ScrollTrigger.refresh()` to prevent jitter.
  - Mobile/tablet stays stable.

2) **Hero section copy/visual fix**
- Removed the bullet-like dot artifact for the hero eyebrow.
- Updated hero subtitle to use **built-in intelligence** wording to avoid “AI” being misread.
- Ensured hero remains readable while the salad bowl video stays visibly moving.

3) QA / Testing
- Ran:
  - ESLint
  - `yarn build`
  - `testing_agent_v3`

Testing checkpoint (passed)
- Final regression `testing_agent_v3` report: `/app/test_reports/iteration_1.json`
  - **Frontend success: 100%**
  - Verified:
    - Hero eyebrow clean (no dot)
    - Subtitle uses built-in intelligence wording
    - Hero video visible/playing
    - Start free + Sign in route to https://pmsalad-f.vercel.app/
    - 4 screenshots in Mac laptop mockups
    - Laptop flip-open animations work on scroll
    - Mobile stable
    - AI section side-by-side shuffle
    - Cross-team section reverted single example
    - No disallowed terms
    - No console/GSAP/CSS runtime errors
    - Mobile menu works

---

## 3) Next Actions
1. (Optional) Micro-polish performance:
   - Tune ScrollTrigger start/end thresholds for the laptop flip if needed based on real-user feel.
   - Consider lazy-loading heavier visuals for first paint speed.
2. (Optional) Content pass:
   - Ensure all copy stays consistently short and direct as new features are added.
3. Ship / deploy.

---

## 4) Success Criteria
- Hero shows the salad bowl video clearly moving, with readable text directly over it.
- Hero label/headline/subheadline/CTAs render cleanly (no bullet-like artifacts; no “Al” confusion).
- Start free and Sign in route to **https://pmsalad-f.vercel.app/**.
- Product screenshots appear in **clean Mac laptop mockups** and **flip open** smoothly on scroll (desktop), with a stable mobile fallback.
- AI features are presented as a **side-by-side scroll shuffle/carousel** (no per-icon animations).
- Cross-team section is reverted to the earlier single-example layout.
- Copy is concise; no visible “node” or “DAG”; uses **task/ticket** and **graph**.
- Any visible “execution graph” replaced with **“execution map”**.
- “approval gate” replaced with **“approvals needed”**.
- “dependency edge” replaced with **“dependencies”**.
- Responsive, accessible, reduced-motion compliant.
- `testing_agent_v3` passes with no critical issues.