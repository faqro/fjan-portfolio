import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { skillCategories, skillKeywords } from "@/data/portfolioData";
import { getSkillVisual } from "@/data/skillIcons";
import SectionHeader from "./SectionHeader";

const SkillIconTile = forwardRef(function SkillIconTile({ name, categoryLabel }, ref) {
  const [hovered, setHovered] = useState(false);
  const { Icon, color, bg, badge } = getSkillVisual(name);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => setHovered((prev) => !prev)}
      tabIndex={0}
      role="button"
      aria-label={`${name} (${categoryLabel})`}
      className="relative group focus:outline-none"
    >
      {/* Animated Floating Tooltip */}
      <AnimatePresence>
        {hovered && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <div className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-xl text-center border border-slate-700/80">
                <div className="text-xs font-bold leading-tight text-white">{name}</div>
                <div className="text-[10px] text-violet-200 leading-tight mt-0.5">
                  {categoryLabel}
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-slate-900/95 rotate-45 mx-auto -mt-1.5" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Glass Icon Tile */}
      <motion.div
        whileHover={{ y: -5, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${bg} backdrop-blur-md border border-slate-400/40 shadow-[0_10px_24px_rgba(15,23,42,0.18)] flex items-center justify-center relative cursor-pointer transition-shadow hover:shadow-[0_14px_30px_rgba(15,23,42,0.28)] ${
          hovered ? "ring-2 ring-violet-300/80" : ""
        }`}
      >
        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${color} transition-transform duration-200 group-hover:scale-110`} />
        {badge && (
          <span className="absolute bottom-1 right-1 text-[9px] font-extrabold px-1 rounded bg-white/90 text-slate-700 shadow-sm">
            {badge}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
});

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const flatSkills = visibleCategories
    .flatMap((cat) =>
      cat.items.map((item) => ({
        name: item,
        categoryId: cat.id,
        categoryLabel: cat.label,
      }))
    )
    .filter((skill) => {
      if (!normalizedQuery) return true;
      const keywords = skillKeywords[skill.name] || [];
      return (
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.categoryLabel.toLowerCase().includes(normalizedQuery) ||
        keywords.some((kw) => kw.toLowerCase().includes(normalizedQuery))
      );
    });

  return (
    <section id="skills" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Toolkit"
        title="Technologies & Skills"
        subtitle="The technologies and skills I use for everything."
        pillColor="bg-violet-100/80 text-violet-700"
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
            selectedCategory === "all"
              ? "text-slate-900"
              : "text-slate-500 hover:text-slate-800 glass-pill"
          }`}
        >
          {selectedCategory === "all" && (
            <motion.span
              layoutId="skillFilter"
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-100 via-sky-100 to-emerald-100 border border-white shadow-sm -z-10"
            />
          )}
          All ({skillCategories.reduce((acc, c) => acc + c.items.length, 0)})
        </button>

        {skillCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-800 glass-pill"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="skillFilter"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-100 via-sky-100 to-emerald-100 border border-white shadow-sm -z-10"
                />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Real-time Search Input */}
      <div className="relative w-full sm:w-80 mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter skills..."
          aria-label="Filter technologies and skills"
          className="w-full glass-pill rounded-full pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300/80 transition-shadow"
        />
      </div>

      {/* Frosted Glass Icon Grid */}
      <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
        {flatSkills.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,3.5rem)] sm:grid-cols-[repeat(auto-fill,4rem)] justify-between gap-x-3 gap-y-3.5 sm:gap-x-3.5 sm:gap-y-4">
            {flatSkills.map((skill) => (
              <SkillIconTile
                key={`${skill.categoryId}-${skill.name}`}
                name={skill.name}
                categoryLabel={skill.categoryLabel}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500 py-6">
            No matching skills found for &ldquo;{searchQuery}&rdquo;.
          </p>
        )}
      </div>
    </section>
  );
}
