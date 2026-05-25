'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { leadershipRoles } from '@/data/portfolio';
import type { LeadershipRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

function TimelineCard({
  role,
  index,
}: {
  role: LeadershipRole;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  const Wrapper = prefersReducedMotion ? 'div' : motion.div;
  const wrapperProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: isEven ? -40 : 40 },
        animate: isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: isEven ? -40 : 40 },
        transition: {
          duration: 0.6,
          delay: 0.1,
          ease: [0.21, 0.47, 0.32, 0.98] as const,
        },
      };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center w-full',
        /* Desktop: alternate sides */
        'md:justify-start',
        isEven ? 'md:justify-start' : 'md:justify-end',
      )}
    >
      {/* Timeline node (center dot) — desktop */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400/40 animate-ping" />
        </div>
      </div>

      {/* Timeline node — mobile */}
      <div className="md:hidden absolute left-0 z-10">
        <div className="relative">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
          <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-cyan-400/40 animate-ping" />
        </div>
      </div>

      {/* Card */}
      <Wrapper
        {...wrapperProps}
        className={cn(
          'w-full md:w-[calc(50%-2rem)]',
          'ml-8 md:ml-0',
          isEven ? 'md:pr-8' : 'md:pl-8',
        )}
      >
        <div
          className={cn(
            'group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
            'p-5 sm:p-6',
            'transition-all duration-500',
            'hover:border-cyan-400/20 hover:bg-white/[0.06]',
            'hover:shadow-xl hover:shadow-cyan-500/5',
          )}
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            {role.title}
          </h3>
          <Badge variant="secondary" className="mb-3">
            {role.organization}
          </Badge>
          {role.period && (
            <p className="text-xs text-gray-500 mb-2">{role.period}</p>
          )}
          <p className="text-sm text-gray-400 leading-relaxed">
            {role.description}
          </p>
        </div>
      </Wrapper>
    </div>
  );
}

export function Experience() {
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
  const itemProps = prefersReducedMotion ? {} : { variants: itemVariants };

  return (
    <SectionReveal>
      <section
        id="experience"
        className="relative py-24 sm:py-32"
        ref={sectionRef}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Wrapper {...wrapperProps}>
            {/* Section heading */}
            <ItemWrapper {...itemProps} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Leadership &amp; Experience
                </span>
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
            </ItemWrapper>

            {/* Timeline */}
            <div className="relative">
              {/* Center line — desktop */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />

              {/* Left line — mobile */}
              <div className="md:hidden absolute left-[6px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />

              <div className="space-y-10 md:space-y-12">
                {leadershipRoles.map((role, index) => (
                  <TimelineCard key={role.id} role={role} index={index} />
                ))}
              </div>
            </div>
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
