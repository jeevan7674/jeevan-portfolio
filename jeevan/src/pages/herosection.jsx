import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import GradientText from '@/components/GradientText/GradientText';
const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* Stable Background Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <StarsBackground className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-cyan-300 font-medium mb-3 animate-fade-in">
          Hi, I'm Jeevan!
        </h2>

        {/* Animated Gradient Text */}
        <div className="mt-2 mb-4">
          <GradientText
            colors={['#40ffaa', '#4079ff', '#ff4fa6', '#40ffaa', '#4079ff']}
            animationSpeed={15}
            showBorder={false}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            I Build Modern & Intuitive <br className="hidden sm:block" />
            Web Experiences.
          </GradientText>
        </div>

        <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 animate-fade-in">
          A passionate <strong className="text-white font-semibold">Web Developer</strong> dedicated to turning
          innovative ideas into beautiful, high-performance digital solutions.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center animate-fade-in">
          <a
            href="#projects"
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            View Projects →
          </a>
          <a
            href="#contact"
            className="border border-white/80 px-6 py-3 rounded-lg text-white font-medium hover:bg-white hover:text-black transition"
          >
            Contact me
          </a>
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex gap-6 text-xl sm:text-2xl text-white justify-center animate-fade-in">
          <a href="https://github.com" target="_blank" className="hover:text-teal-400 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-teal-400 transition">
            <FaLinkedinIn />
          </a>
          <a href="mailto:you@example.com" className="hover:text-teal-400 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Animated Crescent Gradient at Bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150vw] h-[150px] sm:h-[180px] md:h-[200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500 via-purple-600 to-indigo-600 animate-gradient-blur opacity-40 pointer-events-none z-0 rounded-t-full blur-3xl" />
    </section>
  );
};

export default Hero;
