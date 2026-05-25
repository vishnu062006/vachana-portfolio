'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

/* ─── tech data with categories for color coding ─── */
interface TechItem {
  name: string;
  category: 'language' | 'frontend' | 'backend' | 'database' | 'tool';
}

const techItems: TechItem[] = [
  { name: 'TypeScript', category: 'language' },
  { name: 'Java', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'C++', category: 'language' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'JWT Auth', category: 'backend' },
  { name: 'MongoDB', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'Git', category: 'tool' },
  { name: 'GitHub', category: 'tool' },
];

const categoryStyles: Record<TechItem['category'], { dot: string; border: string; glow: string }> = {
  language: {
    dot: 'bg-amber-400',
    border: 'group-hover:border-amber-400/30',
    glow: 'group-hover:shadow-amber-400/10',
  },
  frontend: {
    dot: 'bg-cyan-400',
    border: 'group-hover:border-cyan-400/30',
    glow: 'group-hover:shadow-cyan-400/10',
  },
  backend: {
    dot: 'bg-emerald-400',
    border: 'group-hover:border-emerald-400/30',
    glow: 'group-hover:shadow-emerald-400/10',
  },
  database: {
    dot: 'bg-purple-400',
    border: 'group-hover:border-purple-400/30',
    glow: 'group-hover:shadow-purple-400/10',
  },
  tool: {
    dot: 'bg-rose-400',
    border: 'group-hover:border-rose-400/30',
    glow: 'group-hover:shadow-rose-400/10',
  },
};

function TechCard({ item }: { item: TechItem }) {
  const style = categoryStyles[item.category];
  return (
    <div
      className={cn(
        'group flex-shrink-0 flex items-center gap-3',
        'rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm',
        'px-5 py-3 select-none',
        'transition-all duration-300',
        'hover:bg-white/[0.06]',
        'hover:shadow-lg',
        style.border,
        style.glow,
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', style.dot)} />
      <span className="text-sm font-medium text-gray-300 whitespace-nowrap group-hover:text-white transition-colors duration-300">
        {item.name}
      </span>
    </div>
  );
}

/* Split items into two rows for bi-directional marquee */
const row1 = techItems.slice(0, Math.ceil(techItems.length / 2));
const row2 = techItems.slice(Math.ceil(techItems.length / 2));

function MarqueeRow({
  items,
  direction = 'left',
  speed = 30,
}: {
  items: TechItem[];
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  /* duplicate items 4x to guarantee seamless loop */
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-gray-950 to-transparent" />

      <div
        className={cn(
          'flex gap-4',
          !prefersReducedMotion && (direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'),
        )}
        style={
          prefersReducedMotion
            ? undefined
            : { animationDuration: `${speed}s` }
        }
      >
        {repeated.map((item, i) => (
          <TechCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ─── legend ─── */
const categories: { label: string; key: TechItem['category'] }[] = [
  { label: 'Languages', key: 'language' },
  { label: 'Frontend', key: 'frontend' },
  { label: 'Backend', key: 'backend' },
  { label: 'Databases', key: 'database' },
  { label: 'Tools', key: 'tool' },
];

export function TechVisualization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const Wrapper = prefersReducedMotion ? 'div' : motion.div;

  return (
    <SectionReveal>
      <section
        id="tech"
        className="relative py-24 sm:py-32 overflow-hidden"
        ref={sectionRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <Wrapper
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  animate: isInView ? { opacity: 1, y: 0 } : {},
                  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
                })}
            className="text-center mb-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Tech Universe
              </span>
            </h2>
            <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
          </Wrapper>

          {/* Category legend */}
          <Wrapper
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0 },
                  animate: isInView ? { opacity: 1 } : {},
                  transition: { duration: 0.6, delay: 0.2 },
                })}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-12"
          >
            {categories.map((cat) => (
              <div key={cat.key} className="flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    categoryStyles[cat.key].dot,
                  )}
                />
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {cat.label}
                </span>
              </div>
            ))}
          </Wrapper>
        </div>

        {/* Marquee rows — full width for immersive feel */}
        <Wrapper
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : {},
                transition: { duration: 0.8, delay: 0.3 },
              })}
          className="space-y-4"
        >
          <MarqueeRow items={row1} direction="left" speed={35} />
          <MarqueeRow items={row2} direction="right" speed={40} />
        </Wrapper>
      </section>
    </SectionReveal>
  );
}
