<!-- stardust:provenance writtenBy: stardust:prototype; readArtifacts: current/pages/index.json, current/_brand-extraction.json, DESIGN.md, DESIGN.json, direction.md; capturedSourceLineage: listed by section below; synthesized: page composition; authored: confirmed in user brief -->
# Home — approved page brief

Mode: Persuade. Build path: code-led, using captured media and the user-confirmed identity system.
Surprise: low; brand-faithful improvements, with source signature preservation exempt.
Fidelity: refined. Status: brief approved; prototype approval is still pending.

## First viewport
Official 3M lockup top-left, product/industry/brand navigation, persistent visible search field.
One H1, original headline, in a white two-column span opposite the original scientific film. Strong red rectangular action and a small meaningful red bar tie the layout to the PDF's identity grammar.
No overlaid headline or video-dependent content; no promotional claims added.

## Sections
1. **Header** — captured header/search, `pages/index.json#forms` and `ctas`; `data-section=header`, `data-intent=product and audience discovery`, `data-layout=contained`.
2. **Hero** — captured `heroHeadline` and `heroVideo`; `data-section=hero`, `data-intent=show science in context`, `data-layout=split-media`, `data-media=video`. One H1.
3. **What we do** — captured ten `industries` panels; `data-section=industries`, `data-intent=find an industry solution`, `data-layout=side-rail`, `data-interactive=tabs`. H2 then active-panel H3. Promoted to serve improvement 4.
4. **What's new** — captured six `news` records; `data-section=news`, `data-intent=demonstrate current innovation`, `data-layout=split-media`, `data-items=6`. H2; all titles are H3.
5. **Ask 3M** — captured assistant headline/body, CTA and exact image; `data-section=assistant`, `data-intent=reach technical expertise`, `data-layout=split-media`. H2, external original assistant link. No local simulated AI.
6. **Who we are** — captured headline and seven company links plus captured company texture; `data-section=company`, `data-intent=understand the company`, `data-layout=grid`. H2; identity statement as a paragraph, not a second competing hero.
7. **Footer** — captured company, news, regulatory, help, legal and social destinations; `data-section=footer`, `data-intent=provide institutional and support access`, `data-layout=grid`. Group headings H2 with compact role styling.

## Layout strategy
Three-column grid inside 1344px maximum content width. Header margin 48px desktop, 24px mobile; unchanged lockup aspect ratio with protected whitespace.
Hero: white text region spans one-and-a-half columns; film spans the remainder, not a background crop. 72px desktop H1 with 1.1 leading.
Industry section: left selector column and right two-column image/panel; all ten panels available. Mobile uses an accessible labeled select.
News: one lead story and five horizontal story links; tablet/mobile stack. No arbitrary title truncation.
Assistant: one red horizontal communication surface, with white copy and original photo at right.
Company: original texture retained as a meaningful image panel; links form a simple two-column list.
Footer: full content, four groups plus social/legal area. Small-screen groups use native details disclosure if needed.

## Anti-template pass
- Hero: considered full-bleed text-overlay film, centered headline, and split film/white message. Picked split: source media survives, no scrim-dependent reading, and search/routing stays visible. Reference: IBM design language's explicit system structure; source signature governs imagery.
- Industries: considered image-card wall, inline alphabetical list and source-like selector/detail panel. Picked selector/detail with more readable responsive controls; preserves all authored panels without ten repeated full images. Reference: BASF's retrieved industry/solution pathways.
- News: considered six equal cards, chronological text-only list and lead-story/five-story composition. Picked varied lead/list: fixes measured equal-weight repetition without dropping story content. Reference: Design Museum's retrieved content-specific story destinations.
- Company: considered dark card wall, pure text list and source-texture panel with clear link list. Picked texture/list: carries source identity and avoids decorative icon repetition.

## Signature elements
Kind: hero video. Source: `pages/index.json#heroVideo`. Mechanism: original local MP4 in first-viewport video panel; muted autoplay only outside reduced motion. Fallback: verified frame poster; pause/play control; no-JS poster visible.
Kind: company texture. Source: captured CSS background. Mechanism: same image in the company image role; no generated grain.

## Substrate transitions
Default: white. Exception: red assistant communication surface, serving access to technical expertise. White→red→white: two transitions only.

## Voice classification
Header navigation: captured-verbatim; search helper/menu labels: direction-authorized UI chrome.
Hero H1: captured-verbatim. Primary routing action: direction-authorized label referencing the captured industry path.
Industries: captured-verbatim, including every title, paragraph and sublink.
News: captured-verbatim, full six titles and dates; omit truncated summary fragments rather than invent their endings.
Assistant: captured-verbatim headline, body and CTA.
Company: captured-verbatim identity statement and link labels.
Footer: captured-verbatim labels/destinations; "Account" goes to the source site instead of a fake login.

## Interaction and key states
Search: native GET form, `Ntt` parameter, captured 3M products endpoint, required labeled input. Empty-query prevention through native validation.
Menu: native disclosure with real links, keyboard/touch operation and Escape handling.
Industries: ARIA tablist, one selected tab, arrows/Home/End, panel updates; mobile select maps to the same data.
Video: poster-first, non-reduced-motion playback, pause/play, load failure leaves poster and control unavailable; reduced-motion change pauses.
Links: clear hover/underlines, visible focus, no fabricated routes. Each news row is a complete target.

## Unsourced content
None. No invented metrics, portraits, brand claims or quotes.
Prototype-only UI chrome (Menu, Play/Pause film, search label) is authorized by this brief.

## Approval boundary
Build the prototype now. Do not change EDS scripts/blocks or publish content until the user approves the finished homepage.
