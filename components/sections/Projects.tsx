'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/social-icons';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        'group h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
        'p-6 sm:p-8 flex flex-col',
        'transition-all duration-500',
        'hover:border-cyan-400/20 hover:bg-white/[0.06]',
        'hover:shadow-2xl hover:shadow-cyan-500/10',
        'hover:scale-[1.02]',
      )}
    >
      {/* Featured badge */}
      {project.featured && (
        <Badge variant="secondary" className="self-start mb-4">
          Featured
        </Badge>
      )}

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold mb-3">
        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {project.title}
        </span>
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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
        id="projects"
        className="relative py-24 sm:py-32"
        ref={sectionRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Wrapper {...wrapperProps}>
            {/* Section heading */}
            <ItemWrapper {...itemProps} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600" />
            </ItemWrapper>

            {/* Carousel */}
            <ItemWrapper {...itemProps} className="relative">
              {/* Navigation buttons */}
              <div className="hidden sm:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Previous project"
                  className={cn(
                    'w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm',
                    'flex items-center justify-center text-gray-400',
                    'transition-all duration-300',
                    'hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10',
                    'disabled:opacity-30 disabled:cursor-not-allowed',
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden sm:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Next project"
                  className={cn(
                    'w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm',
                    'flex items-center justify-center text-gray-400',
                    'transition-all duration-300',
                    'hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-white/10',
                    'disabled:opacity-30 disabled:cursor-not-allowed',
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Embla viewport */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 sm:-ml-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex-shrink-0 w-full sm:w-[80%] lg:w-[50%] pl-4 sm:pl-6"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to project ${index + 1}`}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all duration-300',
                      index === selectedIndex
                        ? 'bg-cyan-400 w-6'
                        : 'bg-white/20 hover:bg-white/40',
                    )}
                  />
                ))}
              </div>
            </ItemWrapper>
          </Wrapper>
        </div>
      </section>
    </SectionReveal>
  );
}
