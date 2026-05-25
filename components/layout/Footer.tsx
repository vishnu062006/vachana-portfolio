'use client';

import type { SVGProps } from 'react';
import { Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons';
import { personalInfo, navItems } from '@/data/portfolio';

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const socialIconMap: Record<string, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-gray-950">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 — Branding */}
          <div className="space-y-4">
            <a
              href="#hero"
              className="inline-block text-2xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                VMH
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Column 2 — Quick Nav */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-cyan-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Connect
            </h3>
            <div className="flex gap-3">
              {personalInfo.socials.map((social) => {
                const Icon = socialIconMap[social.icon] ?? GithubIcon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-gray-500">
              <a
                href={`mailto:${personalInfo.email}`}
                className="transition-colors duration-200 hover:text-cyan-400"
              >
                {personalInfo.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            Built with Next.js, TypeScript &amp;{' '}
            <Heart className="inline h-3 w-3 fill-red-500 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
