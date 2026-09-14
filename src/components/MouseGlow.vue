<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const mouseX = ref(-1000);
const mouseY = ref(-1000);
const isVisible = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  if (!isVisible.value) isVisible.value = true;
};

const handleMouseLeave = () => {
  isVisible.value = false;
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseleave', handleMouseLeave);
});
</script>

<template>
  <div 
    v-if="isVisible"
    class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 overflow-hidden"
    :style="{ opacity: isVisible ? 1 : 0 }"
  >
    <!-- Soft warm amber ambient glow tracking pointer -->
    <div 
      class="absolute w-[460px] h-[460px] rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      :style="{
        left: `${mouseX}px`,
        top: `${mouseY}px`,
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.07) 0%, rgba(0, 106, 97, 0.04) 50%, rgba(0, 0, 0, 0) 70%)'
      }"
    />
  </div>
</template>
