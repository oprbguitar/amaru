# AMARU sector capability design QA

## Source visual truth

- Expanded public-sector reference: `C:\Users\oprbg\AppData\Local\Temp\codex-clipboard-c1b329a2-b457-42e3-a404-42003cc79fc4.png`
- Full-page reference (browser chrome excluded from comparison): `C:\Users\oprbg\AppData\Local\Temp\codex-clipboard-92f934f1-60a2-4fc5-bea3-50b7a63f6d5f.png`

## Implementation evidence

- Closed, 1440 × 900: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\1440x900-closed.png`
- Public open with Gestión documental hovered, 1440 × 900: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\1440x900-public-gestion-hover.png`
- Private open with Analítica ejecutiva hovered, 1440 × 900: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\1440x900-private-analitica-hover.png`
- Public open, 390 × 844: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\390x844-public-open.png`
- Private open, 390 × 844: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\390x844-private-open.png`
- Full-view comparison: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\comparison-full-reference-vs-implementation.png`
- Focused panel comparison: `C:\Users\oprbg\.codex\visualizations\2026\07\17\019f6eca-1bda-7a80-83d5-e1b3fcde347f\amaru-sector-qa\comparison-panel-reference-vs-implementation.png`

## Full-view comparison evidence

The existing one-page composition, hero, orbital artwork, paper tear, Manrope typography, purple/cyan palette, sector-card proportions, and AndesNova footer remain visually consistent with the supplied full-page reference. The only visible full-view changes are within the requested sector-card controls: closed cards now show only the directional arrow and the footer fits within the viewport at standard desktop heights.

## Focused region comparison evidence

The expanded public panel retains the reference hierarchy: compact sector header, two-column capability grid, right-hand standards column, rounded institutional surfaces, and purple accent. Hover adds the requested chips, outcome, and low-opacity technical preview without changing the 90px capability-card height or grid tracks. The private version uses the same structure with the cyan accent.

## Required fidelity surfaces

- Fonts and typography: Manrope, weights, hierarchy, wrapping, and sector colors are preserved. Mobile capability title, summary, chips, and outcome are 11px or larger.
- Spacing and layout rhythm: capability cards remain fixed-size on desktop hover; expanded panels use `minmax(0, …)` tracks and internal scrolling where height is constrained.
- Colors and visual tokens: existing purple/cyan accents, translucent paper surfaces, borders, and restrained shadows are preserved.
- Image quality and asset fidelity: no raster or stock imagery was added. Technical previews are decorative inline SVGs requested by the brief, use `currentColor`, remain behind text, and ignore pointer input.
- Copy and content: all supplied capability chips and result statements are present verbatim. Existing business, legal, hero, brand, and AndesNova copy is unchanged.

## Interaction and accessibility evidence

- Click switches public/private panels and clicking the active sector closes it.
- Enter and Space open/close sectors.
- Escape closes the active sector and returns focus to it.
- `.has-active`, `.is-active`, `.is-collapsed`, `.sector-open`, `data-active`, `aria-expanded`, and `aria-hidden` behavior is preserved.
- The advisory remains a disabled `span` with `aria-disabled="true"`; the AndesNova link is unchanged.
- Decorative previews use `aria-hidden="true"` and `pointer-events: none`.
- Reduced-motion removes capability transitions.

## Responsive evidence

Tested at 1920 × 1080, 1440 × 900, 1366 × 768, 1024 × 768, 768 × 1024, 430 × 932, 390 × 844, 360 × 800, and 320 × 568. Every size had zero document-level horizontal overflow and zero page-level vertical scrolling. On mobile, expanded capabilities use one column, show the normal summary plus two chips and the outcome, hide technical watermarks, and scroll only inside `.sector-details`. At 320 × 568 the footer is intentionally hidden so both closed cards remain fully visible.

## Comparison history

1. Initial pass: P2 standards note overflow at 1440 × 900 and barely visible closed-state footer. Fixed by widening the standards track, adding explicit internal overflow, and tightening footer spacing.
2. Initial mobile capture: P1 capability rows and standards content overlapped; the active-sector summary also approached the detail content. Fixed by using a block stack inside the mobile scroller, explicit 118px capability rows, and a stable 86px active header.
3. Post-fix capture: capability cards, standards panel, and active header are separated; mobile content is readable, internally scrollable, and has no horizontal or page-level vertical overflow.

## Remaining findings

No actionable P0, P1, or P2 findings remain. The standards column intentionally uses a subtle internal scrollbar at constrained desktop heights so legal and ISO references remain complete rather than being truncated.

final result: passed
