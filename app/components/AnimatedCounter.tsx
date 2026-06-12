"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function AnimatedCounter({
  target,
  duration = 1500,
  formatter,
  className,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Use IntersectionObserver so counters animate when they scroll into view
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startTimeRef.current = null;

          const animate = (timestamp: number) => {
            if (startTimeRef.current === null) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            const current = Math.round(eased * target);
            setValue(current);

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            }
          };

          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  const display = formatter ? formatter(value) : value.toLocaleString();

  return (
    <span ref={containerRef} className={className} aria-live="polite">
      {display}
    </span>
  );
}
