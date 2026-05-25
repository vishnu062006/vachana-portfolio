'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CursorGlow } from '@/components/CursorGlow';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

/* Sections — direct imports (lightweight) */
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Achievements } from '@/components/sections/Achievements';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

/* Dynamic imports for heavier client components */
const HeroVisual = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
    </div>
  ),
});

const TechVisualization = dynamic(
  () =>
    import('@/components/sections/TechVisualization').then(
      (mod) => mod.TechVisualization
    ),
  {
    ssr: false,
    loading: () => (
      <section className="py-20 flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
      </section>
    ),
  }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero heroScene={<HeroVisual />} />
        <About />
        <Skills />
        <Suspense
          fallback={
            <div className="py-20 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
            </div>
          }
        >
          <TechVisualization />
        </Suspense>
        <Projects />
        <Achievements />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
