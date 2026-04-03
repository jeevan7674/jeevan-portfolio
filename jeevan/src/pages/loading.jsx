import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

  const brandLetters = useMemo(
    () => [
      { value: 'J', accent: false },
      { value: 'E', accent: false },
      { value: 'E', accent: false },
      { value: 'V', accent: true },
      { value: 'A', accent: false },
      { value: 'N', accent: false },
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

  return (
    <AnimatePresence>
      {renderOverlay && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden text-white"
          style={{
            background:
              'radial-gradient(circle at 14% 18%, rgba(45,212,191,0.12), transparent 30%), radial-gradient(circle at 82% 80%, rgba(168,85,247,0.12), transparent 32%), linear-gradient(135deg, #0b1020 0%, #18192b 55%, #090d18 100%)',
          }}
          initial={{ opacity: 0, scale: 1.02, filter: 'blur(0px)' }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.965, filter: 'blur(14px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: isExiting ? 0.7 : 0.45, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_45%)] opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(91,103,145,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,103,145,0.14)_1px,transparent_1px)] bg-[length:clamp(5rem,9vw,8rem)_clamp(5rem,9vw,8rem)] opacity-35" />
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(42rem 22rem at 50% 50%, rgba(45,212,191,0.12), transparent 70%), radial-gradient(20rem 12rem at 50% 50%, rgba(168,85,247,0.08), transparent 72%)',
            }}
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-5xl text-center">
              <motion.div
                className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.66rem] uppercase tracking-[0.32em] text-slate-300/80 backdrop-blur-sm sm:text-[0.72rem]"
                style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                  animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span>Initializing Portfolio</span>
                <span>{String(progress).padStart(2, '0')}%</span>
              </motion.div>

              <div className="mx-auto mt-10 min-h-[17rem] w-full max-w-5xl text-center sm:min-h-[18rem]">
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
                      <div className="mx-auto flex h-[clamp(8rem,20vw,12rem)] max-w-[min(92vw,56rem)] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-5 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-md">
                        <div
                          className="grid w-full gap-2 text-left"
                          style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                        >
                          {SYSTEM_MESSAGES.slice(0, messageIndex + 1).map((message, index) => {
                            const isActive = index === messageIndex;
                            const isDone = index < messageIndex;

                            return (
                              <motion.p
                                key={message}
                                className={`text-sm uppercase tracking-[0.18em] sm:text-base ${isActive ? 'text-slate-100' : isDone ? 'text-cyan-300/90' : 'text-slate-500'}`}
                                animate={isActive ? { opacity: [0.65, 1, 0.65] } : { opacity: 1 }}
                                transition={isActive ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                              >
                                <span className={`mr-3 inline-block w-4 ${isActive ? 'text-cyan-300' : 'text-cyan-300/90'}`}>
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

                      <div className="mx-auto w-full max-w-xl">
                        <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          />
                          <motion.div
                            className="absolute inset-y-0 w-24 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm"
                            animate={{ x: ['-20%', '520%'] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                          />
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
                      <div className="relative mx-auto w-fit">
                        <motion.div
                          className="relative inline-flex items-end justify-center gap-[0.02em] overflow-hidden px-2"
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
                          {brandLetters.map((letter, idx) => (
                            <motion.span
                              key={`${letter.value}-${idx}`}
                              className={`relative inline-block text-[clamp(4.6rem,18vw,10rem)] font-black uppercase leading-none tracking-[-0.08em] sm:tracking-[-0.06em] ${letter.accent ? 'text-cyan-400' : 'text-white'}`}
                              variants={{
                                hidden: getLetterVariant(idx),
                                visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
                              }}
                              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                              style={{
                                textShadow: letter.accent
                                  ? '0 0 22px rgba(34,211,238,0.22)'
                                  : '0 0 20px rgba(255,255,255,0.05)',
                              }}
                            >
                              {letter.value}
                            </motion.span>
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
                        className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[0.66rem] uppercase tracking-[0.48em] text-slate-400 sm:text-[0.72rem]"
                        style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
                      >
                        {taglineItems.map((item, index) => (
                          <div key={item} className="flex items-center gap-3">
                            <span>{item}</span>
                            {index < taglineItems.length - 1 ? <span className="text-cyan-300/45">.</span> : null}
                          </div>
                        ))}
                      </motion.div>

                      <motion.p
                        className="mt-5 text-[0.72rem] uppercase tracking-[0.22em] text-cyan-200/75 sm:text-xs"
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
