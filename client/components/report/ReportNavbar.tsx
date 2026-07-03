"use client";

import { motion } from "framer-motion";

export default function ReportNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 shadow-sm shadow-slate-200/20 sm:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-950 sm:text-base">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">❤️</span>
          <span>VitalSense AI</span>
        </div>

        <div className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-base">
          Health Report
        </div>

        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-sm shadow-slate-200/60">
          L
        </div>
      </div>
    </motion.header>
  );
}
