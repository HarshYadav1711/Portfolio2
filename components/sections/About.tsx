"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

// ============================================
// PERSONALIZE: Update your skills list
// ============================================
const skills = [
  "HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript", "Node.js", "Python", "MySQL",
  "MongoDB", "ExpressJS", "Git", "GitHub", "AI Tools", "Figma", "TailwindCSS", "Framer Motion", "Blender"
  // TODO: Add/remove skills as needed
];

// ============================================
// PERSONALIZE: Update your work experience timeline
// ============================================
const timeline = [
  { year: "2023", role: "Started Pursuing B.Tech in Computer Science and Engineering At United College Of Engineering And Research"}, // TODO: Replace with your experience
  { year: "2025", role: "Student Intern", company: "CodeAlpha" },
  { year: "2025", role: "Student Intern", company: "Prodigy InfoTech" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const skillChips = ref.current?.querySelectorAll(".skill-chip");
        if (skillChips) {
          gsap.fromTo(
            skillChips,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.05,
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
      id="about"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background-light"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Profile Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/20 to-accent-red/20 blur-2xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 overflow-hidden">
                <Image 
                  src="/profile.jpg" 
                  alt="Harsh Yadav" 
                  fill 
                  className="object-cover"
                  quality={100}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
              </div>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold"
            >
              About
            </motion.h2>
            
            {/* ============================================
                PERSONALIZE: Write your own bio/description
                ============================================ */}
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg text-gray-400 leading-relaxed"
            >
              I&apos;m a <span className="text-accent-yellow font-semibold">full-stack developer</span> who builds performant, visually expressive applications. My work blends <span className="text-accent-red font-semibold">engineering precision</span> with design awareness, enabling me to create products that feel fast, intentional, and delightful.
              {/* TODO: Replace with your own bio text */}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="skill-chip px-4 py-2 bg-background border border-gray-800 text-gray-300 text-sm font-medium hover:border-accent-yellow/50 hover:text-accent-yellow transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 pt-8 border-t border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <span className="text-accent-yellow font-mono text-sm w-16">{item.year}</span>
                  <div>
                    <p className="font-semibold">{item.role}</p>
                    <p className="text-gray-500 text-sm">{item.company}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

