"use client";

import { motion } from "framer-motion";
import { Activity, HeartPulse, Bed } from "lucide-react";

const highlights = [
  { label: "Healthy BMI", icon: Activity },
  { label: "Active Lifestyle", icon: HeartPulse },
  { label: "Good Sleep Pattern", icon: Bed },
];

export default function OverallHealthCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)]"
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Overall Health Status
          </p>
          <div className="mt-4 rounded-[2rem] bg-gradient-to-br from-emerald-50 via-slate-100 to-white p-5 shadow-sm shadow-emerald-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                  🟢
                </span>
                <div>
                  <p className="text-2xl font-semibold text-slate-950">LOW RISK</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Your responses indicate a generally healthy lifestyle. Continue maintaining good habits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div key={highlight.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-slate-900">{highlight.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
