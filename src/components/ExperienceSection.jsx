import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { experienceList, educationList } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const items = activeTab === "experience" ? experienceList : educationList;

  return (
    <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="[&>div]:mb-0">
          <SectionHeader
            eyebrow="Journey"
            title="Experience & Education"
            subtitle="Where I've worked and studied."
            pillColor="bg-emerald-100/80 text-emerald-700"
          />
        </div>

        {/* Animated Glass Tab Switcher */}
        <div className="glass-panel rounded-full p-1.5 inline-flex self-start sm:self-auto">
          {[
            { id: "experience", label: "Experience", Icon: Briefcase },
            { id: "education", label: "Education", Icon: GraduationCap },
          ].map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="journeyTab"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                  />
                )}
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative pl-4 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-[9px] sm:before:left-[17px] before:top-4 before:bottom-4 before:w-1.5 before:rounded-full before:bg-gradient-to-b before:from-violet-200 before:via-sky-200 before:to-emerald-200"
        >
          {items.map((item, idx) => (
            <motion.div
              key={`${item.company}-${item.date}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <span
                className={`absolute -left-[11px] sm:-left-[19px] top-6 w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm transition-transform duration-200 group-hover:scale-125 ${
                  item.current
                    ? "bg-emerald-400"
                    : "bg-gradient-to-br from-violet-400 to-sky-400"
                }`}
              />

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="glass-panel rounded-3xl p-5 sm:p-6 relative isolate overflow-hidden hover:shadow-[0_14px_40px_rgba(148,163,184,0.18)] transition-shadow duration-300"
              >
                <div
                  className={`absolute inset-0 z-0 bg-gradient-to-r ${item.accent} opacity-25 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {item.image ? (
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white p-1 shadow-sm ring-1 ring-slate-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.company}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 flex items-center justify-center text-violet-700 shadow-sm shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    )}

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {item.company}
                        </h3>
                        {item.current && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200/80">
                            Current
                          </span>
                        )}
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200/80">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-violet-700">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 sm:gap-1 text-xs sm:text-sm text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1.5 glass-pill px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      {item.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 px-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="relative z-10 mt-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
