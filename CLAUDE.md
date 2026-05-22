# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # install deps (also runs nuxt prepare)
pnpm dev              # dev server with HTTPS (requires localhost.pem + localhost-key.pem)
pnpm dev-http         # dev server without HTTPS
pnpm build            # production build
pnpm generate         # static generation
pnpm test             # vitest with coverage (happy-dom env)
pnpm lint             # eslint + prettier check
pnpm lintfix          # auto-fix eslint + prettier
```

Generate local SSL certs (one-time):

```bash
brew install mkcert && mkcert -install && mkcert localhost
```

Run a single test file:

```bash
pnpm vitest tests/helpers.spec.ts
```

Upgrade Nuxt and all dependencies:

```bash
nuxi upgrade --force
```

## Environment Variables

Copy `.env.example` → `.env.local`. Required keys:

- `STORYBLOK_TOKEN` — Storyblok API token (draft in dev, published in prod)
- `GTM` — Google Tag Manager ID
- `SENTRY_DNS` — Sentry DSN
- `BASE_URL` — canonical URL (defaults to `https://lorena.ramonda.me`)

## Architecture

**Nuxt 3** personal/resume site deploying to **Netlify** as a static site (`nitro preset: netlify-static`).

### Content layer — Storyblok CMS

All page content is fetched from Storyblok. Two API modes: `draft` in dev, `published` in prod.

- `storyblok/` — Storyblok component mappings. Vue components here are auto-registered as Storyblok renderable blocks.
- `stores/index.ts` — Pinia store that fetches `cdn/spaces/me/` (for cache version) and `cdn/stories` (job history). The `space.version` (`cv`) is threaded into all story fetch calls for cache busting.
- `composables/useLocalizedStoryParams.ts` — Builds the params object for every Storyblok API call, injecting locale + space cache version. All story fetches must use `getParams()` from this composable.
- `composables/usePostLang.ts` — Normalises Storyblok's `default` language string to `undefined`.

### i18n

Three locales: `it` (default), `en`, `es`. Strategy: `prefix_except_default` (Italian URLs have no prefix). Locale files live in `i18n/locales/`. Only `it` and `en` are sent to Storyblok (`languagesAllowed` in `useLocalizedStoryParams`); `es` falls back to `en`.

### Component structure

- `components/` — general UI components (Base* = generic, The* = layout singletons)
- `storyblok/` — Storyblok block components (auto-registered via `@storyblok/nuxt`)
- `pages/` — file-based routing; subdirectories mirror Storyblok folder structure (`experiences/`, `hobbies/`, `projects/`, `publications/`)

### Styling

Global SCSS entry: `assets/scss/main.scss`. SCSS variables are auto-injected into every component via Vite preprocessor config (`@use "@/assets/scss/variables/_index.scss" as *`). Local fork of `sass-mq` lives in `local_modules/`.

### Testing

Vitest with `happy-dom`. Coverage limited to `composables/**` and `utils/**` only — components are not unit tested.

## Git Flow

Feature branches → squash into one commit → rebase into `develop`. No merge commits on feature branches.
