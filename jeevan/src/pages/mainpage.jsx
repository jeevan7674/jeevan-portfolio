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

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [minimumDelayDone, setMinimumDelayDone] = useState(false);
    const [pageReady, setPageReady] = useState(false);

    // Minimum 5-second timer
    useEffect(() => {
        const timer = setTimeout(() => setMinimumDelayDone(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    // REALISTIC LOAD HANDLER
    useEffect(() => {
        const handlePageReady = () => setPageReady(true);

        if (document.readyState === 'complete') {
            setPageReady(true);
        } else {
            window.addEventListener('load', handlePageReady);
            return () => window.removeEventListener('load', handlePageReady);
        }
    }, []);


    // Finish loading when both ready + 5 sec passed
    useEffect(() => {
        if (minimumDelayDone && pageReady) {
            setIsLoading(false);
        }
    }, [minimumDelayDone, pageReady]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return <LoadingScreen isVisible={true} />; // ✅ Centralized Loading Screen
    }

    return (
        <>
            <SplashCursor />

            <ScrollProgress
                progressProps={{
                    className:
                        'fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 transform-gpu z-[9999] shadow-lg shadow-purple-500/50',
                }}
            />

            <motion.div
                className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Social Icons */}
                <motion.div
                    className="hidden md:flex flex-col items-center space-y-4 fixed left-4 bottom-24 z-[999]"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    {[
                        { Icon: Github, label: 'Visit my GitHub', link: 'https://github.com/your-username' },
                        { Icon: Linkedin, label: 'Connect on LinkedIn', link: 'https://linkedin.com/in/your-username' },
                        { Icon: Mail, label: 'Send me an email', link: 'mailto:your-email@example.com' }
                    ].map(({ Icon, label, link }, i) => (
                        <div key={i} className="group relative">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                                <Icon className="w-6 h-6" />
                            </a>
                            <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll to Top */}
                <motion.button
                    onClick={scrollToTop}
                    className="hidden md:block fixed right-4 bottom-24 z-[999] p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all group"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                    <span className="absolute left-[-120%] top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Back to Top
                    </span>
                </motion.button>

                {/* Background Glow Effects */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div className="absolute top-3/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"
                        animate={{ x: [0, -80, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
                        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }} />
                </div>

                {/* Page Content */}
                <div className="relative z-10">
                    <Header />
                    <Hero />
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
