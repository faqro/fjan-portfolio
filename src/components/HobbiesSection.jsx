import { motion } from "framer-motion";
import { hobbiesList } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Beyond My Career"
        title="Life Outside Work"
        subtitle="The stuff I do for fun in my free time."
        pillColor="bg-rose-100/80 text-rose-700"
      />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 sm:gap-6">
        {hobbiesList.map((hobby, idx) => {
          // Make first two cards span 3 cols (50% each) on desktop, and remaining 3 span 2 cols (33% each)
          const spanClass = idx < 2 ? "md:col-span-3" : "md:col-span-2";

          return (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className={`${spanClass} group glass-panel rounded-[2rem] overflow-hidden flex flex-col relative hover:shadow-[0_20px_50px_rgba(148,163,184,0.22)] transition-shadow`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${hobby.gradient} opacity-30 group-hover:opacity-65 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Photo frame */}
              <div className="relative p-3 pb-0">
                <div className="relative overflow-hidden rounded-[1.5rem] aspect-[16/10] bg-white/70 ring-1 ring-white/80">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-slate-700">
                    {hobby.subtitle}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {hobby.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {hobby.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60">
                  {hobby.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${hobby.badgeClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
