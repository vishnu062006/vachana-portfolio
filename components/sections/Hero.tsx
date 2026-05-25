'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons';
import { personalInfo } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const socialIconMap: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export function Hero({ heroScene }: { heroScene?: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const MotionWrapper = prefersReducedMotion ? 'div' : motion.div;
  const motionProps = prefersReducedMotion
    ? {}
    : { variants: containerVariants, initial: 'hidden', animate: 'visible' };

  const ChildWrapper = prefersReducedMotion ? 'div' : motion.div;
  const childProps = prefersReducedMotion ? {} : { variants: childVariants };

  return (
    <section
      ref={scrollRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_60%)]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <MotionWrapper
            {...motionProps}
            className="flex-1 text-center lg:text-left"
          >
            {/* Name */}
            <ChildWrapper {...childProps}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
            </ChildWrapper>

            {/* Role */}
            <ChildWrapper {...childProps}>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200">
                {personalInfo.role}
              </p>
            </ChildWrapper>

            {/* Tagline */}
            <ChildWrapper {...childProps}>
              <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
                {personalInfo.tagline}
              </p>
            </ChildWrapper>

            {/* CTAs with glass panel */}
            <ChildWrapper {...childProps}>
              <div className="mt-8 inline-flex flex-col sm:flex-row gap-4 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md p-4">
                <Button size="lg" onClick={handleScrollToContact}>
                  Get in Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleScrollToProjects}
                >
                  View My Work
                </Button>
              </div>
            </ChildWrapper>

            {/* Social icons */}
            <ChildWrapper {...childProps}>
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
                {personalInfo.socials.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={cn(
                        'flex items-center justify-center w-11 h-11 rounded-xl',
                        'border border-white/10 bg-white/5 backdrop-blur-sm',
                        'text-gray-400 transition-all duration-300',
                        'hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10',
                        'hover:shadow-lg hover:shadow-cyan-500/10',
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </ChildWrapper>
          </MotionWrapper>

          {/* Right side: 3D scene container */}
          <ChildWrapper
            {...childProps}
            className="flex-1 flex items-center justify-center w-full max-w-md lg:max-w-lg xl:max-w-xl"
          >
            <div
              id="hero-3d-container"
              className="w-full aspect-square rounded-2xl"
              aria-hidden="true"
            >
              {heroScene}
            </div>
          </ChildWrapper>
        </div>
      </div>

      {/* Scroll indicator */}
      {mounted && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
