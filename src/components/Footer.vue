<script setup lang="ts">
import { useRouter } from '../router';

const emit = defineEmits<{
  (e: 'open-demo'): void;
  (e: 'open-onboarding'): void;
}>();

const { navigateTo, scrollToSection } = useRouter();

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="w-full bg-[#0F121C] text-surface-container-lowest border-t border-surface-container-lowest/10 py-16 px-6 relative z-20">
    <div class="max-w-[1240px] mx-auto flex flex-col gap-12">
      
      <!-- Top Banner CTA within Footer -->
      <div class="glass-card-dark rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
        <div class="flex flex-col gap-2 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary-fixed/15 text-primary-fixed w-fit mx-auto lg:mx-0 border border-primary-fixed/20">
            <span class="w-2 h-2 rounded-full bg-primary-fixed animate-ping" />
            Empowering 200+ Nigerian Campuses
          </div>
          <h3 class="font-headline-md text-[24px] sm:text-[28px] text-surface-container-lowest font-bold">
            Ready to give your school grading sovereignty?
          </h3>
          <p class="text-surface-container-high text-sm max-w-xl">
            Set up your custom CA breakdown, import staff rosters, and produce tamper-proof report cards in minutes.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            @click="emit('open-demo')" 
            class="px-5 py-3 rounded-full border border-white/20 text-surface-container-lowest font-label-md hover:bg-white/10 transition-colors text-center cursor-pointer"
          >
            Request Walkthrough
          </button>
          <button 
            @click="emit('open-onboarding')" 
            class="px-6 py-3 rounded-full bg-primary-fixed text-on-primary-fixed font-bold font-label-md hover:bg-primary-fixed-dim transition-all shadow-lg text-center cursor-pointer"
          >
            Start Free Evaluation
          </button>
        </div>
      </div>

      <!-- Main Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        
        <!-- Col 1: Brand & Nigerian Identity -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-[0_2px_8px_rgba(217,119,6,0.35)]">
              <span class="material-symbols-outlined text-[24px]">hive</span>
            </div>
            <span class="font-headline-sm text-[22px] text-surface-container-lowest tracking-tight">
              Result<span class="text-primary-fixed">Bee</span>
            </span>
          </div>
          <p class="font-body-sm text-body-sm text-surface-container-high leading-relaxed max-w-md">
            The bespoke school continuous assessment and result compilation platform engineered for Nigerian primary schools, secondary colleges, and multi-campus institutions.
          </p>
          <div class="flex items-center gap-3 text-xs text-surface-container-high pt-2">
            
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/5 border border-white/10">
              <span class="material-symbols-outlined text-[14px] text-primary-fixed">shield</span>
              NDPR Compliant
            </span>
          </div>
        </div>

        <!-- Col 2: Platform -->
        <div class="flex flex-col gap-3">
          <span class="font-title-md text-title-md text-surface-container-lowest font-bold text-sm tracking-wider uppercase text-primary-fixed">
            Platform
          </span>
          <nav class="flex flex-col gap-2 text-sm text-surface-container-high">
            <a @click.prevent="scrollToSection('admin-features')" href="#admin-features" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Admin & Governance
            </a>
            <a @click.prevent="scrollToSection('grading-builder')" href="#grading-builder" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Interactive CA Builder
            </a>
            <a @click.prevent="scrollToSection('for-schools')" href="#for-schools" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Multi-Branch Campuses
            </a>
            <a @click.prevent="scrollToSection('for-stakeholders')" href="#for-stakeholders" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Teacher Offline Gradebook
            </a>
            <a @click.prevent="scrollToSection('pricing')" href="#pricing" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Termly Pricing & Plans
            </a>
            <a @click.prevent="scrollToSection('faq')" href="#faq" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Questions & Answers
            </a>
          </nav>
        </div>

        <!-- Col 3: Company & Legal -->
        <div class="flex flex-col gap-3">
          <span class="font-title-md text-title-md text-surface-container-lowest font-bold text-sm tracking-wider uppercase text-primary-fixed">
            Company & Trust
          </span>
          <nav class="flex flex-col gap-2 text-sm text-surface-container-high">
            <a @click.prevent="navigateTo('about')" href="#about" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              About ResultBee
            </a>
            <a @click.prevent="emit('open-demo')" href="#contact" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Contact & Bookings
            </a>
            <a @click.prevent="navigateTo('privacy')" href="#privacy" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Privacy Policy (NDPR)
            </a>
            <a @click.prevent="navigateTo('terms')" href="#terms" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
              Terms of Service (SLA)
            </a>
          </nav>
        </div>

        <!-- Col 4: Nigeria Academic Ops -->
        <div class="flex flex-col gap-3">
          <span class="font-title-md text-title-md text-surface-container-lowest font-bold text-sm tracking-wider uppercase text-primary-fixed">
            Curriculum Standards
          </span>
          <div class="flex flex-col gap-2 text-xs text-surface-container-high">
            <div class="p-2.5 rounded-lg bg-white/5 border border-white/5">
              <span class="font-semibold text-surface-container-lowest block">WAEC / NECO / BECE</span>
              <span class="text-surface-container-high text-[11px]">9-Point stanine conversion & cumulative term weights.</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-container-high">
        <p class="text-center md:text-left">
          © {{ currentYear }} ResultBee Technologies Ltd. All rights reserved. Crafted with care for schools across Nigeria.
        </p>
        <div class="flex items-center gap-5">
          <a @click.prevent="navigateTo('privacy')" href="#privacy" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
            Student Data Privacy
          </a>
          <a @click.prevent="navigateTo('terms')" href="#terms" class="hover:text-surface-container-lowest transition-colors cursor-pointer">
            Institutional Agreement
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>
