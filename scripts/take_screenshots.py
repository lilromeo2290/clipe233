#!/usr/bin/env python3
"""
Take screenshots of fafaafmonline.com and duamenefafoundation.org
using Playwright with stealth-like settings to bypass anti-bot protection.
"""

import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT_DIR = Path("/home/z/my-project/public/images/portfolio")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SITES = [
    {
        "url": "https://fafaafmonline.com",
        "output": OUTPUT_DIR / "fafaafmonline.png",
        "name": "FAFA AFM Online",
    },
    {
        "url": "https://duamenefafoundation.org",
        "output": OUTPUT_DIR / "duamenefafoundation.png",
        "name": "Duamene Fa Foundation",
    },
]

# Realistic Chrome user agent
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/130.0.0.0 Safari/537.36"
)


def take_screenshot(playwright, site):
    """Take a screenshot of a single site, bypassing anti-bot challenges."""
    print(f"\n=== {site['name']} ===")
    print(f"URL: {site['url']}")

    browser = playwright.chromium.launch(
        headless=True,
        args=[
            "--disable-blink-features=AutomationControlled",
            "--disable-features=IsolateOrigins,site-per-process",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu",
        ],
    )

    context = browser.new_context(
        viewport={"width": 1440, "height": 900},
        user_agent=USER_AGENT,
        locale="en-US",
        timezone_id="America/New_York",
        extra_http_headers={
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Sec-Ch-Ua": '"Chromium";v="130", "Not?A_Brand";v="99", "Google Chrome";v="130"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
        },
    )

    # Remove webdriver flag to bypass detection
    context.add_init_script(
        """
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] });
        Object.defineProperty(navigator, 'languages', { get: () => ['en-US','en'] });
        window.chrome = { runtime: {} };
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) =>
            parameters.name === 'notifications'
                ? Promise.resolve({ state: Notification.permission })
                : originalQuery(parameters);
        """
    )

    page = context.new_page()

    try:
        print(f"  Navigating to {site['url']}...")
        page.goto(site["url"], wait_until="domcontentloaded", timeout=60000)

        # Anti-bot challenge: page redirects to itself with a cookie set.
        # Wait for the URL to either change, or for the title to become
        # something other than the challenge page title.
        print("  Waiting for anti-bot challenge to clear...")
        challenge_cleared = False
        last_url = page.url

        # Strategy 1: poll for title change with try/except (handles navigation races)
        for attempt in range(45):  # up to 90 seconds
            time.sleep(2)
            try:
                title = page.title()
                url = page.url
            except Exception:
                # Page is navigating - wait and retry
                time.sleep(1)
                continue

            if url != last_url:
                print(f"  URL changed: {last_url} -> {url}")
                last_url = url

            # Challenge pages have "One moment" or "Please wait" titles
            if (
                title
                and "moment" not in title.lower()
                and "wait" not in title.lower()
                and "please" not in title.lower()
                and "verifying" not in title.lower()
            ):
                print(f"  Challenge cleared! Title: {title}")
                challenge_cleared = True
                break
            if attempt % 5 == 0:
                print(
                    f"  Still waiting... (attempt {attempt + 1}/45) "
                    f"title='{title}' url='{url}'"
                )

        # After challenge clears, give the real page time to render
        if challenge_cleared:
            print("  Waiting for real page to fully render...")
            try:
                page.wait_for_load_state("networkidle", timeout=30000)
            except Exception:
                print("  Network idle timeout, continuing anyway")
            time.sleep(3)
        else:
            print(f"  WARNING: Challenge did not clear, taking screenshot anyway")
            time.sleep(3)

        # Take full page screenshot
        print(f"  Taking screenshot -> {site['output']}")
        page.screenshot(path=str(site["output"]), full_page=True, type="png")
        print(f"  Screenshot saved!")

        # Get final title and URL for logging
        final_title = page.title()
        final_url = page.url
        print(f"  Final title: {final_title}")
        print(f"  Final URL: {final_url}")

    except Exception as e:
        print(f"  ERROR: {e}")
        # Still try to take a screenshot of whatever loaded
        try:
            page.screenshot(path=str(site["output"]), full_page=True, type="png")
            print(f"  Fallback screenshot saved")
        except Exception as e2:
            print(f"  Could not save fallback screenshot: {e2}")
            return False
    finally:
        context.close()
        browser.close()

    # Verify the screenshot file exists and has reasonable size
    if site["output"].exists():
        size_kb = site["output"].stat().st_size / 1024
        print(f"  File size: {size_kb:.1f} KB")
        if size_kb < 5:
            print(f"  WARNING: Screenshot suspiciously small")
            return False
        return True
    return False


def main():
    results = {}
    with sync_playwright() as playwright:
        # Install browsers if not already installed
        for site in SITES:
            success = take_screenshot(playwright, site)
            results[site["name"]] = success

    print("\n=== Summary ===")
    for name, success in results.items():
        status = "OK" if success else "FAILED"
        print(f"  {name}: {status}")

    # Exit with error if any failed
    if not all(results.values()):
        sys.exit(1)


if __name__ == "__main__":
    main()
