import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://forbiddenlink.github.io/cereal-tasting';
const BUILD_DATE = '2026-02-10';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/pairings/', label: 'Pairings' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
];

const ROUTES = [
  {
    path: '/',
    title: "The Sommelier's Spoon | Vintage Cereal Tasting Experience",
    description: 'Browse collectible cereal vintages, compare flavor profiles, test pairings, and curate a nostalgia flight through a premium satirical tasting interface.',
    heading: "The Sommelier's Spoon",
    kicker: 'Vintage cereal tasting studio',
    author: 'The Cellar Editorial Team',
    date: BUILD_DATE,
    paragraphs: [
      'The Sommeliers Spoon is a satirical product studio built to show how strong front-end craft can elevate a playful concept into a complete digital experience. The core idea is simple: treat nostalgic breakfast cereal with the same ceremony often reserved for luxury categories. That contrast gives the app personality while still leaving room for serious implementation quality in navigation, performance, accessibility, state handling, and interaction design.',
      'Inside the app, every cereal item exposes a structured profile that includes flavor dimensions, age, rarity, and storytelling cues. Visitors can compare products side by side, tune sorting and price filters, and move through an intentionally theatrical interface without losing usability. Motion is used as emphasis, not noise, and reduced-motion preferences are respected so the interaction model remains inclusive across devices and user needs.',
      'This route serves as the entry point for both users and search crawlers. It surfaces a clear explanation of the project, direct links to key sections, and enough semantic content to make intent understandable even when JavaScript is unavailable. In practice that means meaningful headings, descriptive copy, and stable internal links that preserve orientation for keyboard users, assistive technology, and static crawlers.',
      'The product is still intentionally fun, but the engineering goals are strict: ship fast pages, avoid fragile runtime patterns, and keep the information architecture easy to expand. New feature slices can be added without rewriting the foundation, which is the strongest sign that the codebase can support a longer roadmap rather than only a one-off visual demo.',
    ],
  },
  {
    path: '/pairings',
    title: "Pairing Guide | The Sommelier's Spoon",
    description: 'Calibrate cereal and milk combinations with interactive synergy scoring, flavor rationale, and shareable tasting outcomes for every experimental pairing.',
    heading: 'Pairing Guide',
    kicker: 'Cereal and milk compatibility lab',
    author: 'Sensory Research Desk',
    date: BUILD_DATE,
    paragraphs: [
      'The Pairing Guide route demonstrates how product logic can feel editorial while still being practical. It lets users explore combinations of cereal profiles and milk styles through a scoring model that translates playful flavor attributes into understandable output. Even though the concept is satirical, the interface patterns are production-minded: predictable state transitions, shareable URLs, and clear affordances around selection and reset actions.',
      'A useful pairing interface needs to do more than display a score. It should explain why two inputs work together, expose tradeoffs, and help users branch into nearby options without losing context. This page is designed around that principle, combining concise explanation blocks with fast controls and immediate feedback so visitors can iterate on combinations as if they were using a real recommendation tool.',
      'From a technical perspective, this section is a proving ground for composable React patterns. Inputs, cards, and recommendation states are isolated enough to maintain independently, while route-level metadata and links keep the page indexable and understandable in static analysis. The result is a feature that can scale into richer recommendation logic without forcing architectural churn.',
      'For non-JavaScript environments, this prerendered shell still communicates the function of the page and keeps navigation intact. That fallback behavior is important for crawlability, social previews, and resilience under constrained clients. It ensures the route always explains itself, even before hydration or when scripts fail entirely.',
    ],
  },
  {
    path: '/about',
    title: "About The Cellar | The Sommelier's Spoon",
    description: 'Meet the satirical brand story, product philosophy, and technical craft principles behind our premium cereal tasting cellar experience.',
    heading: 'About The Cellar',
    kicker: 'Story, craft, and implementation intent',
    author: 'Brand and Product Team',
    date: BUILD_DATE,
    paragraphs: [
      'The About route frames the project narrative in a way that supports trust without losing tone. It explains what the experience is, why it exists, and which parts are intentionally theatrical versus technically grounded. For portfolio projects this matters because strong aesthetics alone do not communicate engineering quality; clear framing helps reviewers understand where design decisions and product constraints meet.',
      'This page also doubles as evidence of maintainable content structure. Sections are organized so that copy, visuals, and interaction accents can evolve independently, which prevents common rewrite pressure later. A good About page in a modern app should not be treated as static filler. It is a core location for audience orientation, contributor context, and the standards that guide future work.',
      'In this codebase, the brand voice is intentionally exaggerated, but the technical execution follows practical standards: semantic headings, route-level metadata, responsive layout behavior, and predictable navigation patterns. That combination allows the product to stay expressive while still meeting expectations for accessibility and crawlability.',
      'When viewed without JavaScript, this prerendered version preserves the key narrative and linking structure so users and crawlers can still interpret intent. That fallback improves durability across environments and keeps the project legible during audits, snapshots, and static validation workflows.',
    ],
  },
  {
    path: '/contact',
    title: 'Contact | The Sommelier\'s Spoon',
    description: 'Reach the team for press, partnerships, collaboration inquiries, and premium nostalgia concept work related to this interactive portfolio product.',
    heading: 'Contact',
    kicker: 'Partnerships, press, and project inquiries',
    author: 'Studio Operations',
    date: BUILD_DATE,
    paragraphs: [
      'The Contact route is built to be clear and low friction. Visitors should immediately understand the purpose of the channel, what type of requests are welcome, and what to expect after reaching out. In many projects this page is under-scoped, but it is often the most direct conversion surface for collaboration opportunities and client leads.',
      'From a product perspective, a strong contact page balances personality with precision. It can carry the same brand tone as the rest of the site, but it should avoid ambiguity around next steps. This implementation keeps navigation obvious, route metadata explicit, and copy concise so the page works both as a user destination and as a crawlable endpoint in technical audits.',
      'Operationally, this route is also a strategic extension point. It can expand into validated forms, anti-spam controls, CRM integrations, or response SLAs without structural rework. The current implementation intentionally preserves that flexibility while keeping the interface lightweight and fast.',
      'The prerendered shell on this page ensures basic contact context remains available when scripts are blocked or deferred. That resilience supports accessibility, helps bots interpret page purpose, and avoids dead-end experiences in constrained environments.',
    ],
  },
  {
    path: '/privacy-policy',
    title: "Privacy Policy | The Sommelier's Spoon",
    description: 'Learn how local browser data, preferences, and session-like state are handled transparently within this portfolio cereal tasting application.',
    heading: 'Privacy Policy',
    kicker: 'Data handling and storage transparency',
    author: 'Compliance and Engineering',
    date: BUILD_DATE,
    paragraphs: [
      'This privacy route documents how user data is handled across the experience, with specific focus on browser-local storage and interaction preferences. Even small portfolio products benefit from explicit policy language because it sets user expectations and signals implementation maturity. Clear disclosure helps distinguish intentional data use from accidental collection.',
      'The current application logic is designed to keep user state local when possible, such as preserving cart and rating context in the browser for continuity. This page exists to explain that behavior in plain language and to outline what is not collected. Scope boundaries are as important as capabilities, especially when a project may be reviewed by clients or hiring teams.',
      'As the application evolves, this route can be updated alongside new integrations, analytics additions, or backend services. Keeping policy content versioned with the codebase encourages tighter alignment between technical reality and user-facing claims. That reduces risk and makes compliance updates part of normal engineering workflow instead of an afterthought.',
      'Because the page is prerendered, its core disclosure text and links remain available in static crawls and no-JavaScript contexts. This improves legal discoverability and ensures the policy can be reached from every major route through stable internal navigation.',
    ],
  },
];

const NOT_FOUND_ROUTE = {
  path: '/404',
  title: 'Page Not Found | The Sommelier\'s Spoon',
  description: 'The requested page could not be found in the cereal cellar.',
  heading: 'Page Not Found',
  kicker: 'Route mismatch',
  author: 'Routing System',
  date: BUILD_DATE,
  paragraphs: [
    'The requested route was not found, but the cellar is still open. Use the primary links below to return to the collection, pairing guide, or supporting pages.',
  ],
};

function toAbsoluteUrl(pathname) {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}/`;
}

function routeToOutputPath(pathname) {
  if (pathname === '/') {
    return path.join(DIST_DIR, 'index.html');
  }

  const normalized = pathname.replace(/^\/+/, '');
  return path.join(DIST_DIR, normalized, 'index.html');
}

function replaceTag(html, pattern, nextTag) {
  if (!pattern.test(html)) {
    return html;
  }

  return html.replace(pattern, nextTag);
}

function renderFallbackShell(route) {
  const nav = NAV_LINKS.map(
    (link) => `<a href="${link.href}" class="prerender-nav-link">${link.label}</a>`
  ).join('');

  const paragraphs = route.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('');
  const publishedDate = `${route.date}T00:00:00Z`;

  return `
<main id="main-content" class="prerender-shell">
  <article class="prerender-article">
    <p class="prerender-kicker">${route.kicker}</p>
    <h1>${route.heading}</h1>
    <p class="prerender-meta">By <strong>${route.author}</strong> · <time datetime="${publishedDate}">${route.date}</time></p>
    ${paragraphs}
    <nav class="prerender-nav" aria-label="Primary">
      ${nav}
    </nav>
  </article>
</main>`.trim();
}

function applyRouteMetadata(template, route) {
  const canonical = toAbsoluteUrl(route.path);
  const fallbackShell = renderFallbackShell(route);
  const publishedDate = `${route.date}T00:00:00Z`;

  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta property="article:modified_time" content="[^"]*"\s*\/?>/,
    `<meta property="article:modified_time" content="${publishedDate}" />`
  );
  html = replaceTag(
    html,
    /<meta name="author" content="[^"]*"\s*\/?>/,
    `<meta name="author" content="${route.author}" />`
  );
  html = replaceTag(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${fallbackShell}</div>`
  );

  return html;
}

async function writeRouteHtml(template, route) {
  const outputPath = routeToOutputPath(route.path);
  await mkdir(path.dirname(outputPath), { recursive: true });
  const html = applyRouteMetadata(template, route);
  await writeFile(outputPath, html, 'utf8');
}

async function run() {
  const template = await readFile(TEMPLATE_PATH, 'utf8');
  await Promise.all(ROUTES.map((route) => writeRouteHtml(template, route)));

  const notFoundHtml = applyRouteMetadata(template, NOT_FOUND_ROUTE);
  await writeFile(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf8');
  await writeRouteHtml(template, NOT_FOUND_ROUTE);

  console.log(`Prerendered ${ROUTES.length + 2} static HTML routes into ${DIST_DIR}`);
}

run().catch((error) => {
  console.error('Failed to prerender routes:', error);
  process.exitCode = 1;
});
