'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { navItems } from '@/data/portfolio';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch with theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position for navbar styling
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Smooth-scroll to section
  const scrollTo = useCallback(
    (href: string) => {
      setIsMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [],
  );

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-[90] transition-all duration-300',
          isScrolled
            ? 'border-b border-white/5 bg-gray-950/80 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'bg-transparent backdrop-blur-none',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="group relative text-xl font-bold tracking-tight text-white"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-80">
              VMH
            </span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                    activeSection === item.href
                      ? 'text-cyan-400'
                      : 'text-gray-400 hover:text-white',
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/5"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                type="button"
                onClick={() =>
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white md:hidden"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="fixed inset-x-0 top-16 bottom-0 z-[85] overflow-y-auto bg-gray-950/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(item.href);
                      }}
                      className={cn(
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200',
                        activeSection === item.href
                          ? 'bg-white/5 text-cyan-400'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
