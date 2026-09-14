<script setup lang="ts">
import { useRouter } from '../router';
import { useScrollAnimation } from '../composables/useScrollAnimation';

const { navigateTo } = useRouter();
const lastUpdated = 'September 1, 2026';

useScrollAnimation();
</script>

<template>
  <div class="w-full bg-[#faf8ff] text-[#181b26] min-h-screen">
    
    <!-- Header Banner -->
    <section class="relative w-full bg-[#0F121C] text-surface-container-lowest pt-28 pb-16 sm:pt-36 sm:pb-20 px-6">
      <div class="max-w-[900px] mx-auto text-center flex flex-col items-center gap-4">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed text-xs font-semibold border border-secondary-container/30 animate-hero-tag animate-float-slow">
          <span class="material-symbols-outlined text-[16px]">verified_user</span>
          NDPR & Global Data Protection Standards
        </div>
        <h1 class="font-display-hero text-3xl sm:text-5xl font-extrabold text-surface-container-lowest tracking-tight animate-hero-headline">
          Privacy Policy & Pupil Data Safeguards
        </h1>
        <p class="text-surface-container-high text-xs sm:text-sm max-w-xl animate-hero-sub">
          How ResultBee Technologies Ltd safeguards educational records, student identities, and institutional data across Nigeria.
        </p>
        <span class="text-[11px] text-surface-container-high/70 animate-hero-cta">Last Updated & Certified: {{ lastUpdated }}</span>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-[900px] mx-auto px-6 py-12 sm:py-16 text-xs sm:text-sm text-on-surface-variant leading-relaxed flex flex-col gap-10">
      
      <!-- Summary Callout -->
      <div class="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
        <h3 class="font-bold text-sm text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">shield_person</span>
          Our Uncompromising Commitment to Educational Privacy
        </h3>
        <p class="text-xs">
          ResultBee operates under strict compliance with the <strong>Nigeria Data Protection Regulation (NDPR)</strong> and international child data protection principles. We believe school grading records belong strictly to schools, students, and their parents. <strong>We never sell, monetize, or train external commercial AI models on student academic records.</strong>
        </p>
      </div>

      <!-- Section 1 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          1. Roles & Legal Relationship (Data Controller vs. Data Processor)
        </h2>
        <p>
          Under the NDPR, your educational institution (the school) acts as the <strong>Data Controller</strong>. The school determines which student data, attendance logs, and marks are recorded on the platform.
        </p>
        <p>
          ResultBee Technologies Ltd acts solely as a <strong>Data Processor</strong>. We store, calculate, format, and dispatch results exclusively pursuant to the written instructions and institutional configurations set by authorized school administrators.
        </p>
      </section>

      <!-- Section 2 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          2. Categories of Educational Data We Process
        </h2>
        <p>To enable continuous assessment and terminal report generation, the platform processes:</p>
        <ul class="list-disc list-inside space-y-1.5 pl-2 text-xs">
          <li><strong>Pupil Identifiers:</strong> Student full name, institutional admission/registration number, class, arm/section, and date of birth.</li>
          <li><strong>Academic Performance:</strong> Continuous assessment (CA 1, CA 2) marks, practical scores, terminal examination grades, positions, and teacher remarks.</li>
          <li><strong>Affective & Psychomotor Traits:</strong> Punctuality, neatness, leadership, attentiveness, and sports ratings configured by the school.</li>
          <li><strong>Parent/Guardian Contact Data:</strong> Primary guardian telephone numbers and emails solely for SMS, WhatsApp, and portal report card delivery.</li>
          <li><strong>Staff Governance Data:</strong> Teacher registration numbers, subject-class assignments, and administrative audit trails.</li>
        </ul>
      </section>

      <!-- Section 3 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          3. Security Architecture & Multi-Tenant Isolation
        </h2>
        <p>
          ResultBee employs defense-in-depth isolation across all platform layers:
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
          <div class="p-4 rounded-xl bg-surface-container-lowest border border-surface-container">
            <span class="font-bold text-xs text-on-surface block mb-1">PostgreSQL Row-Level Security</span>
            <span class="text-[11px]">Database queries enforce hard tenant scoping at the engine level. Cross-school data leakage is mathematically impossible.</span>
          </div>
          <div class="p-4 rounded-xl bg-surface-container-lowest border border-surface-container">
            <span class="font-bold text-xs text-on-surface block mb-1">AES-256 & TLS 1.3</span>
            <span class="text-[11px]">All student scorecards and backups are encrypted at rest using AES-256 and transmitted exclusively over HTTPS/TLS 1.3.</span>
          </div>
        </div>
      </section>

      <!-- Section 4 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          4. Infrastructure, Data Residency & Gateways
        </h2>
        <p>
          Our primary and standby database instances reside in secure data center facilities with low-latency edge presence in <strong>Lagos and Abuja, Nigeria</strong>.
        </p>
        <p>
          Terminal report links dispatched via SMS and WhatsApp utilize certified Nigerian telecommunication gateways (MTN Nigeria, Airtel, Globacom, 9mobile). Delivery payloads contain secure, tokenized URLs protected by two-factor or PIN verification so unauthorized recipients cannot inspect pupil evaluations.
        </p>
      </section>

      <!-- Section 5 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          5. Rights of Students, Parents, and Schools
        </h2>
        <p>In accordance with Section 3 of the Nigeria Data Protection Regulation:</p>
        <ul class="list-disc list-inside space-y-1.5 pl-2 text-xs">
          <li><strong>Right to Access:</strong> Parents and students have the right to inspect their complete published historical academic records.</li>
          <li><strong>Right to Dispute/Rectification:</strong> Parents can lodge an official Grade Query through the portal during the dispute window if a score appears inconsistent.</li>
          <li><strong>Right to Full Portability:</strong> Schools can export their complete historical scorebooks, attendance sheets, and student registries in standard Excel/CSV format at any time without punitive lock-in.</li>
        </ul>
      </section>

      <!-- Section 6 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          6. Contacting the Data Protection Officer (DPO)
        </h2>
        <p>
          For queries regarding student privacy, NDPR audits, or data processing agreements:
        </p>
        <div class="p-4 rounded-xl bg-surface-container-lowest border border-surface-container text-xs">
          <span class="font-bold text-on-surface block">Data Protection Office</span>
          <span class="text-on-surface-variant block">ResultBee Technologies Ltd</span>
          <span class="text-on-surface-variant block">Victoria Island, Lagos, Nigeria</span>
          <span class="text-primary font-mono block mt-1">dpo@resultbee.com</span>
        </div>
      </section>

      <!-- Back Link -->
      <div class="pt-6 border-t border-surface-container flex justify-between items-center">
        <button 
          @click="navigateTo('home')" 
          class="px-5 py-2.5 rounded-full border border-surface-container-highest text-on-surface hover:bg-surface-container font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Return to Homepage
        </button>
        <button 
          @click="navigateTo('terms')" 
          class="text-xs text-primary font-bold hover:underline"
        >
          View Institutional Terms of Service →
        </button>
      </div>

    </main>

  </div>
</template>
