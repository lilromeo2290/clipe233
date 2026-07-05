# Clipe233 Engineers — Worklog

This file tracks all commits and pushes to the GitHub repository.
Every agent (or developer) working on this project should append a new
section here after each meaningful change.

**Repository:** https://github.com/lilromeo2290/clipe233eng.net
**Remote:** origin (configured with PAT)
**Branch:** main

---

## How to use this worklog

After every commit + push, append a new section using this template:

```markdown
---
Date: YYYY-MM-DD HH:MM (UTC)
Author: <your name / agent name>
Commit: <commit SHA or short hash>
Task: <short description of what was done>

Changes:
- <file 1>: <what changed>
- <file 2>: <what changed>

Notes:
- <any follow-up actions needed, or context for future maintainers>
```

---

## Quick Commit + Push

Use the helper script to commit and push in one step:

```bash
bash /home/z/my-project/scripts/git-push.sh "Your commit message here"
```

The script will:
1. Show current git status
2. Stage all changes
3. Commit with your message
4. Pull --rebase to sync with remote
5. Push to origin/main
6. Append an entry to this worklog

---

## History

---
Date: 2026-07-05
Author: Super Z (assistant)
Commit: 2a15fa2
Task: Wire Tawk.to live chat with real credentials

Changes:
- src/app/layout.tsx: hardcoded Tawk.to property/widget IDs
- src/components/TawkToChat.tsx: rewrote to use Tawk's official embed snippet; native bubble renders by default; WhatsApp fallback if Tawk fails to load

Notes:
- Tawk.to dashboard: https://www.tawk.to (login to customize bubble color, greeting, hours)
- Token provided by user — should be rotated after this session for security

---
Date: 2026-07-05
Author: Super Z (assistant)
Commit: 7beac28
Task: Add 053 539 9562 phone number alongside existing +233 24 978 3736

Changes:
- src/components/sections/Footer.tsx: added second phone row
- src/app/contact/page.tsx: phone card now shows main number + sub number
- src/components/sections/ContactSection.tsx: same dual display on homepage
- src/lib/email.ts: auto-reply signature lists both numbers

Notes:
- WhatsApp buttons across product pages still use +233 249 783 736 (WhatsApp-enabled line)

---
Date: 2026-07-05
Author: Super Z (assistant)
Commit: 7d2b96a
Task: Add info@clipe233eng.net alongside existing gmail address across site

Changes:
- src/components/sections/Footer.tsx: both emails as clickable mailto links
- src/app/contact/page.tsx: primary email is info@clipe233eng.net, gmail as secondary
- src/components/sections/ContactSection.tsx: same dual display on homepage
- src/lib/email.ts: contact form submissions now delivered to both inboxes

---
Date: 2026-07-05
Author: Super Z (assistant)
Commit: 8f27eda
Task: Remove splash screen — load main site directly

Changes:
- src/app/layout.tsx: removed SplashScreen wrapper

---
Date: 2026-07-05
Author: Super Z (assistant)
Commit: 6fba28d
Task: Add Clipe SMS CRM as product

Changes:
- src/components/sections/Navbar.tsx: added Clipe SMS CRM to Products submenu
- src/app/products/page.tsx: added SMS CRM to product list + highlights
- src/app/clipe-sms-crm/page.tsx: new detail page with hero, features, use cases, CTA

---
Date: 2026-07-05
Author: Super Z (assistant)
Commit: 6ce22a6
Task: Revert static export — prepare for VPS deployment with full Node.js server

Changes:
- next.config.ts: removed output: "export" and trailingSlash
- src/app/api/**/route.ts: removed force-static exports from all 11 API routes

Notes:
- VPS deployment guide saved at /home/z/my-project/download/deploy-webuzo-vps.sh

---
Date: 2026-07-05 03:27 UTC
Author: Clipe233 Engineers
Commit: a316570
Task: Add worklog and git-push helper script

Changes:
- scripts/git-push.sh
- src/components/TawkToChat.tsx
- worklog.md
