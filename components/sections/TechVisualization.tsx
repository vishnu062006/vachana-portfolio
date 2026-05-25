'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { techStackItems } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

function FloatingBadge({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const floatDuration = 3 + (index % 4) * 0.5;
  const floatDelay = (index % 6) * 0.3;
  const floatY = 4 + (index % 3) * 2;

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [-floatY, floatY, -floatY],
            }
      }
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: floatDelay,
      }}
    >
      <Badge
        variant={index % 3 === 0 ? 'default' : index % 3 === 1 ? 'secondary' : 'outline'}
        className={cn(
          'cursor-default text-sm px-4 py-2',
          'transition-all duration-300',
          'hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10',
        )}
      >
        {name}
      </Badge>
    </motion.div>
  );
}

export function TechVisualization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const Wrapper = prefersReducedMotion ? 'div' : motion.div;
  const wrapperProps = prefersReducedMotion
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
      };

  const ItemWrapper = prefersReducedMotion ? 'div' : motion.div;
  const itemProps = prefersReducedMotion ? {} : { variants: badgeVariants };

  return (
    <SectionReveal>
      <section
        id="tech"
        className="relative py-24 sm:py-32"
        ref={sectionRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Tech Universe
              </span>
            </h2>
            <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
          </div>

          {/* Desktop: 3D orbit container */}
          <div className="hidden lg:flex justify-center">
            <div
              id="tech-orbit-container"
              className="w-full max-w-2xl aspect-square rounded-2xl"
              aria-hidden="true"
            />
          </div>

          {/* Mobile / Tablet: animated badge grid fallback */}
          <Wrapper
            {...wrapperProps}
            className="lg:hidden flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {techStackItems.map((tech, index) => (
              <ItemWrapper key={tech} {...itemProps}>
                <FloatingBadge name={tech} index={index} />
              </ItemWrapper>
            ))}
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
