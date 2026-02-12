import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "docs", "pages");
const PUBLIC_DIR = path.join(ROOT, "docs", "public");

function toRoute(filePath) {
  const rel = path.relative(PAGES_DIR, filePath).replace(/\\/g, "/");
  if (rel === "index.mdx") return "/";
  return `/${rel.replace(/\.mdx$/, "")}`;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { frontmatter: {}, body: raw };
  }

  const frontmatterBlock = match[1];
  const body = raw.slice(match[0].length);
  const frontmatter = {};

  for (const line of frontmatterBlock.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function normalizeBody(body) {
  const lines = body.split("\n");
  const cleaned = [];
  let inJsxBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("import ")) {
      continue;
    }

    if (trimmed.startsWith("{/*") && trimmed.endsWith("*/}")) {
      continue;
    }

    if (inJsxBlock) {
      if (trimmed.endsWith(">")) {
        inJsxBlock = false;
      }
      continue;
    }

    if (trimmed.startsWith("<") && !trimmed.startsWith("<!--")) {
      if (!trimmed.endsWith(">")) {
        inJsxBlock = true;
      }
      continue;
    }

    cleaned.push(line);
  }

  return cleaned.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function walkMdx(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMdx(full)));
      continue;
    }

    if (entry.isFile() && full.endsWith(".mdx")) {
      files.push(full);
    }
  }

  return files;
}

function buildLlmsTxt(pages) {
  const lines = [
    "# Surge Documentation",
    "",
    "This file is for language models and retrieval systems.",
    "",
    "- Canonical corpus: /llms-full.txt",
    "- Source format: MDX pages under /docs/pages",
    "- Human navigation: use the docs sidebar",
    "",
    "## Important URLs",
    ...pages.map((page) => `- ${page.route}`),
    "",
    "## Usage",
    "When possible, prefer /llms-full.txt for ingestion and chunking.",
  ];

  return lines.join("\n");
}

function buildLlmsFullTxt(pages) {
  const lines = [
    "# Surge Documentation - Full Corpus",
    "",
    "Flattened export of all documentation pages for AI ingestion.",
    "Each section includes a source route.",
  ];

  for (const page of pages) {
    lines.push("", `## ${page.title}`, `Source: ${page.route}`, "", page.body);
  }

  lines.push("");
  return lines.join("\n");
}

async function main() {
  const filePaths = await walkMdx(PAGES_DIR);
  filePaths.sort((a, b) => a.localeCompare(b));

  const pages = [];
  for (const filePath of filePaths) {
    const raw = await fs.readFile(filePath, "utf8");
    const { frontmatter, body } = parseFrontmatter(raw);
    const route = toRoute(filePath);
    const title = frontmatter.title || route;

    pages.push({
      title,
      route,
      body: normalizeBody(body),
    });
  }

  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  const llms = buildLlmsTxt(pages);
  const llmsFull = buildLlmsFullTxt(pages);

  await fs.writeFile(path.join(PUBLIC_DIR, "llms.txt"), llms, "utf8");
  await fs.writeFile(path.join(PUBLIC_DIR, "llms-full.txt"), llmsFull, "utf8");

  console.log(`Generated AI files for ${pages.length} pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
