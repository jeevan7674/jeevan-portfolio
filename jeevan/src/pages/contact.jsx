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
  FileText,
  Mail,
  TerminalSquare,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

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
    className={`w-full rounded-md border bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea
    className={`w-full rounded-md border bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
    {...props}
  />
);

const Label = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={`mb-1 block font-medium ${className}`}>
    {children}
  </label>
);

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
  }, [displayedText, index, isDeleting, paused, pauseTime, texts, typingSpeed]);

  return (
    <h2
      className="mb-6 max-w-full cursor-default overflow-hidden text-center text-[clamp(0.9rem,4vw,1.35rem)] font-extrabold leading-relaxed text-white sm:text-[clamp(1rem,2.2vw,1.55rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {displayedText}
      <span className="ml-1 animate-pulse border-r-2 border-cyan-300" />
    </h2>
  );
};

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
        if (!res.ok) return;

        const data = await res.json();
        if (!isMounted) return;

        if (data?.url) {
          setResumeUrl(data.url);
          setDownloadResumeUrl(data.downloadUrl || data.url.replace('/raw/upload/', '/raw/upload/fl_attachment/'));
        }
      } catch (_error) {
        // Static fallback remains when API is unavailable.
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
    emailjs
      .send('service_coxs2d4', 'template_0okl6vf', formData, 'Xlh9orUaqZ2c3UTEF')
      .then(() => {
        setIsSuccess(true);
        toast({ title: 'Message sent!', description: "Thank you for your message. I'll get back to you soon." });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        toast({ title: 'Error', description: 'Something went wrong. Please try again later.', variant: 'destructive' });
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setIsSuccess(false), 4000);
      });
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-12rem] bottom-0 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="container relative z-10 mx-auto px-4">
        <motion.div variants={fadeInUp} className="mb-16 px-4 text-center">
          <div className="theme-pill mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-medium">Let's work together</span>
          </div>
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">Get In Touch</h2>
          <div className="theme-section-line mx-auto mb-4 h-1 w-20" />
          <p className="mx-auto max-w-2xl text-slate-300">
            Looking for a developer who can turn ideas into polished interfaces and dependable product flows? Let&apos;s talk.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-2 sm:px-4 md:gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0 text-white">
              <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/65 px-5 py-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <FileText className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em]">resume.link</span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="mb-4 text-center text-3xl font-bold">Resume</h2>
                <p className="mb-6 text-center text-sm text-slate-300">
                  A recruiter-friendly snapshot of my experience, projects, and technical foundation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-primary-button inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium shadow-[0_8px_30px_rgba(34,211,238,0.18)] transition-transform hover:scale-105"
                  >
                    <Eye className="h-5 w-5" /> View Online
                  </a>
                  <a
                    href={downloadResumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="theme-secondary-button inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-transform hover:scale-105"
                  >
                    <DownloadIcon className="h-5 w-5 text-cyan-300" /> Download CV (.pdf)
                  </a>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden p-0 text-white">
              <div className="flex items-center justify-between border-b border-cyan-400/15 bg-slate-950/65 px-5 py-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <TerminalSquare className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em]">contact.signal</span>
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <p className="mb-4 text-center text-sm uppercase tracking-widest text-cyan-300 sm:mb-6">
                  Open for internships, freelance work, and product teams
                </p>
                <TypewriterTextLoop texts={['r.jeevanreddys680@gmail.com']} />
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-base sm:mt-8 sm:gap-6">
                  <a
                    href="https://linkedin.com/in/jeevan-reddy680"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-cyan-400/12 bg-slate-950/45 px-4 py-2 transition hover:text-cyan-300"
                  >
                    <LinkedinIcon className="h-5 w-5 text-cyan-300" /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/jeevan7674"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-cyan-400/12 bg-slate-950/45 px-4 py-2 transition hover:text-cyan-300"
                  >
                    <GithubIcon className="h-5 w-5 text-slate-300" /> GitHub
                  </a>
                  <a
                    href="https://www.behance.net/jeevanreddy680"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-cyan-400/12 bg-slate-950/45 px-4 py-2 transition hover:text-cyan-300"
                  >
                    <span className="text-lg font-bold text-violet-200">Be</span> Behance
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-2xl text-white">Send Me a Message</CardTitle>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">response &lt; 48h</span>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {isSuccess ? (
                  <motion.div
                    variants={successVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center justify-center space-y-4 py-12 text-[#22c55e]"
                  >
                    <CheckCircle className="h-12 w-12" />
                    <p className="text-center text-lg font-semibold">Your message has been sent!</p>
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
                          className="mt-2 border-cyan-400/20 placeholder:text-slate-500"
                        />
                      </div>
                    ))}
                    <div>
                      <Label htmlFor="message" className="text-slate-300">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Your detailed message here..."
                        className="mt-2 resize-none border-cyan-400/20 placeholder:text-slate-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="theme-primary-button w-full rounded-lg py-3 shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-all duration-300 hover:scale-[1.01]"
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
