"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import {
  fetchGitHubRepos,
  convertReposToProjects,
  getCuratedFallbackProjects,
  type Project,
} from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/config";

const fallbackProjects = getCuratedFallbackProjects();

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
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
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
            <p>Projects are unavailable right now.</p>
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

function ProjectEngineeringDetails({ project }: { project: Project }) {
  if (!project.problem) return null;

  return (
    <div className="space-y-5 pt-2 border-t border-gray-800/80">
      <DetailBlock label="Problem" content={project.problem} />

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div>
          <h4 className="text-accent-yellow font-semibold text-sm uppercase tracking-wider mb-2">
            Key Features
          </h4>
          <ul className="space-y-1.5">
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="text-gray-400 text-sm leading-relaxed flex gap-2">
                <span className="text-accent-yellow mt-1.5 shrink-0">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.technicalHighlights && project.technicalHighlights.length > 0 && (
        <div>
          <h4 className="text-accent-yellow font-semibold text-sm uppercase tracking-wider mb-2">
            Technical Highlights
          </h4>
          <ul className="space-y-1.5">
            {project.technicalHighlights.map((highlight) => (
              <li key={highlight} className="text-gray-400 text-sm leading-relaxed flex gap-2">
                <span className="text-accent-red mt-1.5 shrink-0">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.engineeringChallenge && (
        <DetailBlock label="Engineering Challenge" content={project.engineeringChallenge} />
      )}

      {project.contribution && (
        <DetailBlock label="Contribution" content={project.contribution} />
      )}
    </div>
  );
}

function ProjectPreview({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasImage = Boolean(project.image) && !imageError;
  const isSvg = project.image?.endsWith(".svg") ?? false;
  const alt =
    project.imageAlt || `${project.title} product preview`;

  if (!hasImage) {
    return <ProjectPreviewFallback title={project.title} />;
  }

  return (
    <>
      {!imageLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 to-gray-900"
          aria-hidden
        />
      )}
      <Image
        src={project.image}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        quality={85}
        priority={index < 2}
        loading={index < 2 ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized={isSvg}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </>
  );
}

function ProjectPreviewFallback({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center"
      role="img"
      aria-label={`${title} preview unavailable`}
    >
      <ImageIcon className="w-10 h-10 text-gray-600" aria-hidden />
      <span className="text-gray-500 text-sm font-medium max-w-[80%]">
        {title}
      </span>
    </div>
  );
}

function DetailBlock({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <h4 className="text-accent-yellow font-semibold text-sm uppercase tracking-wider mb-2">
        {label}
      </h4>
      <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
    </div>
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
      className={`project-card flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center ${project.featured ? "relative" : ""}`}
    >
      {project.featured && (
        <div className="absolute -top-4 left-0 md:left-auto md:right-0 flex items-center gap-2 px-4 py-1.5 bg-accent-yellow text-black text-sm font-semibold">
          <Star className="w-4 h-4 fill-current" />
          Resume Highlight
        </div>
      )}
      {/* Image */}
      <motion.div
        style={{ y }}
        className={`relative w-full md:w-1/2 aspect-video bg-gradient-to-br from-gray-800 to-gray-900 border overflow-hidden group ${project.featured ? "border-accent-yellow/60" : "border-gray-700/50"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 to-accent-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-full h-full min-h-0">
          <ProjectPreview project={project} index={index} />
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </motion.div>

      {/* Content */}
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>

        <ProjectEngineeringDetails project={project} />
        
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
