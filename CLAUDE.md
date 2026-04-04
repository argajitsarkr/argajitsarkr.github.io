# CLAUDE.md — Project Guide for argajitsarkr.github.io

> **READ THIS BEFORE MAKING ANY CHANGES.**
> Update this file after every session with a summary of changes made and any new lessons learned.

---

## Project Overview

**Site:** [argajitsarkr.github.io](https://argajitsarkr.github.io)
**Type:** Personal academic portfolio (GitHub Pages, static HTML/CSS/JS)
**Owner:** Argajit Sarkar — Doctoral Scholar, Tripura University

---

## Critical: Repository Location

| What | Path |
|---|---|
| **Git root (repo root)** | `C:\Users\Arghya\` |
| **Live site files** | `C:\Users\Arghya\*.html`, `images/`, `data/`, `fonts/`, `certificates/` |
| **Local working copy (Downloads)** | `C:\Users\Arghya\Downloads\argajitsarkr.github today\` — **NOT the repo root** |
| **GitHub remote** | `https://github.com/argajitsarkr/argajitsarkr.github.io.git` |

> **WARNING:** The git repo is rooted at `C:\Users\Arghya\`, NOT inside the Downloads folder.
> Always run git commands from `C:\Users\Arghya\` and edit files there.
> The `Downloads/argajitsarkr.github today/` folder is just a local working copy — **never commit from inside it**.

---

## File Structure

```
C:\Users\Arghya\               ← GIT ROOT / LIVE SITE FILES
├── index.html                 ← Home page
├── research.html              ← Publications & citations
├── projects.html              ← Software projects
├── certifications.html        ← Certificates & awards
├── script.js
├── styles.css
├── stylesheet.css
├── favicon.ico                ← Favicon (root)
├── site.webmanifest           ← Web app manifest
├── googlee36f31f86071a65c.html
├── images/
│   ├── a_logo.png
│   ├── profile3.jpg
│   ├── qer.png, rem.png, tgf.png, PreML.png
│   ├── favicon-16x16.png, favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── logos/  (icmr, asm, ugc, tripura-univ, springer, bsi, elsevier)
├── data/
│   └── Argajit CV 2026.pdf    ← Active CV (linked from all pages)
├── fonts/
├── certificates/
└── CLAUDE.md                  ← This file
```

---

## CV

- **Active CV file:** `data/Argajit CV 2026.pdf`
- All four pages link to it via `data/Argajit CV 2026.pdf` (nav bar + hero button)
- To update: replace `data/Argajit CV 2026.pdf` with the new file keeping the **same filename**

---

## Publications & Citations (research.html + index.html)

Citations appear in **two places** — always update both files:
- `research.html` — uses `<span class="pub-card__citation">Cited by N</span>`
- `index.html` — uses `<p class="featured-pub__citation">Cited by N</p>`

### Current Citation Counts (last updated: 2026-04-05)

| Paper | research.html | index.html |
|---|---|---|
| Quercetin as additive adjuvant (Vibrio cholerae) | Cited by 1 | — (no citation shown) |
| Biofilm-mediated bioremediation of xenobiotics and heavy metals | Cited by 21 | Cited by 21 |
| TGF-beta plays dual roles in immunity and pathogenesis in leishmaniasis | Cited by 9 | Cited by 9 |

---

## Favicons

Full favicon set is in place (added 2026-04-05). All HTML files include:
```html
<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
<link rel="shortcut icon" href="favicon.ico">
<link rel="manifest" href="site.webmanifest">
```
`site.webmanifest` points to `/images/android-chrome-192x192.png` and `/images/android-chrome-512x512.png`.

---

## Correct Workflow for Making Changes

1. **Read this file first**
2. Edit files at `C:\Users\Arghya\` (the git root)
3. Run git commands from `C:\Users\Arghya\`:
   ```bash
   cd "C:/Users/Arghya"
   git add <specific files>
   git commit -m "message"
   git push origin main
   ```
4. Update the changelog and citation table in this file
5. GitHub Pages deploys within 2–5 minutes — hard refresh with `Ctrl+Shift+R` to verify

---

## ❌ MISTAKES LOG — What NOT To Do

### 1. NEVER run git commands from the Downloads subfolder
- **What happened:** Ran `cd "C:/Users/Arghya/Downloads/argajitsarkr.github today"` and committed from there
- **Result:** The entire `Downloads/argajitsarkr.github today/` folder got committed as a subfolder of the repo, creating duplicate files on GitHub
- **Fix required:** Had to `git rm -r --cached "Downloads/argajitsarkr.github today/"` and recommit
- **Rule:** Always `cd "C:/Users/Arghya"` before any git operations

### 2. NEVER edit files in the Downloads copy and expect them to affect the live site
- **What happened:** Edited `C:\Users\Arghya\Downloads\argajitsarkr.github today\index.html` instead of `C:\Users\Arghya\index.html`
- **Result:** Citation updates were applied to the wrong copy; live site stayed unchanged
- **Rule:** Always edit files at `C:\Users\Arghya\*.html` — that's what GitHub Pages serves

### 3. Always update BOTH index.html AND research.html for citation changes
- Citations appear on both pages — missing one leaves the site inconsistent

### 4. NEVER use `git add .` or `git add -A` from the repo root
- The git root is the home directory (`C:\Users\Arghya\`), which contains personal files, Downloads, AppData, etc.
- Always stage specific files by name: `git add index.html research.html`

### 5. Before pushing, always pull first if remote may have newer commits
- Use `git pull --rebase origin main` before pushing to avoid rejection

---

## Changelog

| Date | Changes |
|---|---|
| 2026-04-05 | Removed wrongly committed `Downloads/argajitsarkr.github today/` subfolder from repo |
| 2026-04-05 | Updated citation counts: Quercetin (→1), Biofilm (→21), TGF-beta (→9) in correct files |
| 2026-04-05 | Added full favicon set to all HTML pages + site.webmanifest |
| 2026-04-04 | Updated CV to March 2026 version (`data/Argajit CV 2026.pdf`) |
| ~2026-03-28 | Redesign: light theme, multipage site (research, projects, certifications) |
