"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const LETTER_EXPANSIONS = [
  "High-Performance Engineering",
  "Applied AI & Machine Learning",
  "Resilient Backend Systems",
  "Scalable Product Development",
  "Human-Centered Problem Solving",
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameBlockRef = useRef<HTMLDivElement>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const name = "HARSH";
  const letters = name.split("");

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncTouch = () => setIsTouchDevice(touchQuery.matches);
    const syncMotion = () => setPrefersReducedMotion(motionQuery.matches);

    syncTouch();
    syncMotion();

    touchQuery.addEventListener("change", syncTouch);
    motionQuery.addEventListener("change", syncMotion);

    return () => {
      touchQuery.removeEventListener("change", syncTouch);
      motionQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    nameBlockRef.current?.setAttribute(
      "aria-expanded",
      isExpanded ? "true" : "false"
    );
  }, [isExpanded]);

  const showExpansion = useCallback(() => setIsExpanded(true), []);
  const hideExpansion = useCallback(() => setIsExpanded(false), []);

  const handleNamePointerEnter = useCallback(() => {
    if (!isTouchDevice) showExpansion();
  }, [isTouchDevice, showExpansion]);

  const handleNamePointerLeave = useCallback(() => {
    if (!isTouchDevice) hideExpansion();
  }, [isTouchDevice, hideExpansion]);

  const handleNameClick = useCallback(() => {
    if (isTouchDevice) setIsExpanded((prev) => !prev);
  }, [isTouchDevice]);

  const handleNameFocus = useCallback(() => {
    showExpansion();
  }, [showExpansion]);

  const handleNameBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!nameBlockRef.current?.contains(event.relatedTarget as Node)) {
        if (!isTouchDevice) hideExpansion();
      }
    },
    [isTouchDevice, hideExpansion]
  );

  const handleNameKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (isTouchDevice) setIsExpanded((prev) => !prev);
      } else if (event.key === "Escape") {
        hideExpansion();
        nameBlockRef.current?.blur();
      }
    },
    [isTouchDevice, hideExpansion]
  );

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
        <motion.div
          className="designing-text text-accent-yellow text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-wider"
          initial={{ opacity: 0 }}
        >
          FULL-STACK APPS · ML PIPELINES · PRODUCTION APIs
        </motion.div>

        {/* Large outlined name */}
        <div className="relative inline-block mb-8">
          <div
            ref={nameBlockRef}
            role="button"
            tabIndex={0}
            aria-label="HARSH — activate to reveal engineering focus areas"
            aria-expanded="false"
            aria-describedby={isExpanded ? "harsh-expansion" : undefined}
            onMouseEnter={handleNamePointerEnter}
            onMouseLeave={handleNamePointerLeave}
            onClick={handleNameClick}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className={`relative outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-accent-yellow/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isTouchDevice ? "cursor-pointer" : "cursor-default"
            }`}
          >
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
                </motion.span>
              ))}
            </h1>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-max max-w-[min(90vw,28rem)] pointer-events-none">
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id="harsh-expansion"
                    initial={
                      prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.35,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex flex-col items-start gap-1 text-left"
                  >
                    {LETTER_EXPANSIONS.map((expansion, index) => (
                      <motion.p
                        key={expansion}
                        initial={
                          prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.3,
                          delay: prefersReducedMotion ? 0 : index * 0.06,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="text-xs md:text-sm font-light tracking-wide"
                      >
                        <span className="text-accent-yellow/60 font-medium">
                          {letters[index]}
                        </span>
                        <span className="text-white/40"> — {expansion}</span>
                      </motion.p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.p
          className="description text-white text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
        >
          I build software for real workflows — authenticated web apps, geospatial analysis tools, and ML models with deployment-ready inference. B.Tech CS student with three internships shipping production features in React, Node.js, Python, and PyTorch. Open to software engineering internships.
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
