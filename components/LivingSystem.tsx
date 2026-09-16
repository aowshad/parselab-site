'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/* ---------------------------------------------------------------------------
   THE SYSTEM COMES ALIVE

   A sparse lattice of points. One accent tracer walks it along axis-aligned
   runs, like a trace being routed on a board. Where it passes, nearby points
   take on energy and briefly link to each other; the energy decays and the
   field goes quiet again. The cursor is a small disturbance in the field, not
   a thing the field follows. On scroll the scattered points migrate onto the
   twelve column lines — scattered becoming organised — which is the same grid
   the Products section below is built on.

   Cost: ~90 SVG elements, created once. One rAF loop writes attributes
   directly; React never re-renders during the animation.
--------------------------------------------------------------------------- */

const NODES = 64;
const LINES = 22;
const TRAIL = 7;
const LABELS = ['Products', 'People', 'Commerce', 'Technology'];

const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Node = { bx: number; by: number; e: number; live: boolean; col: number };

export default function LivingSystem() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<(SVGRectElement | null)[]>([]);
  const lineEls = useRef<(SVGLineElement | null)[]>([]);
  const trailEl = useRef<SVGPolylineElement>(null);
  const tracerEl = useRef<SVGRectElement>(null);
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [label, setLabel] = useState<{ text: string; x: number; y: number; key: number } | null>(null);

  /* Measure */
  useEffect(() => {
    if (!wrap.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  /* Animate */
  useEffect(() => {
    const { w, h } = size;
    if (!w || !h) return;

    const cell = Math.max(46, Math.min(72, Math.min(w, h) / 9));
    const cols = Math.max(4, Math.floor(w / cell));
    const rows = Math.max(3, Math.floor(h / cell));
    const ox = (w - (cols - 1) * cell) / 2;
    const oy = (h - (rows - 1) * cell) / 2;
    const at = (gx: number, gy: number) => ({ x: ox + gx * cell, y: oy + gy * cell });

    /* Pick a sparse, stable subset of lattice points */
    const all: number[] = [];
    for (let i = 0; i < cols * rows; i++) all.push(i);
    all.sort((a, b) => rand(a) - rand(b));

    const nodes: Node[] = [];
    for (let i = 0; i < NODES; i++) {
      const idx = all[i];
      if (idx === undefined) { nodes.push({ bx: 0, by: 0, e: 0, live: false, col: 0 }); continue; }
      const gx = idx % cols;
      const gy = Math.floor(idx / cols);
      const p = at(gx, gy);
      nodes.push({ bx: p.x, by: p.y, e: 0, live: true, col: Math.round((p.x / w) * 11) });
    }

    /* Tracer state */
    let gx = Math.floor(cols / 2);
    let gy = Math.floor(rows / 2);
    let tgx = gx;
    let tgy = gy;
    let seg = 1;
    let horizontal = true;
    let t = 1;
    const trail: { x: number; y: number }[] = [];

    const nextTarget = () => {
      horizontal = !horizontal;
      const step = 1 + Math.floor(rand(seg * 3.3) * 3);
      const dir = rand(seg * 7.7) > 0.5 ? 1 : -1;
      if (horizontal) tgx = Math.max(0, Math.min(cols - 1, gx + step * dir));
      else tgy = Math.max(0, Math.min(rows - 1, gy + step * dir));
      seg++;
      t = 0;
    };

    /* Cursor disturbance */
    let mx = -9999;
    let my = -9999;
    const R = 150;
    const onMove = (e: PointerEvent) => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };

    /* Scroll: scattered → organised onto the twelve column lines */
    let organise = 0;
    const onScroll = () => {
      organise = Math.min(1, Math.max(0, window.scrollY / Math.max(1, h)));
    };

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    let raf = 0;
    let last = performance.now();
    const start = performance.now();
    let nextLabel = start + 4200;
    let labelKey = 0;

    const frame = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const elapsed = now - start;
      const booting = elapsed < 500; // the tracer holds still for a beat

      /* Advance the tracer */
      if (!booting) {
        t += dt / 900;
        if (t >= 1) { gx = tgx; gy = tgy; t = 1; }
        if (t >= 1) {
          const p = at(gx, gy);
          trail.push(p);
          while (trail.length > TRAIL) trail.shift();
          for (const n of nodes) {
            if (!n.live) continue;
            const d = Math.hypot(n.bx - p.x, n.by - p.y);
            if (d < cell * 1.9) n.e = Math.max(n.e, 1 - d / (cell * 1.9));
          }
          nextTarget();
        }
      }

      const from = at(gx, gy);
      const to = at(tgx, tgy);
      const ease = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
      const tx = from.x + (to.x - from.x) * ease;
      const ty = from.y + (to.y - from.y) * ease;

      /* Nodes */
      const decay = Math.pow(0.9985, dt);
      const fade = 1 - organise * 0.85;

      for (let i = 0; i < NODES; i++) {
        const n = nodes[i];
        const el = nodeEls.current[i];
        if (!el) continue;
        if (!n.live) { el.setAttribute('opacity', '0'); continue; }

        n.e *= decay;

        let x = n.bx;
        const y = n.by;

        if (!reduced) {
          const d = Math.hypot(n.bx - mx, n.by - my);
          if (d < R) {
            const push = (1 - d / R) * 7;
            x += ((n.bx - mx) / (d || 1)) * push;
            n.e = Math.max(n.e, (1 - d / R) * 0.45);
          }
          /* Organise onto the column lines */
          const colX = ((n.col + 0.5) / 12) * w;
          x += (colX - x) * organise * 0.9;
        }

        const base = 0.22;
        const s = n.e > 0.5 ? 7 : 4;
        el.setAttribute('x', String(x - s / 2));
        el.setAttribute('y', String(y - s / 2));
        el.setAttribute('width', String(s));
        el.setAttribute('height', String(s));
        el.setAttribute('opacity', String(Math.min(1, base + n.e * 0.85) * fade));
        el.setAttribute('fill', n.e > 0.55 ? 'var(--sys-accent)' : 'var(--sys-node)');
      }

      /* Relationships between energised neighbours */
      let used = 0;
      for (let i = 0; i < NODES && used < LINES; i++) {
        const a = nodes[i];
        if (!a.live || a.e < 0.32) continue;
        for (let j = i + 1; j < NODES && used < LINES; j++) {
          const b = nodes[j];
          if (!b.live || b.e < 0.32) continue;
          const d = Math.hypot(a.bx - b.bx, a.by - b.by);
          if (d > cell * 2.7) continue;
          const el = lineEls.current[used++];
          if (!el) break;
          el.setAttribute('x1', String(a.bx));
          el.setAttribute('y1', String(a.by));
          el.setAttribute('x2', String(b.bx));
          el.setAttribute('y2', String(b.by));
          el.setAttribute('opacity', String(Math.min(a.e, b.e) * 0.4 * fade));
        }
      }
      for (let k = used; k < LINES; k++) lineEls.current[k]?.setAttribute('opacity', '0');

      /* Tracer and its route */
      if (trailEl.current) {
        const pts = [...trail, { x: tx, y: ty }].map((p) => `${p.x},${p.y}`).join(' ');
        trailEl.current.setAttribute('points', pts);
        trailEl.current.setAttribute('opacity', String((booting ? 0 : 0.45) * fade));
      }
      if (tracerEl.current) {
        tracerEl.current.setAttribute('x', String(tx - 3.5));
        tracerEl.current.setAttribute('y', String(ty - 3.5));
        tracerEl.current.setAttribute('opacity', String((elapsed < 350 ? 0 : 1) * fade));
      }

      /* Occasional label, one at a time, near the tracer */
      if (now > nextLabel && organise < 0.15) {
        setLabel({ text: LABELS[labelKey % LABELS.length], x: tx, y: ty, key: labelKey });
        labelKey++;
        nextLabel = now + 7000;
        window.setTimeout(() => setLabel(null), 2600);
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      /* Static field: same composition, nothing moves. */
      nodes.forEach((n, i) => {
        const el = nodeEls.current[i];
        if (!el) return;
        if (!n.live) { el.setAttribute('opacity', '0'); return; }
        const accent = rand(i * 2.1) > 0.88;
        el.setAttribute('x', String(n.bx - 2));
        el.setAttribute('y', String(n.by - 2));
        el.setAttribute('width', '4');
        el.setAttribute('height', '4');
        el.setAttribute('opacity', accent ? '0.9' : '0.25');
        el.setAttribute('fill', accent ? 'var(--sys-accent)' : 'var(--sys-node)');
      });
      lineEls.current.forEach((el) => el?.setAttribute('opacity', '0'));
      tracerEl.current?.setAttribute('opacity', '0');
      trailEl.current?.setAttribute('opacity', '0');
      return;
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [size, reduced]);

  return (
    <div
      ref={wrap}
      className="absolute inset-0 select-none [--sys-accent:theme(colors.accent.DEFAULT)] [--sys-node:theme(colors.ink.DEFAULT)]"
      aria-hidden
    >
      <svg width="100%" height="100%" className="absolute inset-0 overflow-visible">
        <g stroke="var(--sys-accent)" strokeWidth={1}>
          {Array.from({ length: LINES }, (_, i) => (
            <line key={i} ref={(el) => { lineEls.current[i] = el; }} opacity={0} />
          ))}
        </g>
        <polyline
          ref={trailEl}
          fill="none"
          stroke="var(--sys-accent)"
          strokeWidth={1}
          strokeLinejoin="round"
          opacity={0}
        />
        {Array.from({ length: NODES }, (_, i) => (
          <rect key={i} ref={(el) => { nodeEls.current[i] = el; }} opacity={0} />
        ))}
        <rect ref={tracerEl} width={7} height={7} fill="var(--sys-accent)" opacity={0} />
      </svg>

      {label && (
        <span
          key={label.key}
          className="pl-sys-label pointer-events-none absolute whitespace-nowrap font-mono text-micro text-accent-ink"
          style={{ left: label.x + 14, top: label.y - 7 }}
        >
          {label.text}
        </span>
      )}

      <style jsx>{`
        .pl-sys-label {
          animation: sysLabel 2600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes sysLabel {
          0% { opacity: 0; transform: translateX(-4px); }
          12% { opacity: 1; transform: translateX(0); }
          78% { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pl-sys-label { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
