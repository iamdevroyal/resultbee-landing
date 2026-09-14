# ResultBee — School Continuous Assessment & Result Management Platform

ResultBee is a grading and result management platform tailored for the way primary and secondary institutions across Nigeria run — your Continuous Assessment (CA) structure, your grading scale, your report card, and your academic rules.

---

## 🌟 Key Features

- **No-Code Grading Policy Engine**: Configure custom continuous assessment splits (e.g., 20/20/60, 30/70, 10/10/10/70) and grading scales (WAEC 9-point stanine A1–F9, Cambridge letter systems, and primary mastery criteria).
- **Multi-Campus Fleet Governance**: Centrally oversee multiple state branches and divisions (Nursery, Primary, Secondary) with discrete grading rules per campus.
- **Offline-First Teacher Gradebook**: Teachers can input scores, attendance, and qualitative remarks even when campus internet goes dark, syncing conflict-free once reconnected.
- **Multi-Channel Terminal Dispatch**: Instant automated PIN-protected report card delivery via SMS, WhatsApp, and the dedicated Parent Portal the second results receive administrative sign-off.
- **Audit-Trail Integrity**: Cryptographic immutable snapshots of published subject lines prevent unauthorized post-publication alterations.
- **NDPR Compliant**: Institutional data ownership guaranteeing school control over all student records and continuous assessment data.

---

## 🚀 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with bespoke design tokens and glassmorphism utilities
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: Google Material Symbols Outlined
- **Typography**: Plus Jakarta Sans

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/iamdevroyal/resultbee-landing.git

# Navigate into the project folder
cd resultbee-landing

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 Production Build & Testing

```bash
# Type check and lint
npm run lint

# Build optimized production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
Refer to the [LICENSE](LICENSE) file in the repository root for institutional usage terms.
