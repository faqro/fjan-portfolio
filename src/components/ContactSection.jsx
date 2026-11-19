import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Globe, Linkedin, Mail, User, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { businessCardData, contactList, profileData } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  const websiteUrl =
    businessCardData.websiteUrl ||
    (typeof window !== "undefined" ? window.location.origin : "https://faraaz.page");

  useEffect(() => {
    if (!cardOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCardOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cardOpen]);

  const handleCopy = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Connect"
        title="Get in Touch"
        titleAction={
          <button
            type="button"
            onClick={() => setCardOpen(true)}
            aria-label="Open virtual business card"
            title="Virtual Business Card"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-pill inline-flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-teal-300/80"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        }
        subtitle="Open to professional inquiries, or just a coffee chat :)"
        pillColor="bg-teal-100/80 text-teal-700"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {contactList.map((item, idx) => (
          <motion.a
            key={item.contact}
            href={item.url}
            target={item.url.startsWith("http") ? "_blank" : undefined}
            rel={item.url.startsWith("http") ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.07 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group glass-panel rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between hover:shadow-[0_18px_45px_rgba(148,163,184,0.2)] transition-shadow"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.pastel} opacity-35 group-hover:opacity-75 transition-opacity pointer-events-none`}
            />

            <div className="relative flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/90 p-2.5 shadow-sm ring-1 ring-white group-hover:scale-105 transition-transform">
                <img
                  src={item.image}
                  alt={item.contact}
                  className="w-full h-full object-contain"
                />
              </div>

              {item.copyValue ? (
                <button
                  onClick={(e) => handleCopy(e, item.copyValue)}
                  className="glass-pill px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              ) : (
                <span className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-500 group-hover:text-slate-900 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              )}
            </div>

            <div className="relative">
              <h3 className="text-base font-bold text-slate-900">{item.contact}</h3>
              <p className="text-sm font-mono text-violet-700 truncate mt-0.5">
                {item.username}
              </p>
              <p className="text-xs text-slate-500 mt-1.5">{item.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
        <p>Copyright © {new Date().getFullYear()} Faraaz Jan</p>
        <p className="text-slate-400">
          Made with React+Vite, Tailwind, &amp; Framer Motion
        </p>
      </footer>

      {/* Virtual Business Card Modal */}
      <AnimatePresence>
        {cardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCardOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-center justify-center [@media(min-width:640px)_and_(min-height:500px)]:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Virtual Business Card"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full [@media(min-width:640px)_and_(min-height:500px)]:h-auto [@media(min-width:640px)_and_(min-height:500px)]:max-w-xl bg-white/95 backdrop-blur-2xl border-0 [@media(min-width:640px)_and_(min-height:500px)]:border [@media(min-width:640px)_and_(min-height:500px)]:border-white/90 rounded-none [@media(min-width:640px)_and_(min-height:500px)]:rounded-3xl shadow-2xl p-6 sm:p-8 flex items-center justify-center overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setCardOpen(false)}
                aria-label="Close virtual business card"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300/80"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full flex flex-col landscape:flex-row [@media(min-width:640px)_and_(min-height:500px)]:flex-row items-center justify-between gap-6 sm:gap-8">
                {/* Profile & Links (top in portrait mobile; left side in landscape/desktop) */}
                <div className="flex flex-col items-center landscape:items-start [@media(min-width:640px)_and_(min-height:500px)]:items-start text-center landscape:text-left [@media(min-width:640px)_and_(min-height:500px)]:text-left min-w-0">
                  <div className="flex flex-col landscape:flex-row [@media(min-width:640px)_and_(min-height:500px)]:flex-row items-center gap-3 sm:gap-4">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-28 h-28 landscape:w-20 landscape:h-20 [@media(min-width:640px)_and_(min-height:500px)]:w-20 [@media(min-width:640px)_and_(min-height:500px)]:h-20 rounded-full object-cover ring-4 ring-white shadow-md shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        {profileData.name}
                      </h3>
                      <p className="text-sm font-medium text-teal-700 mt-1">
                        {businessCardData.position}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-center landscape:items-start [@media(min-width:640px)_and_(min-height:500px)]:items-start gap-2 text-sm max-w-full">
                    <a
                      href={businessCardData.linkedin.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 underline underline-offset-4 font-mono transition-colors max-w-full"
                    >
                      <Linkedin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{businessCardData.linkedin.label}</span>
                    </a>

                    <a
                      href={businessCardData.github.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 underline underline-offset-4 font-mono transition-colors max-w-full"
                    >
                      <Github className="w-4 h-4 shrink-0" />
                      <span className="truncate">{businessCardData.github.label}</span>
                    </a>

                    <a
                      href={`mailto:${businessCardData.email}`}
                      className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 underline underline-offset-4 font-mono transition-colors max-w-full"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span className="truncate">{businessCardData.email}</span>
                    </a>

                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 underline underline-offset-4 font-mono transition-colors max-w-full"
                    >
                      <Globe className="w-4 h-4 shrink-0" />
                      <span className="truncate">{websiteUrl}</span>
                    </a>
                  </div>
                </div>

                {/* QR Code (bottom underneath links in portrait mobile; right side in landscape/desktop) */}
                <div className="p-3 landscape:p-3.5 [@media(min-width:640px)_and_(min-height:500px)]:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm shrink-0">
                  <QRCodeSVG
                    value={websiteUrl}
                    size={152}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    className="w-32 h-32 landscape:w-[152px] landscape:h-[152px] [@media(min-width:640px)_and_(min-height:500px)]:w-[152px] [@media(min-width:640px)_and_(min-height:500px)]:h-[152px]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
