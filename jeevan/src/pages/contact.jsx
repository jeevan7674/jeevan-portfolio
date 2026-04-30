import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Eye,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

// Reusable UI Components
const Card = ({ className, children, ...props }) => (
  <div className={`theme-panel rounded-3xl ${className}`} {...props}>
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div className={`p-6 border-b border-cyan-400/15 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Input = ({ className, ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-md bg-slate-950/60 border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
    {...props}
  />
);
const Textarea = ({ className, ...props }) => (
  <textarea
    className={`w-full px-3 py-2 rounded-md bg-slate-950/60 border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
    {...props}
  />
);
const Label = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={`block mb-1 font-medium ${className}`}>
    {children}
  </label>
);

// ✅ TypewriterTextLoop with Hover-to-Pause
const TypewriterTextLoop = ({ texts, typingSpeed = 100, pauseTime = 1500 }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    const type = () => {
      if (paused) return;

      const fullText = texts[index];
      const nextChar = isDeleting
        ? fullText.substring(0, displayedText.length - 1)
        : fullText.substring(0, displayedText.length + 1);

      setDisplayedText(nextChar);

      if (!isDeleting && nextChar === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && nextChar === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const tick = () => {
      type();
      requestRef.current = setTimeout(tick, isDeleting ? typingSpeed / 2 : typingSpeed);
    };

    requestRef.current = setTimeout(tick, typingSpeed);
    return () => clearTimeout(requestRef.current);
  }, [displayedText, isDeleting, index, texts, paused]);

  return (
    <h2
      className="mb-6 max-w-full cursor-default overflow-hidden text-center text-[clamp(0.9rem,4vw,1.35rem)] font-extrabold leading-relaxed text-white sm:text-[clamp(1rem,2.2vw,1.55rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {displayedText}
      <span className="border-r-2 border-cyan-300 animate-pulse ml-1" />
    </h2>
  );
};

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const successVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');
  const [downloadResumeUrl, setDownloadResumeUrl] = useState('/resume.pdf');
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchResume = async () => {
      try {
        const res = await fetch(`${API_BASE}/public/resume`);
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (!isMounted) {
          return;
        }

        if (data?.url) {
          setResumeUrl(data.url);
          setDownloadResumeUrl(data.downloadUrl || data.url.replace('/raw/upload/', '/raw/upload/fl_attachment/'));
        }
      } catch (_error) {
        // Keep static resume fallback when API is unavailable.
      }
    };

    fetchResume();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ title: 'Validation Error', description: 'All fields are required.', variant: 'destructive' });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast({ title: 'Invalid Email', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    emailjs.send(
      'service_coxs2d4',
      'template_0okl6vf',
      formData,
      'Xlh9orUaqZ2c3UTEF'
    ).then(() => {
      setIsSuccess(true);
      toast({ title: 'Message sent!', description: "Thank you for your message. I'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }).catch((error) => {
      toast({ title: 'Error', description: 'Something went wrong. Please try again later.', variant: 'destructive' });
      console.error(error);
    }).finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 4000);
    });
  };

  return (
    <section id="contact" className="py-20  overflow-hidden">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="container mx-auto px-4">
        <motion.div variants={fadeInUp} className="text-center mb-16 px-4">
          <div className="theme-pill inline-block px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Let's work together</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 theme-section-line mx-auto mb-4" />
          <p className="text-slate-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 px-2 sm:px-4 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <Card className="text-white p-6 sm:p-8">
              <h2 className="text-3xl font-bold mb-4 text-center">Resume</h2>
              <p className="text-sm text-slate-300 mb-6 text-center">
                Take a look at my professional experience and skills. You can view it directly in your browser or download a PDF copy for your convenience.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-medium theme-primary-button transition-transform transform hover:scale-105 gap-2"
                >
                  <Eye className="w-5 h-5" /> View Online
                </a>
                <a href={downloadResumeUrl} target="_blank" rel="noopener noreferrer" download
                  className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-medium theme-secondary-button transition-transform transform hover:scale-105 gap-2"
                >
                  <DownloadIcon className="w-5 h-5 text-cyan-300" /> Download CV (.pdf)
                </a>
              </div>
            </Card>

            <Card className="text-white p-6 sm:p-10">
              <p className="uppercase tracking-widest text-sm mb-4 sm:mb-6 text-center text-cyan-300">Looking for a new talent?</p>
              <TypewriterTextLoop
                texts={[
                  'r.jeevanreddys680@gmail.com',
                ]}
              />
              <div className="flex justify-center flex-wrap gap-4 sm:gap-6 text-base mt-4 sm:mt-8">
                <a href="https://linkedin.com/in/jeevan-reddy680" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 flex items-center gap-2">
                  <LinkedinIcon className="w-5 h-5 text-cyan-300" /> LinkedIn
                </a>
                <a href="https://github.com/jeevan7674" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 flex items-center gap-2">
                  <GithubIcon className="w-5 h-5 text-slate-300" /> GitHub
                </a>
                <a href="https://www.behance.net/jeevanreddy680" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 flex items-center gap-2">
                  <span className="text-xl font-bold">𝔅</span> Behance
                </a>
              </div>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {isSuccess ? (
                  <motion.div
                    variants={successVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center justify-center text-[#22c55e] space-y-4 py-12"
                  >
                    <CheckCircle className="w-12 h-12" />
                    <p className="text-lg font-semibold text-center">Your message has been sent!</p>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="space-y-6">
                    {['name', 'email', 'subject'].map((field, idx) => (
                      <div key={idx}>
                        <Label htmlFor={field} className="text-slate-300">
                          {field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Subject'} *
                        </Label>
                        <Input
                          id={field}
                          name={field}
                          type={field === 'email' ? 'email' : 'text'}
                          value={formData[field]}
                          onChange={handleInputChange}
                          required
                          placeholder={
                            field === 'name'
                              ? 'Your Name'
                              : field === 'email'
                                ? 'you@example.com'
                                : 'Subject about cooperation opportunities...'
                          }
                          className="mt-2 border-cyan-400/20 text-white placeholder:text-slate-400"
                        />
                      </div>
                    ))}
                    <div>
                      <Label htmlFor="message" className="text-slate-300">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Your detailed message here..."
                        className="mt-2 border-cyan-400/20 text-white placeholder:text-slate-400 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full theme-primary-button py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? 'Sending...' : (<><Send className="mr-2 h-4 w-4" />Send Message</>)}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
