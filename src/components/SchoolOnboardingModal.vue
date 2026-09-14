<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentStep = ref<1 | 2 | 3>(1);
const isSubmitted = ref(false);

const form = ref({
  schoolName: '',
  subdomain: '',
  campusCount: '1',
  sections: ['primary', 'jss', 'sss'],
  curriculum: 'waec',
  studentRange: '200-600',
  contactName: '',
  role: 'proprietor',
  email: '',
  phone: '',
  state: 'Lagos',
  notes: ''
});

// Auto-generate subdomain slug from school name
const handleNameInput = () => {
  if (currentStep.value === 1) {
    const slug = form.value.schoolName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 20);
    form.value.subdomain = slug;
  }
};

const nigerianStates = [
  'Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Ogun', 'Enugu', 'Kaduna', 
  'Kano', 'Delta', 'Anambra', 'Edo', 'Akwa Ibom', 'Ondo', 'Imo', 'Plateau', 'Other'
];

const toggleSection = (section: string) => {
  const idx = form.value.sections.indexOf(section);
  if (idx > -1) {
    if (form.value.sections.length > 1) {
      form.value.sections.splice(idx, 1);
    }
  } else {
    form.value.sections.push(section);
  }
};

const handleNext = () => {
  if (currentStep.value === 1) {
    if (!form.value.schoolName.trim()) return;
    currentStep.value = 2;
  } else if (currentStep.value === 2) {
    if (!form.value.contactName.trim() || !form.value.phone.trim() || !form.value.email.trim()) return;
    isSubmitted.value = true;
    currentStep.value = 3;
  }
};

const handleClose = () => {
  emit('close');
  setTimeout(() => {
    currentStep.value = 1;
    isSubmitted.value = false;
  }, 300);
};
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
  >
    <div class="glass-card-light bg-surface-container-lowest text-on-surface max-w-xl w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/30 my-6 relative animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Close Button -->
      <button 
        @click="handleClose" 
        class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>

      <!-- Header Icon & Title -->
      <div class="text-center pb-5 border-b border-surface-container-high/60">
        <div class="w-12 h-12 rounded-2xl bg-primary-fixed text-primary mx-auto flex items-center justify-center mb-3 shadow-[0_2px_10px_rgba(217,119,6,0.3)]">
          <span class="material-symbols-outlined text-[28px]">domain_add</span>
        </div>
        <h3 class="font-headline-md text-xl sm:text-2xl font-bold text-on-background">
          {{ isSubmitted ? 'School Profile Reserved!' : 'Start Your School Onboarding' }}
        </h3>
        <p class="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-md mx-auto">
          {{ isSubmitted 
            ? 'Your dedicated academic deployment engineer will verify your curriculum standard.' 
            : 'Configure your custom Continuous Assessment breakdown and reserve your school portal.' }}
        </p>

        <!-- Progress Steps (only if not finished) -->
        <div v-if="!isSubmitted" class="flex items-center justify-center gap-2 mt-4">
          <div 
            :class="currentStep >= 1 ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container text-on-surface-variant'" 
            class="w-6 h-6 rounded-full text-xs flex items-center justify-center transition-all"
          >
            1
          </div>
          <div class="w-8 h-0.5 bg-surface-container-high" />
          <div 
            :class="currentStep >= 2 ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container text-on-surface-variant'" 
            class="w-6 h-6 rounded-full text-xs flex items-center justify-center transition-all"
          >
            2
          </div>
        </div>
      </div>

      <!-- STEP 1: Academic & Campus Profile -->
      <div v-if="currentStep === 1" class="py-5 flex flex-col gap-4 text-xs">
        <div>
          <label class="font-semibold block mb-1 text-on-surface">School Official Name *</label>
          <input 
            v-model="form.schoolName" 
            @input="handleNameInput"
            type="text" 
            placeholder="e.g. Vivian Fowler Memorial College" 
            required 
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm outline-none focus:border-primary transition-colors text-on-surface" 
          />
        </div>

        <!-- Live Subdomain Reservation Preview -->
        <div>
          <label class="font-semibold block mb-1 text-on-surface">Preferred Portal Address</label>
          <div class="flex items-center px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm">
            <input 
              v-model="form.subdomain" 
              type="text" 
              placeholder="yourschool" 
              class="w-full bg-transparent outline-none font-mono text-primary font-bold" 
            />
            <span class="text-on-surface-variant font-mono text-xs whitespace-nowrap">.resultbee.com</span>
          </div>
          <span class="text-[11px] text-secondary font-medium mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">check_circle</span>
            Available for immediate reservation
          </span>
        </div>

        <!-- Campuses & Student Volume Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Campus Structure</label>
            <select v-model="form.campusCount" class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none text-on-surface">
              <option value="1">Single Campus</option>
              <option value="2-3">2 - 3 Campuses (Multi-Branch)</option>
              <option value="4+">4+ Multi-State Group</option>
            </select>
          </div>
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Total Pupils Enrolled</label>
            <select v-model="form.studentRange" class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none text-on-surface">
              <option value="50-200">50 - 200 Students</option>
              <option value="200-600">200 - 600 Students</option>
              <option value="600-1500">600 - 1,500 Students</option>
              <option value="1500+">1,500+ Students</option>
            </select>
          </div>
        </div>

        <!-- Curriculum Standard -->
        <div>
          <label class="font-semibold block mb-1 text-on-surface">Primary Grading Standard</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              @click="form.curriculum = 'waec'" 
              :class="form.curriculum === 'waec' ? 'border-primary bg-primary-fixed/20 text-on-primary-fixed' : 'border-surface-container bg-surface-container-low text-on-surface'" 
              class="p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer"
            >
              <span class="block font-bold text-xs">WAEC Standard</span>
              <span class="text-[10px] text-on-surface-variant">A1 - F9 Stanine Scale</span>
            </button>
            <button 
              type="button" 
              @click="form.curriculum = 'british'" 
              :class="form.curriculum === 'british' ? 'border-primary bg-primary-fixed/20 text-on-primary-fixed' : 'border-surface-container bg-surface-container-low text-on-surface'" 
              class="p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer"
            >
              <span class="block font-bold text-xs">Cambridge / British</span>
              <span class="text-[10px] text-on-surface-variant">A* - G / Custom Letter</span>
            </button>
          </div>
        </div>

        <!-- School Divisions -->
        <div>
          <label class="font-semibold block mb-1 text-on-surface">Sections Operating at School</label>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="sec in [
                { id: 'nursery', label: 'Early Years / Nursery' },
                { id: 'primary', label: 'Primary School' },
                { id: 'jss', label: 'Junior Secondary (JSS)' },
                { id: 'sss', label: 'Senior Secondary (SSS)' }
              ]" 
              :key="sec.id"
              type="button"
              @click="toggleSection(sec.id)"
              :class="form.sections.includes(sec.id) ? 'bg-secondary text-on-secondary' : 'bg-surface-container-low text-on-surface-variant border border-surface-container'"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {{ sec.label }}
            </button>
          </div>
        </div>

        <button 
          @click="handleNext" 
          :disabled="!form.schoolName.trim()"
          class="w-full mt-2 py-3 rounded-full bg-primary text-on-primary font-bold text-sm hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Continue to Administrator Details</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      <!-- STEP 2: Administrator & Contact Details -->
      <div v-else-if="currentStep === 2" class="py-5 flex flex-col gap-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Contact Person Full Name *</label>
            <input 
              v-model="form.contactName" 
              type="text" 
              placeholder="e.g. Deaconess B. Adeyemi" 
              required 
              class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm outline-none focus:border-primary text-on-surface" 
            />
          </div>
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Role at Institution</label>
            <select v-model="form.role" class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none text-on-surface">
              <option value="proprietor">Proprietor / Director</option>
              <option value="principal">Principal / Head of School</option>
              <option value="vice_principal">Vice Principal (Academics)</option>
              <option value="it_admin">ICT Director / Exam Officer</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Official School Email *</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="admin@school.edu.ng" 
              required 
              class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm outline-none focus:border-primary text-on-surface" 
            />
          </div>
          <div>
            <label class="font-semibold block mb-1 text-on-surface">WhatsApp / Phone Number *</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              placeholder="0803 123 4567" 
              required 
              class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm outline-none focus:border-primary text-on-surface" 
            />
          </div>
        </div>

        <div>
          <label class="font-semibold block mb-1 text-on-surface">State of Operation</label>
          <select v-model="form.state" class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none text-on-surface">
            <option v-for="st in nigerianStates" :key="st" :value="st">{{ st }}</option>
          </select>
        </div>

        <div>
          <label class="font-semibold block mb-1 text-on-surface">Current Grading Challenge / Notes</label>
          <textarea 
            v-model="form.notes" 
            rows="2" 
            placeholder="e.g. Currently compiling in Excel; looking to automate 20/20/60 continuous assessment and WhatsApp delivery."
            class="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none focus:border-primary text-on-surface"
          />
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button 
            type="button" 
            @click="currentStep = 1" 
            class="px-4 py-2.5 rounded-full border border-surface-container text-on-surface-variant hover:bg-surface-container font-semibold transition-colors cursor-pointer"
          >
            Back
          </button>
          <button 
            @click="handleNext" 
            :disabled="!form.contactName.trim() || !form.phone.trim() || !form.email.trim()"
            class="flex-1 py-3 rounded-full bg-primary text-on-primary font-bold text-sm hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Complete School Registration</span>
            <span class="material-symbols-outlined text-[18px]">verified</span>
          </button>
        </div>
      </div>

      <!-- STEP 3: Celebratory Confirmation -->
      <div v-else-if="currentStep === 3" class="py-6 flex flex-col items-center text-center gap-4">
        <div class="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center animate-bounce">
          <span class="material-symbols-outlined text-[36px]">check_circle</span>
        </div>

        <div class="max-w-md">
          <h4 class="font-headline-sm text-lg font-bold text-on-surface">
            Congratulations, {{ form.contactName }}!
          </h4>
          <p class="text-xs text-on-surface-variant mt-1.5">
            We have pre-provisioned your institutional workspace for <strong>{{ form.schoolName }}</strong>.
          </p>
        </div>

        <!-- Reserved Subdomain Badge -->
        <div class="px-5 py-3 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-3 w-full max-w-sm justify-center">
          <span class="material-symbols-outlined text-primary text-[22px]">dns</span>
          <div class="text-left font-mono">
            <span class="text-[11px] text-on-surface-variant block">Reserved Tenant Portal:</span>
            <span class="text-sm font-bold text-primary">{{ form.subdomain || 'school' }}.resultbee.com</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-secondary-container/20 text-on-surface text-left text-xs max-w-md border border-secondary-container/40">
          <span class="font-bold block text-secondary mb-1">What Happens Next:</span>
          <ul class="list-disc list-inside space-y-1 text-on-surface-variant text-[11px]">
            <li>A curriculum setup engineer will reach out via WhatsApp at <strong>{{ form.phone }}</strong>.</li>
            <li>We will calibrate your school's exact CA 1 / CA 2 / Exam percentage distribution.</li>
            <li>Free student bulk roster migration assistance is included with your account.</li>
          </ul>
        </div>

        <button 
          @click="handleClose" 
          class="w-full max-w-sm mt-2 py-3 rounded-full bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all shadow-md cursor-pointer"
        >
          Return to ResultBee
        </button>
      </div>

    </div>
  </div>
</template>
