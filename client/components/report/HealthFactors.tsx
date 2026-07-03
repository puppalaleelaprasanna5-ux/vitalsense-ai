"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface HealthFactorItem {
  title: string;
  status: string;
}

const factors: HealthFactorItem[] = [
  { title: "Healthy BMI", status: "Normal" },
  { title: "Active Lifestyle", status: "Good" },
  { title: "Family History", status: "Diabetes" },
  { title: "Blood Pressure", status: "Normal" },
];

export default function HealthFactors() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Key Health Factors</h2>
          <p className="mt-3 text-sm text-slate-500">Core indicators that support your overall health profile.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {factors.map((factor) => (
            <motion.div
              key={factor.title}
              whileHover={{ y: -2, boxShadow: "0 18px 45px rgba(15,23,42,0.08)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/30 hover:bg-white"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  {factor.status}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{factor.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
