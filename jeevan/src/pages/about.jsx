import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

// Card Component
const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-md shadow-xl p-6 transition-all duration-300 hover:shadow-purple-500/30 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Star background */}
      <StarsBackground className="absolute inset-0 z-0" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #4c1d95, #1e293b, #1e40af)',
        }}
        animate={{
          backgroundImage: [
            'linear-gradient(to bottom, #4c1d95, #1e293b, #1e40af)',
            'linear-gradient(to bottom, #9333ea, #0f172a, #2563eb)',
            'linear-gradient(to bottom, #4c1d95, #1e293b, #1e40af)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Section Content */}
      <div ref={ref} className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="inline-block px-5 py-2 bg-purple-600/20 rounded-full mb-6"
            variants={itemVariants}
          >
            <span className="text-purple-300 text-sm font-medium">My Journey</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto rounded"
            variants={itemVariants}
          />
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Profile Image */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="jeevanreddy.jpg"
                alt="Jeevan Reddy"
                className="w-full h-[400px] object-cover rounded-2xl"
              />

              <motion.div
                className="absolute bottom-4 left-4 bg-green-600 px-3 py-1 rounded-full flex items-center shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div
                  className="w-2 h-2 bg-white rounded-full mr-2"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-white text-sm font-medium">Available for work</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div className="space-y-6 text-gray-300 text-lg leading-relaxed" variants={itemVariants}>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hi, I’m <span className="text-purple-400 font-semibold">Duong Hoang Lan Anh</span> — a final-year software
              engineering student at the Industrial University of Ho Chi Minh City, passionate about building intuitive,
              fast, and beautiful web apps.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I specialize in frontend development with <span className="text-purple-400 font-semibold">React</span> and{' '}
              <span className="text-purple-400 font-semibold">Next.js</span>, constantly exploring animations, UI/UX,
              and performance optimization.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Eager to contribute to forward-thinking teams and transform creative ideas into impactful digital
              experiences.
            </motion.p>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-1">Name</h4>
                    <p className="text-white">Duong Hoang Lan Anh</p>
                  </div>
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-1">Email</h4>
                    <p className="text-white">dhlananh2309@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-1">Location</h4>
                    <p className="text-white">Ho Chi Minh City, Vietnam</p>
                  </div>
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-1">Availability</h4>
                    <p className="text-green-400">Open to opportunities</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
