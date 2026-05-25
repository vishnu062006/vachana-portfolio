'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ─── code snippets that rotate through ─── */
const codeSnippets = [
  {
    filename: 'api/server.ts',
    lang: 'typescript',
    lines: [
      { indent: 0, tokens: [{ text: 'import', color: 'text-purple-400' }, { text: ' { Hono }', color: 'text-cyan-300' }, { text: ' from', color: 'text-purple-400' }, { text: " 'hono'", color: 'text-amber-300' }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ text: 'const', color: 'text-purple-400' }, { text: ' app', color: 'text-cyan-300' }, { text: ' = ', color: 'text-gray-400' }, { text: 'new', color: 'text-purple-400' }, { text: ' Hono', color: 'text-emerald-400' }, { text: '()', color: 'text-gray-400' }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ text: 'app', color: 'text-cyan-300' }, { text: '.', color: 'text-gray-400' }, { text: 'get', color: 'text-amber-300' }, { text: "(", color: 'text-gray-400' }, { text: "'/api/health'", color: 'text-amber-300' }, { text: ', (c) =>', color: 'text-gray-400' }] },
      { indent: 1, tokens: [{ text: 'c', color: 'text-cyan-300' }, { text: '.', color: 'text-gray-400' }, { text: 'json', color: 'text-amber-300' }, { text: '({', color: 'text-gray-400' }] },
      { indent: 2, tokens: [{ text: 'status', color: 'text-white' }, { text: ': ', color: 'text-gray-400' }, { text: "'running'", color: 'text-emerald-400' }, { text: ',', color: 'text-gray-400' }] },
      { indent: 2, tokens: [{ text: 'uptime', color: 'text-white' }, { text: ': ', color: 'text-gray-400' }, { text: 'process', color: 'text-cyan-300' }, { text: '.', color: 'text-gray-400' }, { text: 'uptime', color: 'text-amber-300' }, { text: '()', color: 'text-gray-400' }] },
      { indent: 1, tokens: [{ text: '})', color: 'text-gray-400' }] },
      { indent: 0, tokens: [{ text: ')', color: 'text-gray-400' }] },
    ],
  },
  {
    filename: 'hooks/useAuth.ts',
    lang: 'typescript',
    lines: [
      { indent: 0, tokens: [{ text: 'export function', color: 'text-purple-400' }, { text: ' useAuth', color: 'text-amber-300' }, { text: '() {', color: 'text-gray-400' }] },
      { indent: 1, tokens: [{ text: 'const', color: 'text-purple-400' }, { text: ' [user, setUser]', color: 'text-cyan-300' }, { text: ' = ', color: 'text-gray-400' }, { text: 'useState', color: 'text-amber-300' }, { text: '<', color: 'text-gray-400' }, { text: 'User', color: 'text-emerald-400' }, { text: '>()', color: 'text-gray-400' }] },
      { indent: 0, tokens: [] },
      { indent: 1, tokens: [{ text: 'const', color: 'text-purple-400' }, { text: ' login', color: 'text-cyan-300' }, { text: ' = ', color: 'text-gray-400' }, { text: 'async', color: 'text-purple-400' }, { text: ' (creds:', color: 'text-gray-400' }, { text: ' Creds', color: 'text-emerald-400' }, { text: ') => {', color: 'text-gray-400' }] },
      { indent: 2, tokens: [{ text: 'const', color: 'text-purple-400' }, { text: ' res', color: 'text-cyan-300' }, { text: ' = ', color: 'text-gray-400' }, { text: 'await', color: 'text-purple-400' }, { text: ' fetch', color: 'text-amber-300' }, { text: '(', color: 'text-gray-400' }, { text: "'/auth'", color: 'text-amber-300' }, { text: ')', color: 'text-gray-400' }] },
      { indent: 2, tokens: [{ text: 'const', color: 'text-purple-400' }, { text: ' data', color: 'text-cyan-300' }, { text: ' = ', color: 'text-gray-400' }, { text: 'await', color: 'text-purple-400' }, { text: ' res', color: 'text-cyan-300' }, { text: '.', color: 'text-gray-400' }, { text: 'json', color: 'text-amber-300' }, { text: '()', color: 'text-gray-400' }] },
      { indent: 2, tokens: [{ text: 'setUser', color: 'text-amber-300' }, { text: '(', color: 'text-gray-400' }, { text: 'data', color: 'text-cyan-300' }, { text: '.', color: 'text-gray-400' }, { text: 'user', color: 'text-white' }, { text: ')', color: 'text-gray-400' }] },
      { indent: 1, tokens: [{ text: '}', color: 'text-gray-400' }] },
      { indent: 0, tokens: [] },
      { indent: 1, tokens: [{ text: 'return', color: 'text-purple-400' }, { text: ' { user, login }', color: 'text-gray-400' }] },
      { indent: 0, tokens: [{ text: '}', color: 'text-gray-400' }] },
    ],
  },
];

function CodeEditor() {
  const prefersReducedMotion = useReducedMotion();
  const [snippetIdx, setSnippetIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIdx((prev) => (prev + 1) % codeSnippets.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const snippet = codeSnippets[snippetIdx];

  return (
    <div className="w-full rounded-2xl border border-white/[0.06] bg-[#0a0a0f] overflow-hidden shadow-2xl shadow-black/40">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs text-gray-500 font-mono">
          {snippet.filename}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-600 font-mono">live</span>
        </div>
      </div>

      {/* Code content */}
      <div className="p-5 font-mono text-[13px] leading-6 min-h-[280px]">
        {snippet.lines.map((line, lineIdx) => (
          <motion.div
            key={`${snippetIdx}-${lineIdx}`}
            className="flex"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: prefersReducedMotion ? 0 : lineIdx * 0.06,
              ease: [0.21, 0.47, 0.32, 0.98] as const,
            }}
          >
            {/* Line number */}
            <span className="w-8 text-right text-gray-700 select-none mr-6 flex-shrink-0">
              {lineIdx + 1}
            </span>

            {/* Indent */}
            {line.indent > 0 && (
              <span className="flex-shrink-0" style={{ width: `${line.indent * 24}px` }} />
            )}

            {/* Tokens */}
            <span>
              {line.tokens.map((token, tokenIdx) => (
                <span key={tokenIdx} className={token.color}>
                  {token.text}
                </span>
              ))}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.div
          className="flex mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="w-8 mr-6" />
          <span className="inline-block w-[2px] h-[18px] bg-cyan-400 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Background glow behind editor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/[0.04] rounded-full blur-[80px]" />
        <div className="absolute top-1/4 right-1/4 w-[40%] h-[40%] bg-purple-500/[0.03] rounded-full blur-[60px]" />
      </div>

      {/* Status pills floating around the editor */}
      <motion.div
        className={cn(
          'absolute -top-2 right-4 sm:top-2 sm:right-0',
          'flex items-center gap-2 rounded-full',
          'border border-emerald-500/20 bg-emerald-500/[0.06] backdrop-blur-sm',
          'px-3 py-1.5 text-[11px] text-emerald-400 font-mono',
        )}
        animate={prefersReducedMotion ? {} : { y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        all tests passing
      </motion.div>

      <motion.div
        className={cn(
          'absolute -bottom-2 left-4 sm:bottom-4 sm:left-0',
          'flex items-center gap-2 rounded-full',
          'border border-cyan-500/20 bg-cyan-500/[0.06] backdrop-blur-sm',
          'px-3 py-1.5 text-[11px] text-cyan-400 font-mono',
        )}
        animate={prefersReducedMotion ? {} : { y: [3, -3, 3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        deployed
      </motion.div>

      <div className="relative z-10 w-full">
        <CodeEditor />
      </div>
    </div>
  );
}
