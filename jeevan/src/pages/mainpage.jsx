import { useEffect, useState } from 'react';
import Header from '@/pages/header';
import About from '@/pages/about';
import Education from '@/pages/education';
import Projects from '@/pages/projects';
import Skills from '@/pages/SkillsSection';
import WorkExperience from '@/pages/experience';
import Contact from '@/pages/contact';
import Footer from '@/pages/footer';
import { ScrollProgress } from '@/components/animate-ui/components/scroll-progress';
import { motion } from 'framer-motion';
import Hero from './herosection';
import SplashCursor from '@/components/SplashCursor/SplashCursor';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import LoadingScreen from './loading';

const MINIMUM_LOADER_DURATION = 8600;
const LOADER_PLAYED_KEY = 'jeevan-loader-played';

const HomePage = () => {
    const [shouldPlayLoader] = useState(() => {
        try {
            return sessionStorage.getItem(LOADER_PLAYED_KEY) !== 'true';
        } catch {
            return true;
        }
    });
    const [isLoading, setIsLoading] = useState(shouldPlayLoader);
    const [minimumDelayDone, setMinimumDelayDone] = useState(!shouldPlayLoader);
    const [pageReady, setPageReady] = useState(!shouldPlayLoader);

    // Minimum loader duration so all loader stages and name reveal are visible.
    useEffect(() => {
        if (!shouldPlayLoader) {
            return undefined;
        }

        const timer = setTimeout(() => setMinimumDelayDone(true), MINIMUM_LOADER_DURATION);
        return () => clearTimeout(timer);
    }, [shouldPlayLoader]);

    // REALISTIC LOAD HANDLER
    useEffect(() => {
        if (!shouldPlayLoader) {
            return undefined;
        }

        const handlePageReady = () => setPageReady(true);

        if (document.readyState === 'complete') {
            setPageReady(true);
        } else {
            window.addEventListener('load', handlePageReady);
            return () => window.removeEventListener('load', handlePageReady);
        }
    }, [shouldPlayLoader]);


    // Finish loading when both the page is ready and the intro delay has elapsed.
    useEffect(() => {
        if (minimumDelayDone && pageReady) {
            try {
                sessionStorage.setItem(LOADER_PLAYED_KEY, 'true');
            } catch {
                // Storage can be unavailable in some privacy modes; the loader still works.
            }
            setIsLoading(false);
        }
    }, [minimumDelayDone, pageReady]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <LoadingScreen isVisible={isLoading} />

            {/* <SplashCursor /> */}

            <ScrollProgress
                progressProps={{
                    className:
                        'fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 transform-gpu z-[9999] shadow-lg shadow-cyan-500/40',
                }}
            />

            <motion.div
                className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_48%,#020617_100%)] text-slate-50"
                initial={{ opacity: isLoading ? 0 : 1 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: isLoading ? 0 : 0.45 }}
            >
                {/* ✨ Animated Blurred Orbs Across Page ✨ */}
                <motion.div
                    className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl z-0"
                    animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-32 right-20 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl z-0"
                    animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/3 left-1/2 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl z-0"
                    animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-10 left-1/3 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl z-0"
                    animate={{ x: [0, 20, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Social Icons */}
                <motion.div
                    className="hidden md:flex flex-col items-center space-y-4 fixed left-4 bottom-24 z-[999]"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    {[
                        { Icon: Github, label: 'Visit my GitHub', link: 'https://github.com/jeevan7674' },
                        { Icon: Linkedin, label: 'Connect on LinkedIn', link: 'https://linkedin.com/in/jeevan-reddy680' },
                        { Icon: Mail, label: 'Send me an email', link: 'mailto:r.jeevanreddys680@gmail.com' }
                    ].map(({ Icon, label, link }, i) => (
                        <div key={i} className="group relative">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-300 transition">
                                <Icon className="w-6 h-6" />
                            </a>
                            <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-cyan-400/20 bg-slate-950/90 px-2 py-1 text-xs text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll to Top */}
                <motion.button
                    onClick={scrollToTop}
                    className="hidden md:block fixed right-4 bottom-24 z-[999] p-2 theme-primary-button rounded-full transition-all group"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                    <span className="absolute left-[-120%] top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-cyan-400/20 bg-slate-950/90 px-2 py-1 text-xs text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Back to Top
                    </span>
                </motion.button>

                {/* Background Glow Effects */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"
                        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div className="absolute top-3/4 right-1/4 w-96 h-96 bg-violet-400/5 rounded-full blur-3xl"
                        animate={{ x: [0, -80, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div className="absolute top-1/2 left-1/2 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl"
                        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }} />
                </div>

                {/* Page Content */}
                <div className="relative z-10">
                    <div>
                        <Header />
                    </div>

                    <div>
                        <Hero />
                    </div>

                    <About />
                    <Education />
                    <Projects />
                    <Skills />
                    <WorkExperience />
                    <Contact />
                    <Footer />
                </div>
            </motion.div>
        </>
    );
};

export default HomePage;
