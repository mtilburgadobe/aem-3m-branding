# Journal - 3M redesign

Chronological prompt journal. Most recent entry is at the bottom.

---

## 2026-11-09 - Brand-bound homepage prototype

**Prompt:** Redesign the 3M website with Stardust while following the supplied visual identity PDF.

**Decisions:**
- Deliver the homepage prototype first; AEM implementation waits for explicit approval of the finished design.
- Retain the supplied identity, approved artwork, exact digital red and PDF-permitted Arial/Helvetica fallback; do not redistribute unverified proprietary fonts.
- Use balanced density and the user-approved reimagined composition, preserving factual content and key journeys.
- Keep original scientific film with a same-film poster, pause/reduced-motion behavior and failure/retry handling.
- Preserve all ten industries, six complete news titles, the original Ask 3M referral and institutional footer.
- Preserve Account/location at every breakpoint; use a native menu on tablet/phone and a native industry select on phone.

**Artifacts touched:**
- `PRODUCT.md`, `DESIGN.md`, `DESIGN.json` - created target product and identity contracts.
- `stardust/current/pages/index.json`, `index.html`, `_crawl-log.json`, `_brand-extraction.json` - created live-source evidence.
- `stardust/current/PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, `brand-review.html` - created descriptive source review.
- `stardust/direction.md` - created approved direction and transparent late protocol record.
- `stardust/prototypes/home-shape.md`, `home-improvements.md`, `home-proposed.html` - created approved brief, improvement rationale and proposed homepage.
- `stardust/prototypes/assets/` - bundled original media and PDF artwork; optimized film/news imagery; embedded raster origins and recorded source manifest.
- `stardust/validation/home/` - captured responsive renders, independent reviews, detector evidence, real film failure/retry states and focused fix confirmations.
- `stardust/state.json`, `status.jsonl` - recorded extracted, directed and prototyped states; approval remains pending.
- `.gitignore`, `.hlxignore`, `stardust/.gitignore` - configured artifact/secret exclusions and excluded Stardust material from EDS delivery.
- Installed Stardust and Impeccable references, supplied 3M PDF and extracted text - read as workflow and visual authority.

**Findings worth flagging:**
- Ordinary headed bundled Chromium could render the live homepage when HTTP/headless approaches returned 403; no stealth modification was needed.
- The PDF's current digital red and explicit system-font fallback override legacy website styling and generic detector preferences.
- The FORM seed was captured after initial rendering, not before: key `39dd7045`, revision `c3b204a1eed6`, deal `3/1/4`. The already approved brief wins; no alternative choice or initial protocol compliance is fabricated.
- A local HTTP check was needed to induce a genuine aborted film request; file-URL interception did not trigger that failure. Both failure and successful retry were then demonstrated.
- Canonical root Stardust design files were preserved; the generic Impeccable sidecar advisory was not an instruction to migrate them.

**Open questions:** Finished-homepage design approval is pending. No AEM block/script implementation, publishing, commit or push was performed.

**Next:** Review `stardust/prototypes/home-proposed.html`; implement in AEM only after explicit design approval.

---

## 2026-11-09 - Approved homepage migrated to AEM preview

**Prompt:** "looks good, let's move this into AEM in the project in the current directory"

**Decisions:**
- Keep the approved prototype and its original provenance immutable; the explicit approval supersedes its historical pending annotations.
- Use authorable hero, industry tabs, news cards and company columns; retain the plain assistant band as default content.
- Author navigation and footer in DA, ingest the 21 approved rasters, and serve the optimized film from the code origin.
- Preserve the four deliberate source-owned service referrals; do not mechanically rewrite them to local self-links.
- Deliver on `3m-homepage` only: no main merge and no production publication.

**Artifacts touched:** `content/`, the six application blocks including chrome, global brand styles, favicon and film; runtime/schema/conversion records; the curated AEM acceptance report and desktop/phone captures.

**Verification:** Actual preview HTML and media, real Chrome controls, nine responsive widths, 68/68 inline-editable texts, exact five-width heading/document geometry, 100% desktop chrome match and 99.99% or better phone chrome match. Fetch-delayed CLS remains below 0.002. Full lint passes using the repository-compatible Node runtime. Lighthouse performance is 90 mobile/100 desktop, accessibility and best practices 100; preview SEO69 reflects intentional noindex.

**Findings worth flagging:** Actual delivery exposed a duplicate footer News anchor, company CSS accidentally nested under the legacy desktop media query, arrow line-height drift, lossy logo renditions and an overriding film accessible label. These were corrected and reverified on the deployed preview. The bundled local EW mimic needed alignment to this project's real formatted-only button contract; the application runtime was not altered.

**Preview:** https://3m-homepage--aem-3m-branding--mtilburgadobe.aem.page/

**Authoring:** https://da.live/edit#/mtilburgadobe/aem-3m-branding/index

**Production:** Not published; main is not merged.

---
