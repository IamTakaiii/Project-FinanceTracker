import { useState, useEffect, useRef, useCallback } from "react";

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export const useInView = (options?: IntersectionObserverOptions) => {
  // State to store whether the element is in view
  const [inView, setInView] = useState(false);
  
  // Ref to hold the DOM element
  const ref = useRef<HTMLDivElement | null>(null);

  // Callback to handle the ref assignment.
  // This is more robust than just returning the ref object directly,
  // especially in cases where the component might re-render frequently.
  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      ref.current = node;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on whether the element is intersecting
        setInView(entry.isIntersecting);
      },
      {
        // Pass options to the observer
        threshold: options?.threshold ?? 1.0,
        root: options?.root,
        rootMargin: options?.rootMargin,
      }
    );

    const currentElement = ref.current;

    // Start observing the element if it exists
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function to unobserve the element when the component unmounts
    // or dependencies change.
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options?.threshold, options?.root, options?.rootMargin]); // Re-run effect if options change

  return { ref: setRef, inView };
};
