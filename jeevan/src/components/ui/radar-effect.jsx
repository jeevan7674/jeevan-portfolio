import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Circle = ({ className, idx, ...rest }) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        'absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200',
        className
      )}
    />
  );
};

export const Radar = ({
  className,
  circlesCount = 7,
  circleStepRem = 5.8,
  mode = 'full',
  showSweep = true,
  scanVersion = 0,
  sweepDurationSeconds = 4.8,
  style,
}) => {
  const circles = new Array(circlesCount).fill(1);
  const isHalf = mode === 'half';
  const radarSize = circlesCount * circleStepRem;

  return (
    <div
      className={twMerge(
        isHalf
          ? 'relative w-full overflow-hidden'
          : 'relative flex h-20 w-20 items-center justify-center rounded-full',
        className
      )}
      style={isHalf ? { height: `${radarSize / 2}rem`, ...style } : style}
    >
      <style>{`
        @keyframes radar-sweep-full {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        @keyframes radar-sweep-half {
          from { transform: rotate(180deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-radar-sweep-full {
          animation-name: radar-sweep-full;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
        .animate-radar-sweep-half {
          animation-name: radar-sweep-half;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
      `}</style>

      {showSweep && (
        isHalf ? (
          <div
            key={`sweep-${mode}-${scanVersion}`}
            style={{
              transformOrigin: 'left center',
              animationDuration: `${sweepDurationSeconds}s`,
            }}
            className="pointer-events-none absolute left-1/2 bottom-0 z-40 flex h-px w-[68vw] max-w-[720px] -translate-y-px animate-radar-sweep-half items-center justify-center overflow-visible bg-transparent sm:w-[64vw] md:w-[58vw] lg:w-[52vw]"
          >
            <div className="relative h-px w-full bg-gradient-to-r from-sky-300/95 via-sky-500/65 via-25% to-transparent shadow-[0_0_6px_rgba(14,165,233,0.35)] before:absolute before:left-0 before:top-1/2 before:h-[4px] before:w-[18%] before:-translate-y-1/2 before:bg-gradient-to-r before:from-sky-300/12 before:to-transparent before:blur-sm" />
          </div>
        ) : (
          <div
            key={`sweep-${mode}-${scanVersion}`}
            style={{
              transformOrigin: 'right center',
              animationDuration: `${sweepDurationSeconds}s`,
            }}
            className="absolute z-40 flex h-[7px] items-end justify-center overflow-hidden bg-transparent animate-radar-sweep-full right-1/2 top-1/2 w-[400px]"
          >
            <div className="relative z-40 h-[2px] w-full bg-gradient-to-r from-transparent via-white to-cyan-200/30 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
          </div>
        )
      )}

      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * circleStepRem}rem`,
            width: `${(idx + 1) * circleStepRem}rem`,
            border: `1px solid rgba(255, 255, 255, ${Math.max(0.18, 0.54 - idx * 0.045)})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
          className={twMerge(
            isHalf
              ? 'left-1/2 top-full -translate-x-1/2 -translate-y-1/2 border-white/30'
              : undefined
          )}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({ icon, text, delay, className }) => {
  return (
    <motion.div
      tabIndex={0}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: delay ?? 0 }}
      aria-label={text ? `Skill: ${text}` : 'Skill'}
      className={twMerge(
        'group relative z-50 flex flex-col items-center justify-center outline-none focus-visible:ring-0',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 shadow-inner transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 sm:h-11 sm:w-11 sm:rounded-2xl md:h-12 md:w-12">
        {icon || (
          <svg className="h-8 w-8 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {text ? (
        <div className="pointer-events-none absolute top-full mt-2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <div className="whitespace-nowrap rounded-full border border-white/10 bg-slate-950/75 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-slate-200 shadow-lg backdrop-blur-md sm:px-3 sm:text-[11px]">
            {text}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};
