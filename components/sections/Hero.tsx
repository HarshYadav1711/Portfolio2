"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const LETTER_DETAILS = [
  {
    letter: "H",
    expansion: "High-Impact Engineering",
    description:
      "Production features shipped across three internships—web apps, APIs, and internal tools in active use.",
  },
  {
    letter: "A",
    expansion: "Applied Artificial Intelligence",
    description:
      "End-to-end ML work in PyTorch with deployment-ready inference, not notebook-only experiments.",
  },
  {
    letter: "R",
    expansion: "Reliable Backend Systems",
    description:
      "Node.js and FastAPI backends with clear contracts, tested auth paths, and graceful error handling.",
  },
  {
    letter: "S",
    expansion: "Scalable Product Development",
    description:
      "Full-stack React delivery from schema and API design through UI, built to extend without rewrites.",
  },
  {
    letter: "H",
    expansion: "Human-Centered Problem Solving",
    description:
      "Projects anchored in real workflows—application tracking, geospatial analysis, and financial reconciliation.",
  },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterButtonRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameGroupRef = useRef<HTMLDivElement>(null);
  const [activeLetter, setActiveLetter] = useState<number | null>(null);
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
    letterButtonRefs.current.forEach((el, index) => {
      el?.setAttribute(
        "aria-expanded",
        activeLetter === index ? "true" : "false"
      );
    });
  }, [activeLetter]);

  const activateLetter = useCallback((index: number) => {
    setActiveLetter(index);
  }, []);

  const deactivateLetter = useCallback(() => {
    setActiveLetter(null);
  }, []);

  const handleLetterPointerEnter = useCallback(
    (index: number) => {
      if (!isTouchDevice) activateLetter(index);
    },
    [isTouchDevice, activateLetter]
  );

  const handleLetterPointerLeave = useCallback(() => {
    if (!isTouchDevice) deactivateLetter();
  }, [isTouchDevice, deactivateLetter]);

  const handleLetterClick = useCallback(
    (index: number) => {
      if (isTouchDevice) {
        setActiveLetter((prev) => (prev === index ? null : index));
      }
    },
    [isTouchDevice]
  );

  const handleLetterFocus = useCallback(
    (index: number) => {
      activateLetter(index);
    },
    [activateLetter]
  );

  const handleLetterBlur = useCallback(
    (event: React.FocusEvent<HTMLSpanElement>) => {
      if (!nameGroupRef.current?.contains(event.relatedTarget as Node)) {
        deactivateLetter();
      }
    },
    [deactivateLetter]
  );

  const handleLetterKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLSpanElement>, index: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveLetter((prev) => (prev === index ? null : index));
      } else if (event.key === "Escape") {
        deactivateLetter();
        event.currentTarget.blur();
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const next = (index + 1) % letters.length;
        letterButtonRefs.current[next]?.focus();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const prev = (index - 1 + letters.length) % letters.length;
        letterButtonRefs.current[prev]?.focus();
      }
    },
    [deactivateLetter, letters.length]
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

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

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
        <div ref={nameGroupRef} className="relative inline-block mb-8">
          <h1 className="font-display text-8xl md:text-9xl lg:text-[12rem] font-black italic leading-none tracking-tight">
            {letters.map((letter, index) => {
              const isActive = activeLetter === index;
              const detail = LETTER_DETAILS[index];

              return (
                <motion.span
                  key={index}
                  ref={(el) => {
                    letterRefs.current[index] = el;
                    letterButtonRefs.current[index] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${detail.letter}: ${detail.expansion}`}
                  aria-expanded="false"
                  aria-describedby={isActive ? "harsh-letter-panel" : undefined}
                  onMouseEnter={() => handleLetterPointerEnter(index)}
                  onMouseLeave={handleLetterPointerLeave}
                  onClick={() => handleLetterClick(index)}
                  onFocus={() => handleLetterFocus(index)}
                  onBlur={handleLetterBlur}
                  onKeyDown={(event) => handleLetterKeyDown(event, index)}
                  className={`relative inline-block outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-accent-yellow/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isTouchDevice ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{
                    WebkitTextStroke: isActive ? "3px #FFED4E" : "3px #FFD700",
                    color: "transparent",
                    textShadow: isActive
                      ? "0 0 20px rgba(255, 237, 78, 0.5)"
                      : "none",
                  }}
                  animate={
                    isActive
                      ? { scale: 1.1, y: -5 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              );
            })}
          </h1>

          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-full max-w-[min(90vw,24rem)] pointer-events-none">
            <AnimatePresence mode="wait">
              {activeLetter !== null && (
                <motion.div
                  key={activeLetter}
                  id="harsh-letter-panel"
                  role="region"
                  aria-live="polite"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={panelTransition}
                  className="text-center"
                >
                  <p className="font-display text-accent-yellow/70 text-lg md:text-xl font-bold mb-1">
                    {LETTER_DETAILS[activeLetter].letter}
                  </p>
                  <p className="text-white/70 text-sm md:text-base font-medium mb-1.5 tracking-wide">
                    {LETTER_DETAILS[activeLetter].expansion}
                  </p>
                  <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed">
                    {LETTER_DETAILS[activeLetter].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
