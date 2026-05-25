'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FULL_NAME = 'Vachana M H';
const TAGLINE = 'Full Stack Web Developer';
const DISPLAY_DURATION = 2500; // ms before screen starts to dismiss

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [nameRevealed, setNameRevealed] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Start name reveal immediately
    const nameTimer = setTimeout(() => {
      setNameRevealed(true);
    }, 100);

    // Show tagline after name reveal
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, FULL_NAME.length * 80 + 400);

    // Dismiss loading screen
    const dismissTimer = setTimeout(() => {
      setIsLoading(false);
    }, DISPLAY_DURATION);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(taglineTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gray-950"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
        >
          {/* Name – letter-by-letter reveal */}
          <div className="flex overflow-hidden" aria-label={FULL_NAME}>
            {FULL_NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                initial={{ y: 60, opacity: 0 }}
                animate={
                  nameRevealed
                    ? { y: 0, opacity: 1 }
                    : { y: 60, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98] as const,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-base text-gray-400 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={
              showTagline
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {TAGLINE}
          </motion.p>

          {/* Animated gradient line */}
          <motion.div
            className="mt-8 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
