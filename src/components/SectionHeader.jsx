import { motion } from "framer-motion";

export default function SectionHeader({
  eyebrow,
  title,
  titleAction,
  subtitle,
  pillColor = "bg-violet-100/80 text-violet-700",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 sm:mb-10"
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 border border-white/80 shadow-sm ${pillColor}`}
        >
          {eyebrow}
        </span>
      )}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h2>
        {titleAction}
      </div>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
