<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const student = {
  name: 'Chisom E. Okonkwo',
  admissionNo: 'AHA/2023/0412',
  school: 'Atlantic Hall Academy, Epe',
  class: 'Senior Secondary 2 (SS2 Science)',
  term: 'Second Term Evaluation Sheet',
  position: '2nd of 48 in Class',
  gpa: '4.85 / 5.00 (91.2% Aggregate)',
  subjects: [
    { name: 'Mathematics', ca1: 19.0, ca2: 18.5, exam: 54.0, total: 91.5, grade: 'A1', remark: 'Exceptional quantitative intuition.' },
    { name: 'English Language', ca1: 17.0, ca2: 16.0, exam: 49.0, total: 82.0, grade: 'B2', remark: 'Very fluent essayist. Well structured.' },
    { name: 'Physics', ca1: 18.5, ca2: 19.0, exam: 52.0, total: 89.5, grade: 'A1', remark: 'Mastery in optics & dynamics practicals.' },
    { name: 'Chemistry', ca1: 18.0, ca2: 17.5, exam: 50.5, total: 86.0, grade: 'A1', remark: 'Sound laboratory comprehension.' },
    { name: 'Biology', ca1: 18.0, ca2: 16.5, exam: 48.0, total: 82.5, grade: 'B2', remark: 'Thorough grasp of cytology & genetics.' },
    { name: 'Technical Drawing', ca1: 19.5, ca2: 19.0, exam: 56.0, total: 94.5, grade: 'A1', remark: 'Impeccable orthographic projections.' }
  ]
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
  >
    <div class="bg-surface-container-lowest text-on-surface max-w-3xl w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/40 my-6 relative animate-in fade-in zoom-in-95 duration-200">
      
      <button 
        @click="emit('close')" 
        class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        aria-label="Close report card preview"
      >
        <span class="material-symbols-outlined text-[24px]">close</span>
      </button>

      <!-- Official Header -->
      <div class="text-center pb-5 border-b border-surface-container">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-container text-on-primary mb-2.5 shadow-sm">
          <span class="material-symbols-outlined text-[28px]">hive</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-on-background">{{ student.school }}</h2>
        <p class="text-xs text-on-surface-variant mt-0.5">Approved by Ministry of Education • Official Terminal Evaluation</p>
        <div class="mt-2.5 inline-flex flex-wrap justify-center gap-2">
          <span class="px-3 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold">{{ student.class }}</span>
          <span class="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-semibold">2025/2026 Academic Session</span>
          <span class="px-3 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold">{{ student.term }}</span>
        </div>
      </div>

      <!-- Student Metadata Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 border-b border-surface-container text-xs">
        <div>
          <span class="text-on-surface-variant uppercase text-[10px] block font-bold">Student Name</span>
          <span class="font-bold text-xs sm:text-sm text-on-surface">{{ student.name }}</span>
        </div>
        <div>
          <span class="text-on-surface-variant uppercase text-[10px] block font-bold">Admission ID</span>
          <span class="font-mono font-bold text-xs sm:text-sm text-primary">{{ student.admissionNo }}</span>
        </div>
        <div>
          <span class="text-on-surface-variant uppercase text-[10px] block font-bold">Class Standing</span>
          <span class="font-bold text-xs sm:text-sm text-secondary">{{ student.position }}</span>
        </div>
        <div>
          <span class="text-on-surface-variant uppercase text-[10px] block font-bold">Aggregate Average</span>
          <span class="font-bold text-xs sm:text-sm text-on-surface">{{ student.gpa }}</span>
        </div>
      </div>

      <!-- Subject Score Table -->
      <div class="py-4 overflow-x-auto">
        <table class="w-full text-left text-xs min-w-[560px]">
          <thead>
            <tr class="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider font-bold">
              <th class="p-2.5 rounded-l-lg">Subject</th>
              <th class="p-2.5 text-center">1st CA (20%)</th>
              <th class="p-2.5 text-center">2nd CA (20%)</th>
              <th class="p-2.5 text-center">Exam (60%)</th>
              <th class="p-2.5 text-center">Total (100)</th>
              <th class="p-2.5 text-center">Grade</th>
              <th class="p-2.5 rounded-r-lg">Remarks</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container">
            <tr v-for="subj in student.subjects" :key="subj.name" class="hover:bg-surface-container-lowest/50 transition-colors">
              <td class="p-2.5 font-semibold text-primary">{{ subj.name }}</td>
              <td class="p-2.5 text-center font-mono">{{ subj.ca1.toFixed(1) }}</td>
              <td class="p-2.5 text-center font-mono">{{ subj.ca2.toFixed(1) }}</td>
              <td class="p-2.5 text-center font-mono">{{ subj.exam.toFixed(1) }}</td>
              <td class="p-2.5 text-center font-bold font-mono text-on-surface">{{ subj.total.toFixed(1) }}</td>
              <td class="p-2.5 text-center">
                <span class="px-2 py-0.5 rounded font-bold bg-secondary-container text-on-secondary-fixed text-[11px]">{{ subj.grade }}</span>
              </td>
              <td class="p-2.5 italic text-on-surface-variant text-[11px]">{{ subj.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Certification & Verification Footer -->
      <div class="pt-4 border-t border-surface-container flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
        <div class="flex items-center gap-2 text-left">
          <span class="material-symbols-outlined text-secondary text-[24px]">verified</span>
          <div>
            <span class="font-bold text-on-surface block text-[11px]">Digitally Certified & Cryptographically Signed</span>
            <span class="text-on-surface-variant font-mono text-[10px]">Hash: 0x9F4C...B82A (Verified ResultBee Node Lagos)</span>
          </div>
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <button 
            @click="handlePrint" 
            class="flex-1 sm:flex-none px-4 py-2 rounded-full border border-outline text-on-surface hover:bg-surface-container flex items-center justify-center gap-1.5 cursor-pointer text-xs"
          >
            <span class="material-symbols-outlined text-[16px]">print</span> Print / PDF
          </button>
          <button 
            @click="emit('close')" 
            class="flex-1 sm:flex-none px-5 py-2 rounded-full bg-primary text-on-primary font-bold cursor-pointer hover:bg-primary-container text-xs shadow-sm"
          >
            Close Preview
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
