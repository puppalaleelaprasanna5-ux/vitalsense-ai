"use client";

import { motion } from "framer-motion";

interface HealthCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function HealthCard({
  title,
  value,
  subtitle,
}: HealthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -2,
        scale: 1.005,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      className="rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-[30px] font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-0.5 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
          <div className="h-5 w-5 rounded-full bg-emerald-100"></div>
        </div>
      </div>
    </motion.div>
  );
}