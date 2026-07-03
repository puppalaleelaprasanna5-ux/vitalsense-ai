"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const safeTotal = total > 0 ? total : 1;
  const pct = Math.max(0, Math.min(100, Math.round(((current + 1) / safeTotal) * 100)));

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-end">
        <div className="text-sm font-medium text-slate-500">{pct}%</div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full bg-emerald-600 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
