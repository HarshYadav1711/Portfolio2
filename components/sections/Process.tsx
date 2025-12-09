"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Palette, Code, Rocket } from "lucide-react";
import gsap from "gsap";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Deep dive into requirements, user needs, and technical constraints to define the optimal solution.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Create intuitive interfaces and system architectures that balance aesthetics with functionality.",
  },
  {
    icon: Code,
    title: "Develop",
    description: "Build robust, scalable applications using modern technologies and best practices.",
  },
  {
    icon: Rocket,
    title: "Deliver",
    description: "Deploy, monitor, and iterate to ensure continuous improvement and optimal performance.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const ctx = gsap.context(() => {
        const processSteps = ref.current?.querySelectorAll(".process-step");
        if (processSteps) {
          gsap.fromTo(
            processSteps,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
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
      id="process"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Process
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="process-step relative group"
              >
                {/* Connecting line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-800 -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                <div className="relative p-8 bg-background-light border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300 h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 flex items-center justify-center border border-accent-yellow/30 bg-background group-hover:border-accent-yellow group-hover:bg-accent-yellow/5 transition-all duration-300">
                      <Icon className="w-8 h-8 text-accent-yellow group-hover:text-accent-yellowLight transition-colors" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  
                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-900 opacity-20">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

