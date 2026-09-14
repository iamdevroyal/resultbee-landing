import { onMounted, onUnmounted } from 'vue';

export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    // Only run if browser supports IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after revealing for optimal performance
            observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer?.observe(el));
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
}
