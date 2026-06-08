"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Award, BadgeCheck, GitBranch, Trophy } from "lucide-react";
import gsap from "gsap";
import { ACHIEVEMENT_HIGHLIGHTS } from "@/lib/profile-data";

const HIGHLIGHT_ICONS = {
  "oracle-ai": Award,
  hackathons: Trophy,
  "open-source": GitBranch,
  certifications: BadgeCheck,
} as const;

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const cards = ref.current?.querySelectorAll(".achievement-card");
        if (cards) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
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
      id="achievements"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-background-light border-y border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          Achievements
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
        >
          Credentials, competitions, and community work.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {ACHIEVEMENT_HIGHLIGHTS.map((highlight, index) => {
            const Icon =
              HIGHLIGHT_ICONS[highlight.id as keyof typeof HIGHLIGHT_ICONS] ??
              Award;

            return (
              <motion.a
                key={highlight.id}
                href={highlight.resumeAnchor}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="achievement-card group relative block p-5 bg-background border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300"
              >
                <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />

                <div className="mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-accent-yellow/30 bg-background-light group-hover:border-accent-yellow group-hover:bg-accent-yellow/5 transition-all duration-300">
                    <Icon className="w-4 h-4 text-accent-yellow" />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-accent-yellow transition-colors leading-snug">
                  {highlight.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {highlight.summary}
                </p>
                <p className="mt-3 text-accent-yellow/70 text-xs font-mono uppercase tracking-wider group-hover:text-accent-yellow transition-colors">
                  Details in resume
                </p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex justify-center"
        >
          <a
            href="#resume"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent-yellow transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
            Full list in Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
