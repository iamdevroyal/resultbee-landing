<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits<{
  (e: 'open-report-card'): void;
}>();

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
</script>

<template>
  <div class="w-full glass-card-light bg-surface-container-lowest text-on-surface rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_16px_36px_rgba(24,27,38,0.08)] border border-surface-container-highest/60 card-hover-interactive">
    
    <!-- Header with Campus Selector -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-container">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
          <span class="material-symbols-outlined text-[22px]">tune</span>
        </div>
        <div>
          <h4 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
            Live Continuous Assessment Calibrator
          </h4>
          <p class="text-xs text-on-surface-variant">Adjust weights to see real-time 100% mathematical balancing.</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs text-on-surface-variant hidden md:inline">Branch:</span>
        <select 
          v-model="selectedCampus" 
          class="px-3 py-1.5 rounded-full bg-surface-container text-xs font-semibold border border-surface-container-high outline-none text-on-surface cursor-pointer"
        >
          <option v-for="c in campuses" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>

    <!-- Sliders and Total Counter -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 border-b border-surface-container">
      
      <!-- 1st CA Slider -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-on-surface flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-primary" />
            1st Continuous Assessment
          </span>
          <span class="font-mono font-bold text-primary text-sm">{{ ca1 }}%</span>
        </div>
        <input 
          type="range" 
          min="5" 
          max="40" 
          :value="ca1" 
          @input="handleCa1Change" 
          class="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer" 
        />
        <span class="text-[11px] text-on-surface-variant">Standard classroom tests, projects & weekly assignments.</span>
      </div>

      <!-- 2nd CA Slider -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-on-surface flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-secondary" />
            2nd Continuous Assessment
          </span>
          <span class="font-mono font-bold text-secondary text-sm">{{ ca2 }}%</span>
        </div>
        <input 
          type="range" 
          min="5" 
          max="40" 
          :value="ca2" 
          @input="handleCa2Change" 
          class="w-full accent-secondary h-2 bg-surface-container rounded-lg cursor-pointer" 
        />
        <span class="text-[11px] text-on-surface-variant">Mid-term tests & practical science laboratories.</span>
      </div>

      <!-- Exam Slider -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-on-surface flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-tertiary" />
            Terminal Examination
          </span>
          <span class="font-mono font-bold text-tertiary text-sm">{{ exam }}%</span>
        </div>
        <input 
          type="range" 
          min="40" 
          max="80" 
          :value="exam" 
          @input="handleExamChange" 
          class="w-full accent-tertiary h-2 bg-surface-container rounded-lg cursor-pointer" 
        />
        <span class="text-[11px] text-on-surface-variant">End-of-term theoretical & essay examination.</span>
      </div>

    </div>

    <!-- Visual Breakdown Bar & Grading Scale Picker -->
    <div class="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
      
      <!-- Visual Bar -->
      <div class="w-full md:max-w-md flex flex-col gap-2">
        <div class="flex justify-between text-xs text-on-surface-variant">
          <span>Weighted Distribution:</span>
          <span class="font-mono font-bold text-xs" :class="totalPercentage === 100 ? 'text-secondary' : 'text-error'">
            {{ totalPercentage }}% Total (Invariant Checked)
          </span>
        </div>
        <div class="w-full h-3 rounded-full overflow-hidden flex bg-surface-container">
          <div class="h-full bg-primary transition-all duration-200" :style="{ width: `${ca1}%` }" title="1st CA" />
          <div class="h-full bg-secondary transition-all duration-200" :style="{ width: `${ca2}%` }" title="2nd CA" />
          <div class="h-full bg-tertiary transition-all duration-200" :style="{ width: `${exam}%` }" title="Exam" />
        </div>
      </div>

      <!-- Scale Toggle & Preview Action -->
      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <div class="flex p-1 rounded-full bg-surface-container text-xs font-semibold">
          <button 
            @click="selectedGradingScale = 'waec'" 
            :class="selectedGradingScale === 'waec' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant'" 
            class="px-3 py-1 rounded-full transition-all cursor-pointer"
          >
            WAEC Scale (A1-F9)
          </button>
          <button 
            @click="selectedGradingScale = 'letter'" 
            :class="selectedGradingScale === 'letter' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant'" 
            class="px-3 py-1 rounded-full transition-all cursor-pointer"
          >
            Letter (A - F)
          </button>
        </div>

        <button 
          @click="emit('open-report-card')" 
          class="px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-xs hover:bg-primary-fixed-dim transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span class="material-symbols-outlined text-[16px]">visibility</span>
          Preview Report Card
        </button>
      </div>

    </div>

  </div>
</template>
