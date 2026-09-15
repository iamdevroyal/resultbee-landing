<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from '../router';
import { useScrollAnimation } from '../composables/useScrollAnimation';

const emit = defineEmits<{
  (e: 'open-onboarding'): void;
  (e: 'open-demo'): void;
  (e: 'open-report-card'): void;
}>();

const { scrollToSection } = useRouter();

// Activate smooth scroll-triggered section entrances
useScrollAnimation();

// Live Grading Builder state
const selectedCampus = ref('Victoria Island Campus');
const campuses = ['Victoria Island Campus', 'Ikeja Mainland Campus', 'Abuja FCT Campus', 'Port Harcourt Campus'];
const ca1 = ref(20);
const ca2 = ref(20);
const exam = ref(60);
const selectedGradingScale = ref<'waec' | 'letter'>('waec');

const handleCa1Change = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  ca1.value = val;
  exam.value = Math.max(0, 100 - (val + ca2.value));
};

const handleCa2Change = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  ca2.value = val;
  exam.value = Math.max(0, 100 - (ca1.value + val));
};

const handleExamChange = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  exam.value = val;
  const remaining = 100 - val;
  const half = Math.floor(remaining / 2);
  ca1.value = half;
  ca2.value = remaining - half;
};

const totalPercentage = computed(() => ca1.value + ca2.value + exam.value);

// Quick grading presets
const applyPreset = (preset: '20_20_60' | '30_70' | '15_15_70') => {
  if (preset === '20_20_60') {
    ca1.value = 20;
    ca2.value = 20;
    exam.value = 60;
  } else if (preset === '30_70') {
    ca1.value = 30;
    ca2.value = 0;
    exam.value = 70;
  } else if (preset === '15_15_70') {
    ca1.value = 15;
    ca2.value = 15;
    exam.value = 70;
  }
};

// Hero widget subject filter
const selectedSubjectCategory = ref<'all' | 'sciences' | 'languages'>('all');
const activeSubjects = computed(() => {
  if (selectedSubjectCategory.value === 'sciences') {
    return activeStudent.value.subjects.filter(s => ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Technical Drawing'].includes(s.name));
  } else if (selectedSubjectCategory.value === 'languages') {
    return activeStudent.value.subjects.filter(s => ['English Language'].includes(s.name));
  }
  return activeStudent.value.subjects;
});

// Interactive step in How it works
const activeStep = ref<number>(1);

// Pricing billing period toggle (Termly vs Annual with 10% savings)
const billingPeriod = ref<'termly' | 'annual'>('termly');


// Student sample data in widget
const activeStudent = ref({
  name: 'Chisom E. Okonkwo',
  admissionNo: 'AHA/2023/0412',
  school: 'Atlantic Hall Academy, Epe',
  class: 'Senior Secondary 2 (SS2 Science)',
  term: 'Second Term Terminal Sheet',
  position: '2nd of 48 in Class',
  gpa: '4.85 / 5.00',
  subjects: [
    { name: 'Mathematics', ca1: 19.0, ca2: 18.5, exam: 54.0, total: 91.5, grade: 'A1', remark: 'Exceptional quantitative intuition.' },
    { name: 'English Language', ca1: 17.0, ca2: 16.0, exam: 49.0, total: 82.0, grade: 'B2', remark: 'Very fluent essayist. Well done.' },
    { name: 'Physics', ca1: 18.5, ca2: 19.0, exam: 52.0, total: 89.5, grade: 'A1', remark: 'Mastery in optics & dynamics practicals.' },
    { name: 'Chemistry', ca1: 18.0, ca2: 17.5, exam: 50.5, total: 86.0, grade: 'A1', remark: 'Sound laboratory comprehension.' },
    { name: 'Biology', ca1: 18.0, ca2: 16.5, exam: 48.0, total: 82.5, grade: 'B2', remark: 'Thorough grasp of cytology & genetics.' },
    { name: 'Technical Drawing', ca1: 19.5, ca2: 19.0, exam: 56.0, total: 94.5, grade: 'A1', remark: 'Impeccable orthographic projections.' }
  ]
});

// FAQ reactive state
const activeFaqTab = ref<'leaders' | 'teachers' | 'parents'>('leaders');
const expandedFaq = ref<number | null>(0);

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index;
};

const faqs = {
  leaders: [
    {
      q: "Can we configure our school's exact CA breakdown (e.g. 20% CA1, 20% CA2, 60% Exam)?",
      a: "Yes, absolutely. ResultBee was constructed for this exact purpose. Whether you use 30/70, 20/20/60, 10/10/10/70, or include practical and project components, you can calibrate any weighting and grading criteria without technical expertise."
    },
    {
      q: "How does ResultBee handle multiple campuses or school divisions?",
      a: "Our multi-branch management engine lets proprietors oversee multiple locations (e.g. Mainland and Island campuses) or distinct sections (Nursery, Primary, College) from a single account, each with independent score sheets and customized report templates."
    },
    {
      q: "Can we host the platform on our school's own web address?",
      a: "Yes. ResultBee allows custom domain mapping (e.g., portal.yourschool.ng) on Growth and Custom tiers so staff, students, and parents experience your brand uninterrupted."
    },
    {
      q: "Does ResultBee comply with Ministry of Education reporting guidelines?",
      a: "Yes, all standard terminal and cumulative report cards align with WAEC, NECO, BECE, and State Universal Basic Education Board (SUBEB) continuous assessment formats."
    }
  ],
  teachers: [
    {
      q: "What happens if the school Wi-Fi goes down while I am entering marks?",
      a: "ResultBee incorporates offline-first caching via browser IndexedDB. You can enter all student assessments, tests, and attendance without an active connection. As soon as your device re-establishes an internet signal, your entries automatically upload and sync with the main database."
    },
    {
      q: "Can I upload scores in bulk from a spreadsheet?",
      a: "Yes. You can paste spreadsheet columns directly or upload standard CSV and Excel rosters. ResultBee automatically matches student admission numbers and highlights missing or invalid data points before submission."
    },
    {
      q: "How does the system prevent accidental grade overwrites?",
      a: "Every subject mark is tracked with timestamps and teacher ID stamps. Once a subject entry is locked and submitted to the Form Teacher, amendments require an authorized edit request to prevent grade tampering."
    }
  ],
  parents: [
    {
      q: "How do I receive my child's terminal report card?",
      a: "The moment your school principal signs off on final term results, you receive an automated SMS and WhatsApp link with a secure, PIN-protected PDF report card ready to view, download, or print on any smartphone, tablet, or PC."
    },
    {
      q: "Can I view past academic sessions for all my children in one place?",
      a: "Yes. Your registered parent phone number binds all your children attending the school under a unified dashboard. You can toggle across terms and review academic trajectories across multiple school sessions."
    },
    {
      q: "How do I raise a dispute if I suspect an incorrect score?",
      a: "You can click 'Lodge Grade Query' directly beneath the specific subject on your parent portal. This notifies the Form Teacher and Academic VP for swift physical verification with the original exam script."
    }
  ]
};

// Newsletter State
const newsletterEmail = ref('');
const newsletterSubmitted = ref(false);

const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    newsletterSubmitted.value = true;
    setTimeout(() => {
      newsletterSubmitted.value = false;
      newsletterEmail.value = '';
    }, 3000);
  }
};
</script>

<template>
  <div class="flex flex-col w-full">

    <!-- 1. HERO SECTION (Dark Charcoal-Navy #0F121C) -->
    <section id="hero" class="relative w-full bg-[#0F121C] text-surface-container-lowest overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-32 px-4 sm:px-6">
      
      <!-- Honeycomb & Ambient Geometric Background -->
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <svg class="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="97" id="hero-honeycomb-pattern" patternTransform="scale(1)" patternUnits="userSpaceOnUse" width="56">
              <path d="M28 0 L56 16.2 L56 48.5 L28 64.7 L0 48.5 L0 16.2 Z M28 97 L56 80.8 L56 48.5 L28 64.7 L0 48.5 L0 80.8 Z" fill="none" stroke="#D97706" stroke-opacity="0.4" stroke-width="0.75" />
            </pattern>
            <radialGradient cx="60%" cy="20%" id="hero-ambient-glow" r="50%">
              <stop offset="0%" stop-color="#D97706" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#0F121C" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#hero-honeycomb-pattern)" height="100%" width="100%" />
          <rect fill="url(#hero-ambient-glow)" height="100%" width="100%" />
        </svg>
      </div>

      <div class="relative max-w-[1280px] mx-auto flex flex-col items-center">
        
        <!-- Tag / Overline -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md text-primary-fixed mb-6 shadow-sm border border-primary-fixed/20 animate-hero-tag animate-float-slow">
          <span class="font-label-sm text-label-sm tracking-wider uppercase">Custom Grading Engine for Nigerian Schools</span>
        </div>

        <!-- Headline & Subheadline -->
        <h1 class="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-center max-w-5xl text-surface-container-lowest mb-4 tracking-tight leading-tight animate-hero-headline whitespace-normal">
          <span class="block">Every School Grades Differently.</span>
          <span class="text-primary-fixed block">Your Software Should Too.</span>
        </h1>
        <p class="font-body-lg text-sm sm:text-lg text-surface-container-high text-center max-w-2xl mb-8 sm:mb-10 leading-relaxed animate-hero-sub">
          ResultBee is result and grading management software that adapts to how your school actually runs — your CA structure, your grading scale, your report card, your rules. Not the other way around.
        </p>

        <!-- CTA Action Row (Pure Commercial - Zero Login) -->
        <div class="flex flex-col sm:flex-row items-center gap-3.5 mb-12 sm:mb-16 w-full justify-center animate-hero-cta">
          <button 
            @click="emit('open-onboarding')" 
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-fixed text-on-primary-fixed font-headline-sm text-sm font-bold shadow-[0_6px_24px_rgba(217,119,6,0.4)] hover:bg-primary-fixed-dim hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start School Onboarding</span>
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <button 
            @click="emit('open-report-card')" 
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md text-surface-container-lowest hover:bg-surface-container-lowest/20 font-headline-sm text-sm transition-all cursor-pointer border border-surface-container-lowest/15"
          >
            <span class="material-symbols-outlined text-[20px] text-primary-fixed">visibility</span>
            <span>See Live Report Card Mock</span>
          </button>
        </div>

        <!-- High-Fidelity Nigerian School Report Card & Gradebook Interactive Widget Mockup -->
        <div class="w-full max-w-4xl rounded-2xl sm:rounded-3xl glass-card-dark p-4 sm:p-7 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] border border-white/12 card-hover-interactive animate-hero-mockup">
          
          <!-- Widget Top Nav Mockup -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-surface-container-lowest/10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-fixed border border-primary-fixed/20 shadow-sm">
                <span class="material-symbols-outlined text-[22px]">account_balance</span>
              </div>
              <div>
                <div class="font-title-md text-sm sm:text-base text-surface-container-lowest flex items-center gap-2 font-bold">
                  {{ activeStudent.school }}
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-fixed text-[11px] font-semibold border border-secondary-fixed/20">Live Preview</span>
                </div>
                <p class="font-body-sm text-xs text-surface-container-high">{{ activeStudent.class }} • {{ activeStudent.term }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-surface-container-lowest/10 text-primary-fixed text-xs font-semibold flex items-center gap-1.5 border border-surface-container-lowest/10">
                <span class="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" /> WAEC 9-Point Scale
              </span>
              <button 
                @click="emit('open-report-card')" 
                class="px-3 py-1 rounded-full bg-primary-fixed/20 text-primary-fixed hover:bg-primary-fixed/30 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">visibility</span> Full Sheet
              </button>
            </div>
          </div>

          <!-- Student Meta Strip -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-surface-container-lowest/5 mb-4 border border-surface-container-lowest/5 text-xs">
            <div>
              <span class="text-[10px] text-surface-container-high uppercase block font-semibold">Student Name</span>
              <span class="text-xs sm:text-sm text-surface-container-lowest font-bold">{{ activeStudent.name }}</span>
            </div>
            <div>
              <span class="text-[10px] text-surface-container-high uppercase block font-semibold">Admission No.</span>
              <span class="text-xs sm:text-sm text-surface-container-lowest font-mono">{{ activeStudent.admissionNo }}</span>
            </div>
            <div>
              <span class="text-[10px] text-surface-container-high uppercase block font-semibold">Position</span>
              <span class="text-xs sm:text-sm text-primary-fixed font-semibold">{{ activeStudent.position }}</span>
            </div>
            <div>
              <span class="text-[10px] text-surface-container-high uppercase block font-semibold">Term Cumulative GPA</span>
              <span class="text-xs sm:text-sm text-secondary-fixed font-bold">{{ activeStudent.gpa }}</span>
            </div>
          </div>

          <!-- Subject Category Filter Pills -->
          <div class="flex items-center gap-2 mb-3">
            <span class="text-[11px] text-surface-container-high font-medium">Filter Subjects:</span>
            <div class="inline-flex rounded-lg bg-surface-container-lowest/10 p-0.5 border border-surface-container-lowest/10">
              <button 
                @click="selectedSubjectCategory = 'all'" 
                :class="selectedSubjectCategory === 'all' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'text-surface-container-lowest hover:text-primary-fixed'"
                class="px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer"
              >
                All (6)
              </button>
              <button 
                @click="selectedSubjectCategory = 'sciences'" 
                :class="selectedSubjectCategory === 'sciences' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'text-surface-container-lowest hover:text-primary-fixed'"
                class="px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer"
              >
                Sciences (5)
              </button>
              <button 
                @click="selectedSubjectCategory = 'languages'" 
                :class="selectedSubjectCategory === 'languages' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'text-surface-container-lowest hover:text-primary-fixed'"
                class="px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer"
              >
                Languages (1)
              </button>
            </div>
          </div>

          <!-- Score Breakdown Table -->
          <div class="overflow-x-auto rounded-xl bg-surface-container-lowest/5 border border-surface-container-lowest/5">
            <table class="w-full text-left text-xs min-w-[560px]">
              <thead>
                <tr class="text-surface-container-high text-[11px] uppercase bg-surface-container-lowest/10">
                  <th class="py-2.5 px-3">Subject</th>
                  <th class="py-2.5 px-3 text-center">1st CA (20%)</th>
                  <th class="py-2.5 px-3 text-center">2nd CA (20%)</th>
                  <th class="py-2.5 px-3 text-center">Exam (60%)</th>
                  <th class="py-2.5 px-3 text-center">Total (100%)</th>
                  <th class="py-2.5 px-3 text-center">WAEC Grade</th>
                  <th class="py-2.5 px-3">Teacher Remark</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container-lowest/10 text-surface-container-lowest">
                <tr v-for="subj in activeSubjects" :key="subj.name" class="hover:bg-surface-container-lowest/5 transition-colors">
                  <td class="py-2.5 px-3 font-semibold text-primary-fixed">{{ subj.name }}</td>
                  <td class="py-2.5 px-3 text-center font-mono">{{ subj.ca1.toFixed(1) }}</td>
                  <td class="py-2.5 px-3 text-center font-mono">{{ subj.ca2.toFixed(1) }}</td>
                  <td class="py-2.5 px-3 text-center font-mono">{{ subj.exam.toFixed(1) }}</td>
                  <td class="py-2.5 px-3 text-center font-bold font-mono">{{ subj.total.toFixed(1) }}</td>
                  <td class="py-2.5 px-3 text-center">
                    <span class="px-2 py-0.5 rounded bg-secondary/30 text-secondary-fixed font-bold text-xs">{{ subj.grade }}</span>
                  </td>
                  <td class="py-2.5 px-3 text-surface-container-high italic text-[11px]">{{ subj.remark }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Principal & Form Teacher Authentication Stamps -->
          <div class="mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-container-lowest/10 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-secondary-fixed/10 text-secondary-fixed flex items-center justify-center border border-secondary-fixed/20 shrink-0">
                <span class="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <span class="text-[11px] text-surface-container-high block">Principal's Digital Endorsement</span>
                <span class="text-xs text-surface-container-lowest font-medium">
                  Dr. Folasade Adeleke, Ph.D • Verified Hash: <span class="font-mono text-primary-fixed">RB#8942-LG</span>
                </span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1 text-xs text-secondary-fixed bg-secondary-container/20 px-3 py-1 rounded-full border border-secondary-container/30">
                <span class="material-symbols-outlined text-[15px]">task_alt</span> Form Teacher Approved
              </span>
              <span class="inline-flex items-center gap-1 text-xs text-primary-fixed bg-primary-container/20 px-3 py-1 rounded-full border border-primary-container/30">
                <span class="material-symbols-outlined text-[15px]">send</span> WhatsApp Delivery Ready
              </span>
            </div>
          </div>

        </div>

        <!-- Trust Strip: Nigerian Regional Accreditation / Presence -->
        <div class="mt-14 sm:mt-16 w-full flex flex-col items-center">
          <span class="text-xs text-surface-container-high uppercase tracking-widest mb-4 font-semibold">
            Configured for premier institutions across Nigeria
          </span>
          <div class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 opacity-90">
            <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/5 border border-surface-container-lowest/10 text-xs">
              <span class="material-symbols-outlined text-primary-fixed text-[16px]">workspace_premium</span>
              <span class="text-surface-container-lowest font-semibold">Lagos Mainland & Island</span>
            </div>
            <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/5 border border-surface-container-lowest/10 text-xs">
              <span class="material-symbols-outlined text-primary-fixed text-[16px]">verified_user</span>
              <span class="text-surface-container-lowest font-semibold">Abuja FCT Schools</span>
            </div>
            <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/5 border border-surface-container-lowest/10 text-xs">
              <span class="material-symbols-outlined text-primary-fixed text-[16px]">school</span>
              <span class="text-surface-container-lowest font-semibold">Port Harcourt Metros</span>
            </div>
            <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/5 border border-surface-container-lowest/10 text-xs">
              <span class="material-symbols-outlined text-primary-fixed text-[16px]">domain</span>
              <span class="text-surface-container-lowest font-semibold">Ibadan & Oyo Network</span>
            </div>
            <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/5 border border-surface-container-lowest/10 text-xs">
              <span class="material-symbols-outlined text-primary-fixed text-[16px]">military_tech</span>
              <span class="text-surface-container-lowest font-semibold">Kaduna & Zaria Academies</span>
            </div>
            <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/5 border border-surface-container-lowest/10 text-xs">
              <span class="material-symbols-outlined text-primary-fixed text-[16px]">local_police</span>
              <span class="text-surface-container-lowest font-semibold">Enugu & South-East District</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 2. MISSION & POSITIONING STATEMENT (Warm Light Cream) -->
    <section id="for-schools" class="w-full bg-[#faf8ff] py-16 lg:py-24 border-b border-surface-container">
      <div class="max-w-[1000px] mx-auto px-6 flex flex-col items-center text-center reveal-on-scroll">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold mb-4 shadow-sm">
          <span class="material-symbols-outlined text-[16px]">stars</span> Zero Spreadsheets. 100% On-Brand.
        </span>
        <h2 class="font-headline-xl text-2xl sm:text-4xl text-on-background mb-4 tracking-tight font-extrabold">
          Built for the Way Nigerian Schools Actually Work
        </h2>
        <p class="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
          No two schools grade the same way. Some run two continuous assessments, others run three. Some use the WAEC scale, others keep it simple. Some track cumulative averages every term, others only at session's end. ResultBee doesn't force your school into someone else's template — it configures around yours, whether you're a single campus or a school group with branches across the country.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full text-left">
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 card-hover-interactive reveal-on-scroll stagger-1">
            <div class="w-10 h-10 rounded-xl bg-primary-fixed/30 text-primary flex items-center justify-center mb-3">
              <span class="material-symbols-outlined text-[20px]">dynamic_form</span>
            </div>
            <h3 class="font-title-md text-base font-bold text-on-surface mb-1">Any CA Split</h3>
            <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">20/20/60, 30/70, 10/10/10/70 or custom practical components. Compute weights instantly.</p>
          </div>
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 card-hover-interactive reveal-on-scroll stagger-2">
            <div class="w-10 h-10 rounded-xl bg-secondary-container/50 text-secondary flex items-center justify-center mb-3">
              <span class="material-symbols-outlined text-[20px]">auto_stories</span>
            </div>
            <h3 class="font-title-md text-base font-bold text-on-surface mb-1">WAEC, BECE & IGCSE</h3>
            <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">Seamless support for A1 to F9, Cambridge letter systems, and primary school mastery criteria.</p>
          </div>
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 card-hover-interactive reveal-on-scroll stagger-3">
            <div class="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-3">
              <span class="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <h3 class="font-title-md text-base font-bold text-on-surface mb-1">Multi-Campus Fleet</h3>
            <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">Run Primary, JSS, SSS, and distinct state campuses with centralized governance from one screen.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. FEATURE DEEP-DIVE: FOR SCHOOL ADMINISTRATORS (Interactive No-Code Grading Builder) -->
    <section id="admin-features" class="w-full bg-surface-container-low py-16 lg:py-24">
      <div class="max-w-[1280px] mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- Left Side: Interactive Mockup No-Code Grading Builder in Vue -->
          <div class="lg:col-span-6 bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-md border border-surface-container card-hover-interactive reveal-on-scroll">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-surface-container">
              <div>
                <span class="text-xs text-secondary uppercase font-bold block">No-Code Policy Engine</span>
                <h4 class="font-title-md text-base sm:text-lg font-bold text-on-surface">Curriculum & Grading Setup</h4>
              </div>
              <div class="relative">
                <select v-model="selectedCampus" class="bg-surface-container px-3 py-1.5 rounded-full text-xs font-semibold text-on-surface border border-surface-container-high outline-none cursor-pointer">
                  <option v-for="c in campuses" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <!-- Quick Preset Chips -->
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span class="text-[11px] text-on-surface-variant font-medium">Quick Presets:</span>
              <button 
                @click="applyPreset('20_20_60')" 
                class="px-2.5 py-1 rounded-md text-[11px] bg-surface-container font-medium hover:bg-primary-container/20 hover:text-primary transition-colors cursor-pointer"
                :class="{ 'border border-primary text-primary font-bold': ca1 === 20 && ca2 === 20 && exam === 60 }"
              >
                20 / 20 / 60 (Standard)
              </button>
              <button 
                @click="applyPreset('30_70')" 
                class="px-2.5 py-1 rounded-md text-[11px] bg-surface-container font-medium hover:bg-primary-container/20 hover:text-primary transition-colors cursor-pointer"
                :class="{ 'border border-primary text-primary font-bold': ca1 === 30 && ca2 === 0 && exam === 70 }"
              >
                30 / 70 (Single CA)
              </button>
              <button 
                @click="applyPreset('15_15_70')" 
                class="px-2.5 py-1 rounded-md text-[11px] bg-surface-container font-medium hover:bg-primary-container/20 hover:text-primary transition-colors cursor-pointer"
                :class="{ 'border border-primary text-primary font-bold': ca1 === 15 && ca2 === 15 && exam === 70 }"
              >
                15 / 15 / 70
              </button>
            </div>

            <!-- Live Slider Controls in Vue -->
            <div class="flex flex-col gap-4 text-xs">
              <!-- CA 1 Slider -->
              <div class="bg-surface-bright p-4 rounded-xl border border-surface-container-high/40">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-on-surface">1st Continuous Assessment (CA 1)</span>
                  <span class="font-mono font-bold text-primary">{{ ca1 }}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  :value="ca1" 
                  @input="handleCa1Change" 
                  class="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                />
                <div class="flex justify-between text-[11px] text-on-surface-variant mt-1">
                  <span>Quizzes & Class Projects</span>
                  <span>Max: 40%</span>
                </div>
              </div>

              <!-- CA 2 Slider -->
              <div class="bg-surface-bright p-4 rounded-xl border border-surface-container-high/40">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-on-surface">2nd Continuous Assessment (CA 2 / Mid-Term)</span>
                  <span class="font-mono font-bold text-primary">{{ ca2 }}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  :value="ca2" 
                  @input="handleCa2Change" 
                  class="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                />
                <div class="flex justify-between text-[11px] text-on-surface-variant mt-1">
                  <span>Mid-Term Unified Test</span>
                  <span>Max: 40%</span>
                </div>
              </div>

              <!-- Exam Slider -->
              <div class="bg-surface-bright p-4 rounded-xl border border-surface-container-high/40">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-on-surface">Terminal Examination</span>
                  <span class="font-mono font-bold text-secondary">{{ exam }}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="80" 
                  :value="exam" 
                  @input="handleExamChange" 
                  class="w-full accent-secondary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                />
                <div class="flex justify-between text-[11px] text-on-surface-variant mt-1">
                  <span>Theory & Objective Papers</span>
                  <span>Auto-computed balance</span>
                </div>
              </div>

              <!-- Grading Scale Selector -->
              <div class="grid grid-cols-2 gap-2 pt-1">
                <button 
                  @click="selectedGradingScale = 'waec'" 
                  :class="selectedGradingScale === 'waec' ? 'bg-primary-container/10 text-primary-container border-primary/30 font-bold' : 'bg-surface-container text-on-surface-variant'" 
                  class="flex items-center gap-2 p-2.5 rounded-xl text-xs border transition-all cursor-pointer justify-center"
                >
                  <span class="material-symbols-outlined text-[16px]">
                    {{ selectedGradingScale === 'waec' ? 'check_circle' : 'circle' }}
                  </span>
                  <span>WAEC Standard (A1-F9)</span>
                </button>
                <button 
                  @click="selectedGradingScale = 'letter'" 
                  :class="selectedGradingScale === 'letter' ? 'bg-primary-container/10 text-primary-container border-primary/30 font-bold' : 'bg-surface-container text-on-surface-variant'" 
                  class="flex items-center gap-2 p-2.5 rounded-xl text-xs border transition-all cursor-pointer justify-center"
                >
                  <span class="material-symbols-outlined text-[16px]">
                    {{ selectedGradingScale === 'letter' ? 'check_circle' : 'circle' }}
                  </span>
                  <span>Letter System (A - F)</span>
                </button>
              </div>

              <!-- Audit Notice Pill -->
              <div class="p-3 rounded-lg bg-surface-container-low flex items-center justify-between text-xs text-on-surface-variant border border-surface-container">
                <span class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px] text-secondary">history_edu</span>
                  Version 4.2 active • Configured for {{ selectedCampus }}
                </span>
                <span class="font-mono text-primary font-bold">Total: {{ totalPercentage }}%</span>
              </div>
            </div>
          </div>

          <!-- Right Side: Administrator Capabilities Checklist -->
          <div class="lg:col-span-6 flex flex-col gap-4 reveal-on-scroll stagger-2">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs w-max font-bold">
              <span class="material-symbols-outlined text-[14px]">shield_person</span> For School Administrators
            </span>
            <h2 class="font-headline-xl text-2xl sm:text-4xl text-on-background tracking-tight font-extrabold">
              Set Your Rules Once. <br class="hidden sm:inline" />ResultBee Handles the Rest.
            </h2>
            <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-2 leading-relaxed">
              Tired of rigid school software forcing you to rewrite your school handbook? ResultBee was architected to embrace your unique academic regulations.
            </p>

            <div class="flex flex-col gap-4 text-xs sm:text-sm">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <span class="material-symbols-outlined text-[18px]">tune</span>
                </div>
                <div>
                  <h4 class="font-title-md font-bold text-on-surface">No-Code Grading Builder</h4>
                  <p class="text-xs text-on-surface-variant leading-relaxed">Configure CA/exam weightings, grading scale (simple letters or WAEC-style), and report card layouts yourself without hiring a developer.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <span class="material-symbols-outlined text-[18px]">apartment</span>
                </div>
                <div>
                  <h4 class="font-title-md font-bold text-on-surface">Multi-Branch, Multi-Section Ready</h4>
                  <p class="text-xs text-on-surface-variant leading-relaxed">Manage different branches, states, and school sections (Nursery, Primary, Secondary) from one master dashboard with distinct grading rules per level.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <span class="material-symbols-outlined text-[18px]">cloud_upload</span>
                </div>
                <div>
                  <h4 class="font-title-md font-bold text-on-surface">Bulk Onboarding in Minutes</h4>
                  <p class="text-xs text-on-surface-variant leading-relaxed">Import your student registers and teacher allocations straight from Excel/CSV with proactive typo and duplicate detection before saving.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <span class="material-symbols-outlined text-[18px]">language</span>
                </div>
                <div>
                  <h4 class="font-title-md font-bold text-on-surface">Your Own Branded Domain</h4>
                  <p class="text-xs text-on-surface-variant leading-relaxed">Give your community its own web portal (e.g. <span class="font-mono text-primary font-semibold">portal.yourschool.ng</span>) with custom school emblems, watermarks, and color themes.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <h4 class="font-title-md font-bold text-on-surface">Full Institutional Audit Trail</h4>
                  <p class="text-xs text-on-surface-variant leading-relaxed">Every mark alteration, approval timestamp, and admin override is permanently indexed to guarantee zero grade manipulation.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 4. PAIN POINT SECTION 1: THE WEIGHT OF RESULT SEASON (Deep Green-Black / Charcoal Dark) -->
    <section class="w-full bg-[#0F1A1C] text-surface-container-lowest py-16 lg:py-24">
      <div class="max-w-[1280px] mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- Left: Paper File Overload Graphic Badge -->
          <div class="lg:col-span-5 flex flex-col items-center justify-center reveal-on-scroll">
            <div class="relative w-full max-w-sm p-8 rounded-2xl sm:rounded-3xl bg-surface-container-lowest/5 backdrop-blur-lg flex flex-col items-center text-center border border-surface-container-lowest/10 card-hover-interactive">
              <div class="w-20 h-20 rounded-2xl bg-error/20 text-error flex items-center justify-center mb-4 border border-error/30">
                <span class="material-symbols-outlined text-[44px]">pending_actions</span>
              </div>
              <span class="font-headline-xl text-3xl sm:text-4xl text-surface-container-lowest font-bold">500+ Scripts</span>
              <p class="font-body-sm text-xs sm:text-sm text-surface-container-high mt-1 mb-4 leading-relaxed">
                Manually computing CA1 + CA2 + Exams + Class Ranks using handheld calculators and paper master sheets.
              </p>
              <div class="w-full p-3 rounded-lg bg-surface-container-lowest/10 flex items-center justify-between text-xs border border-surface-container-lowest/10">
                <span class="text-error flex items-center gap-1.5 font-bold"><span class="material-symbols-outlined text-[16px]">error</span> Fatigue Risk</span>
                <span class="text-surface-container-lowest font-mono">11:45 PM Session Close</span>
              </div>
            </div>
          </div>

          <!-- Center / Right: Quotes & Context -->
          <div class="lg:col-span-7 flex flex-col gap-6 reveal-on-scroll stagger-2">
            <div>
              <span class="text-xs text-primary-fixed uppercase tracking-wider font-bold block mb-1">
                The Reality of Term End in Nigeria
              </span>
              <h2 class="font-headline-xl text-2xl sm:text-4xl text-surface-container-lowest tracking-tight font-extrabold mb-2">
                Behind Every Report Card Is a Teacher Racing the Clock
              </h2>
              <p class="font-body-md text-xs sm:text-sm text-surface-container-high leading-relaxed">
                Result computation season shouldn't mean sleepless nights with a calculator and a stack of marked answer sheets. Here is what Nigerian educators shared with our team:
              </p>
            </div>

            <!-- Speech Bubble Quote 1 -->
            <div class="relative p-6 rounded-2xl bg-surface-container-lowest/5 backdrop-blur-md shadow-sm border border-surface-container-lowest/10 card-hover-interactive">
              <span class="material-symbols-outlined text-primary-fixed text-[36px] absolute -top-4 left-6 bg-[#0F1A1C] px-1">format_quote</span>
              <p class="font-body-md text-xs sm:text-sm text-surface-container-lowest italic pt-2 mb-4 leading-relaxed">
                "Every term-end, I spend days just computing averages and typing them into report cards by hand. By the time I'm done, I have no energy left to actually think about how my students are doing or prepare meaningful remarks."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-primary-fixed/20 text-primary-fixed flex items-center justify-center font-bold text-xs border border-primary-fixed/30">
                  MA
                </div>
                <div>
                  <span class="font-title-md text-xs sm:text-sm text-surface-container-lowest font-semibold block">Mrs. Adebayo</span>
                  <span class="font-body-sm text-[11px] text-surface-container-high">Senior Form Teacher, Private Secondary School, Ikeja, Lagos</span>
                </div>
              </div>
            </div>

            <!-- Speech Bubble Quote 2 -->
            <div class="relative p-6 rounded-2xl bg-surface-container-lowest/5 backdrop-blur-md shadow-sm border border-surface-container-lowest/10 card-hover-interactive">
              <span class="material-symbols-outlined text-primary-fixed text-[36px] absolute -top-4 left-6 bg-[#0F1A1C] px-1">format_quote</span>
              <p class="font-body-md text-xs sm:text-sm text-surface-container-lowest italic pt-2 mb-4 leading-relaxed">
                "One transposed number in Excel and a whole class's positions are wrong. We have had to reprint an entire batch of 240 glossy report cards because of a single miscalculation in cumulative scores."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-secondary-fixed/20 text-secondary-fixed flex items-center justify-center font-bold text-xs border border-secondary-fixed/30">
                  EC
                </div>
                <div>
                  <span class="font-title-md text-xs sm:text-sm text-surface-container-lowest font-semibold block">Mr. Chukwu</span>
                  <span class="font-body-sm text-[11px] text-surface-container-high">Vice Principal Academics, Independence Layout, Enugu</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. PAIN POINT SECTION 2: ATMOSPHERIC SINGLE QUOTE CALLOUT -->
    <section class="w-full bg-[#0F121C] py-16 lg:py-24 text-center relative overflow-hidden border-t border-b border-surface-container-lowest/10">
      <div class="max-w-[900px] mx-auto px-6 flex flex-col items-center reveal-on-scroll">
        <span class="material-symbols-outlined text-primary-fixed text-[54px] mb-2 animate-float-slow">format_quote</span>
        <blockquote class="font-headline-lg text-lg sm:text-2xl lg:text-3xl text-surface-container-lowest font-normal italic leading-snug mb-6 max-w-2xl">
          "Parents ask for their child's result the day school closes. We're still collating scores from six different teachers a week later. It's not fair to the students, and it's not fair to us."
        </blockquote>
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/10 text-primary-fixed font-label-md text-xs border border-surface-container-lowest/10">
          <span class="material-symbols-outlined text-[16px]">school</span>
          Principal & School Administrator, FCT Abuja
        </div>
      </div>
    </section>

    <!-- 6. STATS SECTION: THE HIDDEN COST OF MANUAL RESULTS -->
    <section class="w-full bg-surface-bright py-16 lg:py-24">
      <div class="max-w-[1280px] mx-auto px-6">
        <div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs mb-2 font-bold">
            <span class="material-symbols-outlined text-[14px]">insights</span> Operational Assessment
          </span>
          <h2 class="font-headline-xl text-2xl sm:text-4xl text-on-background tracking-tight mb-2 font-extrabold">
            The Hidden Cost of Manual Result Computation
          </h2>
          <p class="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl">
            Schools using manual or spreadsheet-based workflows lose days of instructional focus every term. Here is what the numbers look like across Nigerian primary and secondary schools.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Stat 1 -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-1">
            <div class="w-12 h-12 rounded-xl bg-primary-fixed/30 text-primary flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-[26px]">schedule</span>
            </div>
            <div>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-on-background mb-1">
                140+ <span class="text-primary text-xl font-bold">hrs</span>
              </div>
              <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Spent per term manually computing, checking, and typing results across an average-sized school.
              </p>
            </div>
          </div>

          <!-- Stat 2 -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-2">
            <div class="w-12 h-12 rounded-xl bg-secondary-container/50 text-secondary flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-[26px]">table_chart</span>
            </div>
            <div>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-on-background mb-1">
                78%
              </div>
              <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Of Nigerian schools still rely on prone-to-corruption Excel sheets or paper-based grade calculations.
              </p>
            </div>
          </div>

          <!-- Stat 3 -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-3">
            <div class="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-[26px]">hourglass_empty</span>
            </div>
            <div>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-on-background mb-1">
                7–14 <span class="text-tertiary text-xl font-bold">days</span>
              </div>
              <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Typical friction delay between the final day of term exams and parents receiving comprehensive report sheets.
              </p>
            </div>
          </div>

          <!-- Stat 4 -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-4">
            <div class="w-12 h-12 rounded-xl bg-secondary-container/50 text-secondary flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-[26px]">check_circle</span>
            </div>
            <div>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-secondary mb-1">
                94%
              </div>
              <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Reduction in grade collation discrepancies reported by schools following ResultBee automation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. HOW IT WORKS: 4 SIMPLE STEPS -->
    <section id="how-it-works" class="w-full bg-surface-container-low py-16 lg:py-24 border-t border-b border-surface-container">
      <div class="max-w-[1280px] mx-auto px-6">
        <div class="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold mb-2">
            <span class="material-symbols-outlined text-[16px]">linear_scale</span> Rapid Onboarding
          </span>
          <h2 class="font-headline-xl text-2xl sm:text-4xl text-on-background tracking-tight mb-2 font-extrabold">
            Get Started in Four Simple Steps
          </h2>
          <p class="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl">
            From initial policy setup to your first published, branded report card — without needing a programmer, server setup, or a manual.
          </p>
        </div>

        <!-- Steps Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <!-- Step 1 Card -->
          <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-1">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-4 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">Step 01</span>
                <span class="material-symbols-outlined text-primary text-[28px]">settings_suggest</span>
              </div>
              <h3 class="font-headline-md text-lg sm:text-xl text-on-background font-bold mb-2">Configure Your School</h3>
              <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                Set up your campuses, classes, and subjects, then build your grading rules with our visual engine — your custom CA split, your preferred grading scale, and your customized report card layout.
              </p>
            </div>
            <!-- Mini UI Graphic Preview -->
            <div class="bg-surface-bright rounded-xl p-4 border border-surface-container-high/40 text-xs">
              <div class="flex items-center justify-between pb-2 text-on-surface-variant">
                <span class="font-semibold text-on-surface">Grading Ruleset Matrix</span>
                <span class="text-secondary font-bold">Active: Term 2</span>
              </div>
              <div class="flex flex-wrap items-center gap-2 mt-2 font-mono">
                <span class="px-2.5 py-1 bg-surface-container rounded font-medium">CA1: 20%</span>
                <span class="text-on-surface-variant">+</span>
                <span class="px-2.5 py-1 bg-surface-container rounded font-medium">CA2: 20%</span>
                <span class="text-on-surface-variant">+</span>
                <span class="px-2.5 py-1 bg-surface-container rounded font-medium">Exam: 60%</span>
                <span class="material-symbols-outlined text-secondary text-[16px] ml-auto">verified</span>
              </div>
            </div>
          </div>

          <!-- Step 2 Card -->
          <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-2">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-4 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">Step 02</span>
                <span class="material-symbols-outlined text-primary text-[28px]">upload_file</span>
              </div>
              <h3 class="font-headline-md text-lg sm:text-xl text-on-background font-bold mb-2">Bring Your Students & Staff On Board</h3>
              <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                Upload your student registers and teacher lists via Excel or Google Sheets. Our smart validator checks for empty fields and formatting inconsistencies before anything is committed to your database.
              </p>
            </div>
            <!-- Mini UI Graphic Preview -->
            <div class="bg-surface-bright rounded-xl p-4 border border-surface-container-high/40 text-xs">
              <div class="flex items-center justify-between pb-2">
                <span class="font-semibold text-on-surface">CSV Smart Validator</span>
                <span class="text-secondary font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">check</span> 0 Errors Found</span>
              </div>
              <div class="flex items-center justify-between mt-2 text-on-surface-variant bg-surface-container p-2.5 rounded text-[11px]">
                <span>Students: 418 Loaded</span>
                <span>Classes: 14 Assigned</span>
                <span class="text-secondary font-semibold">Ready to Sync</span>
              </div>
            </div>
          </div>

        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Step 3 Card -->
          <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-1">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-4 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold">Step 03</span>
                <span class="material-symbols-outlined text-secondary text-[28px]">edit_note</span>
              </div>
              <h3 class="font-headline-md text-lg sm:text-xl text-on-background font-bold mb-2">Teachers Enter Scores, Even Offline</h3>
              <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                Subject and form teachers input continuous assessments, test scores, and qualitative remarks right from smartphones, laptops, or tablets — even when campus internet goes dark. Data syncs the moment connectivity restores.
              </p>
            </div>
            <!-- Mini UI Graphic Preview -->
            <div class="bg-surface-bright rounded-xl p-4 border border-surface-container-high/40 text-xs">
              <div class="flex items-center justify-between pb-2">
                <span class="font-semibold text-on-surface">Offline Sync Guard</span>
                <span class="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Encrypted Local Storage</span>
              </div>
              <div class="flex items-center gap-2 mt-2 text-on-surface-variant text-[11px]">
                <span class="material-symbols-outlined text-secondary text-[18px]">cloud_done</span>
                <span>32/32 Score inputs cached safely offline. Ready for instant upload.</span>
              </div>
            </div>
          </div>

          <!-- Step 4 Card -->
          <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-2">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-4 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold">Step 04</span>
                <span class="material-symbols-outlined text-secondary text-[28px]">mark_email_read</span>
              </div>
              <h3 class="font-headline-md text-lg sm:text-xl text-on-background font-bold mb-2">Review, Approve, and Publish</h3>
              <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                Form teachers finalize sheets, administrators perform one-tap digital approvals, and verified report cards are instantly generated as watermarked PDFs and dispatched to parents via SMS, WhatsApp, and Portal.
              </p>
            </div>
            <!-- Mini UI Graphic Preview -->
            <div class="bg-surface-bright rounded-xl p-4 border border-surface-container-high/40 text-xs">
              <div class="flex items-center justify-between pb-2">
                <span class="font-semibold text-on-surface">Multi-Channel Broadcast</span>
                <span class="text-primary font-bold">1-Click Terminal Dispatch</span>
              </div>
              <div class="grid grid-cols-3 gap-2 mt-2 text-center text-[11px]">
                <span class="bg-surface-container p-1.5 rounded font-medium">WhatsApp PDF</span>
                <span class="bg-surface-container p-1.5 rounded font-medium">SMS Summary</span>
                <span class="bg-surface-container p-1.5 rounded font-medium">Parent Portal</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 8. DUAL FEATURE DEEP-DIVE: FOR TEACHERS & FOR PARENTS -->
    <section id="for-stakeholders" class="w-full bg-surface-bright py-16 lg:py-24">
      <div class="max-w-[1280px] mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <!-- Panel A: For Teachers -->
          <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md border border-surface-container flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-1">
            <div>
              <div class="flex items-center gap-2 px-4 py-1 rounded-full bg-primary-fixed/30 text-primary text-xs w-max mb-6 font-bold">
                <span class="material-symbols-outlined text-[16px]">psychology</span> For Teachers
              </div>
              <h3 class="font-headline-lg text-xl sm:text-2xl lg:text-3xl text-on-background tracking-tight font-extrabold mb-4">
                Score Entry That Works With You, Not Against You
              </h3>
              <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-8 leading-relaxed">
                Designed by educators who know what grading 120 scripts in an evening feels like. Fast, keyboard-navigable, and resilient.
              </p>
              <div class="flex flex-col gap-6 text-xs sm:text-sm">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <span class="material-symbols-outlined text-[18px]">wifi_off</span>
                  </div>
                  <div>
                    <h4 class="font-title-md font-bold text-on-surface">Works Completely Offline</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">Enter scores and attendance in the classroom without internet connectivity; everything auto-syncs securely once back in coverage.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <span class="material-symbols-outlined text-[18px]">table_rows</span>
                  </div>
                  <div>
                    <h4 class="font-title-md font-bold text-on-surface">Bulk Class Upload</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">Prefer using your desktop Excel file? Paste entire columns at once or upload directly with automatic student ID matching.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <span class="material-symbols-outlined text-[18px]">checklist</span>
                  </div>
                  <div>
                    <h4 class="font-title-md font-bold text-on-surface">Clear Class Progress Overview</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">See at a single glance which subjects still have pending scores before forwarding the class register to the VP Academics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel B: For Parents -->
          <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md border border-surface-container flex flex-col justify-between card-hover-interactive reveal-on-scroll stagger-2">
            <div>
              <div class="flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container/40 text-secondary text-xs w-max mb-6 font-bold">
                <span class="material-symbols-outlined text-[16px]">family_restroom</span> For Parents
              </div>
              <h3 class="font-headline-lg text-xl sm:text-2xl lg:text-3xl text-on-background tracking-tight font-extrabold mb-4">
                Know How Your Child Is Doing, the Moment It's Ready
              </h3>
              <p class="font-body-md text-xs sm:text-sm text-on-surface-variant mb-8 leading-relaxed">
                Empower parents with immediate academic transparency. No crumpled papers at the bottom of school bags.
              </p>
              <div class="flex flex-col gap-6 text-xs sm:text-sm">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <span class="material-symbols-outlined text-[18px]">bolt</span>
                  </div>
                  <div>
                    <h4 class="font-title-md font-bold text-on-surface">Instant WhatsApp & SMS Access</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">View and securely download terminal report cards on smartphones the second the principal approves them.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <span class="material-symbols-outlined text-[18px]">history</span>
                  </div>
                  <div>
                    <h4 class="font-title-md font-bold text-on-surface">Complete Academic History</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">Access every past term's report sheets, psychomotor ratings, and attendance records in one unified parent account for all siblings.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <span class="material-symbols-outlined text-[18px]">contact_support</span>
                  </div>
                  <div>
                    <h4 class="font-title-md font-bold text-on-surface">Raise a Grade Query Directly</h4>
                    <p class="text-xs text-on-surface-variant leading-relaxed">Spot a score or subject name that looks irregular? Lodge a formal query inside the portal for verified administrative follow-up.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 9. PRICING SECTION (PREFERRED OLD DATA: Free ₦0, Growth ₦350/student/term, Custom Enterprise) -->
    <section id="pricing" class="w-full bg-[#0F121C] text-surface-container-lowest py-16 lg:py-24">
      <div class="max-w-[1280px] mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-lowest/10 text-primary-fixed font-label-sm text-xs mb-2 border border-surface-container-lowest/15 font-bold">
            <span class="material-symbols-outlined text-[16px]">payments</span> Transparent Nigerian School Plans
          </span>
          <h2 class="font-headline-xl text-2xl sm:text-4xl text-surface-container-lowest tracking-tight mb-2 font-extrabold">
            One Platform, Pricing That Fits Your School's Size
          </h2>
          <p class="font-body-md text-xs sm:text-sm text-surface-container-high max-w-xl mx-auto mb-8">
            Every school is different. ResultBee's pricing scales with you, per branch, per term. No hidden onboarding surcharges.
          </p>

          <!-- Billing Period Selector (Termly vs Annual with 10% Savings) -->
          <div class="inline-flex items-center p-1 rounded-full bg-surface-container-lowest/10 border border-surface-container-lowest/15 mb-4">
            <button 
              @click="billingPeriod = 'termly'"
              :class="billingPeriod === 'termly' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'text-surface-container-lowest hover:text-primary-fixed'"
              class="px-5 py-2 rounded-full text-xs transition-all cursor-pointer"
            >
              Termly Billing
            </button>
            <button 
              @click="billingPeriod = 'annual'"
              :class="billingPeriod === 'annual' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'text-surface-container-lowest hover:text-primary-fixed'"
              class="px-5 py-2 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Annual Full Session</span>
              <span class="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-extrabold uppercase">Save 10%</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <!-- Tier 1: Free Starter (OLD DATA PREFERRED) -->
          <div class="bg-surface-container-lowest/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-surface-container-lowest/10 card-hover-interactive reveal-on-scroll stagger-1">
            <div>
              <div class="text-xs text-surface-container-high uppercase tracking-wider mb-1 font-semibold">Starter Tier</div>
              <h3 class="font-headline-md text-xl sm:text-2xl text-surface-container-lowest font-bold mb-1">Free</h3>
              <p class="font-body-sm text-xs text-surface-container-high mb-6">For emerging and small community schools getting started with automated grading.</p>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-surface-container-lowest mb-6">
                ₦0 <span class="text-xs font-normal text-surface-container-high">/ forever</span>
              </div>
              <ul class="flex flex-col gap-3 text-xs text-surface-container-high mb-8">
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>1 school branch</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Up to 100 enrolled students</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Standard grading engine access</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Standard PDF report card template</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Community online support</span>
                </li>
              </ul>
            </div>
            <button 
              @click="emit('open-onboarding')" 
              class="w-full py-3 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-headline-sm text-xs font-bold text-center transition-colors cursor-pointer border border-surface-container-lowest/15"
            >
              Sign Up Free
            </button>
          </div>

          <!-- Tier 2: Growth (Flagship / Recommended - OLD DATA PREFERRED: ₦350 / student / term) -->
          <div class="relative bg-gradient-to-b from-[#1C2030] to-[#141620] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-2 border-primary-container card-hover-interactive reveal-on-scroll stagger-2">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] tracking-wider uppercase font-bold shadow-md whitespace-nowrap">
              Most Popular Choice
            </div>
            <div>
              <div class="text-xs text-primary-fixed uppercase tracking-wider mb-1 mt-1 font-semibold">Flagship Fleet</div>
              <h3 class="font-headline-md text-xl sm:text-2xl text-surface-container-lowest font-bold mb-1">Growth</h3>
              <p class="font-body-sm text-xs text-surface-container-high mb-6">Comprehensive management for established primary & secondary institutions.</p>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-surface-container-lowest mb-1">
                <span v-if="billingPeriod === 'termly'">₦350</span>
                <span v-else>₦315</span>
                <span class="text-xs font-normal text-surface-container-high">/ student / term</span>
              </div>
              <div class="text-[11px] text-secondary-fixed mb-6 font-semibold">
                <span v-if="billingPeriod === 'annual'">Billed ₦945 / student / year (Save 10%)</span>
                <span v-else>Flexible pay-as-you-go per academic term</span>
              </div>
              <ul class="flex flex-col gap-3 text-xs text-surface-container-lowest mb-8">
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
                  <span>Unlimited classes, arms & subjects</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
                  <span>Visual no-code report card designer</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
                  <span>Full offline score entry for teachers</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
                  <span>Automated SMS, WhatsApp & Email notifications</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
                  <span>Principal digital stamps & QR verification</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
                  <span>Priority WhatsApp & telephone support</span>
                </li>
              </ul>
            </div>
            <button 
              @click="emit('open-onboarding')" 
              class="w-full py-3 rounded-full bg-gradient-to-r from-primary-container to-primary text-on-primary font-headline-sm text-xs text-center shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:brightness-110 transition-all cursor-pointer font-bold"
            >
              Get Started
            </button>
          </div>

          <!-- Tier 3: Custom (School Groups) -->
          <div class="bg-surface-container-lowest/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-surface-container-lowest/10 card-hover-interactive reveal-on-scroll stagger-3">
            <div>
              <div class="text-xs text-surface-container-high uppercase tracking-wider mb-1 font-semibold">Multi-Campus Groups</div>
              <h3 class="font-headline-md text-xl sm:text-2xl text-surface-container-lowest font-bold mb-1">Custom Enterprise</h3>
              <p class="font-body-sm text-xs text-surface-container-high mb-6">For educational networks, diocesan school boards, and state-wide chains.</p>
              <div class="font-display-hero text-3xl sm:text-4xl font-extrabold text-surface-container-lowest mb-6">
                Custom <span class="text-xs font-normal text-surface-container-high">/ negotiated</span>
              </div>
              <ul class="flex flex-col gap-3 text-xs text-surface-container-high mb-8">
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Multiple state branches & unified analytics</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Custom branded domain (portal.yourschool.ng)</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Dedicated account manager & staff training</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Custom Nigerian curriculum & ERP integrations</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span>Service Level Agreement (SLA) guarantee</span>
                </li>
              </ul>
            </div>
            <button 
              @click="emit('open-demo')" 
              class="w-full py-3 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-headline-sm text-xs text-center transition-colors cursor-pointer border border-surface-container-lowest/15 font-bold"
            >
              Talk to Us
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- 10. INTERACTIVE FAQ SECTION -->
    <section id="faq" class="w-full bg-surface-container-low py-16 lg:py-24 border-t border-surface-container">
      <div class="max-w-[960px] mx-auto px-6 reveal-on-scroll">
        <div class="text-center mb-12">
          <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs mb-2 font-bold">
            <span class="material-symbols-outlined text-[16px]">help</span> Got Questions?
          </span>
          <h2 class="font-headline-xl text-2xl sm:text-4xl text-on-background tracking-tight mb-2 font-extrabold">
            Frequently Asked Questions
          </h2>
          <p class="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
            Everything you need to know about setting up and running ResultBee for your school community.
          </p>
        </div>

        <!-- Segmented Tab Bar -->
        <div class="flex items-center justify-center gap-2 p-1.5 rounded-full bg-surface-container max-w-md mx-auto mb-10">
          <button 
            @click="activeFaqTab = 'leaders'" 
            :class="activeFaqTab === 'leaders' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'"
            class="flex-1 py-2 px-4 rounded-full font-label-md text-xs text-center transition-all cursor-pointer"
          >
            School Leaders
          </button>
          <button 
            @click="activeFaqTab = 'teachers'" 
            :class="activeFaqTab === 'teachers' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'"
            class="flex-1 py-2 px-4 rounded-full font-label-md text-xs text-center transition-all cursor-pointer"
          >
            Teachers
          </button>
          <button 
            @click="activeFaqTab = 'parents'" 
            :class="activeFaqTab === 'parents' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface'"
            class="flex-1 py-2 px-4 rounded-full font-label-md text-xs text-center transition-all cursor-pointer"
          >
            Parents
          </button>
        </div>

        <!-- FAQ Accordion List -->
        <div class="flex flex-col gap-3">
          <div 
            v-for="(item, idx) in faqs[activeFaqTab]" 
            :key="item.q"
            class="bg-surface-container-lowest rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container/60 transition-all card-hover-interactive"
          >
            <button 
              @click="toggleFaq(idx)" 
              class="w-full flex items-center justify-between text-left font-title-md text-xs sm:text-sm text-on-surface cursor-pointer"
            >
              <span class="font-bold">{{ item.q }}</span>
              <span 
                class="material-symbols-outlined text-[20px] text-primary transition-transform duration-200 shrink-0 ml-2"
                :class="{ 'rotate-180': expandedFaq === idx }"
              >
                expand_more
              </span>
            </button>
            <div v-show="expandedFaq === idx" class="mt-3 pt-2 font-body-sm text-xs text-on-surface-variant border-t border-surface-container/60 leading-relaxed">
              {{ item.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 11. EARLY ACCESS NEWSLETTER SECTION -->
    <section class="w-full bg-surface-container-high py-16">
      <div class="max-w-[1280px] mx-auto px-6 reveal-on-scroll">
        <div class="bg-inverse-surface rounded-2xl sm:rounded-3xl p-8 lg:p-12 shadow-[0_12px_24px_-6px_rgba(217,119,6,0.08)] flex flex-col lg:flex-row items-center justify-between gap-8 card-hover-interactive">
          <div class="max-w-xl text-center lg:text-left">
            <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/20 text-secondary-fixed font-label-sm text-xs mb-3 font-bold">
              <span class="material-symbols-outlined text-[14px]">verified</span> Early Access & Updates
            </span>
            <h3 class="font-headline-lg text-xl sm:text-2xl lg:text-3xl text-surface-container-lowest font-bold mb-2">
              Be the first to know about new features
            </h3>
            <p class="font-body-md text-xs sm:text-sm text-surface-container-high leading-relaxed">
              Join leading Nigerian school proprietors and administrators receiving platform releases, WAEC grading updates, and assessment templates.
            </p>
          </div>

          <form @submit.prevent="handleNewsletterSubmit" class="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
            <input 
              v-model="newsletterEmail"
              type="email" 
              placeholder="Enter your school email" 
              required 
              class="px-4 py-3 rounded-full bg-surface-container-lowest/10 border border-surface-container-lowest/20 text-surface-container-lowest text-xs outline-none focus:border-primary-fixed flex-1"
            />
            <button 
              type="submit" 
              class="px-6 py-3 rounded-full bg-primary-fixed text-on-primary-fixed font-headline-sm text-xs font-bold hover:bg-primary-fixed-dim transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              {{ newsletterSubmitted ? 'Subscribed!' : 'Subscribe' }}
            </button>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>
