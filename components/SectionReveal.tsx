'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      }}
    >
      {children}
    </motion.div>
  );
}
