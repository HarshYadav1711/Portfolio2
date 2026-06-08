"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

// ============================================
// PERSONALIZE: Update skill categories and technologies
// ============================================
const skillCategories = {
  Languages: ["Python", "JavaScript", "TypeScript", "SQL", "C++"],
  Frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Vite"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Authentication"],
  Databases: ["PostgreSQL", "MongoDB", "SQLite", "MySQL", "PostGIS"],
  "AI / ML": ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Deep Learning", "Feature Engineering"],
  Geospatial: ["GeoPandas", "Rasterio", "Shapely", "Leaflet", "STAC APIs"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Postman", "Figma"],
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const skillCards = ref.current?.querySelectorAll(".skill-card");
        if (skillCards) {
          gsap.fromTo(
            skillCards,
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
      id="skills"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="skill-card group relative p-6 bg-background-light border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300"
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />
              
              <h3 className="text-2xl font-bold mb-4 text-accent-yellow group-hover:text-accent-yellowLight transition-colors">
                {category}
              </h3>
              
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-400 text-sm hover:text-accent-yellow transition-colors cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

