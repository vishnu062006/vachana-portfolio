'use client';

import { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch, fine-pointer devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!hasPointer || prefersReducedMotion) return;

    setIsVisible(true);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let opacity = 0.6;
    let animationId: number;

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Reduce opacity near edges
      const edgeThreshold = 100;
      const distFromLeft = e.clientX;
      const distFromRight = window.innerWidth - e.clientX;
      const distFromTop = e.clientY;
      const distFromBottom = window.innerHeight - e.clientY;
      const minDist = Math.min(
        distFromLeft,
        distFromRight,
        distFromTop,
        distFromBottom,
      );
      opacity = Math.min(0.6, minDist / edgeThreshold * 0.6);
    }

    function animate() {
      // Smooth follow with lerp
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
        glowRef.current.style.opacity = String(opacity);
      }

      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 h-[400px] w-[400px] opacity-0"
      style={{
        background:
          'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(147,51,234,0.06) 40%, transparent 70%)',
        willChange: 'transform, opacity',
      }}
    />
  );
}
