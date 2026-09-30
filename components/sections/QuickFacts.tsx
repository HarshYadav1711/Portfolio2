"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Briefcase,
  Download,
  ExternalLink,
  FileText,
  Calendar,
  GraduationCap,
  MapPin,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import gsap from "gsap";
import {
  AREAS_OF_INTEREST,
  CURRENTLY_EXPLORING,
  getCurrentAcademicYear,
  getInternshipSummary,
  PRIMARY_TECHNOLOGIES,
  PROFILE,
  RESUME_DOWNLOAD_NAME,
  RESUME_PATH,
} from "@/lib/profile-data";

const QUICK_FACTS = [
  { label: "Name", value: PROFILE.name, icon: User },
  { label: "Location", value: PROFILE.location, icon: MapPin },
  { label: "Degree", value: PROFILE.degree, icon: GraduationCap },
  {
    label: "Current Academic Year",
    value: getCurrentAcademicYear(),
    icon: Calendar,
  },
  {
    label: "Primary Technologies",
    value: PRIMARY_TECHNOLOGIES.join(", "),
    icon: Wrench,
  },
  {
    label: "Internship Experience",
    value: getInternshipSummary(),
    icon: Briefcase,
  },
  {
    label: "Areas of Interest",
    value: AREAS_OF_INTEREST.join(" · "),
    icon: Sparkles,
  },
] as const;

type ExploringItem = (typeof CURRENTLY_EXPLORING)[number];

function ExploringCard({
  item,
  index,
  isInView,
  isActive,
  isTouchDevice,
  prefersReducedMotion,
  onActivate,
  onDeactivate,
  onToggle,
  cardRef,
  groupRef,
}: {
  item: ExploringItem;
  index: number;
  isInView: boolean;
  isActive: boolean;
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
  onActivate: (index: number) => void;
  onDeactivate: () => void;
  onToggle: (index: number) => void;
  cardRef: (el: HTMLDivElement | null) => void;
  groupRef: React.RefObject<HTMLDivElement | null>;
}) {
  const panelId = `exploring-focus-${index}`;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

  const handlePointerEnter = () => {
    if (!isTouchDevice) onActivate(index);
  };

  const handlePointerLeave = () => {
    if (!isTouchDevice) onDeactivate();
  };

  const handleClick = () => {
    if (isTouchDevice) onToggle(index);
  };

  const handleFocus = () => onActivate(index);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!groupRef.current?.contains(event.relatedTarget as Node)) {
      onDeactivate();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(index);
    } else if (event.key === "Escape") {
      onDeactivate();
      event.currentTarget.blur();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — ${item.description}`}
      aria-expanded="false"
      aria-describedby={isActive ? panelId : undefined}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: isActive && !prefersReducedMotion ? 1.02 : 1,
            }
          : {}
      }
      transition={{
        opacity: { duration: 0.8, delay: 0.25 + index * 0.05 },
        y: { duration: 0.8, delay: 0.25 + index * 0.05 },
        scale: { duration: prefersReducedMotion ? 0 : 0.2 },
      }}
      className={`exploring-card group relative p-5 bg-background border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-accent-yellow/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light ${
        isTouchDevice ? "cursor-pointer" : "cursor-default"
      } ${isActive ? "border-accent-yellow/50" : ""}`}
    >
      <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />
      <h4 className="text-base font-semibold text-white mb-2 group-hover:text-accent-yellow transition-colors">
        {item.title}
      </h4>
      <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={panelId}
            role="region"
            aria-live="polite"
            initial={
              prefersReducedMotion
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={
              prefersReducedMotion
                ? { opacity: 0, height: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={transition}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-gray-800/80">
              <p className="text-xs font-mono uppercase tracking-wider text-accent-yellow mb-2">
                Current Focus
              </p>
              <ul className="space-y-1">
                {item.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="text-gray-500 text-xs leading-relaxed flex gap-2"
                  >
                    <span className="text-accent-yellow/70 shrink-0">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function QuickFacts() {
  const ref = useRef<HTMLDivElement>(null);
  const exploringCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const exploringGroupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeExploringIndex, setActiveExploringIndex] = useState<number | null>(
    null
  );
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    exploringCardRefs.current.forEach((el, index) => {
      el?.setAttribute(
        "aria-expanded",
        activeExploringIndex === index ? "true" : "false"
      );
    });
  }, [activeExploringIndex]);

  const activateExploring = useCallback((index: number) => {
    setActiveExploringIndex(index);
  }, []);

  const deactivateExploring = useCallback(() => {
    setActiveExploringIndex(null);
  }, []);

  const toggleExploring = useCallback((index: number) => {
    setActiveExploringIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const cards = ref.current?.querySelectorAll(".quick-fact-card, .exploring-card");
        if (cards) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            }
          );
        }
      }, ref);

      return () => ctx.revert();
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="quick-facts"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-background-light border-y border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          Quick Facts
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
        >
          Recruiter snapshot.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {QUICK_FACTS.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className={`quick-fact-card group relative p-5 bg-background border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300 ${
                  fact.label === "Areas of Interest" || fact.label === "Internship Experience"
                    ? "sm:col-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent-yellow/30 bg-background-light group-hover:border-accent-yellow group-hover:bg-accent-yellow/5 transition-all duration-300">
                    <Icon className="w-4 h-4 text-accent-yellow" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-accent-yellow mb-1">
                      {fact.label}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">{fact.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-accent-yellow">
            Currently Exploring
          </h3>
          <div
            ref={exploringGroupRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {CURRENTLY_EXPLORING.map((item, index) => (
              <ExploringCard
                key={item.title}
                item={item}
                index={index}
                isInView={isInView}
                isActive={activeExploringIndex === index}
                isTouchDevice={isTouchDevice}
                prefersReducedMotion={prefersReducedMotion}
                onActivate={activateExploring}
                onDeactivate={deactivateExploring}
                onToggle={toggleExploring}
                cardRef={(el) => {
                  exploringCardRefs.current[index] = el;
                }}
                groupRef={exploringGroupRef}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-background border border-accent-yellow/20 hover:border-accent-yellow/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent-yellow/40 bg-accent-yellow/5">
              <FileText className="w-5 h-5 text-accent-yellow" />
            </div>
            <div>
              <p className="text-white font-semibold">Full resume available</p>
              <p className="text-gray-500 text-sm">
                Experience, education, certifications, projects.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent-yellow text-black text-sm font-semibold hover:bg-accent-yellowLight transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              View Resume
            </motion.a>
            <motion.a
              href={RESUME_PATH}
              download={RESUME_DOWNLOAD_NAME}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 border border-accent-yellow/60 text-accent-yellow text-sm font-semibold hover:bg-accent-yellow/10 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
