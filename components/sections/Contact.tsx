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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all fields.",
      });
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
      return;
    }
    
    // Reset previous status
    setSubmitStatus({ type: null, message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError) {
          // If response is not valid JSON, handle it
          throw new Error("Invalid response from server. Please try again later.");
        }
      } else {
        // If response is not JSON, read as text
        const text = await response.text();
        throw new Error(text || "Invalid response from server. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Failed to send message");
      }

      // Success
      setSubmitStatus({
        type: "success",
        message: data.message || "Your message has been sent successfully!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } catch (error: any) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to send message. Please check your connection and try again.",
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Status Message */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border border-green-500/50 text-green-400"
                    : "bg-red-500/20 border border-red-500/50 text-red-400"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className="w-full px-8 py-4 bg-accent-yellow text-black font-semibold hover:bg-accent-yellowLight transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              {!isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-accent-yellowLight"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

