<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from './router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MouseGlow from './components/MouseGlow.vue';
import SchoolOnboardingModal from './components/SchoolOnboardingModal.vue';
import DemoModal from './components/DemoModal.vue';
import ReportCardModal from './components/ReportCardModal.vue';
import HomeView from './views/HomeView.vue';
import AboutView from './views/AboutView.vue';
import PrivacyView from './views/PrivacyView.vue';
import TermsView from './views/TermsView.vue';

const { currentPage } = useRouter();

// Modal visibility states
const showOnboardingModal = ref(false);
const showDemoModal = ref(false);
const showReportCardModal = ref(false);

const openOnboarding = () => {
  showOnboardingModal.value = true;
};

const openDemo = () => {
  showDemoModal.value = true;
};

const openReportCard = () => {
  showReportCardModal.value = true;
};
</script>

<template>
  <div class="min-h-screen bg-[#faf8ff] text-[#181b26] flex flex-col font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed relative">
    
    <!-- Subtle Mouse Tracking Glow Effect -->
    <MouseGlow />

    <!-- Detached Glassmorphic Floating Header with Rounded Edges -->
    <Header 
      @open-onboarding="openOnboarding" 
      @open-demo="openDemo" 
    />

    <!-- Main View Content Area -->
    <main class="w-full flex-1 flex flex-col">
      <!-- Home Landing View -->
      <HomeView 
        v-if="currentPage === 'home'" 
        @open-onboarding="openOnboarding" 
        @open-demo="openDemo" 
        @open-report-card="openReportCard" 
      />

      <!-- Dedicated About Page -->
      <AboutView 
        v-else-if="currentPage === 'about'" 
        @open-onboarding="openOnboarding" 
        @open-demo="openDemo" 
      />

      <!-- Dedicated Privacy Policy Page -->
      <PrivacyView 
        v-else-if="currentPage === 'privacy'" 
      />

      <!-- Dedicated Terms of Service Page -->
      <TermsView 
        v-else-if="currentPage === 'terms'" 
      />
    </main>

    <!-- Comprehensive Live Footer with All Connected Links -->
    <Footer 
      @open-onboarding="openOnboarding" 
      @open-demo="openDemo" 
    />

    <!-- Interactive Modals (Commercial Lead Flows & Previews Only) -->
    <SchoolOnboardingModal 
      :is-open="showOnboardingModal" 
      @close="showOnboardingModal = false" 
    />

    <DemoModal 
      :is-open="showDemoModal" 
      @close="showDemoModal = false" 
    />

    <ReportCardModal 
      :is-open="showReportCardModal" 
      @close="showReportCardModal = false" 
    />

  </div>
</template>
