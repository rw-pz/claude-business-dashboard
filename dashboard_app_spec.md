# Interactive Business Dashboard – Developer Specification

## Table of Contents
1. [Project Overview](#project-overview)
2. [Goals & Success Criteria](#goals--success-criteria)
3. [Technology Stack](#technology-stack)
4. [High‑Level Architecture](#high‑level-architecture)
5. [Navigation & Screen Breakdown](#navigation--screen-breakdown)
6. [Data Layer](#data-layer)
7. [Component Hierarchy](#component-hierarchy)
8. [Styling & Animations](#styling--animations)
9. [Accessibility & UX Best Practices](#accessibility--ux-best-practices)
10. [Performance Considerations](#performance-considerations)
11. [Testing Strategy](#testing-strategy)
12. [CI/CD & Deployment](#cicd--deployment)
13. [Repository Structure](#repository-structure)
14. [Local Development](#local-development)
15. [Contribution Guidelines](#contribution-guidelines)

---
## Project Overview
A single‑page **React 19** application that visualises SaaS business metrics in real time. The dashboard is split into four tabs—**Overview, Revenue, Marketing, Geography**—each containing purpose‑built charts, KPI cards and interactive elements. The app is fully static after build and can be deployed on **GitHub Pages**.

---
## Goals & Success Criteria
| Goal | Success Metric |
|------|---------------|
| Fast initial load | Time‑to‑interactive < **1.5 s** (Lighthouse, 4 G throttling) |
| Smooth interaction | < **16 ms** frame budget for animations / hover states |
| Accurate data | Polling/WebSocket re‑fetch every **30 s**; live indicator reflects fetching state |
| A11y compliance | WCAG 2.2 AA (contrast ≥ 4.5:1, keyboard nav, ARIA labels) |
| Clean codebase | 100 % ESLint + TS strict pass; > 90 % unit test coverage |

---
## Technology Stack
| Layer | Tech | Notes |
|-------|------|-------|
| Build | **Vite 5 + TypeScript 5** | Instant HMR, static export via `vite build` |
| UI | **React 19** | Concurrent Rendering + Suspense |
| State / Data | **React Query 5** | Automatic cache & revalidation |
| Charts | **Recharts 3** | Area, Bar, Line, Pie; D3‑powered |
| Heat‑map | **Apache ECharts 5 (lazy‑loaded)** | Native heat‑map series |
| Maps | **Mapbox GL JS** (`react-map-gl`) | Vector tiles & city‑level clustering |
| Animations | **Motion** (Framer Motion v12) | Declarative spring & hover effects |
| Styling | **Tailwind CSS v4 + shadcn/ui** | Utility‑first + accessible components |
| Icons | **lucide‑react** | 14 px/20 px outline icons |
| Testing | **Vitest + React Testing Library** | Jest‑compatible API |
| Lint/Format | ESLint + Prettier | Airbnb + React Hooks rules |

---
## High‑Level Architecture
```
┌──────────────────────────────┐
│  Browser / SPA               │
│ ┌───────────────┐            │
│ │  React 19     │ Router     │
│ │  (Tabs)       │──────┐     │
│ └───────────────┘      │     │
│        ▲ Suspense/Lazy │     │
│        │               ▼     │
│ ┌─────────────────────────┐  │
│ │ Feature Modules         │  │
│ │  • kpi                  │  │
│ │  • charts               │  │
│ │  • map                  │  │
│ └─────────────────────────┘  │
│        ▲ hooks + context     │
│        │                     │
│ ┌─────────────────────────┐  │
│ │ Data Client (RQ)        │  │
│ │  • REST / WebSocket     │  │
│ └─────────────────────────┘  │
└──────────────────────────────┘
```
*All data adapters live client‑side; replace `mockService` with real API when available.*

---
## Navigation & Screen Breakdown
### 1. Overview
- **KPI Cards** (MRR, ARR, ARPU, Churn) with animated counters.
- **Growth Line Chart** – Month‑over‑Month revenue vs target.

### 2. Revenue
- **Stacked Bar → Plan Breakdown** (Starter/Pro/Enterprise).
- **Area Chart** – Net revenue vs refunds.
- **SaaS Metrics Table** – CAC, LTV, Gross Margin.

### 3. Marketing
- **Pie Chart** – Traffic sources (SEO, Paid, Referral, Direct).
- **Area Conversion Funnel** – Visitors → Trials → Paid.
- **Heat‑map** – Hour‑by‑hour conversion rate.

### 4. Geography
- **Interactive Map** – Revenue per city (bubble size + color scale).
- **Data Table** – Top 20 cities sortable by revenue.

---
## Data Layer
```ts
interface KpiResponse {
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  arpu: number; // Average Revenue Per User
  churnRate: number; // %
}

// React Query hook example
export const useKpi = () =>
  useQuery<KpiResponse>(['kpi'], fetchKpi, { refetchInterval: 30_000 });
```
*Endpoints are stubbed under `/api/*` with MirageJS in dev; swap to real URLs in `env.ts`.*

---
## Component Hierarchy
```
<App>
 ├─ <Navbar>
 ├─ <TabLayout>
 │   ├─ <OverviewPage>
 │   │   ├─ <KpiCards>
 │   │   └─ <GrowthLineChart>
 │   ├─ <RevenuePage>
 │   ├─ <MarketingPage>
 │   └─ <GeographyPage>
 └─ <LiveIndicator>
```

---
## Styling & Animations
- **Tailwind Tokens**: primary `#2563eb`, secondary `#9333ea`. Neutral grays via `gray‑50…900`.
- **Cards**: `rounded-2xl shadow-lg/5 p-6 bg-white hover:scale-102 transition-transform`.
- **Gradients**: `bg-gradient-to-tr from-white via-gray-50 to-white` for subtle depth.
- **Motion**: `whileHover={{ scale: 1.03 }}`; page transitions via `AnimatePresence`.

---
## Accessibility & UX Best Practices
1. Semantic HTML (`<main>`, `<nav>`, `<section>`).
2. Keyboard‑visible focus: `outline‑offset‑2 outline‑2 outline-primary`.
3. Tooltips triggered on `focus` & `hover`.
4. Chart colour scale uses **Viridis** (colour‑blind friendly).

---
## Performance Considerations
- **Code‑splitting** per tab (`React.lazy`).
- **Dynamic import** of heavy libraries (ECharts, Mapbox) only on respective pages.
- **Memoised selectors** + `React.memo` on pure chart components.
- **Image & icon sprite** via `vite-plugin-svgr`.

---
## Testing Strategy
| Level | Tool | What We Test |
|-------|------|--------------|
| Unit | Vitest | Pure utils, hooks |
| Component | React Testing Library | KPI cards render correct values |
| Integration | Playwright | Navigation flow, API mocking |
| Visual | Storybook + Chromatic | Regression on critical components |

---
## CI/CD & Deployment
```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm run test:ci
      - run: pnpm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
👉 After merge to `main`, the static bundle is auto‑deployed to **https://<org>.github.io/dashboard/**.

---
## Repository Structure
```
root
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ hooks/
│  ├─ services/
│  ├─ styles/
│  └─ index.tsx
├─ public/
├─ tests/
├─ .github/workflows/
└─ vite.config.ts
```

---
## Local Development
```bash
pnpm i               # install deps
pnpm dev             # start Vite on http://localhost:5173
pnpm test --watch    # Vitest in watch mode
pnpm storybook       # Storybook at :6006
```

### Environment Variables (`.env`)
```
VITE_API_URL=https://api.example.com
VITE_MAPBOX_TOKEN=<token>
```

---
## Contribution Guidelines
1. **Branch naming**: `feat/<scope>`, `fix/<scope>`.
2. **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`…).
3. **PR checklist** must pass: build, tests, lint, accessibility snapshot.
4. **Design changes** need screenshot in PR description.

---
> **Need help?** Ping `@maintainers` on Slack #dashboard‑dev for questions about data contracts or deployment.

