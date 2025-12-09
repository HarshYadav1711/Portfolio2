"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import gsap from "gsap";

// ============================================
// PERSONALIZE: Update your social media links
// ============================================
const socialLinks = [
  { icon: Github, url: "https://github.com/HarshYadav1711", label: "GitHub" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/harsh-yadav-20032010am/", label: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/____.harsh__/", label: "Instagram" },
  { icon: Mail, url: "mailto:harshyadav.20032010@gmail.com", label: "Email" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const formFields = ref.current?.querySelectorAll(".form-field");
        if (formFields) {
          gsap.fromTo(
            formFields,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
        }
      }, ref);

      return () => ctx.revert();
    }
  }, [isInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ============================================
    // PERSONALIZE: Implement your form submission
    // Options: Formspree, EmailJS, API route, etc.
    // ============================================
    // TODO: Implement form submission logic
    // Example with EmailJS:
    // emailjs.send('service_id', 'template_id', formData, 'public_key')
    //   .then(() => alert('Message sent!'))
    //   .catch(() => alert('Error sending message'));
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background-light"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              Let&apos;s discuss your next project or explore collaboration opportunities.
            </p>
            
            <div className="flex flex-col gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group flex items-center gap-4 text-gray-400 hover:text-accent-yellow transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-gray-800 group-hover:border-accent-yellow transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass p-8 space-y-6"
          >
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-gray-800 text-white focus:border-accent-yellow focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-gray-800 text-white focus:border-accent-yellow focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-background border border-gray-800 text-white focus:border-accent-cyan focus:outline-none resize-none transition-all duration-300"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-accent-yellow text-black font-semibold hover:bg-accent-yellowLight transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
              <motion.div
                className="absolute inset-0 bg-accent-yellowLight"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

