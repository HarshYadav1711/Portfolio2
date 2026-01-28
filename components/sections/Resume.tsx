"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ============================================
  // PERSONALIZE: Update your work experience
  // ============================================
  const experiences = [
    {
      period: "2023 - Present", // TODO: Update with your dates
      role: "Computer Science Student", // TODO: Update with your role
      college: "United College Of Engineering And Research, Prayagraj", // TODO: Update with company name
      description: "I am a Computer Science Student at United College Of Engineering And Research, Prayagraj. I am currently in my 3rd year of study. I am interested in web development and machine learning.", // TODO: Update with your achievements
    },
    {
      period: "2025", // TODO: Update with your dates
      role: "Student Intern", // TODO: Update with your role
      company: "Prodigy InfoTech", // TODO: Update with company name
      description: "Pursued a virtual internship in CyberSecurity at Prodigy InfoTech and built various projects related to CyberSecurity.", // TODO: Update with your achievements
    },
    {
      period: "2025", // TODO: Update with your dates
      role: "Student Intern", // TODO: Update with your role
      company: "CodeAlpha", // TODO: Update with company name
      description: "Pursued a virtual internship in Python Programming at CodeAlpha and built various projects related to Python Programming.", // TODO: Update with your achievements
    },
  ];

  // ============================================
  // PERSONALIZE: Update your education
  // ============================================
  const education = [
    {
      period: "2023 - Present", // TODO: Update with your dates
      degree: "Bachelor of Technology in Computer Science", // TODO: Update with your degree
      institution: "United College Of Engineering And Research, Prayagraj", // TODO: Update with your university name
    },
  ];

  // ============================================
  // PERSONALIZE: Update your skills list
  // ============================================
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "MySQL",
    "MongoDB", "CSS", "HTML", "ExpressJS", "FastAPI", "REST APIs",
    "TailwindCSS", "Framer Motion", "GitHub", "Git", "JavaScript", "Blender"
    // TODO: Add/remove skills as needed
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
          className="text-5xl md:text-6xl font-bold mb-12 text-center"
        >
          Resume
        </motion.h2>

        {/* Resume Actions */}
        {/* ============================================
            PERSONALIZE: Add your resume PDF file to /public folder
            Update the filename below if your resume has a different name
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          <motion.a
            href="/resume.pdf" // Update filename if different (e.g., "/my-resume.pdf")
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-accent-yellow text-black font-semibold hover:bg-accent-yellowLight transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            View Resume
          </motion.a>
          <motion.a
            href="/resume.pdf" // Update filename if different
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-accent-yellow text-accent-yellow font-semibold hover:bg-accent-yellow hover:text-black transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Experience */}
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

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-accent-yellow">Education</h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="border-l-2 border-accent-yellow/30 pl-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-xl font-bold">{edu.degree}</h4>
                  <span className="text-accent-yellow text-sm font-mono">{edu.period}</span>
                </div>
                <p className="text-accent-red font-semibold">{edu.institution}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
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

