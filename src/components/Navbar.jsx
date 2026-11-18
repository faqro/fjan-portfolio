import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profileData } from "@/data/portfolioData";

const navItems = [
  { id: "hero", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "hobbies", label: "Hobbies" },
  { id: "gallery", label: "Photos" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handlePointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    const handlePageScroll = () => {
      setMobileOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handlePageScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top pastel scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 origin-left z-50"
      />

      <header
        ref={headerRef}
        className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between glass-panel-strong shadow-[0_14px_40px_rgba(15,23,42,0.28)] rounded-full px-3 sm:px-4 py-2 pointer-events-auto">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-slate-800 tracking-tight text-sm sm:text-base">
              {profileData.name}
            </span>
          </button>

          {/* Desktop nav pills */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-100/90 via-sky-100/90 to-emerald-100/80 border border-white shadow-sm -z-10"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-full bg-white/70 hover:bg-white text-slate-700 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              className="md:hidden max-w-5xl mx-auto mt-2 glass-panel-strong shadow-[0_14px_40px_rgba(15,23,42,0.28)] rounded-3xl p-3 pointer-events-auto"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {navItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`px-4 py-2.5 rounded-2xl text-sm font-medium text-left transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-violet-100 to-sky-100 text-slate-900 shadow-sm"
                          : "text-slate-600 hover:bg-white/70"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
