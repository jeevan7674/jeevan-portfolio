import { motion, AnimatePresence } from 'framer-motion';
import Orb from '@/components/Orb/Orb';
import ShinyText from '@/components/ShinyText/ShinyText';

const LoadingScreen = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Orb */}
          <div className="absolute inset-0 z-0">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={250}
              forceHoverState={true}
            />
          </div>

          {/* Shiny Animated Text */}
          <div className="relative z-10">
            <ShinyText
              text="Loading..."
              disabled={false}
              speed={3}
              className="text-white font-slick font-light text-3xl md:text-5xl text-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
