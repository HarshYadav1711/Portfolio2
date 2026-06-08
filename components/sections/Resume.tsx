"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import {
  ACHIEVEMENT_ACTIVITIES,
  CERTIFICATIONS,
  RESUME_DOWNLOAD_NAME,
  RESUME_PATH,
} from "@/lib/profile-data";

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      period: "Feb 2026 – Mar 2026",
      role: "Full Stack Development Intern",
      company: "VibeOps (Remote)",
      description:
        "Full-stack features in React, Node.js, REST APIs, and PostgreSQL. Figma-to-code UI workflows. GenAI tooling (Cursor, Copilot) for speed without sacrificing modular, production-oriented code.",
    },
    {
      period: "May 2025",
      role: "Python Programming Intern",
      company: "CodeAlpha (Remote)",
      description:
        "Python/ML preprocessing pipelines in Pandas and NumPy—feature engineering and dataset transformation. Trained supervised and unsupervised Scikit-learn models for predictive analysis on structured data.",
    },
    {
      period: "Jun 2025",
      role: "Cybersecurity Intern",
      company: "Prodigy Infotech (Remote)",
      description:
        "Vulnerability assessments and manual penetration testing on web apps. Documented critical flaws, risk findings, and mitigation strategies.",
    },
  ];

  const education = [
    {
      period: "Oct 2023 – Oct 2027",
      degree: "Bachelor of Technology, Computer Science",
      institution: "United College of Engineering and Research — Prayagraj, India",
      details: "CGPA 7.60/10. Coursework: DSA, ML, System Design, DBMS, Networking—applied in full-stack and ML projects.",
    },
  ];

  const skills = [
    "Python", "JavaScript", "TypeScript", "SQL", "C++",
    "PyTorch", "Scikit-learn", "Pandas", "NumPy", "TensorFlow", "Deep Learning", "CNNs",
    "React.js", "Node.js", "Express.js", "FastAPI", "REST APIs", "JWT",
    "PostgreSQL", "MongoDB", "PostGIS", "GeoPandas", "Rasterio", "Leaflet",
    "Docker", "Git", "GitHub", "Figma",
  ];

  return (
    <section
      ref={ref}
      id="resume"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-center"
        >
          Resume
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-10"
        >
          One PDF with three internships, full-stack and ML projects, technical skills, and software engineering experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          <motion.a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-accent-yellow text-black font-semibold hover:bg-accent-yellowLight transition-all duration-300 shadow-[0_0_24px_rgba(255,215,0,0.15)]"
          >
            <ExternalLink className="w-5 h-5" />
            View Resume
          </motion.a>
          <motion.a
            href={RESUME_PATH}
            download={RESUME_DOWNLOAD_NAME}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-accent-yellow text-accent-yellow font-semibold hover:bg-accent-yellow hover:text-black transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-accent-yellow">Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="border-l-2 border-accent-yellow/30 pl-6 pb-8 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-xl font-bold">{exp.role}</h4>
                  <span className="text-accent-yellow text-sm font-mono">{exp.period}</span>
                </div>
                <p className="text-accent-red font-semibold mb-2">{exp.company}</p>
                <p className="text-gray-400">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-accent-yellow">Education</h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="border-l-2 border-accent-yellow/30 pl-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-xl font-bold">{edu.degree}</h4>
                  <span className="text-accent-yellow text-sm font-mono">{edu.period}</span>
                </div>
                <p className="text-accent-red font-semibold mb-2">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="resume-certifications"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mb-16 scroll-mt-28"
        >
          <h3 className="text-3xl font-bold mb-8 text-accent-yellow">Certifications & Achievements</h3>
          <div className="space-y-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="border-l-2 border-accent-yellow/30 pl-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-xl font-bold">{cert.title}</h4>
                  <span className="text-accent-yellow text-sm font-mono">{cert.period}</span>
                </div>
                <p className="text-accent-red font-semibold">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="resume-achievements"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mb-16 scroll-mt-28"
        >
          <h3 className="text-3xl font-bold mb-8 text-accent-yellow">Achievements & Activities</h3>
          <ul className="space-y-4">
            {ACHIEVEMENT_ACTIVITIES.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="border-l-2 border-accent-yellow/30 pl-6 text-gray-400"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-accent-yellow">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.02 }}
                className="px-4 py-2 bg-background-light border border-gray-800 text-gray-300 text-sm font-medium hover:border-accent-yellow/50 hover:text-accent-yellow transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
