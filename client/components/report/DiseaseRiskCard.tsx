"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DiseaseRiskCardProps {
  title: string;
  risk: number;
  status: string;
  color: string;
  icon: LucideIcon;
}

export default function DiseaseRiskCard({ title, risk, status, color, icon: Icon }: DiseaseRiskCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(15,23,42,0.08)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Disease Risk</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{title}</h3>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-end justify-between gap-4">
          <p className="text-5xl font-semibold tracking-tight text-slate-950">{risk}%</p>
          <span className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${color}`}>{status}</span>
        </div>

        <div className="rounded-full bg-slate-100 p-1">
          <div className="h-3 rounded-full bg-slate-200 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${risk}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-3 rounded-full ${color}`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
