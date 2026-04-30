import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Bug, Code2, GitBranch, Home, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const traceLines = [
  { label: 'route.match()', value: 'undefined' },
  { label: 'status', value: '404 / NOT_FOUND' },
  { label: 'fallback', value: '<NotFound />' },
];

const suggestions = [
  'Check the URL for a missing slug.',
  'Return to the main branch of the portfolio.',
  'Inspect shipped projects instead.',
];

const NotFound = () => {
  const location = useLocation();
  const pathname = location.pathname || '/unknown';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute left-[-12rem] top-20 h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-[-8rem] h-[34rem] w-[34rem] rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center lg:text-left"
        >
          <div className="theme-pill mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <GitBranch className="h-4 w-4" />
            Detached route detected
          </div>

          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-300">ERR_ROUTE_NOT_FOUND</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            404
            <span className="block text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text">
              missing endpoint
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            The requested path was not registered in the router. Nothing broke, this is the app catching a bad URL and handing you a clean recovery path.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link to="/" className="theme-primary-button inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold">
              <Home className="h-4 w-4" />
              Checkout main
            </Link>
            <Link to="/#projects" className="theme-secondary-button inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold">
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          className="theme-panel overflow-hidden rounded-2xl"
        >
          <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
              <span className="h-3 w-3 rounded-full bg-cyan-300" />
              <span className="h-3 w-3 rounded-full bg-violet-300" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <Terminal className="h-4 w-4 text-cyan-300" />
              route-debugger.tsx
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:p-6">
            <div className="rounded-xl border border-cyan-400/15 bg-slate-950/65 p-4 font-mono text-sm">
              <div className="mb-3 flex items-center gap-2 text-cyan-300">
                <Code2 className="h-4 w-4" />
                <span>router.resolve("{pathname}")</span>
              </div>
              <div className="space-y-2">
                {traceLines.map((line) => (
                  <div key={line.label} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="text-slate-400">{line.label}</span>
                    <span className="text-slate-100">{line.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-violet-400/20 bg-violet-400/10 p-5">
              <div className="absolute right-4 top-4 text-[5rem] font-black leading-none text-violet-200/5">404</div>
              <div className="relative flex items-start gap-3">
                <div className="rounded-lg border border-violet-300/25 bg-violet-300/10 p-2 text-violet-200">
                  <Bug className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Recovery suggestions</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                    {suggestions.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/#contact" className="rounded-xl border border-cyan-400/20 bg-slate-950/55 p-4 text-left transition hover:border-cyan-300/45">
                <p className="text-sm font-semibold text-cyan-300">Need this route?</p>
                <p className="mt-1 text-sm text-slate-400">Send a message and I can wire it up.</p>
              </Link>
              <Link to="/" className="rounded-xl border border-cyan-400/20 bg-slate-950/55 p-4 text-left transition hover:border-cyan-300/45">
                <p className="text-sm font-semibold text-cyan-300">Stable entry point</p>
                <p className="mt-1 text-sm text-slate-400">Jump back to the portfolio root.</p>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default NotFound;
