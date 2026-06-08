"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Database,
  Gauge,
  GitBranch,
  Layers,
  Server,
} from "lucide-react";
import gsap from "gsap";

const buildAreas = [
  {
    title: "Frontend Engineering",
    icon: Layers,
    topics: [
      {
        name: "Performance",
        description:
          "Trim bundle size, lazy-load where useful, fix re-renders before adding complexity.",
      },
      {
        name: "Accessibility",
        description:
          "Semantic HTML, labeled forms, keyboard-friendly flows on every UI.",
      },
      {
        name: "Maintainability",
        description:
          "Small components, typed props, consistent patterns for easier extension.",
      },
    ],
  },
  {
    title: "Backend Systems",
    icon: Server,
    topics: [
      {
        name: "APIs",
        description:
          "REST endpoints with typed shapes, input validation, predictable error codes.",
      },
      {
        name: "Architecture",
        description:
          "Separate routes, business logic, and data access as projects grow.",
      },
      {
        name: "Reliability",
        description:
          "Early input validation, meaningful errors, no silent failures on critical paths.",
      },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    topics: [
      {
        name: "Modeling",
        description:
          "Schemas shaped around real queries and relationships, not CRUD-mirror tables.",
      },
      {
        name: "Scalability",
        description:
          "Indexes, pagination, and N+1 avoidance on data-heavy features.",
      },
    ],
  },
  {
    title: "Developer Experience",
    icon: GitBranch,
    topics: [
      {
        name: "Git",
        description:
          "Focused commits, clear messages, branches that simplify review and rollback.",
      },
      {
        name: "Documentation",
        description:
          "README setup, API notes, comments where code alone isn't clear.",
      },
      {
        name: "Clean Code",
        description:
          "Readable names, small functions, refactor when duplication slows progress.",
      },
    ],
  },
  {
    title: "Performance",
    icon: Gauge,
    topics: [
      {
        name: "Optimization",
        description:
          "Measure first, then fix bottlenecks; no premature optimization.",
      },
      {
        name: "Loading Speed",
        description:
          "Right-sized assets, code splitting, lean first paint on deployed apps.",
      },
      {
        name: "Responsiveness",
        description:
          "Layouts and interactions that hold across screen sizes without breaking core flows.",
      },
    ],
  },
] as const;

export default function HowIBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const cards = ref.current?.querySelectorAll(".build-card");
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
      id="how-i-build"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background-light"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          How I Build
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          Engineering principles from student and internship projects.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildAreas.map((area, areaIndex) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: areaIndex * 0.1 }}
                className="build-card group relative p-6 bg-background border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300"
              >
                <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />

                <div className="mb-5">
                  <div className="w-12 h-12 flex items-center justify-center border border-accent-yellow/30 bg-background-light group-hover:border-accent-yellow group-hover:bg-accent-yellow/5 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent-yellow group-hover:text-accent-yellowLight transition-colors" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-accent-yellow group-hover:text-accent-yellowLight transition-colors">
                  {area.title}
                </h3>

                <ul className="space-y-4">
                  {area.topics.map((topic) => (
                    <li key={topic.name}>
                      <p className="text-sm font-semibold text-white mb-1">{topic.name}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{topic.description}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
