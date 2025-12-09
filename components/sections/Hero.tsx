"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ============================================
  // PERSONALIZE: Change your name/initials here
  // ============================================
  const name = "HARSH"; // TODO: Replace with your name or initials
  const letters = name.split("");

  useEffect(() => {
    // Animate text reveal
    const ctx = gsap.context(() => {
      // Animate "DESIGNING" text
      const designingText = textRef.current?.querySelector(".designing-text");
      if (designingText) {
        gsap.fromTo(
          designingText,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
        );
      }

      // Animate large letters
      letterRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, scale: 0.8, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              delay: 0.5 + index * 0.1,
              ease: "power3.out",
            }
          );
        }
      });

      // Animate description
      const description = textRef.current?.querySelector(".description");
      if (description) {
        gsap.fromTo(
          description,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power3.out" }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-light to-background-dark pointer-events-none" />

      {/* Main Content */}
      <motion.div
        ref={textRef}
        style={{ y }}
        className="relative z-10 text-center w-full"
      >
        {/* ============================================
            PERSONALIZE: Change the top text (e.g., "DESIGNING", "DEVELOPING", "CREATING")
            ============================================ */}
        <motion.div
          className="designing-text text-accent-yellow text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-wider"
          initial={{ opacity: 0 }}
        >
          DEVELOPING AND LEARNING {/* TODO: Replace with your tagline (e.g., "DEVELOPING", "CREATING", "BUILDING") */}
        </motion.div>

        {/* Large outlined name */}
        <div className="relative inline-block mb-8">
          <h1 className="font-display text-8xl md:text-9xl lg:text-[12rem] font-black italic leading-none tracking-tight">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                onMouseEnter={() => setHoveredLetter(index)}
                onMouseLeave={() => setHoveredLetter(null)}
                className="relative inline-block cursor-default"
                style={{
                  WebkitTextStroke: hoveredLetter === index ? "3px #FFED4E" : "3px #FFD700",
                  color: "transparent",
                  textShadow: hoveredLetter === index
                    ? "0 0 20px rgba(255, 237, 78, 0.5)"
                    : "none",
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {letter === " " ? "\u00A0" : letter}
                {/* Hover tooltip */}
                {hoveredLetter === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-white text-black text-xs font-semibold px-3 py-1 shadow-lg">
                      HOVER OVER {letter}
                    </div>
                  </motion.div>
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* ============================================
            PERSONALIZE: Update your hero description
            ============================================ */}
        <motion.p
          className="description text-white text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
        >
          Full-Stack Developer with 3+ years of experience, who loves to build for form & function! {/* TODO: Replace with your own description */}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
