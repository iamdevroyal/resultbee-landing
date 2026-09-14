<script setup lang="ts">
import { useRouter } from '../router';
import { useScrollAnimation } from '../composables/useScrollAnimation';

const emit = defineEmits<{
  (e: 'open-onboarding'): void;
  (e: 'open-demo'): void;
}>();

const { navigateTo } = useRouter();

useScrollAnimation();
</script>

<template>
  <div class="w-full bg-[#faf8ff] text-[#181b26] min-h-screen">
    
    <!-- Hero Section -->
    <section class="relative w-full bg-[#0F121C] text-surface-container-lowest pt-28 pb-20 sm:pt-36 sm:pb-28 px-6 overflow-hidden">
      <!-- Ambient Pattern -->
      <div class="absolute inset-0 opacity-15 pointer-events-none">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-honeycomb" width="56" height="97" patternUnits="userSpaceOnUse">
              <path d="M28 0 L56 16.2 L56 48.5 L28 64.7 L0 48.5 L0 16.2 Z M28 97 L56 80.8 L56 48.5 L28 64.7 L0 48.5 L0 80.8 Z" fill="none" stroke="#D97706" stroke-opacity="0.35" stroke-width="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-honeycomb)" />
        </svg>
      </div>

      <div class="max-w-[1020px] mx-auto relative z-10 text-center flex flex-col items-center gap-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed/15 text-primary-fixed border border-primary-fixed/25 text-xs font-semibold animate-hero-tag animate-float-slow">
          <span class="material-symbols-outlined text-[16px]">history_edu</span>
          The ResultBee Origin Story
        </div>

        <h1 class="font-display-hero text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-surface-container-lowest font-extrabold max-w-3xl animate-hero-headline">
          Why we built a grading engine for <span class="text-primary-fixed">Nigerian schools</span>.
        </h1>

        <p class="font-body-lg text-sm sm:text-lg text-surface-container-high max-w-2xl leading-relaxed animate-hero-sub">
          Generic Western school information systems assume perpetual high-speed internet and monolithic grading scales. We built ResultBee from the ground up for how African schools actually operate.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-2 animate-hero-cta">
          <button 
            @click="emit('open-onboarding')" 
            class="px-6 py-3 rounded-full bg-primary-fixed text-on-primary-fixed font-headline-sm text-sm font-bold shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:bg-primary-fixed-dim transition-all cursor-pointer"
          >
            Start School Evaluation
          </button>
          <button 
            @click="emit('open-demo')" 
            class="px-6 py-3 rounded-full border border-white/20 text-surface-container-lowest font-headline-sm text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer"
          >
            Meet Our Curriculum Team
          </button>
        </div>
      </div>
    </section>

    <!-- Narrative & The Problem Section -->
    <section class="max-w-[1020px] mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16">
      
      <!-- The Core Paradox -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal-on-scroll">
        <div class="md:col-span-7 flex flex-col gap-4">
          <span class="text-xs font-bold uppercase tracking-wider text-primary">The Core Reality</span>
          <h2 class="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Excel spreadsheets corrupt. Western software doesn't fit.
          </h2>
          <p class="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Every terminal evaluation period across Nigeria, thousands of vice principals and teachers spend sleepless nights wrestling with broken Excel macros, accidental VLOOKUP shifts, and inconsistent Continuous Assessment (CA) formulas.
          </p>
          <p class="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            When schools try foreign software, they hit immediate brick walls: foreign tools don't natively compute WAEC stanine scales (A1–F9), can't handle three-term cumulative session weightings, don't track affective and psychomotor domains, and crash the moment Wi-Fi flickers.
          </p>
        </div>

        <div class="md:col-span-5 glass-card-light bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-highest flex flex-col gap-4 shadow-sm card-hover-interactive reveal-on-scroll stagger-2">
          <div class="flex items-center gap-3 border-b border-surface-container pb-3">
            <span class="w-3 h-3 rounded-full bg-error" />
            <span class="font-mono text-xs font-bold text-on-surface">Term-End Spreadsheet Pitfalls</span>
          </div>
          <ul class="space-y-3 text-xs text-on-surface-variant">
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-error text-[18px]">warning</span>
              <span><strong>Formula Corruption:</strong> Accidental drag-and-drop altering CA percentages for whole classes.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-error text-[18px]">signal_disconnected</span>
              <span><strong>Spotty Bandwidth:</strong> Cloud portals that lose half-entered score sheets during sudden power outages.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-error text-[18px]">hourglass_bottom</span>
              <span><strong>Report Bottlenecks:</strong> 2–3 weeks of administrative delays before terminal cards reach parents.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- The Four ResultBee Pillars -->
      <div class="flex flex-col gap-8 pt-8">
        <div class="text-center max-w-2xl mx-auto flex flex-col gap-2 reveal-on-scroll">
          <span class="text-xs font-bold uppercase tracking-wider text-secondary">Our Architectural Pillars</span>
          <h2 class="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Engineered for African School Sovereignty
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant">
            ResultBee is not a rigid template. It is an extensible engine that conforms to your school's unique pedagogical choices.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Pillar 1 -->
          <div class="glass-card-light bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-highest flex flex-col gap-3.5 card-hover-interactive reveal-on-scroll stagger-1">
            <div class="w-11 h-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[24px]">tune</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface">1. Total Grading Sovereignty</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Whether your school assesses students via 20% CA1 + 20% CA2 + 60% Exam, or 30/70, or includes practical laboratory projects, our engine validates that component weights sum to 100% mathematically. Set custom scales at the school, branch, or section level.
            </p>
          </div>

          <!-- Pillar 2 -->
          <div class="glass-card-light bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-highest flex flex-col gap-3.5 card-hover-interactive reveal-on-scroll stagger-2">
            <div class="w-11 h-11 rounded-xl bg-secondary-container text-secondary flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[24px]">wifi_off</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface">2. Offline-First Teacher Gradebook</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Teachers can open ResultBee on their mobile phones, tablets, or laptops in classrooms with zero Wi-Fi. Entries save instantly to high-speed local browser storage (IndexedDB) and sync conflict-free the moment connection is detected.
            </p>
          </div>

          <!-- Pillar 3 -->
          <div class="glass-card-light bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-highest flex flex-col gap-3.5 card-hover-interactive reveal-on-scroll stagger-1">
            <div class="w-11 h-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface">3. Tamper-Proof Audit Trail</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Every score modification is permanently stamped with teacher identity, timestamp, and previous value. Once report cards are formally published, subject lines freeze as immutable cryptographic snapshots, eliminating post-publication grade doctoring.
            </p>
          </div>

          <!-- Pillar 4 -->
          <div class="glass-card-light bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-highest flex flex-col gap-3.5 card-hover-interactive reveal-on-scroll stagger-2">
            <div class="w-11 h-11 rounded-xl bg-secondary-container text-secondary flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[24px]">chat</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface">4. Native WhatsApp & SMS Dispatch</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Parents in Nigeria check WhatsApp more consistently than email. The minute a term's reports receive Head Teacher sign-off, parents receive an automated, PIN-protected WhatsApp & SMS link to securely view and download certified PDF report cards.
            </p>
          </div>

        </div>
      </div>

      <!-- Nigerian Infrastructure & Data Sovereignty -->
      <div class="p-8 sm:p-10 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-4 card-hover-interactive reveal-on-scroll">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-secondary text-[28px]">shield</span>
          <h3 class="font-headline-sm text-xl font-bold text-on-surface">
            Built & Hosted for Nigerian Data Sovereignty
          </h3>
        </div>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Student privacy is non-negotiable. ResultBee adheres strictly to the <strong>Nigeria Data Protection Regulation (NDPR)</strong>. Student records and terminal archives are stored with AES-256 encryption at rest, replicated across our Lagos and Abuja edge cloud nodes. Your school owns 100% of its data at all times.
        </p>
      </div>

      <!-- CTA Box -->
      <div class="glass-detached rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-surface-container-lowest flex flex-col items-center gap-4 shadow-xl card-hover-interactive reveal-on-scroll">
        <h3 class="font-headline-md text-2xl sm:text-3xl font-bold">
          Join Nigeria's Forward-Thinking Schools
        </h3>
        <p class="text-xs sm:text-sm text-surface-container-high max-w-lg">
          Switch from spreadsheet chaos to an automated, tamper-proof academic grading engine this term.
        </p>
        <div class="flex flex-wrap gap-3 pt-2">
          <button 
            @click="emit('open-onboarding')" 
            class="px-6 py-3 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-sm shadow-md hover:bg-primary-fixed-dim transition-all cursor-pointer"
          >
            Start Your School Onboarding
          </button>
          <button 
            @click="navigateTo('home')" 
            class="px-5 py-3 rounded-full border border-white/20 text-surface-container-lowest font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>

    </section>

  </div>
</template>
