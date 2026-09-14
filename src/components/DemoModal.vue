<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const isSuccess = ref(false);

const form = ref({
  schoolName: '',
  contactName: '',
  email: '',
  phone: '',
  campusCount: '1',
  studentRange: '200-600',
  preferredTime: 'morning'
});

const handleSubmit = () => {
  isSuccess.value = true;
};

const handleClose = () => {
  emit('close');
  setTimeout(() => {
    isSuccess.value = false;
  }, 300);
};
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
  >
    <div class="glass-card-light bg-surface-container-lowest text-on-surface max-w-md w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/30 my-6 relative animate-in fade-in zoom-in-95 duration-200">
      
      <button 
        @click="handleClose" 
        class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>

      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary mx-auto flex items-center justify-center mb-3">
          <span class="material-symbols-outlined text-[28px]">support_agent</span>
        </div>
        <h3 class="font-headline-md text-xl font-bold text-on-background">
          {{ isSuccess ? 'Demo Booked!' : 'Request School Walkthrough' }}
        </h3>
        <p class="text-xs text-on-surface-variant mt-1">
          {{ isSuccess 
            ? 'We will connect with your management team via WhatsApp and Google Meet.' 
            : 'Our academic consultants in Lagos and Abuja will prepare a personalized grading simulation for your board.' }}
        </p>
      </div>

      <div v-if="isSuccess" class="py-6 flex flex-col items-center text-center gap-4">
        <div class="w-14 h-14 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
          <span class="material-symbols-outlined text-[32px]">task_alt</span>
        </div>
        <div>
          <h4 class="font-bold text-sm text-on-surface">Consultation Scheduled</h4>
          <p class="text-xs text-on-surface-variant mt-1 max-w-xs mx-auto">
            A confirmation link and calendar invite have been sent to <strong>{{ form.email }}</strong>.
          </p>
        </div>
        <button 
          @click="handleClose" 
          class="w-full mt-2 py-3 rounded-full bg-secondary text-on-secondary font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-md"
        >
          Close
        </button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-3.5 text-xs">
        <div>
          <label class="font-semibold block mb-1 text-on-surface">School Name *</label>
          <input 
            v-model="form.schoolName" 
            type="text" 
            placeholder="e.g. Atlantic Hall Academy" 
            required 
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none focus:border-secondary text-on-surface" 
          />
        </div>

        <div>
          <label class="font-semibold block mb-1 text-on-surface">Your Name & Role *</label>
          <input 
            v-model="form.contactName" 
            type="text" 
            placeholder="e.g. Dr. Kelechi Nwosu (Principal)" 
            required 
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none focus:border-secondary text-on-surface" 
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Phone / WhatsApp *</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              placeholder="0803 123 4567" 
              required 
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none focus:border-secondary text-on-surface" 
            />
          </div>
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Institutional Email *</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="admin@school.ng" 
              required 
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none focus:border-secondary text-on-surface" 
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Campuses</label>
            <select v-model="form.campusCount" class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none text-on-surface">
              <option value="1">1 Campus</option>
              <option value="2-3">2 - 3 Campuses</option>
              <option value="4+">4+ Multi-Branch</option>
            </select>
          </div>
          <div>
            <label class="font-semibold block mb-1 text-on-surface">Student Volume</label>
            <select v-model="form.studentRange" class="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs outline-none text-on-surface">
              <option value="50-200">50 - 200</option>
              <option value="200-600">200 - 600</option>
              <option value="600-1500">600 - 1,500</option>
              <option value="1500+">1,500+</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full mt-2 py-3 rounded-full bg-secondary text-on-secondary font-bold text-xs hover:opacity-90 transition-opacity shadow-md cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span class="material-symbols-outlined text-[18px]">calendar_month</span>
          Confirm Free Walkthrough
        </button>
      </form>

    </div>
  </div>
</template>
