# Surge Docs

This is the documentation for Surge - a Bitcoin-native credit market. 

## Running Locally

Install dependencies:
```bash
pnpm install
```

Start the dev server:
```bash
pnpm dev
```

## Structure

- `docs/pages/` - all the documentation content (mdx files)
- `docs/components/` - components used in the docs
- `docs/public/` - static assets like images and logos

## AI ingestion

Generate model-friendly exports without changing source content:

```bash
pnpm ai:build
```

This creates:
- `docs/public/llms.txt` (index + important routes)
- `docs/public/llms-full.txt` (flattened corpus from all MDX pages)

The normal build also runs this step automatically.
