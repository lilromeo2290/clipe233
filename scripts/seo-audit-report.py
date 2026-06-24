#!/usr/bin/env python3
"""SEO Audit Report for Clipe233 Engineers Website"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Font Registration
FONT_DIR = '/usr/share/fonts'
pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')
pdfmetrics.registerFont(TTFont('Carlito', f'{FONT_DIR}/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', f'{FONT_DIR}/truetype/english/Carlito-Bold.ttf'))
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold')

# Palette
PAGE_BG = colors.HexColor('#f6f5f5')
CARD_BG = colors.HexColor('#edecea')
TABLE_STRIPE = colors.HexColor('#f5f4f3')
HEADER_FILL = colors.HexColor('#746846')
BORDER = colors.HexColor('#d7d3c7')
ICON = colors.HexColor('#917c3c')
ACCENT = colors.HexColor('#8e7323')
ACCENT_2 = colors.HexColor('#4aa4c2')
TEXT_PRIMARY = colors.HexColor('#171715')
TEXT_MUTED = colors.HexColor('#8b8982')
RED_CRIT = colors.HexColor('#B91C1C')
AMBER_HIGH = colors.HexColor('#D97706')
GREEN_OK = colors.HexColor('#15803D')

styles = getSampleStyleSheet()
s_title = ParagraphStyle('Title', parent=styles['Title'], fontName='Carlito-Bold', fontSize=22, textColor=TEXT_PRIMARY, spaceAfter=6, spaceBefore=0, leading=26)
s_h1 = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Carlito-Bold', fontSize=18, textColor=ACCENT, spaceAfter=8, spaceBefore=16, leading=22)
s_h2 = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Carlito-Bold', fontSize=14, textColor=HEADER_FILL, spaceAfter=6, spaceBefore=12, leading=18)
s_body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Carlito', fontSize=9.5, textColor=TEXT_PRIMARY, spaceAfter=6, leading=14, alignment=TA_JUSTIFY)
s_body_muted = ParagraphStyle('BodyMuted', parent=s_body, textColor=TEXT_MUTED, fontSize=9)
s_table_header = ParagraphStyle('TH', fontName='Carlito-Bold', fontSize=9, textColor=colors.white, leading=12, alignment=TA_CENTER)
s_table_cell = ParagraphStyle('TC', fontName='Carlito', fontSize=8.5, textColor=TEXT_PRIMARY, leading=12)
s_table_cell_c = ParagraphStyle('TCC', parent=s_table_cell, alignment=TA_CENTER)
s_badge_crit = ParagraphStyle('BadgeCrit', fontName='Carlito-Bold', fontSize=8, textColor=colors.white, leading=10, alignment=TA_CENTER, backColor=RED_CRIT)
s_badge_high = ParagraphStyle('BadgeHigh', fontName='Carlito-Bold', fontSize=8, textColor=colors.white, leading=10, alignment=TA_CENTER, backColor=AMBER_HIGH)
s_badge_ok = ParagraphStyle('BadgeOK', fontName='Carlito-Bold', fontSize=8, textColor=colors.white, leading=10, alignment=TA_CENTER, backColor=GREEN_OK)
s_badge_med = ParagraphStyle('BadgeMed', fontName='Carlito-Bold', fontSize=8, textColor=colors.white, leading=10, alignment=TA_CENTER, backColor=ACCENT_2)

def badge(severity):
    mapping = {'Critical': s_badge_crit, 'High': s_badge_high, 'Medium': s_badge_med, 'OK': s_badge_ok}
    return Paragraph(severity, mapping.get(severity, s_table_cell_c))

def th(text): return Paragraph(text, s_table_header)
def tc(text): return Paragraph(text, s_table_cell)
def tcc(text): return Paragraph(text, s_table_cell_c)

def make_table(data, col_widths=None, stripe=True):
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Carlito-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 1), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]
    if stripe:
        for i in range(1, len(data)):
            if i % 2 == 0:
                style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return t

output_path = '/home/z/my-project/download/clipe233-seo-audit-report.pdf'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    topMargin=20*mm, bottomMargin=20*mm, leftMargin=18*mm, rightMargin=18*mm,
    title='SEO Audit Report - Clipe233 Engineers',
    author='Z.ai',
    subject='Comprehensive SEO Audit and Strategy for Clipe233 Engineers Website',
)

story = []
W = A4[0] - 36*mm

# ═══════ COVER PAGE ═══════
story.append(Spacer(1, 60))
story.append(HRFlowable(width="100%", thickness=3, color=ACCENT, spaceAfter=20))
story.append(Paragraph("SEO Audit Report", s_title))
story.append(Paragraph("Clipe233 Engineers Website", ParagraphStyle('CoverSub', parent=s_title, fontSize=16, textColor=HEADER_FILL, spaceAfter=12)))
story.append(HRFlowable(width="100%", thickness=3, color=ACCENT, spaceAfter=30))

cover_meta = [
    [tc('Website'), tc('https://clipe233eng.net')],
    [tc('Date'), tc('June 2026')],
    [tc('Auditor'), tc('Z.ai SEO Consultancy')],
    [tc('Pages Audited'), tc('15 pages')],
    [tc('Overall Score'), badge('Critical')],
]
story.append(Table(cover_meta, colWidths=[W*0.3, W*0.7]))
story.append(Spacer(1, 30))

score_data = [
    [th('Category'), th('Rating'), th('Status')],
    [tc('Crawlability / SSR'), tcc('0/10'), badge('Critical')],
    [tc('Sitemap'), tcc('0/10'), badge('Critical')],
    [tc('Canonical URLs'), tcc('0/10'), badge('Critical')],
    [tc('Structured Data (JSON-LD)'), tcc('0/10'), badge('Critical')],
    [tc('Page Titles / Meta Descriptions'), tcc('3/10'), badge('High')],
    [tc('Open Graph / Social'), tcc('3/10'), badge('High')],
    [tc('Robots.txt'), tcc('4/10'), badge('Medium')],
    [tc('Image SEO'), tcc('2/10'), badge('High')],
    [tc('Internal Linking'), tcc('5/10'), badge('Medium')],
    [tc('Heading Structure'), tcc('7/10'), badge('OK')],
    [tc('Mobile Responsiveness'), tcc('7/10'), badge('OK')],
]
story.append(Paragraph("Overall SEO Readiness Scores", s_h2))
story.append(make_table(score_data, col_widths=[W*0.50, W*0.20, W*0.30]))
story.append(Spacer(1, 20))
story.append(Paragraph(
    "This report identifies 47 SEO issues across 15 pages. The most critical finding is that all pages use "
    "<font color='#B91C1C'><b>ssr:false</b></font> dynamic imports, making the entire website invisible to search engine crawlers. "
    "Until this is fixed, no other SEO improvement will have meaningful impact. "
    "The report provides a complete prioritized action plan with implementation steps.",
    s_body
))
story.append(PageBreak())

# ═══════ TABLE OF CONTENTS ═══════
story.append(Paragraph("Table of Contents", s_h1))
toc_items = [
    "1. Executive Summary",
    "2. Technical SEO Audit",
    "   2.1 Crawlability and Indexability",
    "   2.2 Robots.txt",
    "   2.3 XML Sitemap",
    "   2.4 Canonical Tags",
    "   2.5 HTTPS Status",
    "   2.6 Structured Data / Schema Markup",
    "   2.7 Core Web Vitals and Page Speed",
    "3. On-Page SEO Audit",
    "   3.1 Page Titles and Meta Descriptions",
    "   3.2 Heading Structure Analysis",
    "   3.3 Image Alt Text Audit",
    "4. Content SEO Strategy",
    "   4.1 Primary Topics and Keyword Research",
    "   4.2 30 High-Value Keywords",
    "   4.3 Content Gaps and Blog Topics",
    "   4.4 3-Month Content Strategy",
    "5. Internal Linking Strategy",
    "6. Mobile SEO Evaluation",
    "7. Backlink Strategy",
    "8. Local SEO Recommendations",
    "9. Prioritized Action Plan",
]
for item in toc_items:
    indent = 20 if item.startswith("   ") else 0
    s = ParagraphStyle('TOC', parent=s_body, leftIndent=indent, spaceAfter=2, fontSize=10)
    story.append(Paragraph(item.strip(), s))
story.append(PageBreak())

# ═══════ 1. EXECUTIVE SUMMARY ═══════
story.append(Paragraph("1. Executive Summary", s_h1))
story.append(Paragraph(
    "This SEO audit evaluates the Clipe233 Engineers website (clipe233eng.net), an IT solutions company based in Ho, "
    "Ghana offering software development, website design, networking solutions, IT consultancy, and custom software "
    "products. The audit covers 15 pages across the site including the homepage, contact page, service pages, and "
    "product pages. The findings reveal significant SEO deficiencies that, if addressed, could dramatically improve "
    "organic search visibility and lead generation for the business.",
    s_body
))
story.append(Paragraph(
    "The most critical issue discovered is that every component on the site is loaded with <b>ssr:false</b> dynamic imports, "
    "which means the server returns an empty HTML shell with no content. Search engine crawlers like Googlebot rely on "
    "server-rendered HTML to understand page content. When they encounter an empty shell, they see no text, no headings, "
    "no images, and no links. This renders the entire website effectively invisible to search engines, making this the "
    "single highest-priority fix. Without resolving this issue, no amount of keyword optimization, meta tag improvement, "
    "or content strategy will produce meaningful search ranking improvements.",
    s_body
))
story.append(Paragraph(
    "Beyond the SSR issue, the audit identified 46 additional problems across technical SEO, on-page optimization, "
    "content strategy, and local SEO. Key findings include: all 15 pages share identical title tags and meta descriptions, "
    "no XML sitemap exists, no canonical URLs are set, zero structured data markup is implemented, Open Graph images are "
    "missing on every page, and the robots.txt file lacks a sitemap directive and fails to block admin/API routes. "
    "On the positive side, the heading structure within each page is well-organized with proper H1-H3 hierarchy, the "
    "site is served over HTTPS, and mobile responsiveness is good. The report concludes with a prioritized action plan "
    "divided into High, Medium, and Low priority categories with specific implementation steps for each item.",
    s_body
))

# ═══════ 2. TECHNICAL SEO AUDIT ═══════
story.append(Paragraph("2. Technical SEO Audit", s_h1))

story.append(Paragraph("2.1 Crawlability and Indexability", s_h2))
story.append(Paragraph(
    "Crawlability refers to a search engine's ability to access and render a website's content. The Clipe233 website "
    "suffers from a fundamental crawlability problem: all page components are loaded client-side only using Next.js "
    "dynamic imports with the ssr:false option. This means that when a search engine bot requests a page, the server "
    "returns an HTML document that contains only an empty main element with JavaScript bundle references. All the "
    "actual content, including headings, paragraphs, images, and links, is rendered exclusively in the browser via "
    "JavaScript execution.",
    s_body
))
story.append(Paragraph(
    "While Google has improved its JavaScript rendering capabilities, there are significant limitations. Google's "
    "second-pass indexing for JavaScript content can delay content discovery by days or weeks, and some content may "
    "never be rendered if the JavaScript execution exceeds Google's resource budget. For a website targeting "
    "competitive keywords in Ghana's growing IT market, this delay or failure means losing potential organic traffic "
    "to competitors whose pages are fully server-rendered and immediately indexable. Additionally, other search engines "
    "like Bing, DuckDuckGo, and regional crawlers have limited or no JavaScript rendering capability, making the site "
    "completely invisible on those platforms.",
    s_body
))

crawl_data = [
    [th('Issue'), th('Impact'), th('Severity'), th('Fix')],
    [tc('All components use ssr:false'), tc('Zero server-rendered content; crawlers see empty pages'), badge('Critical'), tc('Remove ssr:false from all dynamic imports')],
    [tc('Homepage is "use client" component'), tc('No SSR content on most important page'), badge('Critical'), tc('Convert to server component or add SSR data')],
    [tc('No page-level metadata exports'), tc('No unique titles/descriptions for crawlers'), badge('Critical'), tc('Add export const metadata to each page')],
    [tc('No generateMetadata functions'), tc('Dynamic pages cannot have dynamic meta'), badge('High'), tc('Implement generateMetadata where needed')],
]
story.append(make_table(crawl_data, col_widths=[W*0.25, W*0.30, W*0.12, W*0.33]))

story.append(Paragraph("2.2 Robots.txt", s_h2))
story.append(Paragraph(
    "The robots.txt file exists and allows all major crawlers access to the site, which is the correct baseline behavior. "
    "However, the current configuration has several notable gaps. First, there is no Sitemap directive pointing crawlers "
    "to the XML sitemap location, which would help search engines discover all pages more efficiently. Second, there are "
    "no Disallow rules blocking access to admin pages, API endpoints, or other non-public areas of the site. This means "
    "crawlers may waste crawl budget on pages that should not be indexed, such as the /admin dashboard and /api routes. "
    "Third, there is no Crawl-delay directive, which could help manage server load from aggressive crawlers.",
    s_body
))

robots_data = [
    [th('Current Rule'), th('Status'), th('Recommendation')],
    [tc('Allow: / for all user agents'), badge('OK'), tc('Keep for public pages')],
    [tc('No Sitemap directive'), badge('High'), tc('Add: Sitemap: https://clipe233eng.net/sitemap.xml')],
    [tc('No Disallow for /admin'), badge('High'), tc('Add: Disallow: /admin')],
    [tc('No Disallow for /api'), badge('Medium'), tc('Add: Disallow: /api/')],
    [tc('No Crawl-delay'), badge('Low'), tc('Add: Crawl-delay: 1 for non-Google bots')],
]
story.append(make_table(robots_data, col_widths=[W*0.30, W*0.15, W*0.55]))

story.append(Paragraph("2.3 XML Sitemap", s_h2))
story.append(Paragraph(
    "The website does not have an XML sitemap. Requests to /sitemap.xml return a 404 error, and there is no "
    "src/app/sitemap.ts file that would dynamically generate one using Next.js built-in sitemap support. An XML sitemap "
    "is a critical SEO asset because it provides search engines with a complete list of all crawlable URLs along with "
    "metadata about each page such as last modification date, change frequency, and priority. Without a sitemap, "
    "search engines must rely entirely on following internal links to discover pages, which is unreliable for deeper "
    "pages and can result in important content being overlooked entirely. For a 15-page website, implementing a "
    "sitemap is straightforward and should be done immediately.",
    s_body
))
story.append(Paragraph(
    "The recommended approach is to use Next.js App Router's built-in sitemap support by creating a sitemap.ts file "
    "in the src/app/ directory. This file exports a default function that returns an array of URL objects with loc, "
    "lastModified, changeFrequency, and priority fields. The homepage should have the highest priority (1.0), service "
    "and product pages should have medium priority (0.8), and the contact page should have standard priority (0.5). "
    "Once created, the sitemap URL should be added to robots.txt and submitted to Google Search Console and Bing "
    "Webmaster Tools for faster indexing.",
    s_body
))

story.append(Paragraph("2.4 Canonical Tags", s_h2))
story.append(Paragraph(
    "Canonical tags are completely absent from every page on the website. The canonical link element tells search "
    "engines which version of a URL is the preferred one, preventing duplicate content issues that can arise when "
    "the same page is accessible through multiple URLs. Without canonical tags, search engines may index multiple "
    "versions of the same page (e.g., with and without trailing slashes, with and without www, with HTTP and HTTPS), "
    "diluting link equity and potentially causing the wrong URL version to appear in search results. For the Clipe233 "
    "website, canonical tags should be added to every page using the Next.js metadata API's alternates.canonical "
    "property. Each page's canonical URL should be the absolute HTTPS URL without trailing slashes, matching the "
    "preferred domain configuration in Google Search Console.",
    s_body
))

story.append(Paragraph("2.5 HTTPS Status", s_h2))
story.append(Paragraph(
    "The website is served over HTTPS, which is a positive finding. HTTPS is a ranking signal for Google and is "
    "essential for user trust, especially on the contact form where personal information is submitted. The SSL "
    "certificate appears to be properly configured with no mixed content warnings. This is one area where the site "
    "already meets SEO best practices, and no changes are needed. The only recommendation is to ensure that all HTTP "
    "requests are permanently redirected (301) to their HTTPS equivalents, and that the canonical tags (once implemented) "
    "use the HTTPS protocol consistently.",
    s_body
))

story.append(Paragraph("2.6 Structured Data / Schema Markup", s_h2))
story.append(Paragraph(
    "The website contains zero structured data markup. There are no JSON-LD scripts, no microdata attributes, and no "
    "RDFa markup anywhere in the codebase. Structured data is essential for modern SEO because it enables rich results "
    "(also called rich snippets) in search engine results pages. Rich results can include star ratings, pricing "
    "information, FAQ expandable answers, and other enhanced displays that significantly increase click-through rates. "
    "Research shows that rich results can improve CTR by 20-30% compared to standard blue link listings.",
    s_body
))
story.append(Paragraph(
    "For the Clipe233 website, the following schema types are recommended as high priority: Organization schema on the "
    "homepage to establish the business entity with name, address, phone, and social profiles; LocalBusiness schema "
    "combining organization data with geo-coordinates for local search visibility; Service schema on each service page "
    "describing the offering with name, description, and provider; Product schema on each product page (Clipe POS, "
    "Clipe Medic, Clipe School, Clipe Pharma, Clipe CMS) with features and descriptions; BreadcrumbList schema on all "
    "sub-pages to show navigation hierarchy in search results; and WebSite schema with SearchAction on the homepage "
    "to enable sitelinks search box.",
    s_body
))

schema_data = [
    [th('Schema Type'), th('Target Page'), th('Priority'), th('Rich Result Type')],
    [tc('Organization'), tc('Homepage'), badge('High'), tc('Knowledge panel, sitelinks')],
    [tc('LocalBusiness'), tc('Homepage'), badge('High'), tc('Local pack, map results')],
    [tc('Service'), tc('All 6 service pages'), badge('High'), tc('Service rich results')],
    [tc('Product'), tc('All 5 product pages'), badge('High'), tc('Product rich results')],
    [tc('BreadcrumbList'), tc('All sub-pages'), badge('Medium'), tc('Breadcrumb trail in SERP')],
    [tc('WebSite + SearchAction'), tc('Homepage'), badge('Medium'), tc('Sitelinks search box')],
    [tc('FAQPage'), tc('Service pages'), badge('Low'), tc('Expandable FAQ answers')],
]
story.append(make_table(schema_data, col_widths=[W*0.22, W*0.22, W*0.13, W*0.43]))

story.append(Paragraph("2.7 Core Web Vitals and Page Speed", s_h2))
story.append(Paragraph(
    "Core Web Vitals are a set of performance metrics that Google uses as ranking signals. They measure loading "
    "performance (Largest Contentful Paint), interactivity (First Input Delay / Interaction to Next Paint), and visual "
    "stability (Cumulative Layout Shift). The Clipe233 website has several issues that likely impact these metrics. "
    "The most significant is the use of raw img tags instead of Next.js Image components, which means no automatic "
    "lazy loading, no responsive srcsets, and no modern format (WebP/AVIF) serving. Combined with the "
    "images.unoptimized:true setting in next.config.ts, images are served at their original size and format, which "
    "can dramatically increase page weight and slow LCP. Additionally, the ssr:false dynamic imports create a "
    "client-side rendering waterfall where the browser must download, parse, and execute JavaScript before any content "
    "appears, directly harming LCP and FCP scores.",
    s_body
))

vitals_data = [
    [th('Metric'), th('Likely Status'), th('Cause'), th('Fix')],
    [tc('LCP (Largest Contentful Paint)'), badge('High'), tc('Raw img tags, no WebP, ssr:false'), tc('Use next/image, enable optimization, enable SSR')],
    [tc('CLS (Cumulative Layout Shift)'), badge('Medium'), tc('No width/height on images, dynamic fonts'), tc('Add dimensions to all images, use font-display:swap')],
    [tc('FID / INP (Interactivity)'), badge('OK'), tc('Moderate JS bundle size'), tc('Code-split further, reduce client components')],
    [tc('FCP (First Contentful Paint)'), badge('High'), tc('ssr:false = empty shell until JS loads'), tc('Enable SSR for all content components')],
    [tc('TTFB (Time to First Byte)'), badge('OK'), tc('Vercel edge network, fast response'), tc('No action needed')],
]
story.append(make_table(vitals_data, col_widths=[W*0.22, W*0.12, W*0.28, W*0.38]))

story.append(PageBreak())

# ═══════ 3. ON-PAGE SEO AUDIT ═══════
story.append(Paragraph("3. On-Page SEO Audit", s_h1))

story.append(Paragraph("3.1 Page Titles and Meta Descriptions", s_h2))
story.append(Paragraph(
    "Every page on the Clipe233 website shares the same title tag and meta description inherited from the root layout. "
    "The title 'Clipe233 Engineers | Engineering Smart Digital Solutions' and the description about 'innovative software, "
    "networking, branding, and digital transformation solutions' appear on all 15 pages. This is a serious on-page SEO "
    "problem because unique, descriptive titles and meta descriptions are critical for search engines to understand each "
    "page's topic and for users to identify relevant results in search listings. When multiple pages share the same title, "
    "search engines struggle to differentiate between them, often resulting in only one page being indexed while others "
    "are treated as duplicate content.",
    s_body
))

titles_data = [
    [th('Page'), th('Current Title'), th('Recommended Title'), th('Severity')],
    [tc('Homepage'), tc('Clipe233 Engineers | Engineering Smart Digital Solutions'), tc('Clipe233 Engineers | IT Solutions & Software Development in Ghana'), badge('High')],
    [tc('/contact'), tc('(Same as homepage)'), tc('Contact Clipe233 Engineers | Get a Free IT Consultation in Ho, Ghana'), badge('High')],
    [tc('/products'), tc('(Same as homepage)'), tc('IT Products | Clipe POS, Medic, School & Pharma Software - Clipe233'), badge('High')],
    [tc('/software-dev'), tc('(Same as homepage)'), tc('Software Development Services in Ghana | Custom Apps - Clipe233'), badge('High')],
    [tc('/website-dev'), tc('(Same as homepage)'), tc('Website Design & Development in Ghana | Professional Sites - Clipe233'), badge('High')],
    [tc('/mobile-app'), tc('(Same as homepage)'), tc('Mobile App Development Ghana | iOS & Android Apps - Clipe233'), badge('High')],
    [tc('/it-consultancy'), tc('(Same as homepage)'), tc('IT Consultancy & Training in Ghana | Digital Transformation - Clipe233'), badge('High')],
    [tc('/networking'), tc('(Same as homepage)'), tc('Networking Solutions Ghana | LAN, WAN & Fiber Optics - Clipe233'), badge('High')],
    [tc('/enterprise-net'), tc('(Same as homepage)'), tc('Enterprise Network Solutions Ghana | Campus & Data Centre - Clipe233'), badge('High')],
    [tc('/e-commerce'), tc('(Same as homepage)'), tc('E-Commerce Solutions Ghana | Online Store Development - Clipe233'), badge('High')],
    [tc('/clipe-pos'), tc('(Same as homepage)'), tc('Clipe POS | Point of Sale Software for Ghana Businesses - Clipe233'), badge('High')],
    [tc('/clipe-medic'), tc('(Same as homepage)'), tc('Clipe Medic | Hospital Management Software Ghana - Clipe233'), badge('High')],
    [tc('/clipe-school'), tc('(Same as homepage)'), tc('Clipe School | School Management System Ghana - Clipe233'), badge('High')],
    [tc('/clipe-pharma'), tc('(Same as homepage)'), tc('Clipe Pharma | Pharmacy Management Software Ghana - Clipe233'), badge('High')],
    [tc('/clipe-cms'), tc('(Same as homepage)'), tc('Clipe CMS | Complaint Management Software Ghana - Clipe233'), badge('High')],
]
story.append(make_table(titles_data, col_widths=[W*0.13, W*0.22, W*0.50, W*0.15], stripe=True))

story.append(Spacer(1, 8))
story.append(Paragraph(
    "Meta descriptions should follow a similar pattern: each page needs a unique description of 150-160 characters "
    "that includes a primary keyword, a value proposition, and a call to action. The current generic description on "
    "all pages fails to address the specific intent behind each page, resulting in lower click-through rates and missed "
    "keyword targeting opportunities. Additionally, Open Graph tags (og:title, og:description, og:image, og:url) are "
    "missing their image and URL components on every page, resulting in poor social media sharing previews with no "
    "thumbnail images when links are shared on Facebook, Twitter, LinkedIn, or WhatsApp.",
    s_body
))

story.append(Paragraph("3.2 Heading Structure Analysis", s_h2))
story.append(Paragraph(
    "The heading structure within individual pages is well-implemented. Each page has exactly one H1 element that "
    "clearly describes the page topic, followed by H2 elements for major sections and H3 elements for subsections. "
    "This hierarchy is correct from an accessibility and SEO perspective. However, because all components use ssr:false, "
    "these headings are invisible to search engine crawlers that do not execute JavaScript. The heading content itself "
    "could also be improved for keyword targeting. For example, the homepage H1 'Code. Design. Deploy. Transform.' is "
    "stylistically appealing but lacks the primary keywords that potential customers would search for, such as 'IT Solutions', "
    "'Software Development', or 'Ghana'. A better approach would be to combine the aspirational tagline with keyword-rich "
    "text, such as 'Engineering Smart IT Solutions for Ghana and Beyond' as the H1, with the creative tagline as a "
    "supporting subheading.",
    s_body
))

heading_data = [
    [th('Page'), th('Current H1'), th('Recommended H1'), th('Issue')],
    [tc('Homepage'), tc('Code. Design. Deploy. Transform.'), tc('Smart IT Solutions for Ghana and Beyond'), tc('No target keywords')],
    [tc('Contact'), tc("Let's Build Something Amazing"), tc('Contact Clipe233 for IT Solutions'), tc('No target keywords')],
    [tc('Software Dev'), tc('Software / Application Development'), tc('Custom Software Development Services in Ghana'), tc('Missing location')],
    [tc('Website Dev'), tc('Website Development'), tc('Professional Website Design & Development Ghana'), tc('Missing keywords')],
    [tc('Mobile App'), tc('Mobile App Development'), tc('Mobile App Development for Ghana Businesses'), tc('Missing location')],
    [tc('Networking'), tc('Networking Solutions'), tc('Networking Solutions & Infrastructure Ghana'), tc('Missing keywords')],
    [tc('IT Consultancy'), tc('IT Consultancy / Training'), tc('IT Consultancy & Training Services Ghana'), tc('Missing location')],
    [tc('Enterprise Net'), tc('Enterprise Network Solutions'), tc('Enterprise Network Solutions for Ghana'), tc('Missing location')],
    [tc('E-Commerce'), tc('E-Commerce Solutions'), tc('E-Commerce Website Development Ghana'), tc('Missing location')],
]
story.append(make_table(heading_data, col_widths=[W*0.13, W*0.22, W*0.38, W*0.27]))

story.append(Paragraph("3.3 Image Alt Text Audit", s_h2))
story.append(Paragraph(
    "The website uses raw img tags instead of Next.js Image components, which means images lack automatic lazy "
    "loading, responsive srcsets, and modern format serving. The alt text quality varies across the site. The logo "
    "images have descriptive alt text ('Clipe233 Engineers Logo'), which is appropriate. However, hero slider images "
    "use generic alt text like 'Clipe233 Engineers' instead of describing the visual content of each slide, which "
    "is a missed opportunity for image search visibility. Product pages have almost no images at all, relying solely "
    "on the logo, which represents a significant content gap. Each product page (Clipe POS, Clipe Medic, etc.) should "
    "include screenshots, feature illustrations, or interface mockups with descriptive alt text that includes relevant "
    "keywords.",
    s_body
))

alt_data = [
    [th('Image'), th('Current Alt Text'), th('Recommended Alt Text'), th('Priority')],
    [tc('Logo (Navbar/Footer)'), tc('Clipe233 Engineers Logo'), tc('Clipe233 Engineers Logo (keep as-is)'), badge('OK')],
    [tc('Hero Slide 1'), tc('Clipe233 Engineers'), tc('Clipe233 IT team building software solutions in Ghana'), badge('High')],
    [tc('Hero Slide 2'), tc('Clipe233 Engineers'), tc('Network infrastructure installation by Clipe233 Engineers'), badge('High')],
    [tc('Hero Slide 3'), tc('Clipe233 Engineers'), tc('Custom software development at Clipe233 Ghana office'), badge('High')],
    [tc('Team: Raymond'), tc('Eng. Raymond Romeo Dravie'), tc('Eng. Raymond Romeo Dravie, Founder & Lead Engineer, Clipe233'), badge('Medium')],
    [tc('Team: Frank'), tc('Eng. Frank Hope Tachie'), tc('Eng. Frank Hope Tachie, Senior Developer, Clipe233'), badge('Medium')],
    [tc('Team: Senyo'), tc('Senyo Kofi Dzakah'), tc('Senyo Kofi Dzakah, Network Engineer, Clipe233'), badge('Medium')],
    [tc('Product pages'), tc('(No product images)'), tc('Add product screenshots with keyword-rich alt text'), badge('High')],
]
story.append(make_table(alt_data, col_widths=[W*0.18, W*0.22, W*0.42, W*0.18]))

story.append(PageBreak())

# ═══════ 4. CONTENT SEO STRATEGY ═══════
story.append(Paragraph("4. Content SEO Strategy", s_h1))

story.append(Paragraph("4.1 Primary Topics and Keyword Research", s_h2))
story.append(Paragraph(
    "The Clipe233 website operates in the IT services and software products space with a specific geographic focus on "
    "Ghana, particularly the Volta Region. The primary topics that the website should target for organic search visibility "
    "fall into three clusters: (1) IT services including software development, website design, mobile app development, "
    "networking solutions, and IT consultancy; (2) Software products including point-of-sale systems, hospital management, "
    "school management, pharmacy management, and complaint management systems; and (3) Local IT services in Ghana and "
    "the Volta Region. Each of these clusters has distinct keyword opportunities with varying levels of competition and "
    "search volume. The Ghana IT services market is growing rapidly, with increasing demand for digital transformation "
    "solutions from businesses, government agencies, and NGOs, making this an ideal time to establish strong organic "
    "search presence.",
    s_body
))

story.append(Paragraph("4.2 Thirty High-Value Keywords", s_h2))

kw_data = [
    [th('#'), th('Keyword'), th('Intent'), th('Target Page'), th('Competition')],
    [tc('1'), tc('software development Ghana'), tc('Commercial'), tc('/software-development'), badge('Medium')],
    [tc('2'), tc('website design Ghana'), tc('Commercial'), tc('/website-development'), badge('High')],
    [tc('3'), tc('mobile app development Ghana'), tc('Commercial'), tc('/mobile-app-development'), badge('Medium')],
    [tc('4'), tc('IT consultancy Ghana'), tc('Commercial'), tc('/it-consultancy'), badge('Low')],
    [tc('5'), tc('networking solutions Ghana'), tc('Commercial'), tc('/networking-solutions'), badge('Low')],
    [tc('6'), tc('point of sale software Ghana'), tc('Commercial'), tc('/clipe-pos'), badge('Low')],
    [tc('7'), tc('hospital management system Ghana'), tc('Commercial'), tc('/clipe-medic'), badge('Low')],
    [tc('8'), tc('school management system Ghana'), tc('Commercial'), tc('/clipe-school'), badge('Low')],
    [tc('9'), tc('pharmacy software Ghana'), tc('Commercial'), tc('/clipe-pharma'), badge('Low')],
    [tc('10'), tc('complaint management system Ghana'), tc('Commercial'), tc('/clipe-complaint'), badge('Low')],
    [tc('11'), tc('IT company Ho Ghana'), tc('Local'), tc('Homepage'), badge('Low')],
    [tc('12'), tc('web developers Volta Region'), tc('Local'), tc('/website-development'), badge('Low')],
    [tc('13'), tc('custom software Ghana'), tc('Commercial'), tc('/software-development'), badge('Medium')],
    [tc('14'), tc('digital transformation Ghana'), tc('Informational'), tc('/it-consultancy'), badge('Medium')],
    [tc('15'), tc('e-commerce website Ghana'), tc('Commercial'), tc('/e-commerce'), badge('High')],
    [tc('16'), tc('enterprise network solutions Ghana'), tc('Commercial'), tc('/enterprise-network-solutions'), badge('Low')],
    [tc('17'), tc('IT solutions for churches Ghana'), tc('Commercial'), tc('Homepage'), badge('Low')],
    [tc('18'), tc('school management software Africa'), tc('Commercial'), tc('/clipe-school'), badge('Low')],
    [tc('19'), tc('fiber optic installation Ghana'), tc('Commercial'), tc('/networking-solutions'), badge('Low')],
    [tc('20'), tc('best IT company in Ghana'), tc('Commercial'), tc('Homepage'), badge('Medium')],
    [tc('21'), tc('pos system for small business Ghana'), tc('Commercial'), tc('/clipe-pos'), badge('Low')],
    [tc('22'), tc('hospital software Africa'), tc('Commercial'), tc('/clipe-medic'), badge('Low')],
    [tc('23'), tc('website redesign Ghana'), tc('Commercial'), tc('/website-development'), badge('Low')],
    [tc('24'), tc('IT training Ghana'), tc('Commercial'), tc('/it-consultancy'), badge('Low')],
    [tc('25'), tc('network security Ghana'), tc('Commercial'), tc('/networking-solutions'), badge('Medium')],
    [tc('26'), tc('software company Ho Volta'), tc('Local'), tc('Homepage'), badge('Low')],
    [tc('27'), tc('pharmacy management system Africa'), tc('Commercial'), tc('/clipe-pharma'), badge('Low')],
    [tc('28'), tc('business automation Ghana'), tc('Commercial'), tc('/it-consultancy'), badge('Low')],
    [tc('29'), tc('data centre setup Ghana'), tc('Commercial'), tc('/enterprise-network-solutions'), badge('Low')],
    [tc('30'), tc('ngo website development Ghana'), tc('Commercial'), tc('/website-development'), badge('Low')],
]
story.append(make_table(kw_data, col_widths=[W*0.05, W*0.30, W*0.14, W*0.28, W*0.23]))

story.append(Paragraph("4.3 Content Gaps and Blog Topics", s_h2))
story.append(Paragraph(
    "The current website is primarily a brochure-style site with service descriptions and product features. While this "
    "covers the basic informational needs of potential customers who already know about Clipe233, it misses the much "
    "larger audience of people searching for solutions to their IT problems without knowing Clipe233 exists. A blog or "
    "resource section would capture this top-of-funnel traffic by answering common questions and providing educational "
    "content. The website currently has no blog section at all, despite having a blog CRUD system in the admin dashboard "
    "and a /api/blog route already built. This infrastructure exists but is not linked from the public-facing site, "
    "representing a significant missed opportunity for content marketing and organic search growth.",
    s_body
))

blog_data = [
    [th('Topic'), th('Target Keyword'), th('Word Count'), th('Priority')],
    [tc('How to Choose the Right POS System for Your Ghana Business'), tc('pos system Ghana'), tc('1,500'), badge('High')],
    [tc('Why Ghana Hospitals Need Digital Management Systems'), tc('hospital management Ghana'), tc('1,800'), badge('High')],
    [tc('Complete Guide to School Management Software in Africa'), tc('school management software Africa'), tc('2,000'), badge('High')],
    [tc('5 Networking Best Practices for Ghana Enterprises'), tc('network solutions Ghana'), tc('1,200'), badge('High')],
    [tc('Digital Transformation Roadmap for Ghana SMEs'), tc('digital transformation Ghana'), tc('1,500'), badge('High')],
    [tc('How to Build an E-Commerce Website in Ghana: Step by Step'), tc('e-commerce website Ghana'), tc('2,000'), badge('Medium')],
    [tc('IT Consultancy vs In-House IT: What Ghana Businesses Need'), tc('IT consultancy Ghana'), tc('1,200'), badge('Medium')],
    [tc('Why Every Ghana Church Needs a Management System'), tc('church management Ghana'), tc('1,000'), badge('Medium')],
    [tc('Mobile App Development Cost in Ghana: Complete Breakdown'), tc('mobile app cost Ghana'), tc('1,500'), badge('Medium')],
    [tc('Website Design Trends for Ghana Businesses in 2026'), tc('website design Ghana'), tc('1,200'), badge('Medium')],
    [tc('How Fiber Optic Networks Are Transforming Ghana Offices'), tc('fiber optic Ghana'), tc('1,200'), badge('Low')],
    [tc('Complaint Management Best Practices for Government Agencies'), tc('complaint management Ghana'), tc('1,500'), badge('Low')],
    [tc('Pharmacy Software: Why Ghana Pharmacies Need Digital Solutions'), tc('pharmacy software Ghana'), tc('1,200'), badge('Low')],
    [tc('IT Infrastructure Planning Guide for Ghana Startups'), tc('IT infrastructure Ghana'), tc('1,800'), badge('Low')],
    [tc('How to Secure Your Business Network in Ghana'), tc('network security Ghana'), tc('1,200'), badge('Low')],
]
story.append(make_table(blog_data, col_widths=[W*0.35, W*0.22, W*0.12, W*0.31]))

story.append(Paragraph("4.4 Three-Month Content Strategy", s_h2))
story.append(Paragraph(
    "The following three-month content strategy is designed to build organic search visibility progressively, starting "
    "with the highest-impact technical fixes and then layering content that targets commercial-intent keywords relevant "
    "to the Ghana IT market. Month 1 focuses on fixing the critical technical SEO issues (SSR, sitemap, meta tags) and "
    "launching the blog with foundational articles. Month 2 expands the content library with product-focused articles "
    "and service comparison guides. Month 3 targets long-tail keywords and builds topical authority through in-depth "
    "resource articles and case studies.",
    s_body
))

month_data = [
    [th('Month'), th('Focus'), th('Actions'), th('Expected Outcome')],
    [tc('Month 1'), tc('Technical Foundation + Blog Launch'),
     tc('1. Enable SSR on all pages. 2. Add unique metadata to all 15 pages. 3. Create sitemap.xml. 4. Add JSON-LD to homepage. 5. Publish 5 foundational blog articles. 6. Submit sitemap to GSC.'),
     tc('Pages become crawlable. GSC shows indexing progress within 2-4 weeks.')],
    [tc('Month 2'), tc('Content Expansion + Product Focus'),
     tc('1. Add Product schema to all product pages. 2. Publish 5 product-focused blog articles. 3. Create comparison guides. 4. Add FAQ sections with FAQPage schema. 5. Build internal link network.'),
     tc('Start ranking for product keywords. Blog articles appear in search results.')],
    [tc('Month 3'), tc('Topical Authority + Long-Tail'),
     tc('1. Publish 5 in-depth resource articles (2,000+ words). 2. Create case studies. 3. Add BreadcrumbList schema. 4. Optimize based on GSC data. 5. Begin local link building.'),
     tc('Establish topical authority. Measurable organic traffic growth.')],
]
story.append(make_table(month_data, col_widths=[W*0.10, W*0.18, W*0.45, W*0.27]))

story.append(PageBreak())

# ═══════ 5. INTERNAL LINKING ═══════
story.append(Paragraph("5. Internal Linking Strategy", s_h1))
story.append(Paragraph(
    "Internal linking helps search engines understand the hierarchy and relationships between pages, distributes link "
    "equity across the site, and guides users to relevant content. The current internal linking structure has several "
    "weaknesses that limit its SEO effectiveness. The primary navigation uses a combination of hash links (pointing to "
    "homepage sections like #home, #about, #team) and real page links (pointing to service and product pages). While "
    "hash links work for single-page navigation, they do not contribute to internal link equity because they reference "
    "the same page. This means the homepage sections receive no additional link support from navigation links.",
    s_body
))
story.append(Paragraph(
    "The footer has the most significant internal linking issues. Social media links (Facebook, Twitter, Instagram, "
    "LinkedIn) all point to href='#', meaning they are dead links that waste crawl budget and provide no value to users. "
    "The 'Privacy Policy' and 'Terms & Conditions' links also point to href='#', indicating these pages do not exist. "
    "From a legal compliance perspective, every business website should have a privacy policy, and these missing pages "
    "should be created. The newsletter form in the footer also does not function, with onSubmit calling preventDefault "
    "without any backend integration. Beyond fixing these issues, the site would benefit from contextual internal links "
    "within service page content that point to related products and other services, creating a dense internal link "
    "network that helps both users and crawlers discover all content.",
    s_body
))

link_data = [
    [th('Issue'), th('Location'), th('Impact'), th('Fix')],
    [tc('Social links all href="#"'), tc('Footer'), badge('High'), tc('Replace with actual social profile URLs')],
    [tc('Privacy Policy href="#"'), tc('Footer'), badge('High'), tc('Create /privacy-policy page')],
    [tc('Terms & Conditions href="#"'), tc('Footer'), badge('High'), tc('Create /terms page')],
    [tc('No blog link in navigation'), tc('Navbar'), badge('High'), tc('Add "Blog" or "Insights" link')],
    [tc('No contextual cross-links'), tc('All service pages'), badge('Medium'), tc('Add "Related Services" and "Related Products" sections')],
    [tc('Newsletter form non-functional'), tc('Footer'), badge('Medium'), tc('Connect to /api/newsletter endpoint')],
    [tc('Logo link uses preventDefault'), tc('Navbar'), badge('Low'), tc('Use standard Next.js Link component')],
    [tc('No breadcrumb navigation'), tc('All sub-pages'), badge('Medium'), tc('Add breadcrumb component with BreadcrumbList schema')],
]
story.append(make_table(link_data, col_widths=[W*0.28, W*0.14, W*0.12, W*0.46]))

# ═══════ 6. MOBILE SEO ═══════
story.append(Paragraph("6. Mobile SEO Evaluation", s_h1))
story.append(Paragraph(
    "The website implements responsive design using Tailwind CSS utility classes with mobile-first breakpoints (sm:, "
    "md:, lg:), which is the correct approach for mobile SEO. The viewport meta tag is properly configured, the site "
    "uses relative units and flexible grid layouts, and interactive elements like buttons and form inputs appear to have "
    "sufficient touch target sizes. The mobile hamburger menu is functional, and the overall layout adapts well to "
    "different screen sizes. These are positive findings that indicate the site was built with mobile users in mind, "
    "which is critical given that mobile internet usage in Ghana exceeds desktop usage by a significant margin.",
    s_body
))
story.append(Paragraph(
    "However, there are several mobile-specific SEO issues that need attention. The contact form on the homepage uses "
    "small input fields that may be difficult to interact with on mobile devices, particularly the grid layout with "
    "side-by-side inputs on narrow screens. The hero section's rotating text animation may cause layout shifts on slower "
    "mobile connections. Touch targets for some navigation items could be larger to meet the recommended 48x48dp minimum. "
    "Most importantly, the ssr:false issue disproportionately affects mobile users because mobile Googlebot uses a slower "
    "rendering pipeline, making it even less likely that JavaScript-only content will be properly indexed on mobile. "
    "Additionally, there is no PWA manifest or service worker, which means the site cannot be installed on mobile home "
    "screens or work offline, missing an opportunity for repeat mobile engagement.",
    s_body
))

mobile_data = [
    [th('Check'), th('Status'), th('Details')],
    [tc('Responsive viewport meta tag'), badge('OK'), tc('Properly configured')],
    [tc('Mobile-first CSS breakpoints'), badge('OK'), tc('Tailwind sm/md/lg breakpoints used correctly')],
    [tc('Touch target sizes'), badge('Medium'), tc('Some nav items below 48x48dp recommended minimum')],
    [tc('Mobile form usability'), badge('Medium'), tc('Input fields could be larger on mobile')],
    [tc('PWA manifest'), badge('High'), tc('No manifest.json or service worker exists')],
    [tc('Mobile rendering by Googlebot'), badge('Critical'), tc('ssr:false means mobile Googlebot sees empty pages')],
    [tc('Font legibility on mobile'), badge('OK'), tc('Font sizes adequate with proper line-height')],
    [tc('Horizontal scroll prevention'), badge('OK'), tc('No overflow detected on mobile viewport')],
]
story.append(make_table(mobile_data, col_widths=[W*0.30, W*0.13, W*0.57]))

# ═══════ 7. BACKLINK STRATEGY ═══════
story.append(Paragraph("7. Backlink Strategy", s_h1))
story.append(Paragraph(
    "Backlinks remain one of the most important ranking factors, particularly for competitive keywords in the IT "
    "services space. The Clipe233 website currently has limited backlink opportunities because it lacks content that "
    "other websites would naturally want to link to. A successful backlink strategy for this site should focus on three "
    "pillars: local directory listings, content-driven link earning, and strategic partnerships. Given the company's "
    "location in Ho, Ghana, and its focus on the Ghanaian market, local and regional backlinks will be particularly "
    "valuable for establishing relevance in local search results.",
    s_body
))

backlink_data = [
    [th('Strategy'), th('Tactic'), th('Expected Links'), th('Timeline')],
    [tc('Local Directories'), tc('List on Google Business Profile, Yelp Ghana, Ghana Yellow Pages, Yen.com business directory, Volta Region business listings'), tc('8-12'), tc('Month 1')],
    [tc('Industry Associations'), tc('Join Ghana ICT Directory, Ghana Chamber of Commerce, AfriLabs network'), tc('3-5'), tc('Month 1-2')],
    [tc('Guest Blogging'), tc('Write guest posts for Ghana tech blogs (TechInAfrica, Disrupt Africa, Briter Bridges) with author bio links'), tc('4-6'), tc('Month 2-3')],
    [tc('Resource Link Building'), tc('Create free IT tools (network speed test, uptime checker) that attract natural links'), tc('5-10'), tc('Month 2-3')],
    [tc('Client Testimonials'), tc('Offer testimonials to technology vendors (hosting providers, SaaS tools) for backlinks'), tc('3-5'), tc('Month 1-2')],
    [tc('Case Studies'), tc('Publish detailed case studies that clients and partners will link to from their own sites'), tc('2-4'), tc('Month 3')],
    [tc('Scholarship Links'), tc('Create a small IT scholarship for Ghana university students, listed on .edu domains'), tc('5-8'), tc('Month 3')],
    [tc('HARO / Journalist Outreach'), tc('Respond to journalist queries about IT in Africa on Connectively and Qwoted'), tc('2-4'), tc('Ongoing')],
]
story.append(make_table(backlink_data, col_widths=[W*0.18, W*0.42, W*0.15, W*0.25]))

# ═══════ 8. LOCAL SEO ═══════
story.append(Paragraph("8. Local SEO Recommendations", s_h1))
story.append(Paragraph(
    "Local SEO is critically important for Clipe233 Engineers because the company serves a specific geographic area "
    "(Ho, Volta Region, Ghana) and targets local businesses, government agencies, and organizations. When potential "
    "clients search for 'IT company in Ho' or 'software developer near me' from within the Volta Region, the website "
    "should appear prominently in local search results. Currently, the site has minimal local SEO optimization. The "
    "address is mentioned on the contact page and in the Google Maps embed, but it is not structured in a way that "
    "search engines can easily parse. There is no Google Business Profile linked to the website, no LocalBusiness "
    "schema markup, and the NAP (Name, Address, Phone) information is not consistently formatted across the site.",
    s_body
))

local_data = [
    [th('Action'), th('Details'), th('Priority')],
    [tc('Create Google Business Profile'), tc('Add full business name, address (Ho, Volta Region), phone (+233 24 978 3736), hours, photos, services. Verify via postcard or phone.'), badge('Critical')],
    [tc('Add LocalBusiness JSON-LD'), tc('Include name, streetAddress, addressLocality (Ho), addressRegion (Volta Region), addressCountry (GH), telephone, geo coordinates, openingHours.'), badge('Critical')],
    [tc('Consistent NAP on all pages'), tc('Display Name, Address, Phone in footer on every page in consistent format. Use schema markup on footer NAP.'), badge('High')],
    [tc('Create location pages'), tc('Consider /ho-it-services and /volta-region-it-solutions pages targeting local search queries.'), badge('High')],
    [tc('Ghana directory listings'), tc('Submit to Google Maps, Ghana Yellow Pages, Hotfrog Ghana, and Volta Region business directories.'), badge('High')],
    [tc('Add geo-coordinates to schema'), tc('Ho, Ghana coordinates: approximately 6.6104 N, 0.4709 E. Add to LocalBusiness schema geo property.'), badge('Medium')],
    [tc('Encourage Google reviews'), tc('Add a Google review link to contact page and email signatures. Respond to all reviews promptly.'), badge('Medium')],
    [tc('Local blog content'), tc('Write articles like "Best IT Solutions for Ho Businesses" and "Volta Region Digital Transformation Guide".'), badge('Medium')],
    [tc('Add map to homepage'), tc('The contact page has a map, but the homepage should also show the office location for local search signals.'), badge('Low')],
]
story.append(make_table(local_data, col_widths=[W*0.25, W*0.57, W*0.18]))

story.append(PageBreak())

# ═══════ 9. PRIORITIZED ACTION PLAN ═══════
story.append(Paragraph("9. Prioritized Action Plan", s_h1))
story.append(Paragraph(
    "The following action plan organizes all identified issues and recommendations into three priority tiers based on "
    "their expected impact on search visibility and the effort required for implementation. High priority items are "
    "those that are currently blocking or severely limiting the website's ability to rank in search results. Medium "
    "priority items will improve rankings once the foundational issues are resolved. Low priority items provide "
    "incremental improvements and should be addressed after higher-priority items are complete.",
    s_body
))

story.append(Paragraph("High Priority (Implement Immediately)", s_h2))
high_data = [
    [th('#'), th('Action'), th('Category'), th('Effort'), th('Impact')],
    [tc('1'), tc('Remove ssr:false from all dynamic imports; enable server-side rendering'), tc('Technical'), tc('4 hrs'), badge('Critical')],
    [tc('2'), tc('Add unique title tags and meta descriptions to all 15 pages'), tc('On-Page'), tc('3 hrs'), badge('Critical')],
    [tc('3'), tc('Create sitemap.ts with all 15 routes; submit to Google Search Console'), tc('Technical'), tc('1 hr'), badge('Critical')],
    [tc('4'), tc('Add metadataBase and alternates.canonical to root layout'), tc('Technical'), tc('1 hr'), badge('Critical')],
    [tc('5'), tc('Add Organization and LocalBusiness JSON-LD schema to homepage'), tc('Technical'), tc('2 hrs'), badge('Critical')],
    [tc('6'), tc('Add Service JSON-LD schema to all 6 service pages'), tc('Technical'), tc('2 hrs'), badge('High')],
    [tc('7'), tc('Add Product JSON-LD schema to all 5 product pages'), tc('Technical'), tc('2 hrs'), badge('High')],
    [tc('8'), tc('Update robots.txt with Sitemap directive and Disallow for /admin and /api/'), tc('Technical'), tc('15 min'), badge('High')],
    [tc('9'), tc('Create and set up Google Business Profile with full NAP data'), tc('Local SEO'), tc('2 hrs'), badge('High')],
    [tc('10'), tc('Add og:image and og:url to all pages; create social sharing image'), tc('On-Page'), tc('2 hrs'), badge('High')],
    [tc('11'), tc('Fix footer social links (replace href="#" with actual profile URLs)'), tc('Links'), tc('30 min'), badge('High')],
    [tc('12'), tc('Create /privacy-policy and /terms pages; update footer links'), tc('Links'), tc('3 hrs'), badge('High')],
]
story.append(make_table(high_data, col_widths=[W*0.05, W*0.42, W*0.12, W*0.11, W*0.30]))

story.append(Spacer(1, 10))
story.append(Paragraph("Medium Priority (Implement in Month 2)", s_h2))
med_data = [
    [th('#'), th('Action'), th('Category'), th('Effort'), th('Impact')],
    [tc('13'), tc('Switch from raw img to Next.js Image component; enable image optimization'), tc('Technical'), tc('6 hrs'), badge('Medium')],
    [tc('14'), tc('Remove images.unoptimized:true from next.config.ts'), tc('Technical'), tc('15 min'), badge('Medium')],
    [tc('15'), tc('Add product screenshots/images to all product pages with keyword-rich alt text'), tc('On-Page'), tc('4 hrs'), badge('Medium')],
    [tc('16'), tc('Improve hero image alt text with descriptive, keyword-rich descriptions'), tc('On-Page'), tc('30 min'), badge('Medium')],
    [tc('17'), tc('Add "Related Services" and "Related Products" cross-link sections'), tc('Links'), tc('4 hrs'), badge('Medium')],
    [tc('18'), tc('Add BreadcrumbList JSON-LD schema to all sub-pages'), tc('Technical'), tc('2 hrs'), badge('Medium')],
    [tc('19'), tc('Create a blog section and publish 5 foundational articles'), tc('Content'), tc('20 hrs'), badge('Medium')],
    [tc('20'), tc('Add FAQ sections to service pages with FAQPage schema markup'), tc('Content'), tc('6 hrs'), badge('Medium')],
    [tc('21'), tc('Connect newsletter form to /api/newsletter endpoint'), tc('Technical'), tc('1 hr'), badge('Medium')],
    [tc('22'), tc('Get listed in 8-12 Ghana business directories'), tc('Local SEO'), tc('4 hrs'), badge('Medium')],
]
story.append(make_table(med_data, col_widths=[W*0.05, W*0.42, W*0.12, W*0.11, W*0.30]))

story.append(Spacer(1, 10))
story.append(Paragraph("Low Priority (Implement in Month 3+)", s_h2))
low_data = [
    [th('#'), th('Action'), th('Category'), th('Effort'), th('Impact')],
    [tc('23'), tc('Create PWA manifest and service worker for mobile installability'), tc('Mobile'), tc('4 hrs'), badge('Low')],
    [tc('24'), tc('Add WebSite schema with SearchAction for sitelinks search box'), tc('Technical'), tc('1 hr'), badge('Low')],
    [tc('25'), tc('Publish 5 in-depth resource articles (2,000+ words each)'), tc('Content'), tc('25 hrs'), badge('Low')],
    [tc('26'), tc('Create case studies for past clients with their approval'), tc('Content'), tc('10 hrs'), badge('Low')],
    [tc('27'), tc('Implement scholarship link building campaign'), tc('Backlinks'), tc('8 hrs'), badge('Low')],
    [tc('28'), tc('Begin guest posting on Ghana tech blogs'), tc('Backlinks'), tc('15 hrs'), badge('Low')],
    [tc('29'), tc('Create location-specific landing pages (/ho-it-services)'), tc('Local SEO'), tc('4 hrs'), badge('Low')],
    [tc('30'), tc('Add Google Maps embed to homepage contact section'), tc('Local SEO'), tc('30 min'), badge('Low')],
    [tc('31'), tc('Set up HARO/journalist outreach for media mentions'), tc('Backlinks'), tc('Ongoing'), badge('Low')],
    [tc('32'), tc('Add Crawl-delay directive to robots.txt for non-Google bots'), tc('Technical'), tc('10 min'), badge('Low')],
]
story.append(make_table(low_data, col_widths=[W*0.05, W*0.42, W*0.12, W*0.11, W*0.30]))

story.append(Spacer(1, 20))
story.append(HRFlowable(width="100%", thickness=1, color=BORDER, spaceAfter=10))
story.append(Paragraph(
    "This SEO audit report was prepared for Clipe233 Engineers. Implementation of the high-priority items alone is "
    "expected to transform the website from near-zero organic visibility to a competitive position in Ghana's IT "
    "services search market. The recommended three-month strategy provides a clear roadmap from foundational fixes "
    "through content authority building. Regular monitoring via Google Search Console and analytics tools will help "
    "track progress and identify new optimization opportunities as the site grows.",
    s_body_muted
))

# Build PDF
doc.build(story)
print(f"PDF generated: {output_path}")
