'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Flame, Trophy } from 'lucide-react';
import { achievements, softSkills } from '@/data/portfolio';
import type { Achievement } from '@/types';
import { Badge } from '@/components/ui/badge';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  trophy: Trophy,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

function AnimatedStat({ stat }: { stat: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const numericMatch = stat.match(/^(\d+)/);
    if (!numericMatch) {
      setDisplayValue(stat);
      return;
    }

    const target = parseInt(numericMatch[1], 10);
    const suffix = stat.slice(numericMatch[1].length);

    if (prefersReducedMotion) {
      setDisplayValue(stat);
      return;
    }

    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(stat);
        clearInterval(timer);
      } else {
        setDisplayValue(`${Math.floor(current)}${suffix}`);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, stat, prefersReducedMotion]);

  return <span ref={ref}>{displayValue}</span>;
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.icon] ?? Trophy;

  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
        'p-6 sm:p-8 flex flex-col items-center text-center',
        'transition-all duration-500',
        'hover:border-cyan-400/20 hover:bg-white/[0.06]',
        'hover:shadow-2xl hover:shadow-cyan-500/10',
      )}
    >
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all duration-300">
          <Icon className="w-7 h-7 text-cyan-400" />
        </div>

        {achievement.stat && (
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            <AnimatedStat stat={achievement.stat} />
          </div>
        )}

        <h3 className="text-lg font-semibold text-white mb-2">
          {achievement.title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}

export function Achievements() {
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
  const BadgeWrapper = prefersReducedMotion ? 'div' : motion.div;
  const badgeProps = prefersReducedMotion ? {} : { variants: badgeVariants };

  return (
    <SectionReveal>
      <section
        id="achievements"
        className="relative py-24 sm:py-32"
        ref={sectionRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Wrapper {...wrapperProps}>
            {/* Section heading */}
            <ItemWrapper {...itemProps} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Achievements
                </span>
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
            </ItemWrapper>

            {/* Achievement cards */}
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-16">
              {achievements.map((achievement) => (
                <ItemWrapper key={achievement.id} {...itemProps}>
                  <AchievementCard achievement={achievement} />
                </ItemWrapper>
              ))}
            </div>

            {/* Soft skills */}
            <ItemWrapper {...itemProps} className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Soft Skills
              </h3>
            </ItemWrapper>

            <Wrapper
              {...wrapperProps}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              {softSkills.map((skill, index) => (
                <BadgeWrapper key={skill} {...badgeProps}>
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: [
                              -(3 + (index % 3)),
                              3 + (index % 3),
                              -(3 + (index % 3)),
                            ],
                          }
                    }
                    transition={{
                      duration: 3 + (index % 3) * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    }}
                  >
                    <Badge
                      variant={index % 2 === 0 ? 'default' : 'secondary'}
                      className={cn(
                        'cursor-default text-sm px-5 py-2.5',
                        'transition-all duration-300',
                        'hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10',
                      )}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                </BadgeWrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
