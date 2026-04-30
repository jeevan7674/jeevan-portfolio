import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';

const SYSTEM_MESSAGES = [
  'Booting Jeevan.dev',
  'Compiling ideas...',
  'Optimizing performance...',
  'Deploying experience...',
];

const MESSAGE_INTERVALS = [0, 1500, 3000, 4500];
const NAME_REVEAL_TIME = 5400;
const NAME_HOLD_TIME = 2600;
const EXIT_DURATION = 700;

const LoadingScreen = ({ isVisible }) => {
  const [renderOverlay, setRenderOverlay] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const [progress, setProgress] = useState(18);
  const [showDebug, setShowDebug] = useState(false);

  const brandWords = useMemo(
    () => [
      [
        { value: 'J' },
        { value: 'E' },
        { value: 'E' },
        { value: 'V', accent: true },
        { value: 'A' },
        { value: 'N' },
      ],
      [
        { value: 'R' },
        { value: 'E' },
        { value: 'D', accent: true },
        { value: 'D', accent: true },
        { value: 'Y' },
      ],
    ],
    []
  );
  const taglineItems = useMemo(() => ['Developer', 'Designer', 'Builder'], []);
  const nameSweepStart = NAME_REVEAL_TIME + NAME_HOLD_TIME;

  useEffect(() => {
    let exitTimer;

    if (!isVisible) {
      setIsExiting(true);
      exitTimer = window.setTimeout(() => setRenderOverlay(false), EXIT_DURATION);
      return () => {
        if (exitTimer) {
          window.clearTimeout(exitTimer);
        }
      };
    }

    setRenderOverlay(true);
    setIsExiting(false);
    setMessageIndex(0);
    setShowName(false);
    setProgress(18);

    const timers = [
      window.setTimeout(() => {
        setMessageIndex(1);
        setProgress(42);
      }, MESSAGE_INTERVALS[1]),
      window.setTimeout(() => {
        setMessageIndex(2);
        setProgress(66);
      }, MESSAGE_INTERVALS[2]),
      window.setTimeout(() => {
        setMessageIndex(3);
        setProgress(82);
      }, MESSAGE_INTERVALS[3]),
      window.setTimeout(() => {
        setShowName(true);
        setProgress(100);
      }, NAME_REVEAL_TIME),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (exitTimer) {
        window.clearTimeout(exitTimer);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!renderOverlay) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'd' || event.key === 'D') {
        setShowDebug((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [renderOverlay]);

  const getLetterVariant = () => ({
    opacity: 0,
    y: 32,
    scale: 0.9,
    filter: 'blur(10px)',
  });

  const getLetterStyle = (letter) =>
    letter.accent
      ? {
        backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #38bdf8 45%, #a78bfa 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        textShadow: '0 0 28px rgba(168,85,247,0.28)',
      }
      : {
        color: '#f8fafc',
        textShadow: '0 0 22px rgba(255,255,255,0.11)',
      };

  return (
    <AnimatePresence>
      {renderOverlay && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden text-white"
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.965, filter: 'blur(14px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: isExiting ? 0.7 : 0.45, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_48%,#020617_100%)]">
            <StarsBackground className="absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-black" />
            <div className="absolute bottom-0 left-1/2 h-[150px] w-[150vw] -translate-x-1/2 rounded-t-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400 via-sky-500 to-violet-500 opacity-35 blur-3xl sm:h-[180px] md:h-[200px]" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cyan-300/10 to-transparent" />
          </div>
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            animate={{ opacity: [0.2, 0.34, 0.2] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(42rem 22rem at 50% 50%, rgba(34,211,238,0.12), transparent 70%), radial-gradient(34rem 18rem at 52% 52%, rgba(56,189,248,0.1), transparent 72%), radial-gradient(24rem 14rem at 50% 60%, rgba(167,139,250,0.09), transparent 75%)',
            }}
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
            <div className="w-full max-w-6xl text-center">
              <motion.div
                className="mx-auto flex max-w-full w-fit items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-slate-200/85 shadow-[0_0_40px_rgba(34,211,238,0.1)] backdrop-blur-md sm:gap-3 sm:px-4 sm:text-[0.72rem] sm:tracking-[0.32em]"
                style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <motion.span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                  animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span>Initializing Portfolio</span>
              </motion.div>

              <div className="mx-auto mt-8 min-h-[17rem] w-full max-w-6xl text-center sm:mt-10 sm:min-h-[18rem]">
                <AnimatePresence mode="wait">
                  {!showName ? (
                    <motion.div
                      key={`steps-${messageIndex}`}
                      initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="space-y-8 pt-10"
                    >
                      <div className="mx-auto flex min-h-[clamp(8rem,30vw,12rem)] max-w-[min(92vw,56rem)] items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/15 bg-slate-950/45 px-4 py-6 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-md sm:px-5">
                        <div
                          className="grid w-full gap-3 text-left"
                          style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                        >
                          {SYSTEM_MESSAGES.slice(0, messageIndex + 1).map((message, index) => {
                            const isActive = index === messageIndex;
                            const isDone = index < messageIndex;

                            return (
                              <motion.p
                                key={message}
                                className={`text-xs uppercase tracking-[0.12em] sm:text-sm sm:tracking-[0.18em] md:text-base ${isActive ? 'text-slate-100' : isDone ? 'text-cyan-300/90' : 'text-slate-500'}`}
                                animate={isActive ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                                transition={isActive ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                              >
                                <span className={`mr-2 inline-block w-4 sm:mr-3 ${isActive ? 'text-cyan-300' : 'text-cyan-300/90'}`}>
                                  {isDone ? 'OK' : '>'}
                                </span>
                                {message}
                                {isActive && (
                                  <motion.span
                                    className="ml-2 inline-block h-4 w-[2px] bg-cyan-300/80 align-middle"
                                    animate={{ opacity: [1, 0.2, 1] }}
                                    transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}
                                  />
                                )}
                              </motion.p>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
                      animate={
                        isExiting
                          ? { opacity: 0, x: '120%', y: '22%', filter: 'blur(14px)' }
                          : { opacity: 1, scale: 1, x: 0, y: 0, filter: 'blur(0px)' }
                      }
                      transition={
                        isExiting
                          ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                          : { duration: 0.65, ease: 'easeOut' }
                      }
                      className="pt-6 text-center"
                    >
                      <div className="relative mx-auto w-full">
                        <motion.div
                          className="relative mx-auto flex max-w-full flex-wrap items-end justify-center gap-x-[0.24em] gap-y-3 overflow-visible px-1 sm:gap-x-[0.32em]"
                          style={{ fontFamily: '"Sora", "Manrope", sans-serif' }}
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.055,
                                delayChildren: 0.05,
                              },
                            },
                          }}
                        >
                          {brandWords.map((word, wordIndex) => (
                            <span
                              key={`word-${wordIndex}`}
                              className="inline-flex shrink-0 items-end justify-center"
                            >
                              {word.map((letter, letterIndex) => {
                                const itemIndex = wordIndex * 6 + letterIndex;

                                return (
                                  <motion.span
                                    key={`${letter.value}-${wordIndex}-${letterIndex}`}
                                    className="relative inline-block text-[clamp(2.55rem,13vw,5.75rem)] font-black uppercase leading-none tracking-normal sm:text-[clamp(3.4rem,9.5vw,5.9rem)]"
                                    variants={{
                                      hidden: getLetterVariant(itemIndex),
                                      visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
                                    }}
                                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                    style={getLetterStyle(letter)}
                                  >
                                    {letter.value}
                                  </motion.span>
                                );
                              })}
                            </span>
                          ))}
                        </motion.div>

                        <motion.span
                          className="pointer-events-none absolute inset-y-0 -left-[12%] w-[18%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md"
                          animate={{ x: ['0%', '620%'] }}
                          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.35 }}
                        />
                      </div>

                      <motion.div
                        className="mx-auto mt-6 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                      />

                      <motion.div
                        className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.62rem] uppercase tracking-[0.28em] text-slate-400 sm:text-[0.72rem] sm:tracking-[0.48em]"
                        style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
                      >
                        {taglineItems.map((item, index) => (
                          <div key={item} className="flex items-center gap-3">
                            <span>{item}</span>
                            {index < taglineItems.length - 1 ? <span className="text-violet-300/55">.</span> : null}
                          </div>
                        ))}
                      </motion.div>

                      <motion.p
                        className="mt-5 text-[0.66rem] uppercase tracking-[0.16em] text-cyan-100/75 sm:text-xs sm:tracking-[0.22em]"
                        style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.45, ease: 'easeOut' }}
                      >
                        {SYSTEM_MESSAGES[messageIndex]}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {showDebug && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-4 right-4 z-20 w-64 rounded-xl border border-cyan-300/20 bg-slate-950/75 p-3 text-[11px] leading-5 text-slate-300 backdrop-blur-lg"
              style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
            >
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">Debug overlay</p>
              <p>Stage: {Math.min(messageIndex + 1, SYSTEM_MESSAGES.length)}/{SYSTEM_MESSAGES.length}</p>
              <p>Progress: {progress}%</p>
              <p>Name sweep start: {nameSweepStart}ms</p>
              <p>Viewport: {window.innerWidth} x {window.innerHeight}</p>
              <p>Platform: {navigator.platform || 'n/a'}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
