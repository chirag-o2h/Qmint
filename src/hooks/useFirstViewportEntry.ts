import { useEffect, useRef, useState } from 'react';

const useFirstViewportEntry = (ref: any, observerOptions: any) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          if (observer) {
            observer.disconnect();
            observer = null;
          }
        }
      }, observerOptions);

      const element = ref.current;
      if (element && !entered) {
        observer.observe(element);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [ref, observerOptions]);

  return entered;
};

export default useFirstViewportEntry;
