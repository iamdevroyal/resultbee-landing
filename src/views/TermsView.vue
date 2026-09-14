<script setup lang="ts">
import { useRouter } from '../router';
import { useScrollAnimation } from '../composables/useScrollAnimation';

const { navigateTo } = useRouter();
const effectiveDate = 'September 1, 2026';

useScrollAnimation();
</script>

<template>
  <div class="w-full bg-[#faf8ff] text-[#181b26] min-h-screen">
    
    <!-- Header Banner -->
    <section class="relative w-full bg-[#0F121C] text-surface-container-lowest pt-28 pb-16 sm:pt-36 sm:pb-20 px-6">
      <div class="max-w-[900px] mx-auto text-center flex flex-col items-center gap-4">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/20 text-primary-fixed text-xs font-semibold border border-primary-fixed/30 animate-hero-tag animate-float-slow">
          <span class="material-symbols-outlined text-[16px]">gavel</span>
          Institutional SaaS Agreement
        </div>
        <h1 class="font-display-hero text-3xl sm:text-5xl font-extrabold text-surface-container-lowest tracking-tight animate-hero-headline">
          Terms of Service & School SLA
        </h1>
        <p class="text-surface-container-high text-xs sm:text-sm max-w-xl animate-hero-sub">
          The legal and operational terms governing your school's deployment and usage of the ResultBee grading platform.
        </p>
        <span class="text-[11px] text-surface-container-high/70 animate-hero-cta">Effective Date: {{ effectiveDate }}</span>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-[900px] mx-auto px-6 py-12 sm:py-16 text-xs sm:text-sm text-on-surface-variant leading-relaxed flex flex-col gap-10">
      
      <!-- Institutional Trust Guarantee -->
      <div class="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
        <h3 class="font-bold text-sm text-on-surface flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary text-[20px]">verified</span>
          Institutional Guarantee: Complete School Ownership
        </h3>
        <p class="text-xs">
          Your educational institution retains 100% full legal, intellectual, and operational ownership over all student registries, continuous assessment marks, teacher assignments, and generated report cards. ResultBee provides the software infrastructure; your data remains solely yours.
        </p>
      </div>

      <!-- Clause 1 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          1. Platform Provision & Scope of Service
        </h2>
        <p>
          ResultBee Technologies Ltd ("ResultBee", "we", "us") agrees to provide the educational institution ("Subscriber", "School") with an isolated, cloud-hosted tenant workspace accessible via a dedicated subdomain (e.g., <code>yourschool.resultbee.com</code>) or verified institutional custom domain (e.g., <code>portal.yourschool.ng</code>).
        </p>
        <p>
          The service includes: the customizable continuous assessment configuration engine, offline-first teacher gradebook synchronization, terminal and cumulative report card assembly, parent SMS/WhatsApp delivery gateways, and multi-campus management consoles.
        </p>
      </section>

      <!-- Clause 2 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          2. Service Level Agreement (99.9% Uptime Guarantee)
        </h2>
        <p>
          We recognize that the terminal examination window is high-stakes. ResultBee warrants a <strong>99.9% uptime SLA</strong> throughout each academic term, with dedicated elastic capacity provisioned during peak terminal compilation weeks (Weeks 10 through 14 of the Nigerian academic calendar).
        </p>
        <p>
          In the event of an unplanned outage exceeding two consecutive hours during active school hours (8:00 AM – 4:00 PM West Africa Time), affected schools are credited pro-rata against subsequent termly invoices.
        </p>
      </section>

      <!-- Clause 3 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          3. Multi-Branch Scope Isolation & Billing
        </h2>
        <p>
          For institutions operating multi-branch campus networks (e.g. Mainland and Island branches), each branch operates under isolated permission boundaries.
        </p>
        <p>
          <strong>Isolation Guarantee:</strong> Any payment delay or commercial dispute arising from one branch or section shall never result in a lockout or service interruption for compliant, paid sibling branches within the group.
        </p>
      </section>

      <!-- Clause 4 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          4. Commercial Fees, Terms & Invoicing
        </h2>
        <ul class="list-disc list-inside space-y-1.5 pl-2 text-xs">
          <li><strong>Termly Billing:</strong> ResultBee charges on a per-enrolled-student basis per academic term, invoiced at the commencement of each term based on verified class rosters.</li>
          <li><strong>Currency & Taxes:</strong> All standard pricing is denominated in Nigerian Naira (NGN) and inclusive of applicable regulatory value-added taxes (VAT).</li>
          <li><strong>No Hidden Surcharges:</strong> Standard tier plans include automated report PDF generation, offline teacher caching, and parent portal access without surprise per-report fees.</li>
        </ul>
      </section>

      <!-- Clause 5 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          5. Academic Integrity & Tamper Prevention
        </h2>
        <p>
          The School agrees to uphold rigorous academic ethics. Once a terminal report card has completed the Head Teacher approval stage and been marked as published, its underlying subject marks are cryptographically locked as an immutable snapshot. Post-publication corrections must be recorded through the formal <code>amend()</code> protocol, creating a versioned audit trail.
        </p>
      </section>

      <!-- Clause 6 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          6. Termination & Zero-Lock-In Data Export
        </h2>
        <p>
          Either party may terminate the agreement upon 30 days written notice prior to the start of a new academic session.
        </p>
        <p>
          Upon notice of termination, ResultBee guarantees the School uninterrupted access to download complete historical datasets—including student registers, past terminal report PDFs, and continuous assessment gradebooks—in standard, unencrypted CSV, Excel, and PDF formats. Following 60 days of confirmed export, tenant records are securely purged from primary operational storage.
        </p>
      </section>

      <!-- Clause 7 -->
      <section class="flex flex-col gap-3">
        <h2 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
          7. Governing Law & Dispute Resolution
        </h2>
        <p>
          This Agreement is governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any institutional dispute arising out of this agreement shall first be resolved through good-faith mediation, and if unresolved, submitted to the Lagos Multi-Door Courthouse (LMDC).
        </p>
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
          @click="navigateTo('privacy')" 
          class="text-xs text-primary font-bold hover:underline"
        >
          Review Student Privacy Policy →
        </button>
      </div>

    </main>

  </div>
</template>
