import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projectsList } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Selected Work"
        title="Projects"
        subtitle="Cool stuff that I've built."
        pillColor="bg-sky-100/80 text-sky-700"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectsList.map((project, idx) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            whileHover={{ y: -4, scale: 1.015 }}
            className="group relative glass-panel rounded-2xl p-4 flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_14px_34px_rgba(148,163,184,0.2)]"
          >
            {/* Pastel hover aura */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.pastel} opacity-35 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none`}
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-2.5 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center font-extrabold text-sm ${project.accentBadge}`}
                      >
                        {project.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors truncate">
                      {project.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 truncate">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <span className="w-7 h-7 rounded-full glass-pill flex items-center justify-center text-slate-500 group-hover:text-slate-900 group-hover:bg-white transition-all shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-snug mb-3.5 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-1.5 pt-2.5 border-t border-slate-200/60">
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${project.accentBadge}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                <FolderGit2 className="w-3 h-3" />
                Visit
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
