"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Clock, Code2, FolderGit2, Layers } from "lucide-react";
import gsap from "gsap";
import { GITHUB_USERNAME } from "@/lib/config";
import { fetchGitHubRepos, fetchGitHubUserProfile } from "@/lib/github";
import { computeImpactMetrics, type ImpactMetric } from "@/lib/impact-metrics";

const METRIC_ICONS = [FolderGit2, Code2, Briefcase, Layers, Clock];

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const [repos, profile] = await Promise.all([
          fetchGitHubRepos(GITHUB_USERNAME),
          fetchGitHubUserProfile(GITHUB_USERNAME),
        ]);
        setMetrics(computeImpactMetrics(repos, profile));
      } catch (error) {
        console.error("Error loading impact metrics:", error);
        setMetrics(computeImpactMetrics([], null));
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  useEffect(() => {
    if (isInView && ref.current && !loading) {
      const ctx = gsap.context(() => {
        const impactCards = ref.current?.querySelectorAll(".impact-card");
        if (impactCards) {
          gsap.fromTo(
            impactCards,
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
  }, [isInView, loading]);

  return (
    <section
      ref={ref}
      id="impact"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-center"
        >
          Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          Verifiable metrics calculated from GitHub activity, listed skills, and resume data.
        </motion.p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-400">Calculating impact...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {metrics.map((metric, index) => {
              const Icon = METRIC_ICONS[index] ?? FolderGit2;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="impact-card group relative p-6 bg-background-light border border-gray-800 hover:border-accent-yellow/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 border border-accent-yellow/0 group-hover:border-accent-yellow/30 transition-all duration-300 pointer-events-none" />

                  <div className="mb-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-accent-yellow/30 bg-background group-hover:border-accent-yellow group-hover:bg-accent-yellow/5 transition-all duration-300">
                      <Icon className="w-6 h-6 text-accent-yellow group-hover:text-accent-yellowLight transition-colors" />
                    </div>
                  </div>

                  <p className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-accent-yellow transition-colors">
                    {metric.value}
                  </p>
                  <h3 className="text-lg font-semibold text-accent-yellow mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {metric.source}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
