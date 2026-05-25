'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Wrench,
} from 'lucide-react';
import { skillCategories } from '@/data/portfolio';
import type { SkillCategory } from '@/types';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  'code-2': Code2,
  layout: Layout,
  server: Server,
  database: Database,
  cpu: Cpu,
  wrench: Wrench,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

function SkillBar({
  name,
  level,
  isInView,
  index,
}: {
  name: string;
  level: number;
  isInView: boolean;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.1 * index, ease: 'easeOut' }
          }
        />
      </div>
    </div>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      setRotateX((-mouseY / rect.height) * 6);
      setRotateY((mouseX / rect.width) * 6);
    },
    [prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  const Icon = iconMap[category.icon] ?? Code2;

  return (
    <div
      ref={ref}
      className={cn(
        'group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 sm:p-6',
        'transition-all duration-500',
        'hover:border-cyan-400/20 hover:bg-white/[0.06]',
        'hover:shadow-xl hover:shadow-cyan-500/5',
      )}
      style={{
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all duration-300">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      </div>
      <div className="space-y-3">
        {category.skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            isInView={isInView}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
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
  const CardWrapper = prefersReducedMotion ? 'div' : motion.div;
  const cardProps = prefersReducedMotion ? {} : { variants: cardVariants };

  return (
    <SectionReveal>
      <section id="skills" className="relative py-24 sm:py-32" ref={sectionRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Wrapper {...wrapperProps}>
            {/* Section heading */}
            <CardWrapper {...cardProps} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Skills &amp; Expertise
                </span>
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
            </CardWrapper>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {skillCategories.map((category) => (
                <CardWrapper key={category.id} {...cardProps}>
                  <SkillCard category={category} />
                </CardWrapper>
              ))}
            </div>
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
