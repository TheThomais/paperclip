# Katailyst Agent-Team Use Cases and Starter Surface Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make Paperclip/Katailyst feel like a clear set of useful HLT operating teams instead of a technical adapter/example shelf.

**Architecture:** Keep Paperclip as the operator-visible team/control-plane. Use Katailyst MCP as the optional amplifier that resolves canon, fetches playbooks, creates typed artifacts, reviews outputs, records receipts, and feeds learning back. Starter cards should name outcomes in plain language; registry refs, MCP tool names, schemas, and subagent routing stay hidden until expanded.

**Tech Stack:** Paperclip React UI, Paperclip company/agent/task model, Katailyst MCP registry/tool APIs, Thomas/Hermes bridge, OpenClaw/Claude coworker external clients, MasteryPublishing, MMM2, EBB.

---

## 1. What external agent-team examples suggest

### Garry Tan / YC GStack

Source: Y Combinator Startup Library, “Inside Garry Tan's AI Coding Setup” — https://www.ycombinator.com/library/OW-inside-garry-tan-s-ai-coding-setup

Relevant pattern:
- GStack turns Claude Code into an AI engineering team with named skills for office hours, design, code review, QA, and browser testing.
- The strongest concept to copy is not “more agents everywhere.” It is a staged team: pressure-test idea → design → implementation → review → QA/browser test.
- For HLT, this maps cleanly to: **Discover → Plan → Draft → Review → Publish/Measure**, with article production as the first visible team.

Import stance:
- Consider importing/reading GStack skills as external inspiration if license allows.
- Do not make Paperclip a GStack clone. Treat it as a pattern library: office-hours/adversarial review, design review, QA/browser test.

### Cosmic Team Agents in Slack/WhatsApp/Telegram

Source: Hacker News Show HN thread, “Team agents that manage your CMS from Slack, WhatsApp, and Telegram” — https://news.ycombinator.com/item?id=47590079

Relevant pattern:
- Persistent named agents live in chat channels with roles, memory, and capabilities.
- The loop they describe is useful: computer-use agents pull analytics, content agent synthesizes findings, content agent plans next content, code agent ships technical fixes.
- Their strongest content example is: create content → publish → measure performance → use data to decide what to create next.

Import stance:
- This is very close to HLT's article/MasteryPublishing/EBB loop.
- We should make this visible as a **Content Growth Team** card, not as technical configuration.

### Multi-channel Telegram/Discord/Slack agent gateways

Source: Learn OpenClaw “Multi-Channel Bots with OpenClaw: Telegram, Discord & Slack” — https://resources.learnopenclaw.ai/multi-channel-bots-with-openclaw-telegram-discord-slack/

Relevant pattern:
- One gateway normalizes channels and routes messages; it avoids duplicate bots, duplicated cost, and context loss.
- Identity binding matters: the same operator across Telegram/Slack/Discord should not become three separate people in memory.
- Channel choice should influence response style and delivery, not change the underlying workflow.

Import stance:
- Paperclip should not ask operators to build channel plumbing in the first screen.
- Starter cards can say “Send the daily article queue to Telegram” or “Watch CI and page Telegram,” while config expands only when needed.

## 2. Internal HLT/Katailyst canon found

### Article/content factory refs

- `playbook:make-article` — flagship article factory playbook.
- `skill:hlt-product-article-creation-playbook` — product-context overlay.
- `kb:hlt-article-ingredient-menu` — article lanes, hooks, renderer blocks, multimedia/rich-block ideas.
- `kb:hlt-article-multimedia-placement-guide` — how to plan images/rich blocks without making every article a media circus.
- `rubric:article-quality-v1` and `skill:llm-as-judge-content` — article/content review.
- `schema:topic_brief_v1`, `schema:article_v2`, `schema:editorial_pass_v1` — typed content factory artifacts.
- `tool:katailyst.create_topic_brief`, `tool:katailyst.create_article_draft`, `tool:katailyst.create_editorial_pass` — MCP draft/review write path.
- `kb:hlt-app-mastery-publishing` — render/publish destination owner.
- `kb:hlt-app-sidecar` — content factory/operator approval lineage.

### Demand, SEO, data, and measurement refs

- `skill:student-demand-content-research` — DataForSEO demand + student/community language + QBank/product struggle evidence.
- `kb:student-demand-topic-selection` — topic selection doctrine.
- `kb:content-performance-playbook` — performance learning loop.
- `kb:hlt-app-ebb` — EBB measurement/evidence owner.
- `kb:strategy-vision-content-engine` — NCLEX content marketing strategy.

### QBank and education refs

- `kb:hlt-product-config-nclex-rn` — NCLEX RN QBank extraction/reuse.
- `bundle:question-studio-kit` — routes one QBank question into article/social/visual/video/ad/email lanes with provenance.
- `kb:hlt-article-education-draft-safety-boundary` — draft-only and safety boundary for education content.

### Registry/self-healing refs

- `kb:registry-reference-bible` — responsible registry use.
- `kb:registry-design-patterns` — duplicate false positives, hub architecture, empty shell detection, cascade awareness.
- `kb:registry-write-routing` — what should become `kb`, `skill`, `agent_doc`, or `operational_log`.
- `playbook:registry-self-healing-operating-loop` — durable cleanup/self-healing loop.
- `hub:hub-hermes-self-repair`, `hub:hub-skills`, `hub:hub-registry` — orientation hubs.
- `skill:skill-creator` — capability intake/creation.

### Media/MMM refs

- `kb:hlt-app-multimedia-mastery` — MMM2 Media Kernel profile.
- `skill:image-prompting` — image prompt/visual generation skill.
- `kb:hlt-article-multimedia-placement-guide` — article media placement.

### Nurse recruiting refs

- `skill:nurse-recruiter` — nurse recruiting orchestration.
- `skill:browserbase-nurse-recruiting` — discover/polish nurse jobs via Browserbase/Stagehand/Exa.
- `kb:hlt-app-jobs` — Nursing Mastery Careers app profile.

Boundary: tutoring users are not recruiting leads unless they explicitly opt in through the career-coach/careers surface. Paperclip must expose this as a hard gate, not a tiny footnote.

### Agent/fleet refs

- `agent:victoria` — content publishing/orchestration + QA/registry stewardship.
- `agent_doc:agent-sop-victoria` and `agent_doc:victoria-identity-agents` — Victoria startup/rules.
- `agent_doc:agent-sop-lila` and `agent_doc:lila-identity-agents` — Lila marketing/content/multimedia/audience research.
- `agent_doc:agent-sop-julius` and `agent_doc:julius-identity-agents` — Julius operations/planning/follow-through.
- `agent:ares` — specialist fleet work outside Victoria/Lila/Julius lanes.
- `agent_doc:thomas-identity-agents` and `agent_doc:thomas-identity-soul` — Thomas as durable parent orchestrator.
- `agent_doc:agent-operating-bible` and `agent_doc:global-catalyst-guide` — shared fleet doctrine.

## 3. Core use cases Paperclip should show first

### A. Draft and review an HLT article

Visible card copy:
- **Draft and review an HLT article**
- “Find the topic, draft the article, add media ideas, review it, and stop before anything publishes.”

Hidden team:
- Lead: Victoria or Thomas.
- Research: demand/SEO/QBank/student voice agent.
- Writer: ArticleV2 writer.
- Media: MMM/visual brief agent.
- Reviewer: article-quality + clinical/safety when needed.
- Publisher: MasteryPublishing handoff only after approval.
- Measurement: EBB readback.

Hidden Katailyst path:
1. `katailyst.prepare_context_pack`
2. `registry.search` / `katailyst.orchestrate`
3. `playbook:make-article`
4. `skill:student-demand-content-research`
5. `katailyst.create_topic_brief`
6. `katailyst.create_article_draft`
7. `katailyst.create_editorial_pass`
8. MasteryPublishing draft receipt
9. EBB performance readback

Why this should be first:
- It connects the most existing canon.
- It produces a real business artifact.
- It demonstrates MCP as an amplifier without making the operator learn MCP.

### B. Improve the registry

Visible card copy:
- **Add or improve a skill**
- “Turn notes, examples, or repeated wins into a reusable Katailyst block.”

Hidden team:
- Intake: classify entity type.
- Dedupe: search + graph traversal.
- Builder: draft skill/KB/playbook/schema.
- Reviewer: rubric + eval + examples.
- Steward: tags, links, readback, receipt.

Hidden Katailyst path:
- `hub:hub-skills`, `skill:skill-creator`, `kb:registry-design-patterns`, `kb:registry-write-routing`, `playbook:registry-self-healing-operating-loop`.

### C. Compare two versions

Visible card copy:
- **Choose the better version**
- “A/B two article hooks, prompts, images, or skill drafts and keep the lesson.”

Hidden team:
- Variant maker.
- Blind reviewer.
- Rubric judge.
- Operator vote capture.
- Learning/receipt writer.

Important UX boundary:
- “Choose” records a decision/learning. It must not publish, schedule, send, or spend.

### D. Create QBank-powered content

Visible card copy:
- **Turn a QBank question into content**
- “Use one question to make a study article, visual, social post, or email — with source grounding.”

Hidden team:
- QBank scout/extractor.
- Learner misconception analyst.
- Writer/media agent.
- Safety/clinical reviewer.

Hidden refs:
- `kb:hlt-product-config-nclex-rn`, `bundle:question-studio-kit`, `kb:hlt-article-education-draft-safety-boundary`.

### E. Plan content from demand

Visible card copy:
- **Find article opportunities**
- “Use search demand, student language, QBank struggle signals, and gaps to pick what to write next.”

Hidden team:
- SEO/data agent.
- Community/student voice agent.
- Product/QBank signal agent.
- Topic scorer.

Hidden refs:
- `skill:student-demand-content-research`, `kb:student-demand-topic-selection`, `kb:content-performance-playbook`, `kb:hlt-app-ebb`.

### F. Build a nurse recruiting pipeline

Visible card copy:
- **Polish nurse jobs and outreach**
- “Clean up job posts, match them to nurse personas, and draft outreach — only for opted-in career users.”

Hidden team:
- Jobs scraper/polisher.
- Nurse persona matcher.
- Outreach writer.
- Consent gate.
- Performance/readback.

Hidden refs:
- `skill:nurse-recruiter`, `skill:browserbase-nurse-recruiting`, `kb:hlt-app-jobs`.

### G. Make ad and media variants

Visible card copy:
- **Make ad and media concepts**
- “Turn a message into image, carousel, short video, and ad variants for review.”

Hidden team:
- Offer/source grounding.
- Copywriter.
- MMM image/video planner.
- Reviewer.
- Scheduler/delivery gate.

Hidden refs:
- `kb:hlt-app-multimedia-mastery`, `skill:image-prompting`, `kb:hlt-article-multimedia-placement-guide`, social/campaign playbooks.

### H. Watch the system and self-heal

Visible card copy:
- **Find what needs fixing**
- “Scan registry, graph, MCP, routes, and recent runs; propose safe repairs.”

Hidden team:
- Health scanner.
- Dedupe/orphan inspector.
- Proposal writer.
- Reviewer.
- Thomas implementer when code changes are needed.

Hidden refs:
- `playbook:registry-self-healing-operating-loop`, `playbook:registry-health-scan`, `hub:hub-hermes-self-repair`.

## 4. How internal agents should work together

### Thomas

Role: durable parent orchestrator and implementation lane.

Use for:
- GitHub branches/PRs.
- Long-running work.
- VPS/bridge/runtime verification.
- Safe Paperclip/Katailyst code changes.

### Victoria

Role: registry/content QA and operations co-pilot.

Use for:
- Article workflow orchestration.
- Registry stewardship.
- Critical review/readback.
- Content quality and publishing readiness.

### Lila

Role: marketing/content/audience/media packaging.

Use for:
- Audience voice research.
- Article/social/ad polish.
- MMM/media prompt planning.
- Campaign packaging.

### Julius

Role: operations, planning, dashboards, follow-through.

Use for:
- Work queues.
- Status/receipts.
- Weekly rollout readiness.
- Operator-facing reporting.

### Ares

Role: flexible specialist lane.

Use for:
- Unusual/specialist tasks.
- Red-team/edge-case review.
- Technical work not owned by the other lanes.

## 5. UX changes to make this understandable

### Replace adapter-first onboarding with outcome-first setup

Current problem:
- “Choose adapter” and “agent type” appear before the operator knows what useful work this will do.

Proposed flow:
1. **What do you want done?**
2. Pick a clear use case card.
3. Paperclip chooses a starter team and optional Katailyst refs.
4. Operator can expand “How this works” for MCP/tools/agents.
5. Paperclip creates the first issue/team/task.

### Starter card shelf

First shelf should be:
- Draft and review an HLT article
- Find article opportunities
- Turn QBank into content
- Add or improve a skill
- Choose the better version
- Polish nurse jobs and outreach
- Make ad and media concepts
- Find what needs fixing

Each card needs:
- one-line outcome
- “what you get” bullets
- optional “uses Katailyst” badge
- “approval needed before publish/send/spend” indicator where relevant

### Keep Katailyst as amplifier, not dependency

Card behavior:
- If Katailyst MCP is available: use it for canon, tools, schemas, review, and receipts.
- If unavailable: create a Paperclip plan/issue and mark “Katailyst context unavailable; run can continue with limited grounding.”
- Do not hard-fail basic planning because MCP is offline.
- Do hard-stop canonical writes/publishing if MCP/canon is required for the artifact.

### Make agent teams visible as teams, not plumbing

Visible labels:
- Researcher
- Writer
- Reviewer
- Media
- Publisher
- Metrics

Hidden mapping:
- Victoria/Lila/Julius/Ares/Thomas and MCP refs.

## 6. First implementation slice

### Task 1: Add use-case catalog data

Create a frontend module such as:
- `ui/src/lib/hlt-use-case-catalog.ts`

It should define typed starter cards:
- id
- label
- shortDescription
- outcomeBullets
- teamRoles
- optionalKatailystRefs
- approvalBoundary
- fallbackBehavior
- defaultTaskTitle
- defaultTaskDescription

### Task 2: Replace hardcoded onboarding examples with catalog cards

Modify:
- `ui/src/components/OnboardingWizard.tsx`

Behavior:
- Step 3 shows the use-case catalog cards, not just text chips.
- Selecting a card fills task title/description and shows “team roles” in short human labels.
- Adapter config remains expandable.

### Task 3: Add an article-first card as the default

Default selected card:
- `publish-hlt-article`

Default copy:
- title: “Draft and review an HLT article”
- description includes: topic research, QBank/product signal if available, ArticleV2 draft, media ideas, editorial pass, stop before publish.

### Task 4: Add Katailyst readiness indicator

Add a small non-blocking indicator:
- “Katailyst context: available / not checked / unavailable”

Do not expose raw MCP tool names unless expanded.

### Task 5: Add tests

Add or extend tests around:
- catalog contains required core cards
- selecting a card applies title/description
- card copy does not expose raw internal schema/tool plumbing by default
- recruiting card includes consent boundary text

### Task 6: Validate

Run:
- `pnpm --filter @paperclipai/ui typecheck`
- focused Vitest for onboarding/catalog tests
- `git diff --check`

## 7. Open questions / gaps

- Need Source: exact nurse recruiting site URL/repo before implementing scraping/polishing against the live job source.
- Need Source: exact OpenClaw presentation/ad materials if we want to import those ad concepts rather than create a generic “ad/media variants” card.
- The “10 article types” exist in Create/playbooks, but Paperclip should pull them from Katailyst/registry rather than hardcode all ten in UI.
- The playbook image-not-generated issue likely belongs in the article media-pack/visual-brief path, not the starter card itself.

## 8. Recommended next PR

Build the use-case catalog and onboarding UI slice with **articles first**.

PR title:
- `feat: add HLT use-case starter catalog`

Acceptance:
- Operator sees clear business/use-case cards before technical adapter details.
- “Publish an HLT article” is first/default.
- Katailyst/MCP refs are stored in catalog metadata but hidden in default UI.
- Consent boundary is visible on nurse recruiting card.
- Tests prove core cards exist and raw plumbing is not leaked.
