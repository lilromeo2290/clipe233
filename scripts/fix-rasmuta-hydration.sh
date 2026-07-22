#!/usr/bin/env bash
# ============================================================
# Fix rasmuta blank-page hydration bug
# Root cause: framer-motion initial={{opacity:0}} makes SSR HTML invisible
# Fix: use initial={false} on first mount, keep exit animation for view changes
# ============================================================
set -e

APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"
PAGE_FILE="${APP_DIR}/src/app/page.tsx"

echo "============================================================"
echo "  FIX RASMUTA BLANK-PAGE HYDRATION BUG"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Backup current page.tsx
# ------------------------------------------------------------
BACKUP="${PAGE_FILE}.bak.$(date +%Y%m%d-%H%M%S)"
cp "${PAGE_FILE}" "${BACKUP}"
echo "[1/3] Backed up page.tsx to: ${BACKUP}"
echo ""

# ------------------------------------------------------------
# 2. Show current page.tsx
# ------------------------------------------------------------
echo "[2/3] Current page.tsx:"
echo "  ----------------------------------------"
cat "${PAGE_FILE}" | sed 's/^/    /'
echo "  ----------------------------------------"
echo ""

# ------------------------------------------------------------
# 3. Patch the motion.div to use initial={false} on first render
# ------------------------------------------------------------
# The trick: track if this is the first render with a ref.
# On first render, pass initial={false} so SSR HTML stays visible.
# On subsequent view changes, use the original animation.

cat > "${PAGE_FILE}" <<'TSX_EOF'
'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HomeView } from '@/components/views/home-view'
import { AboutBroadcasterView } from '@/components/views/about-broadcaster-view'
import { AboutFoundationView } from '@/components/views/about-foundation-view'
import { ProgramsView } from '@/components/views/programs-view'
import { EventsView } from '@/components/views/events-view'
import { GalleryView } from '@/components/views/gallery-view'
import { NewsView } from '@/components/views/news-view'
import { DonateView } from '@/components/views/donate-view'
import { VolunteerView } from '@/components/views/volunteer-view'
import { ContactView } from '@/components/views/contact-view'
import { AdminView } from '@/components/views/admin-view'
import { AppreciationModal } from '@/components/shared/appreciation-modal'

export default function Home() {
  const view = useAppStore((s) => s.view)

  // Skip the enter animation on the FIRST render so the SSR HTML
  // (which is rendered with opacity:1 by default) stays visible.
  // After the first render, allow animations when the view changes.
  const isFirstRender = React.useRef(true)
  React.useEffect(() => {
    isFirstRender.current = false
  }, [])

  const viewEl = React.useMemo(() => {
    switch (view) {
      case 'home':
        return <HomeView />
      case 'about-broadcaster':
        return <AboutBroadcasterView />
      case 'about-foundation':
        return <AboutFoundationView />
      case 'programs':
        return <ProgramsView />
      case 'events':
        return <EventsView />
      case 'gallery':
        return <GalleryView />
      case 'news':
        return <NewsView />
      case 'donate':
        return <DonateView />
      case 'volunteer':
        return <VolunteerView />
      case 'contact':
        return <ContactView />
      case 'admin':
        return <AdminView />
      default:
        return <HomeView />
    }
  }, [view])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppreciationModal />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            // Disable enter animation on first render so SSR HTML stays visible.
            // After mount, animate normally when view changes.
            initial={isFirstRender.current ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {viewEl}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
TSX_EOF

echo "[3/3] Patched page.tsx with initial={false} on first render"
echo ""
echo "  New page.tsx:"
echo "  ----------------------------------------"
cat "${PAGE_FILE}" | sed 's/^/    /'
echo "  ----------------------------------------"
echo ""

# ------------------------------------------------------------
# 4. Rebuild + restart
# ------------------------------------------------------------
echo "============================================================"
echo "  REBUILDING + RESTARTING"
echo "============================================================"
echo ""

echo "  -> npm run build (as clipe233 user)..."
su - clipe233 -c "cd '${APP_DIR}' && npm run build 2>&1 | tail -30"
echo ""

echo "  -> pm2 restart rasmuta..."
su - clipe233 -c "pm2 restart rasmuta --update-env 2>&1" | head -10
echo ""

sleep 5

# ------------------------------------------------------------
# 5. Verify
# ------------------------------------------------------------
echo "============================================================"
echo "  VERIFICATION"
echo "============================================================"
echo ""
echo "  Homepage status + first 200 chars:"
curl -sI --max-time 10 "https://rasmutafoundation.org/" | head -1 | sed 's/^/    /'
echo ""
echo "  Body sanity check (should contain 'Edem Divine' and 'opacity' should NOT be 0):"
BODY=$(curl -s --max-time 10 "https://rasmutafoundation.org/")
echo "  Body length: $(echo "$BODY" | wc -c) chars"
echo "  Contains 'Edem Divine': $(echo "$BODY" | grep -c 'Edem Divine')"
echo "  Contains 'opacity:0' inline style on motion.div: $(echo "$BODY" | grep -oc 'style="opacity:0')"

echo ""
echo "  PM2 status:"
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "rasmuta|name|status"
echo ""

echo "============================================================"
echo "  DONE — Test in browser (incognito) now"
echo "============================================================"
echo ""
echo "  The motion.div no longer starts at opacity:0 on first render."
echo "  SSR HTML will be visible immediately, even if JS is slow to load."
echo ""
echo "  Open https://rasmutafoundation.org/ in a fresh incognito window."
echo "  The page should now show the hero + content instantly."
