<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from '../router';

const emit = defineEmits<{
  (e: 'open-onboarding'): void;
  (e: 'open-demo'): void;
}>();

const { currentPage, navigateTo, scrollToSection } = useRouter();
const isMobileMenuOpen = ref(false);

const handleNavClick = (sectionId: string) => {
  isMobileMenuOpen.value = false;
  scrollToSection(sectionId);
};

const handlePageClick = (page: 'home' | 'about' | 'privacy' | 'terms') => {
  isMobileMenuOpen.value = false;
  navigateTo(page);
};

const handleOnboardingClick = () => {
  isMobileMenuOpen.value = false;
  emit('open-onboarding');
};

const handleDemoClick = () => {
  isMobileMenuOpen.value = false;
  emit('open-demo');
};
</script>

<template>
  <header class="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-[1240px] z-50 transition-all duration-300">
    <div class="glass-detached rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-[0_12px_32px_rgba(0,0,0,0.25)] border border-white/12">
      
      <!-- Brand Logo -->
      <a 
        href="#" 
        @click.prevent="handlePageClick('home')" 
        class="flex items-center gap-2.5 group cursor-pointer select-none"
      >
        <span class="font-headline-sm text-[20px] text-surface-container-lowest tracking-tight">
          Result<span class="text-primary-fixed">Bee</span>
        </span>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/5 backdrop-blur-md border border-white/5">
        <button 
          @click="handleNavClick('admin-features')" 
          class="px-3.5 py-1.5 text-surface-container-high hover:text-surface-container-lowest hover:bg-surface-container-lowest/10 transition-colors font-label-md text-label-md rounded-full cursor-pointer"
        >
          Features
        </button>
        <button 
          @click="handleNavClick('grading-builder')" 
          class="px-3.5 py-1.5 text-surface-container-high hover:text-surface-container-lowest hover:bg-surface-container-lowest/10 transition-colors font-label-md text-label-md rounded-full cursor-pointer"
        >
          Grading Engine
        </button>
        <button 
          @click="handleNavClick('for-schools')" 
          class="px-3.5 py-1.5 text-surface-container-high hover:text-surface-container-lowest hover:bg-surface-container-lowest/10 transition-colors font-label-md text-label-md rounded-full cursor-pointer"
        >
          For Schools
        </button>
        <button 
          @click="handleNavClick('pricing')" 
          class="px-3.5 py-1.5 text-surface-container-high hover:text-surface-container-lowest hover:bg-surface-container-lowest/10 transition-colors font-label-md text-label-md rounded-full cursor-pointer"
        >
          Pricing
        </button>
        <button 
          @click="handlePageClick('about')" 
          :class="currentPage === 'about' ? 'text-primary-fixed bg-surface-container-lowest/15' : 'text-surface-container-high hover:text-surface-container-lowest hover:bg-surface-container-lowest/10'"
          class="px-3.5 py-1.5 transition-colors font-label-md text-label-md rounded-full cursor-pointer"
        >
          About
        </button>
        <button 
          @click="handleNavClick('faq')" 
          class="px-3.5 py-1.5 text-surface-container-high hover:text-surface-container-lowest hover:bg-surface-container-lowest/10 transition-colors font-label-md text-label-md rounded-full cursor-pointer"
        >
          FAQ
        </button>
      </nav>

      <!-- Right CTAs (Commercial Flow Only - Zero Login) -->
      <div class="flex items-center gap-2.5">
        <button 
          @click="handleDemoClick" 
          class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-surface-container-lowest hover:bg-white/10 transition-all font-label-md text-label-md cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px] text-secondary-container">support_agent</span>
          Book Demo
        </button>
        <button 
          @click="handleOnboardingClick" 
          class="px-4 sm:px-3 py-2 sm:py-2.5 rounded-full bg-primary-fixed text-on-primary-fixed font-headline-sm text-label-md shadow-[0_4px_16px_rgba(217,119,6,0.38)] hover:bg-primary-fixed-dim active:scale-98 transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Get Started</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
        
        <!-- Mobile Menu Toggle Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen" 
          class="lg:hidden p-2 text-surface-container-lowest rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <span class="material-symbols-outlined text-[24px]">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div 
      v-if="isMobileMenuOpen" 
      class="lg:hidden mt-2 glass-detached rounded-2xl p-5 flex flex-col gap-2.5 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <button 
        @click="handleNavClick('admin-features')" 
        class="text-left text-surface-container-lowest py-2 px-3 rounded-lg hover:bg-white/10 font-medium transition-colors"
      >
        Features & Admin Suite
      </button>
      <button 
        @click="handleNavClick('grading-builder')" 
        class="text-left text-surface-container-lowest py-2 px-3 rounded-lg hover:bg-white/10 font-medium transition-colors"
      >
        Interactive Grading Builder
      </button>
      <button 
        @click="handleNavClick('for-schools')" 
        class="text-left text-surface-container-lowest py-2 px-3 rounded-lg hover:bg-white/10 font-medium transition-colors"
      >
        For School Proprietors
      </button>
      <button 
        @click="handleNavClick('pricing')" 
        class="text-left text-surface-container-lowest py-2 px-3 rounded-lg hover:bg-white/10 font-medium transition-colors"
      >
        Pricing & Volume Calculator
      </button>
      <button 
        @click="handlePageClick('about')" 
        :class="currentPage === 'about' ? 'text-primary-fixed bg-white/10' : 'text-surface-container-lowest'"
        class="text-left py-2 px-3 rounded-lg hover:bg-white/10 font-medium transition-colors"
      >
        About ResultBee
      </button>
      <button 
        @click="handleNavClick('faq')" 
        class="text-left text-surface-container-lowest py-2 px-3 rounded-lg hover:bg-white/10 font-medium transition-colors"
      >
        Frequently Asked Questions
      </button>

      <div class="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
        <button 
          @click="handleDemoClick" 
          class="w-full py-2.5 rounded-full border border-white/20 text-surface-container-lowest font-label-md flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
        >
          <span class="material-symbols-outlined text-[18px] text-secondary-container">support_agent</span>
          Request Demo Walkthrough
        </button>
        <button 
          @click="handleOnboardingClick" 
          class="w-full py-2.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold font-label-md shadow-md hover:bg-primary-fixed-dim transition-all text-center"
        >
          Start School Onboarding
        </button>
      </div>
    </div>
  </header>
</template>
