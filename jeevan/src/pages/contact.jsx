import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Merged UI Components

const Card = ({ className, children, ...props }) => (
  <div className={`rounded-xl border bg-white/5 border-purple-500/20 shadow-md ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-6 border-b border-purple-500/20 ${className}`}>{children}</div>
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
    className={`w-full px-3 py-2 rounded-md bg-slate-900/50 border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea
    className={`w-full px-3 py-2 rounded-md bg-slate-900/50 border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
    {...props}
  />
);

const Label = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={`block mb-1 font-medium ${className}`}>
    {children}
  </label>
);

// Contact Component

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: 'Message sent!', description: "Thank you for your message. I'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full mb-6">
            <span className="text-purple-400 text-sm font-medium">Let's work together</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mb-4" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[{
                icon: <Mail className="h-6 w-6 text-purple-400" />, label: 'Email', value: 'dhlananh2309@gmail.com'
              }, {
                icon: <Linkedin className="h-6 w-6 text-purple-400" />, label: 'LinkedIn', value: 'linkedin.com/in/dhlananh'
              }, {
                icon: <Github className="h-6 w-6 text-purple-400" />, label: 'GitHub', value: 'github.com/dhlananh'
              }].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-medium">{item.label}</h4>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-purple-500/20">
                <h4 className="text-white font-semibold mb-2">Current Status</h4>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field, idx) => (
                  <div key={idx}>
                    <Label htmlFor={field} className="text-gray-300">
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
                      className="mt-2 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-400"
                    />
                  </div>
                ))}
                <div>
                  <Label htmlFor="message" className="text-gray-300">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Your detailed message here..."
                    className="mt-2 bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-400 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : (<><Send className="mr-2 h-4 w-4" />Send Message</>)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
