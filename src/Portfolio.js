import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Github,
  Code,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Contact form component with working state and feedback
function ContactForm() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate field on change to provide immediate feedback
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === 'email' && !validateEmail(value)) {
      error = 'Please enter a valid email address';
    } else if (name === 'message' && value.trim().length < 10) {
      error = 'Message must be at least 10 characters long';
    }

    setErrors(prev => {
      const newErrors = { ...prev, [name]: error };
      // Remove empty error messages
      Object.keys(newErrors).forEach(key => {
        if (!newErrors[key]) delete newErrors[key];
      });
      return newErrors;
    });
    
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Validate all fields
    const validations = Object.entries(form).map(([name, value]) => validateField(name, value));
    if (validations.some(valid => !valid)) {
      setStatus('idle');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      // Reset form
      setForm({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatus('error');
      setErrors(prev => ({ ...prev, submit: 'Failed to send message. Please try again.' }));
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-2xl text-primary font-bold mb-2 flex items-center justify-center gap-2">
          <Mail className="w-6 h-6" />
          Message Sent!
        </div>
        <div className="text-foreground/80">Thank you for reaching out. I'll get back to you soon.</div>
      </div>
    );
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium mb-2 block" htmlFor="contact-name">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            autoComplete="name"
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block" htmlFor="contact-email">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            autoComplete="email"
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block" htmlFor="contact-message">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell me about your project..."
          className="min-h-[150px]"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message && errors.message}
        />
        {touched.message && errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
      {errors.submit && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-600 text-sm">
          {errors.submit}
        </div>
      )}      <Button 
        className="w-full" 
        type="submit" 
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center">
            <Mail className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            Send Message
            <Mail className="w-4 h-4 ml-2" />
          </span>
        )}
      </Button>
    </form>
  );
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Game QA-focused projects
  const projects = [
    {
      id: 1,
      title: "AAA Console Game Certification QA",
      description: "Led certification and compliance QA for a major PlayStation/Xbox title. Managed test plans, platform TRC/XR compliance, multiplayer, and regression. Discovered and reported 200+ critical bugs pre-launch.",
      image: "/placeholder.svg",
      tags: ["PlayStation", "Xbox", "TRC/XR", "Multiplayer", "Regression"],
      link: "#",
    },
    {
      id: 2,
      title: "VR Game QA & Performance Testing",
      description: "Tested and optimized a VR puzzle game for Oculus and HTC Vive. Focused on performance, comfort, and cross-device compatibility. Automated smoke tests and tracked bugs in JIRA.",
      image: "/placeholder.svg",
      tags: ["VR", "Oculus", "HTC Vive", "Performance", "Automation"],
      link: "#",
    },
    {
      id: 3,
      title: "Mobile Battle Royale QA Automation",
      description: "Developed Appium-based automation for a mobile battle royale game. Covered matchmaking, in-app purchases, and device compatibility. Reduced manual regression time by 60%.",
      image: "/placeholder.svg",
      tags: ["Mobile", "Appium", "Battle Royale", "Automation", "iOS/Android"],
      link: "#",
    },
    {
      id: 4,
      title: "Indie Game Accessibility & Usability QA",
      description: "Collaborated with an indie studio to test accessibility features and usability for a narrative-driven PC game. Provided actionable feedback for colorblind, subtitle, and controller support.",
      image: "/placeholder.svg",
      tags: ["Accessibility", "Usability", "PC", "Indie", "Controller"],
      link: "#",
    },
  ];

  // Game QA-focused technical skills (updated for clarity and visual appeal)
  const skills = [
    { name: "Manual & Exploratory Gameplay Testing", level: 97, icon: <CheckCircle className="h-5 w-5" /> },
    { name: "Bug Reporting & Tracking (JIRA, TestRail, Bugzilla)", level: 95, icon: <FileText className="h-5 w-5" /> },
    { name: "Regression & Reproduction Steps", level: 93, icon: <ArrowRight className="h-5 w-5" /> },
    { name: "Platform/Device Coverage (PS/Xbox/Switch/PC/VR/Mobile)", level: 92, icon: <Code className="h-5 w-5" /> },
    { name: "Performance & Compatibility Testing", level: 90, icon: <Phone className="h-5 w-5" /> },
    { name: "Test Plan & Scenario Design", level: 88, icon: <CheckCircle className="h-5 w-5" /> },
    { name: "Automation Scripting (Cypress, Appium, Selenium)", level: 80, icon: <Github className="h-5 w-5" /> },
    { name: "Multiplayer/Network QA", level: 85, icon: <ArrowRight className="h-5 w-5" /> },
    { name: "Agile/Scrum Collaboration", level: 87, icon: <FileText className="h-5 w-5" /> },
    { name: "Accessibility & Usability QA", level: 82, icon: <CheckCircle className="h-5 w-5" /> },
    { name: "Game QA Tools (Steam, Xbox Manager, PlayStation Tools)", level: 80, icon: <Code className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col items-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 ${
          scrollY > 50 ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-2"
          >
            <span className="rounded-full bg-primary p-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </span>
            <span className="text-xl font-bold">QA Portfolio</span>
          </motion.div>

          <nav className="hidden md:flex space-x-6">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </motion.header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-y-0 right-0 z-50 w-64 bg-background shadow-xl"
        >
          <div className="p-4">
            <button onClick={toggleMenu} className="mb-8">
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col space-y-4">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}

      <main className="w-full flex flex-col items-center">
        <section id="about" className="py-20 w-full flex justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                QA Engineer & Test Automation Specialist
              </motion.h1>
              <motion.p
                className="text-xl text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Crafting Quality Through Innovative Testing Solutions
              </motion.p>
            </div>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 animate-fade-in">
                <div className="flex-shrink-0 flex flex-col items-center md:items-start mb-6 md:mb-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white shadow-lg mb-2 border-4 border-secondary animate-bounce-slow">
                    <span role="img" aria-label="Game Controller">🎮</span>
                  </div>
                  <span className="text-xl font-bold text-primary">Simran Dhiman</span>
                  <span className="text-base text-foreground/80">Game QA Specialist</span>
                  <span className="text-sm text-muted-foreground">Chandigarh, India</span>
                  <div className="flex gap-3 mt-3">
                    <a href="https://in.linkedin.com/in/simrandhimanqa" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="LinkedIn"><Linkedin className="h-6 w-6" /></a>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg leading-relaxed mb-4">
                    <span className="inline-flex items-center gap-2 font-semibold text-primary"><span role="img" aria-label="Trophy">🏆</span> AAA Game Quality Assurance</span><br/>
                    I am a passionate Game QA professional with hands-on experience testing blockbuster titles and indie gems across PlayStation, Xbox, VR, Mobile, and PC. My mission is to ensure every player enjoys a flawless, immersive experience.
                  </p>
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 font-semibold text-secondary"><span role="img" aria-label="Toolbox">🛠️</span> What I Do</span>
                    <ul className="list-disc list-inside text-base mt-1">
                      <li>Manual & automated gameplay testing (RPG, FPS, VR, Battle Royale, Sim, Puzzle, and more)</li>
                      <li>Platform coverage: PlayStation, Xbox, Nintendo Switch, PC, iOS, Android, VR (Oculus, HTC Vive)</li>
                      <li>Bug hunting, reporting, and regression using JIRA, TestRail, Confluence, Bugzilla</li>
                      <li>Performance, compatibility, and multiplayer/network testing</li>
                      <li>Test plan creation, scenario design, and exploratory play sessions</li>
                      <li>Collaboration with devs, artists, and designers to deliver polished releases</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-1 flex items-center gap-2"><span role="img" aria-label="Experience">💼</span> Experience</h4>
                      <ul className="list-disc list-inside text-base mb-3">
                        <li><strong>Quality Assurance Tester</strong>, Virtualize Technologies (Jul 2023 - Present)</li>
                        <li><strong>Functional Tester</strong>, Keywords Studios (Dec 2021 - Jul 2023)</li>
                        <li><strong>Game Tester</strong>, GameEon Studios (Jul 2021 - Nov 2021)</li>
                      </ul>
                      <h4 className="font-semibold text-primary mb-1 flex items-center gap-2"><span role="img" aria-label="Education">🎓</span> Education</h4>
                      <ul className="list-disc list-inside text-base mb-3">
                        <li>BTech, RIMT- Institute of Engg. and Technology (2012 - 2015)</li>
                        <li>Diploma, RIMT University (2009 - 2012)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1 flex items-center gap-2"><span role="img" aria-label="Certificate">📜</span> Certifications</h4>
                      <ul className="list-disc list-inside text-base mb-3">
                        <li>Generative AI & AI Agents for Software Testing, Udemy (Apr 2025)</li>
                        <li>Scrum Master Certification: CSM & PSM-I, Udemy (Apr 2025)</li>
                        <li>Confluence Fundamentals Badge, Atlassian (Feb 2024)</li>
                        <li>Jira Fundamentals Badge, Atlassian (Feb 2024)</li>
                        <li>Jira Work Management Fundamentals Badge, Atlassian (Feb 2024)</li>
                        <li>Trello Fundamentals Badge, Atlassian (Feb 2024)</li>
                        <li>Keywords Software Testing Certification, Keywords Studios (Apr 2022)</li>
                      </ul>
                      <h4 className="font-semibold text-primary mb-1 flex items-center gap-2"><span role="img" aria-label="Controller">🎮</span> Game QA Toolbox</h4>
                      <ul className="list-disc list-inside text-base">
                        <li>Steam, Xbox Manager, PlayStation Publishing Tools, XBOX GDK, NDI (Switch), Neighborhood (PS4), Target Manager (PS5)</li>
                        <li>JIRA, Confluence, TestRail, Bugzilla, MS Excel</li>
                        <li>Agile, Scrum, and cross-team communication</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 font-semibold text-secondary"><span role="img" aria-label="Star">⭐</span> Highlights</span>
                    <ul className="list-disc list-inside text-base mt-1">
                      <li>Tested and contributed to the release of multiple AAA and indie games</li>
                      <li>Expert in VR and cross-platform compatibility testing</li>
                      <li>Known for creative bug discovery and clear, actionable reporting</li>
                      <li>Advocate for player experience and accessibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section id="skills" className="py-20 bg-muted/50 w-full flex justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="container max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <span role="img" aria-label="Controller">🎮</span> Game QA Technical Skills
              </h2>
              <p className="text-foreground text-lg">
                Specialized in end-to-end game quality assurance: bug hunting, platform coverage, regression, automation, and player experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemFadeIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold text-primary/90">{skill.name}</h3>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <p className="text-right text-sm text-foreground mt-1">
                    {skill.level}%
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-20 w-full flex justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="container max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <span role="img" aria-label="Game">🕹️</span> Game QA Projects
              </h2>
              <p className="text-foreground text-lg">
                Highlights of my hands-on QA work for console, VR, mobile, and indie games
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (                <motion.div
                  key={project.id}
                  variants={itemFadeIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <Card className="overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4px_4px]" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-80" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full group">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="py-20 bg-muted/50 w-full flex justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-foreground">
                Let's discuss how I can help ensure the quality of your software
              </p>
            </div>


            <Card className="p-6">
              <ContactForm />
            </Card>

            <div className="mt-12 flex justify-center space-x-6">
              {[
                { icon: <Github className="h-6 w-6" />, label: "GitHub" },
                { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn" },
                { icon: <Twitter className="h-6 w-6" />, label: "Twitter" },
              ].map(({ icon, label }) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ y: -3 }}
                className="text-foreground hover:text-primary transition-colors"
              >
                {icon}
              </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-6 border-t w-full flex justify-center">
        <div className="container text-center text-sm text-foreground mx-auto">
          <p>&copy; {new Date().getFullYear()} QA Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>  );
}
