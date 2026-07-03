"use client";

import { motion } from "framer-motion";

export default function HealthCard({ title, value, subtitle, accent = 'emerald' }: { title: string; value: string | number; subtitle?: string; accent?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="rounded-xl bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
        <div className={`ml-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-${accent}-50`}></div>
      </div>
    </motion.div>
  );
}
