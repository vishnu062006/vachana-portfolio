'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  GraduationCap,
  FolderKanban,
  Award,
  Lightbulb,
  Users,
  Rocket,
  Code2,
  Target,
} from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

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

interface QuickStat {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

const quickStats: QuickStat[] = [
  { label: 'Projects', value: 2, suffix: '+', icon: FolderKanban },
  { label: 'CGPA', value: 8.6, suffix: '', icon: Award },
  { label: 'Skills', value: 20, suffix: '+', icon: Lightbulb },
  { label: 'Leadership Roles', value: 3, suffix: '', icon: Users },
];

interface JourneyMilestone {
  title: string;
  description: string;
  icon: LucideIcon;
}

const journeyMilestones: JourneyMilestone[] = [
  {
    title: 'Foundation in CS',
    description:
      'Started B.E. in Computer Science at BMSCE, building a solid foundation in algorithms, data structures, and core CS fundamentals.',
    icon: Code2,
  },
  {
    title: 'Full-Stack Development',
    description:
      'Mastered the MERN stack and Spring Boot ecosystem, shipping production-grade web applications from scratch.',
    icon: Rocket,
  },
  {
    title: 'Hackathon Competitor',
    description:
      'Competed in hackathons and coding challenges, sharpening problem-solving skills and learning to build under pressure.',
    icon: Target,
  },
  {
    title: 'Tech Leadership',
    description:
      'Took on leadership roles in college tech communities, mentoring peers and coordinating large-scale events.',
    icon: Users,
  },
];

function AnimatedCounter({
  target,
  suffix,
  isFloat,
}: {
  target: number;
  suffix: string;
  isFloat: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, target, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export function About() {
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
      <section id="about" className="relative py-24 sm:py-32" ref={sectionRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Wrapper {...wrapperProps}>
            {/* Section heading */}
            <ItemWrapper {...itemProps} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
            </ItemWrapper>

            {/* Profile summary */}
            <ItemWrapper
              {...itemProps}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I&apos;m <span className="text-cyan-400 font-semibold">{personalInfo.name}</span>, a passionate
                full-stack developer and Computer Science student at BMS College
                of Engineering. I thrive on building scalable, elegant digital
                solutions — from interactive frontends with React and Next.js to
                robust backends with Spring Boot and Node.js. Driven by
                curiosity and a commitment to craft, I&apos;m constantly
                exploring new technologies and pushing my boundaries as a
                developer.
              </p>
            </ItemWrapper>

            {/* Education card */}
            <ItemWrapper {...itemProps} className="max-w-2xl mx-auto mb-16">
              <div
                className={cn(
                  'rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8',
                  'hover:border-cyan-400/20 transition-all duration-500',
                  'shadow-lg shadow-black/20',
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {personalInfo.education.degree}
                    </h3>
                    <p className="text-cyan-400 font-medium mt-1">
                      {personalInfo.education.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-400">
                      <span>{personalInfo.education.period}</span>
                      <span className="hidden sm:inline text-gray-600">•</span>
                      <span>
                        CGPA:{' '}
                        <span className="text-purple-400 font-semibold">
                          {personalInfo.education.cgpa}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ItemWrapper>

            {/* Quick stats grid */}
            <ItemWrapper {...itemProps}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 sm:p-6',
                      'text-center transition-all duration-500',
                      'hover:border-cyan-400/20 hover:bg-white/[0.06]',
                      'hover:shadow-lg hover:shadow-cyan-500/5',
                    )}
                  >
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        isFloat={stat.label === 'CGPA'}
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ItemWrapper>

            {/* Developer journey */}
            <ItemWrapper {...itemProps} className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Developer Journey
              </h3>
            </ItemWrapper>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {journeyMilestones.map((milestone, index) => (
                <ItemWrapper
                  key={milestone.title}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        variants: itemVariants,
                        initial: 'hidden',
                        animate: isInView ? 'visible' : 'hidden',
                        transition: { delay: 0.1 * index },
                      })}
                >
                  <div
                    className={cn(
                      'group h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 sm:p-6',
                      'transition-all duration-500',
                      'hover:border-purple-400/20 hover:bg-white/[0.06]',
                      'hover:shadow-lg hover:shadow-purple-500/5',
                    )}
                  >
                    <milestone.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:text-cyan-400 transition-colors duration-300" />
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </ItemWrapper>
              ))}
            </div>
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
