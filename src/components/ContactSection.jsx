import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contactList } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

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
    </section>
  );
}
