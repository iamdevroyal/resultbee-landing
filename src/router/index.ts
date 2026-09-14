import { ref, computed } from 'vue';

export type PageRoute = 'home' | 'about' | 'privacy' | 'terms';

const currentPage = ref<PageRoute>('home');

const pageTitles: Record<PageRoute, string> = {
  home: 'ResultBee — Custom Grading Engine & School Result Platform for Nigerian Schools',
  about: 'About Us — Why We Built ResultBee for Nigerian Schools',
  privacy: 'Privacy Policy & Student Data Protection (NDPR Compliant) — ResultBee',
  terms: 'Institutional Terms of Service & SLA — ResultBee',
};

function parsePath(): PageRoute {
  const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');

  if (path === 'about' || hash === 'about') return 'about';
  if (path === 'privacy' || hash === 'privacy' || hash === 'privacy-policy') return 'privacy';
  if (path === 'terms' || hash === 'terms' || hash === 'terms-of-service') return 'terms';

  return 'home';
}

export function useRouter() {
  const setPage = (page: PageRoute, scrollTarget?: string) => {
    currentPage.value = page;
    document.title = pageTitles[page] || pageTitles.home;

    // Update URL without page reload
    const targetUrl = page === 'home' ? (scrollTarget ? `#${scrollTarget}` : '/') : `#${page}`;
    if (window.location.hash !== targetUrl && window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }

    if (scrollTarget && page === 'home') {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateTo = (page: PageRoute) => {
    setPage(page);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage.value !== 'home') {
      setPage('home', sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return {
    currentPage: computed(() => currentPage.value),
    navigateTo,
    scrollToSection,
    setPage,
  };
}

// Global initialization
if (typeof window !== 'undefined') {
  currentPage.value = parsePath();
  document.title = pageTitles[currentPage.value] || pageTitles.home;

  window.addEventListener('popstate', () => {
    currentPage.value = parsePath();
    document.title = pageTitles[currentPage.value] || pageTitles.home;
  });

  window.addEventListener('hashchange', () => {
    currentPage.value = parsePath();
    document.title = pageTitles[currentPage.value] || pageTitles.home;
  });
}
