# Spark Media ops board

Tonight’s new-client board for Spark Media (sparkmedia.ai) — David McCormick’s Las Vegas shop. Built for David and the Spark agents (COS / Outbound). One job: see the emergency-call motion at a glance.

This is a static page. No APIs, no tokens, no live GHL or Ads pulls. If a number is not known, the board leaves it empty.

## View it locally

```bash
npm install
npm run dev
```

The board opens on `http://127.0.0.1:43147`.

`npm run build` writes a static folder to `dist/`. `npm run preview` serves that build on the same port.

Any other static server works too, as long as it can read `board.json` next to `index.html` (opening the HTML file from disk will not load the JSON).

## How COS updates the board

All live facts live in **`board.json`** at the repo root. Edit that file. Reload the page. No redesign.

| You need to… | Change |
| --- | --- |
| Mark a shop after Maps | Set that name’s `"score"` to `"keep"` or `"kill"` |
| Leave it untouched | Keep `"score": "unscored"` |
| Change today’s priority or win | `today.priority`, `today.winTonight` |
| Update the as-of date | `"asOf": "YYYY-MM-DD"` |
| Update GHL contact leftovers | `ghl.contactsRemaining` |
| Note an empty or booked calendar | `ghl.calendarThatMorning` |

Do not invent counts for the pipeline. Stages are labels only until real opportunities exist.

Parked lanes (roof / pest, Tampa) stay out of the 12 until the wave changes.

## What this page will not do

- No Apollo, GHL, or Google Ads keys
- No enrich and no send until David says go
- No fake revenue, no chart series, no placeholder shops

## Remotes

**Origin is the source of truth** (`origin`). Work here first.

| Remote | URL |
| --- | --- |
| `origin` | Origin working repo (this checkout) |
| `github` | https://github.com/sparkmediaai/spark-ops-dashboard |

```bash
git remote add github https://github.com/sparkmediaai/spark-ops-dashboard.git
```

## GitHub Pages

The public GitHub copy is ready. Pages is **not live yet** — this environment cannot flip the Pages switch on the sparkmediaai account.

David, one click:

1. Open [Pages settings](https://github.com/sparkmediaai/spark-ops-dashboard/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**. Folder: **/ (root)**.
4. Click **Save**.
5. Use the URL GitHub prints on that same page (and in the repo’s Pages badge). Do not guess a `*.github.io` path.

No Vite build is required for Pages. `index.html`, `board.json`, and `src/` at the repo root are the site.

No secrets belong in this project or in CI.
