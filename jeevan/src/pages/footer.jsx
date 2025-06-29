import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
              Lan Anh
            </h3>
            <p className="text-gray-400 mb-4">
              Passionate about creating dynamic websites and applications with modern frontend technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">NAVIGATION</h4>
            <ul className="space-y-2">
              {['home', 'about', 'projects', 'skills', 'experience', 'education', 'contact'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-gray-400 hover:text-purple-400 transition-colors capitalize">
                    {id}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">SERVICES</h4>
            <ul className="space-y-2 text-gray-400">
              {['Frontend Development', 'React Applications', 'Responsive Web Design', 'UI/UX Implementation'].map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4 mt-6 text-white">CONTACT</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                dhlananh2309@gmail.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">💼</span>
                github.com/dhlananh
              </p>
              <p className="flex items-center">
                <span className="mr-2">🔗</span>
                linkedin.com/in/dhlananh
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Lan Anh. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item, idx) => (
              <a href="#" key={idx} className="text-gray-400 hover:text-purple-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
