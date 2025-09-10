import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const Card = ({ className, children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className={`rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-md shadow-xl p-6 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-white"
    >
      {/* Optional background stars */}
      {/* <StarsBackground className="absolute inset-0 z-0" /> */}

      {/* Decorative blur circles (matched with Education section) */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-purple-500/10 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-500/10 rounded-full blur-2xl z-0" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="inline-block px-5 py-2 bg-purple-600/20 rounded-full mb-4"
            variants={itemVariants}
          >
            <span className="text-purple-300 text-sm font-medium">My Journey</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
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
          className="grid lg:grid-cols-2 gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Profile Image */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <div className="relative max-w-xs w-full">
              <motion.img
                src="jeevanreddy680.jpg"
                alt="Jeevan Reddy"
                className="rounded-3xl w-full h-auto shadow-lg border-2 border-purple-500/30 object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
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
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-6 text-base sm:text-lg leading-relaxed text-gray-200"
            variants={containerVariants}
          >
            <motion.p variants={itemVariants}>
              Hi, I’m <span className="text-purple-400 font-semibold">R.Jeevan Reddy</span> — a third-year software
              engineering student at the S.R.K.R Engineering College, currently living in Bhimavaram. I love building
              fast, intuitive, and user-centered web and mobile applications.
            </motion.p>
            <motion.p variants={itemVariants}>
              I specialize in frontend development using{' '}
              <span className="text-purple-400 font-semibold">React</span> and{' '}
              <span className="text-purple-400 font-semibold">Next.js</span>. I'm passionate about beautiful design,
              seamless user experience, and performance optimization.
            </motion.p>
            <motion.p variants={itemVariants}>
              I enjoy collaborating with creative teams to build meaningful digital products and I'm always eager to
              learn and grow.
            </motion.p>

            {/* Contact Info */}
            <Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
                <div>
                  <h4 className="text-purple-300 font-semibold mb-1">Name</h4>
                  <p className="text-white">R.Jeevan Reddy</p>
                </div>
                <div>
                  <h4 className="text-purple-300 font-semibold mb-1">Email</h4>
                  <p className="text-white">r.jeevanreddys680@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-purple-300 font-semibold mb-1">Location</h4>
                  <p className="text-white">Bhimavaram, Andhra Pradesh</p>
                </div>
                <div>
                  <h4 className="text-purple-300 font-semibold mb-1">Availability</h4>
                  <p className="text-green-400">Open to opportunities</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
