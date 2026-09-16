'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/** Quiet invitation. Disappears the moment it has been acted on. */
export default function ScrollCue() {
  const [gone, setGone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setGone(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`mt-14 flex items-center gap-3 transition-opacity duration-slow ease-out md:mt-20 ${
        gone ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden
    >
      <span className="meta">Scroll to explore</span>
      <span className={`meta text-accent-ink ${reduced ? '' : 'pl-cue'}`}>↓</span>
      <style jsx>{`
        .pl-cue {
          display: inline-block;
          animation: cue 2.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes cue {
          0%, 70%, 100% { transform: translateY(0); opacity: 0.7; }
          82% { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
