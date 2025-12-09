"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { fetchGitHubRepos, convertReposToProjects, type Project } from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/config";

// Fallback projects in case GitHub API fails
const fallbackProjects: Project[] = [
  {
    title: "Sample Project",
    description: "A sample project to showcase your work. Update your GitHub username in lib/config.ts to fetch your real projects.",
    tech: ["React", "TypeScript", "Next.js"],
    image: "/project1.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from GitHub
    const loadProjects = async () => {
      try {
        setLoading(true);
        const repos = await fetchGitHubRepos(GITHUB_USERNAME);
        
        if (repos.length > 0) {
          const githubProjects = await convertReposToProjects(repos, GITHUB_USERNAME);
          setProjects(githubProjects);
        } else {
          console.warn("No GitHub repositories found. Using fallback projects.");
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error loading GitHub projects:", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    if (isInView && ref.current && !loading) {
      const ctx = gsap.context(() => {
        const projectCards = ref.current?.querySelectorAll(".project-card");
        if (projectCards) {
          gsap.fromTo(
            projectCards,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            }
          );
        }
      }, ref);

      return () => ctx.revert();
    }
  }, [isInView, loading]);

  if (loading) {
    return (
      <section
        ref={ref}
        id="projects"
        className="relative py-32 px-6 md:px-12 lg:px-24 bg-background-light"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
          >
            Featured Projects
          </motion.h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-400">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-background-light"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Featured Projects
        </motion.h2>

        {projects.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No projects found. Please check your GitHub username in lib/config.ts</p>
          </div>
        ) : (
          <div className="space-y-32">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`project-card flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
    >
      {/* Image */}
      <motion.div
        style={{ y }}
        className="relative w-full md:w-1/2 aspect-video bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 to-accent-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Try to load project image, fallback to gradient */}
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            onError={(e) => {
              // Hide image on error, show gradient background instead
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-600 text-sm">
            {project.image.includes('project') ? 'Project Image' : ''}
          </div>
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </motion.div>

      {/* Content */}
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-background border border-gray-800 text-gray-400 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          {project.liveUrl && project.liveUrl !== "#" && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-accent-yellow text-accent-yellow font-semibold hover:bg-accent-yellow hover:text-black transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
              View Live
            </motion.a>
          )}
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-gray-700 text-gray-300 font-semibold hover:border-accent-red hover:text-accent-red transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
