import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white pt-12 pb-8 border-t border-cyan-400/15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text mb-4">
              Jeevan Reddy
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Passionate Full Stack Developer with a focus on creating dynamic and responsive web applications. I specialize in building user-friendly interfaces and seamless user experiences using modern technologies like React, Tailwind CSS, and more.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Education', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {[
                'Frontend Development',
                'React Applications',
                'Responsive Design',
                'UI/UX Implementation',
              ].map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-cyan-400/15 mt-10 pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {currentYear} Jeevan Reddy. All rights reserved.
          </p>

          {/* <div className="flex items-center gap-6 text-gray-400 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item, idx) => (
              <a
                href="#"
                key={idx}
                className="hover:text-cyan-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div> */}

          <div className="flex gap-4 text-white">
            <a
              href="https://github.com/jeevan7674"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/jeevan-reddy680"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
