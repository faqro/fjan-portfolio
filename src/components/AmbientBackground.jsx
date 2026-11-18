import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#fafbff]">
      {/* Subtle architectural dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.28) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Pastel Orb 1 - Lavender */}
      <motion.div
        animate={{
          x: [0, 45, -25, 0],
          y: [0, -35, 30, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-24 w-[28rem] h-[28rem] sm:w-[38rem] sm:h-[38rem] rounded-full bg-violet-200/55 blur-[95px]"
      />

      {/* Pastel Orb 2 - Sky Blue */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -25, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] -right-28 w-[26rem] h-[26rem] sm:w-[36rem] sm:h-[36rem] rounded-full bg-sky-200/55 blur-[95px]"
      />

      {/* Pastel Orb 3 - Blush Rose */}
      <motion.div
        animate={{
          x: [0, 35, -40, 0],
          y: [0, -40, 25, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[52%] -left-20 w-[24rem] h-[24rem] sm:w-[34rem] sm:h-[34rem] rounded-full bg-rose-200/45 blur-[100px]"
      />

      {/* Pastel Orb 4 - Mint & Buttercream */}
      <motion.div
        animate={{
          x: [0, -35, 45, 0],
          y: [0, 30, -35, 0],
          scale: [1, 1.07, 0.94, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-28 right-[10%] w-[26rem] h-[26rem] sm:w-[36rem] sm:h-[36rem] rounded-full bg-emerald-100/65 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[38%] left-[42%] w-[18rem] h-[18rem] rounded-full bg-amber-100/45 blur-[85px]"
      />
    </div>
  );
}
