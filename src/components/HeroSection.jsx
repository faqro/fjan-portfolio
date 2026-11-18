import { motion } from "framer-motion";
import { ArrowDownRight, MapPin, Sparkles } from "lucide-react";
import { profileData } from "@/data/portfolioData";

export default function HeroSection() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel-strong rounded-[2.25rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden"
      >
        {/* Soft pastel corner glow inside hero glass */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-violet-200/50 via-sky-200/40 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-rose-200/40 via-amber-100/40 to-transparent blur-2xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Avatar & quick status */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-violet-300/70 via-sky-300/70 to-rose-300/70 blur-md opacity-75" />
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-[1.75rem] object-cover ring-4 ring-white/90 shadow-xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="absolute -bottom-3 -right-3 glass-pill rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 shadow-md"
              >
                <MapPin className="w-3.5 h-3.5 text-violet-500" />
                {profileData.location}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Intro, role chips & CTAs */}
          <div className="lg:col-span-8 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="pastel-text-gradient">{profileData.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6"
            >
              {profileData.bio}
            </motion.p>

            {/* Role Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8"
            >
              {profileData.roles.map((role, idx) => (
                <motion.span
                  key={role.label}
                  whileHover={{ y: -3, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 360, damping: 20 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-md shadow-sm cursor-default ${role.pastel}`}
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  <span>{role.emoji}</span>
                  <span>{role.label}</span>
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-semibold text-sm shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-colors"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-pill text-slate-700 font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                <span>Get in Touch</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
