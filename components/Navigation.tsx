"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

// ============================================
// PERSONALIZE: Customize navigation items if needed
// ============================================
const navItems: NavItem[] = [
  { label: "WORK", href: "#projects" }, // TODO: Change label if desired
  { label: "ABOUT", href: "#about" },
  { label: "RESUME", href: "#resume" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background-dark/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation Items */}
          <div className="flex items-center gap-8">
            {navItems.slice(0, 2).map((item) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-medium text-sm tracking-wider hover:text-accent-yellow transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Center Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0"
          >
            {/* ============================================
                PERSONALIZE: Change your logo/initials
                ============================================ */}
            <Link href="/" scroll={false}>
              <div className="w-12 h-8 bg-accent-red flex items-center justify-center shadow-lg hover:bg-accent-redLight transition-colors cursor-pointer">
                <span className="text-white font-bold text-sm">HY.</span> {/* TODO: Replace with your initials (e.g., "JD.", "SM.") */}
              </div>
            </Link>
          </motion.div>

          {/* Right Navigation Items */}
          <div className="flex items-center gap-8">
            {navItems.slice(2).map((item) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-medium text-sm tracking-wider hover:text-accent-yellow transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
