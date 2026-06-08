"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export default function QuickFacts() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CURRENTLY_EXPLORING.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25 + index * 0.05 }}
                className="exploring-card group relative p-5 bg-background border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300"
              >
                <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />
                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-accent-yellow transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
              </motion.div>
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
