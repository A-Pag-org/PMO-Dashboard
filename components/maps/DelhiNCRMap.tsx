// FILE: components/maps/DelhiNCRMap.tsx
// PURPOSE: SVG choropleth map of Delhi-NCR with state regions and city/state bubbles
// DESIGN REF: Wireframe pages 7, 9 (map panel on summary + detail pages)

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CityBubble from './CityBubble';
import type { MapDataPoint, MapCenterBubble } from '@/lib/types';

interface DelhiNCRMapProps {
  data: MapDataPoint[];
  centerBubble: MapCenterBubble;
  onBubbleClick?: (name: string) => void;
}

const REGION_PATHS = {
  haryana: {
    d: 'M30,40 L120,20 L160,60 L170,140 L140,200 L80,220 L20,180 L10,100 Z',
    fill: 'var(--color-map-haryana)',
    label: 'Haryana',
  },
  up: {
    d: 'M230,30 L340,50 L360,130 L350,220 L300,260 L230,240 L200,160 L210,80 Z',
    fill: 'var(--color-map-up)',
    label: 'Uttar Pradesh',
  },
  delhi: {
    d: 'M160,80 L210,80 L220,120 L210,170 L170,180 L150,150 L145,110 Z',
    fill: 'var(--color-map-delhi)',
    label: 'Delhi',
  },
  rajasthan: {
    d: 'M20,220 L80,220 L140,240 L160,300 L120,340 L40,330 L10,280 Z',
    fill: 'var(--color-map-rajasthan)',
    label: 'Rajasthan',
  },
} as const;

const STATE_BUBBLE_POSITIONS: Record<string, { x: number; y: number }> = {
  Haryana:          { x: 80,  y: 120 },
  'Uttar Pradesh':  { x: 290, y: 140 },
  Delhi:            { x: 185, y: 130 },
  Rajasthan:        { x: 90,  y: 280 },
  Panipat:          { x: 140, y: 35 },
  Rohtak:           { x: 55,  y: 100 },
  Gurugram:         { x: 120, y: 175 },
  Alwar:            { x: 60,  y: 270 },
  Meerut:           { x: 300, y: 60 },
  Noida:            { x: 250, y: 185 },
  'Greater Noida':  { x: 280, y: 225 },
  Ghaziabad:        { x: 260, y: 100 },
};

const CENTER = { x: 190, y: 170 };

const bubbleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1 * i, duration: 0.3, ease: 'easeOut' as const },
  }),
};

export default function DelhiNCRMap({
  data,
  centerBubble,
  onBubbleClick,
}: DelhiNCRMapProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 380 360"
      className="h-full w-full"
      role="img"
      aria-label="Delhi-NCR region map showing initiative progress by geography"
    >
      <defs>
        <filter id="bubble-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* ── State regions ── */}
      {Object.entries(REGION_PATHS).map(([key, region]) => (
        <g key={key}>
          <path
            d={region.d}
            fill={region.fill}
            stroke="white"
            strokeWidth={2}
            className="transition-opacity hover:opacity-80"
          />
          <text
            x={key === 'haryana' ? 70 : key === 'up' ? 280 : key === 'delhi' ? 180 : 80}
            y={key === 'haryana' ? 60 : key === 'up' ? 70 : key === 'delhi' ? 100 : 305}
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            style={{ fontSize: 9, fontWeight: 500 }}
            className="pointer-events-none"
          >
            {region.label}
          </text>
        </g>
      ))}

      {/* ── Data bubbles ── */}
      {data.map((point, i) => {
        const pos = STATE_BUBBLE_POSITIONS[point.name];
        if (!pos) return null;

        return (
          <motion.g
            key={point.name}
            custom={i}
            variants={bubbleVariants}
            initial={shouldReduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            onClick={() => onBubbleClick?.(point.name)}
            className="cursor-pointer"
          >
            <CityBubble data={point} x={pos.x} y={pos.y} />
          </motion.g>
        );
      })}

      {/* ── Center bubble ── */}
      <motion.g
        variants={bubbleVariants}
        custom={data.length}
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        <CityBubble
          data={{ name: 'Delhi-NCR', value: centerBubble.value, onTrack: true }}
          x={CENTER.x}
          y={CENTER.y}
          isCenter
          centerLabel={centerBubble.label}
          centerSubtitle={centerBubble.subtitle}
        />
      </motion.g>
    </svg>
  );
}
